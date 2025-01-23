"use client";
import {
  addItemToCatalogue,
  getVendor,
  getVendorCatalogue,
  removeItemFromCatalogue,
} from "@/api/masterdata/vendor";
import Container from "@/components/globals/Container";
import Header from "@/components/globals/Header";
import StockTable from "@/components/StockPagesComponents/StockTable";
import { Button } from "@/components/ui/button";
import { Item } from "@/interfaces/Stock";
import { masterApiQuery } from "@/react-query/masterApiQueries";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

// const convertProductToItem = (products: Product[]): Item[] => {

//   return [];
// };

const VendorDetailsPage = () => {
  const params = useParams<{ vendorId: string }>();
  const [addedProducts, setAddedProducts] = useState<Item[]>([]);
  const [deletedProducts, setDeletedProducts] = useState<Item[]>([]);

  const { data: vendor, isLoading } = useQuery({
    queryKey: [masterApiQuery.vendor.getVendor.Key],
    queryFn: () => getVendor(params.vendorId),
    enabled: !!params.vendorId,
  });

  const {
    data: catalogue,
    isError: catalogueError,
    isLoading: isCatalogueLoading,
  } = useQuery({
    queryKey: [masterApiQuery.vendor.getVendorCatalogue.Key],
    queryFn: () => getVendorCatalogue(params.vendorId),
    enabled: !!params.vendorId,
  });

  useEffect(() => {
    if (isCatalogueLoading) return;
    if (catalogueError) return;
    setAddedProducts(
      catalogue?.items.map((item) => ({
        productId: item.id,
        productName: item.name,
        quantity: 0,
        uom_id: item.uom_id,
        unitPrice: 0,
        quantityUnit: "",
      })) || []
    );
  }, [catalogue, catalogueError, isCatalogueLoading]);

  const { mutate: addItems, isPending: isAddingItems } = useMutation({
    mutationFn: (productIds: Array<number | string>) =>
      addItemToCatalogue({
        product_ids: productIds,
        vendor_id: Number(params.vendorId),
      }),

    onError: () => {
      toast.error("Failed to add products in catalogue");
    },
    onSuccess: () => {
      toast.success("Product added in catalogue successfully!");
    },
  });
  const { mutate: removeItems, isPending: isRemovingItems } = useMutation({
    mutationFn: (productIds: Array<number | string>) =>
      removeItemFromCatalogue({
        product_ids: productIds,
        vendor_id: Number(params.vendorId),
      }),
    onError: () => {
      toast.error("Failed to remove products from catalogue");
    },
    onSuccess: () => {
      toast.success("Product removed from catalogue successfully!");
    },
  });

  const vendorInfo = useMemo(
    () => ({
      name: vendor?.name,
      email: vendor?.email,
      phone: vendor?.phone,
      gstin: vendor?.gstin,
      pan: vendor?.pan,
      address: vendor?.address,
      contact_persons: vendor?.contact_persons ? vendor.contact_persons : [],
    }),
    [vendor]
  );

  const handleSave = () => {
    if (deletedProducts.length > 0) {
      //todo: check with currect catalogue
      const deletedProductsId = deletedProducts
        .filter((product) => product.productId)
        .map((product) => product?.productId || 0);
      removeItems(deletedProductsId);
    }
    if (addedProducts.length > 0) {
      const addedProductsId = addedProducts
        .filter((product) => product.productId)
        .map((product) => product?.productId || 0);
      addItems(addedProductsId);
    }
  };

  const product = () => {};

  return (
    <>
      <Header title="Vendor Details" description="" />
      <Container className="grid grid-cols-3 gap-5">
        {Object.keys(vendorInfo).map((key) => (
          <div className="flex items-center gap-1.5" key={key}>
            <p className="text-sm font-semibold capitalize">
              {key.replaceAll("_", " ")}:
            </p>
            <p className="text-sm font-extrabold text-primary">
              {key === "contact_persons"
                ? `${vendorInfo?.contact_persons?.[0]?.first_name} ${vendorInfo?.contact_persons?.[0]?.last_name}`
                : vendorInfo[key as "address"] || "NA"}
            </p>
          </div>
        ))}
      </Container>
      <Container className="flex flex-col gap-4 ">
        <p className="text-2xl font-bold text-primary">Items:</p>
        <StockTable
          items={addedProducts}
          addItem={(product) => {
            setAddedProducts((prev) => [...prev, product]);
          }}
          deleteItem={(product) => {
            setAddedProducts((prev) =>
              prev.filter((item) => item.productId !== product.productId)
            );
            setDeletedProducts((prev) => [...prev, product]);
          }}
          headers={[
            { label: "Product ID", value: "productId" },
            { label: "Product Name", value: "productName" },
          ]}
        />
      </Container>

      <Container className="fixed bottom-0 left-[320px] right-0 shadow-inner flex rounded-none items-center justify-end gap-2">
        <Button variant={"secondary"} size={"lg"}>
          Cancel
        </Button>
        <Button
          onClick={() => {
            handleSave();
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

export default VendorDetailsPage;
