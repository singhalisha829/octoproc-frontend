"use client";
import { getClients } from "@/api/enterprise";
import { createPurchaseRequest } from "@/api/purchaseRequest";
import Container from "@/components/globals/Container";
import Header from "@/components/globals/Header";
import StockTable from "@/components/StockPagesComponents/StockTable";
import { Button } from "@/components/ui/button";
import { ControlledComboBox } from "@/components/ui/ControlledComboBox";
import { Item } from "@/interfaces/Stock";
import { transformSelectOptions } from "@/lib/utils";
import { enterpriseQueries } from "@/react-query/enterpriseQueries";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

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
  const { type } = useParams<{
    type: string;
  }>();

  const [selectedEnterprise, setSelectedEnterprise] = useState<
    null | string | number
  >(null);

  const [addedProducts, setAddedProducts] = useState<Item[]>([]);

  const { data: enterprises } = useQuery({
    queryKey: [enterpriseQueries.client.getClients],
    queryFn: getClients,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: createPurchaseRequest,
    onSuccess: (response) => {
      toast.success("Purchase Request created successfully!");
      router.push(`/purchase-request/${response.data.data || null.id}/assign-vendors`);
    },
    onError: () => {
      toast.error("Failed to create purchase request!");
    },
  });

  const addItem = useCallback((item: Item) => {
    setAddedProducts((prev) => [...prev, item]);
  }, []);

  const deleteItem = useCallback((item: Item) => {
    setAddedProducts((prev) =>
      prev.filter((i) => i.productId !== item.productId)
    );
  }, []);

  const handleCreatePr = () => {
    const formattedAddedProducts = addedProducts
      .filter((product) => product.productId)
      .map((product) => ({
        product_id: product?.productId,
        uom_id: product.uom_id,
        quantity: product.quantity,
      }));
    mutate({
      created_by: 1,
      enterprise_client_id: Number(selectedEnterprise),
      items: formattedAddedProducts,
      reference_no: uuidv4(),
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
          isLoading={isPending}
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
