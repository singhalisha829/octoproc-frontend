"use client";
import { getClients, getWarehouses } from "@/api/enterprise";
import { stockIn } from "@/api/inventory";
import {
  getPurchaseOrder,
  getPurchaseOrders,
} from "@/api/purchaseRequest/purchaseOrder";
import MultipleFileUpload from "@/components/file-upload/MultipleFileUpload";
import Container from "@/components/globals/Container";
import Header from "@/components/globals/Header";
import StockTable from "@/components/StockPagesComponents/StockTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SelectWithLabel from "@/components/ui/SelectWithLabel";
import { Item, StockIn } from "@/interfaces/Stock";
import { transformSelectOptions } from "@/lib/utils";
import { enterpriseQueries } from "@/react-query/enterpriseQueries";
import { masterApiQuery } from "@/react-query/masterApiQueries";
import { purchaseOrderQueries } from "@/react-query/purchaseOrderQueries";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const HEADERS = ["Part ID", "Part Name", "Unit Price", "Quantity"];

const StockInPage = () => {
  const router = useRouter();
  const [stock, setStock] = useState<StockIn>({
    client_id: null,
    warehouse_id: null,
    delivery_challan_file_urls: [],
    delivery_tracking_number: "",
    request_context_id: null,
    request_context_type: "client",
    invoice_file_urls: [],
    remark: "",
    items: [],
  });

  // if po selected show the po quantity column.

  /**
   * 
   * {
  "warehouse_id": 7,
  "request_type": "stock-in",
  "request_context_type": "po",
  "request_context_id": "9",
  "remark": "",
  "delivery_tracking_number": "",
  "delivery_challan_number": "",
  "invoice_file_urls": [],
  "delivery_challan_file_urls": [],
  "items": [{
    "product_id": 1,
    "quantity": 8,
    "remark": ""
  }]
}
   */

  const { data: clients } = useQuery({
    queryKey: [enterpriseQueries.client.getClients.key],
    queryFn: getClients,
  });

  const { data: warehouses } = useQuery({
    queryKey: [enterpriseQueries.warehouse.getWarehouses.key, stock.client_id],
    queryFn: () =>
      getWarehouses({
        enterprise_client_id: stock.client_id,
      }),
    enabled: !!stock.client_id,
  });

  const { data: purchaseOrders } = useQuery({
    queryKey: [
      purchaseOrderQueries.getPurchaseOrders.key,
      stock.warehouse_id,
      stock.client_id,
    ],
    queryFn: () =>
      getPurchaseOrders({
        warehouse_id: stock.warehouse_id,
      }),
    enabled: !!stock.warehouse_id && !!stock.client_id,
  });

  const { data: purchaseOrderDetails } = useQuery({
    queryKey: [
      purchaseOrderQueries.getPurchaseOrder.key,
      stock.warehouse_id,
      stock.client_id,
      stock.request_context_id,
    ],
    queryFn: () => getPurchaseOrder(Number(stock.request_context_id)),
    enabled:
      !!stock.warehouse_id && !!stock.client_id && !!stock.request_context_id,
  });

  useEffect(() => {
    if (!purchaseOrderDetails) return;
    setStock((prev) => ({
      ...prev,
      items: purchaseOrderDetails?.items?.map((item) => ({
        productId: item?.product?.id,
        productName: item?.product?.name,
        quantity: item.quantity,
        unitPrice: item.unit_price,
        unit_symbol:item.product?.uom?.symbol ?? ''
      })),
    }));
  }, [purchaseOrderDetails]);

  const addItem = (item: Item) => {
    setStock((prev) => ({ ...prev, items: [...prev.items, item] }));
  };

  const deleteItem = (item: Item) => {
    setStock((prev) => ({
      ...prev,
      items: prev.items.filter((i) => i.productId !== item.productId),
    }));
  };

  const { mutate, isPending: isStockingIn } = useMutation({
    mutationFn: stockIn,
    onSuccess: () => {
      toast.success("Stock in successfully");
      router.push("/inventory")
    },
    onError: () => {
      toast.error("Failed to stock in");
    },
  });

  const stockInHandler = () => {
    const { request_context_id, items, ...rest } = stock;
    mutate({
      ...rest,
      items: items.map((item) => ({
        product_id: item.productId,
        quantity: item.quantity,
        remark: "",
      })),
      request_type: "stock-in",
      request_context_id: String(request_context_id),
    });
  };

  return (
    <>
      <Header title="Stock In" description="Add New Parts to Stock" />
      <Container className="grid gap-4">
        <p className="text-lg font-semibold">Your Stock in Items</p>
        <div className="grid grid-cols-4 gap-5">
          <SelectWithLabel
            labelClassName="font-semibold text-gray-700"
            value={stock.client_id || ""}
            onSelect={(option) => {
              setStock((prev) => ({
                ...prev,
                client_id: option ? Number(option.value) : null,
                warehouse_id: null,
                request_context_id: null,
              }));
            }}
            id={"client"}
            className="max-w-full"
            labelText={"Client"}
            searchPlaceholder={`Search Client`}
            placeholder={"Select Client"}
            options={transformSelectOptions(clients, "id", "name") || []}
            emptyLabel={`No Client found`}
            valueKey="value"
            labelKey="label"
          />

          <SelectWithLabel
            labelClassName="font-semibold text-gray-700"
            id={"warehouse"}
            className="max-w-full"
            labelText={"Warehouse"}
            searchPlaceholder={`Search Warehouse`}
            placeholder={"Select Warehouse"}
            emptyLabel={`No Warehouse found`}
            options={transformSelectOptions(warehouses, "id", "name") || []}
            labelKey="label"
            valueKey="value"
            onSelect={(option) => {
              setStock((prev) => ({
                ...prev,
                warehouse_id: option ? Number(option.value) : undefined,
                request_context_id: null,
              }));
            }}
            value={stock.warehouse_id}
          />
          <SelectWithLabel
            labelClassName="font-semibold text-gray-700"
            id={"po"}
            className="max-w-full"
            labelText={"Purchase Order (PO)"}
            searchPlaceholder={`Search PO`}
            placeholder={"Select Purchase Order"}
            emptyLabel={`No Purchase Order found`}
            options={
              transformSelectOptions(purchaseOrders, "id", "reference_no") || []
            }
            labelKey="label"
            valueKey="value"
            onSelect={(option) => {
              setStock((prev) => ({
                ...prev,
                request_context_id: option ? Number(option.value) : null,
                request_context_type: option ? "po" : "client",
              }));
            }}
            value={stock.request_context_id}
          />

          <div className="grid gap-1.5">
            <Label
              htmlFor="delivery_tracking_number"
              className="font-semibold text-gray-700"
            >
              Delivery Tracking Number:
            </Label>
            <Input
              value={stock.delivery_tracking_number}
              onChange={(e) =>
                setStock((prev) => ({
                  ...prev,
                  delivery_tracking_number: e.target.value,
                }))
              }
              id="delivery_tracking_number"
              placeholder="Enter Delivery Tracking Number"
            />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="remark" className="font-semibold text-gray-700">
              Remark:
            </Label>
            <Input
              value={stock.remark}
              onChange={(e) =>
                setStock((prev) => ({ ...prev, remark: e.target.value }))
              }
              id="remark"
              placeholder="Enter Remark"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="grid gap-1.5">
            <Label
              htmlFor="delivery_challan_file_urls"
              className="font-semibold text-gray-700"
            >
              Delivery Challan:
            </Label>
            <MultipleFileUpload
              id={"delivery_challan_file_urls"}
              contextId={
                stock.request_context_id
                  ? String(stock.request_context_id)
                  : String(stock.client_id)
              }
              contextType={stock.request_context_type}
              endpoint={masterApiQuery.file.uploadFle.endpoint}
            />
          </div>
          <div className="grid gap-1.5">
            <Label
              htmlFor="invoice_file_urls"
              className="font-semibold text-gray-700"
            >
              Invoice Files:
            </Label>
            <MultipleFileUpload
              id={"invoice_file_urls"}
              contextId={String(stock.request_context_id)}
              contextType={stock.request_context_type}
              endpoint={masterApiQuery.file.uploadFle.endpoint}
            />
          </div>
        </div>
        <StockTable
          items={stock.items}
          addItem={addItem}
          deleteItem={deleteItem}
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
          onClick={() => {
            stockInHandler();
          }}
          size={"lg"}
          variant={"tertiary"}
          isLoading={isStockingIn}
        >
          Save
        </Button>
      </Container>
    </>
  );
};

export default StockInPage;
