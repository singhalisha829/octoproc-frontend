"use client";
import { getClients } from "@/api/enterprise";
import {
  addItemInPR,
  createPurchaseRequest,
  getPurchaseRequest,
  removeItemFromPR,
  updateItemInPR,
} from "@/api/purchaseRequest";
import Container from "@/components/globals/Container";
import Header from "@/components/globals/Header";
import StockTable from "@/components/StockPagesComponents/StockTable";
import { Button } from "@/components/ui/button";
import { ControlledComboBox } from "@/components/ui/ControlledComboBox";
import { Item } from "@/interfaces/Stock";
import { transformSelectOptions } from "@/lib/utils";
import { enterpriseQueries } from "@/react-query/enterpriseQueries";
import { purchaseRequestQueries } from "@/react-query/purchaseRequest";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

// const [purchaseRequest, setPurchaseRequest] = useState<PurchaseRequest>({
//   id: 1,
//   name: "Demo purchase request",
//   items:
//     type === "edit"
//       ? [
//           {
//             unitPrice: 20,
//             quantity: 20,
//             productName: "item",
//             quantityUnit: "V",
//             productId: 4,
//           },
//           {
//             unitPrice: 30,
//             quantity: 10,
//             productName: "item2",
//             quantityUnit: "Kg",
//             productId: 2,
//           },
//         ]
//       : [],
//   vendors: [{ id: 1, name: "Demo Vendor", quantity: 20 }],
// });

const CreatePurchaseRequestPage = () => {
  const router = useRouter();

  const id = useSearchParams().get("id");

  const [selectedEnterprise, setSelectedEnterprise] = useState<
    null | string | number
  >(null);

  const [addedProducts, setAddedProducts] = useState<Item[]>([]);

  const { data: purchaseRequest, refetch } = useQuery({
    queryKey: [
      purchaseRequestQueries.purchaseRequest.getPurchaseRequest.key,
      id,
    ],
    queryFn: () => getPurchaseRequest(id as string),
    enabled: !!id,
  });

  const { data: enterprises } = useQuery({
    queryKey: [enterpriseQueries.client.getClients],
    queryFn: getClients,
  });

  const { mutate: createPR, isPending: isCreatingPR } = useMutation({
    mutationFn: createPurchaseRequest,
    onSuccess: (response) => {
      toast.success("Purchase Request created successfully!");
      router.push(`/purchase-request/${response.data.data.id}/assign-vendors`);
    },
    onError: () => {
      toast.error("Failed to create purchase request!");
    },
  });
  const addItemMutation = useMutation({
    mutationFn: addItemInPR,
    onSuccess: (response) => {
      refetch();
      toast.success("Item added successfully!");
    },
    onError: () => {
      toast.error("Failed to add item in purchase request!");
    },
  });
  const removeItemMutation = useMutation({
    mutationFn: removeItemFromPR,
    onSuccess: (response) => {
      refetch();
      toast.success("Item removed successfully!");
    },
    onError: () => {
      toast.error("Failed to remove item from purchase request!");
    },
  });
  const updateItemMutation = useMutation({
    mutationFn: updateItemInPR,
    onSuccess: (response) => {
      refetch();
      toast.success("Item updated successfully!");
    },
    onError: () => {
      toast.error("Failed to update item in purchase request!");
    },
  });

  useEffect(() => {
    if (!purchaseRequest) return;
    setSelectedEnterprise(purchaseRequest.enterprise_client_id);
    setAddedProducts(
      purchaseRequest.items.map((item) => ({
        id: item.id,
        productId: item.product.id,
        productName: item.product.name,
        quantity: item.quantity,
        uom_id: item.product.uom_id,
        unitPrice: 0,
        quantityUnit: "",
        unit_symbol: item.product?.uom?.symbol ?? ''
      }))
    );
  }, [purchaseRequest, id]);

  const addItem = useCallback(
    (item: Item) => {
      if (id && purchaseRequest) {
        addItemMutation.mutate({
          purchase_request_id: purchaseRequest.id,
          quantity: item.quantity,
          product_id: item.productId,
          uom_id: item.uom_id,
        });
        return;
      }
      setAddedProducts((prev) => [...prev, item]);
    },
    [id, purchaseRequest]
  );

  const deleteItem = useCallback(
    (item: Item) => {
      if (id && purchaseRequest && item.id) {
        removeItemMutation.mutate(String(item.id));
        return;
      }
      setAddedProducts((prev) =>
        prev.filter((i) => i.productId !== item.productId)
      );
    },
    [id, purchaseRequest]
  );

  const handleCreatePr = () => {
    if (!selectedEnterprise) {
      return toast.error("Please Select Enterprise.");
    }
    if (id && purchaseRequest) {
      router.push(`/purchase-request/${purchaseRequest.id}/assign-vendors`);
      return;
    }
    const formattedAddedProducts = addedProducts
      .filter((product) => product.productId)
      .map((product) => ({
        product_id: product?.productId,
        uom_id: product.uom_id,
        quantity: product.quantity,
      }));

    if (formattedAddedProducts.length === 0) {
      return toast.error("Please add atleast one item.");
    }

    createPR({
      enterprise_client_id: selectedEnterprise
        ? Number(selectedEnterprise)
        : null,
      items: formattedAddedProducts,
    });
  };

  return (
    <>
      <Header
        title="Purchase Request"
        description="Add New Parts to Purchase Request"
      />

      <Container className="grid gap-4">
        <ControlledComboBox
          className="max-w-fit min-w-[200px]"
          emptyLabel="No Enterprise Found"
          onSelect={(option) => {
            setSelectedEnterprise(option?.value || null);
          }}
          value={selectedEnterprise}
          options={transformSelectOptions(enterprises, "id", "name")}
          placeholder="Select Enterprise"
          searchPlaceholder="Search Enterprise"
          labelKey="label"
          valueKey="value"
        />

        <p className="text-lg font-semibold">Your Purchase Request Items</p>

        <StockTable
          items={addedProducts}
          addItem={addItem}
          deleteItem={deleteItem}
          headers={[
            { label: "Product ID", value: "productId" },
            { label: "Product Name", value: "productName" },
            { label: "Quantity", value: "quantity" },
          ]}
        />
      </Container>
      <Container className="fixed bottom-0 left-[320px] right-0 shadow-inner flex rounded-none items-center justify-end gap-2">
        <Button
          onClick={() => {
            router.back();
          }}
          variant={"secondary"}
          size={"lg"}
        >
          Cancel
        </Button>
        <Button
          isLoading={isCreatingPR}
          onClick={() => {
            handleCreatePr();
          }}
          size={"lg"}
          variant={"tertiary"}
        >
          Save
        </Button>
      </Container>
    </>
  );
};

export default CreatePurchaseRequestPage;
