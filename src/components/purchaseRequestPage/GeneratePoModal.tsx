import { createPurchaseOrder } from "@/api/purchaseRequest/purchaseOrder";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import InputLabelGroup from "@/components/ui/InputLabelGroup";
import { GeneratePurchaseOrderDetails } from "@/interfaces/PurchaseOrder";
import { QuotationItem } from "@/interfaces/PurchaseRequest";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { DatePicker } from "../ui/DatePicker";
import { toast } from "sonner";
import { ControlledComboBox } from "../ui/ControlledComboBox";
import SelectWithLabel from "../ui/SelectWithLabel";
import { Label } from "../ui/label";
import { enterpriseQueries } from "@/react-query/enterpriseQueries";
import { getWarehouses } from "@/api/enterprise";
import { transformSelectOptions } from "@/lib/utils";

type Props = {
  onSuccess?: () => void;
  vendorQuotationId: number;
  items?: QuotationItem[];
  enterpriseId: number;
};

const GeneratePoModal = ({
  onSuccess,
  vendorQuotationId,
  items,
  enterpriseId,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [poDetails, setPoDetails] = useState<GeneratePurchaseOrderDetails>({
    vendor_quotation_id: vendorQuotationId,
    expected_delivery_date: "",
    warehouse_id: undefined,
    billing_address: "",
    shipping_cost: 0.0,
    payment_terms: "",
    notes: "",
  });

  const { data: warehouses } = useQuery({
    queryKey: [enterpriseQueries.warehouse.getWarehouses.key, enterpriseId],
    queryFn: () =>
      getWarehouses({
        enterprise_client_id: enterpriseId,
      }),
    enabled: !!enterpriseId,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: createPurchaseOrder,
    onSuccess: (response) => {
      if (onSuccess) {
        onSuccess();
      }

      setIsOpen(false);
      toast.success("Purchase Order create successfully");
    },
    onError: () => {
      toast.error("Failed to create purchase order");
    },
  });

  const INPUTS = useMemo(
    () => [
      {
        key: "expected_delivery_date",
        name: "Expected Delivery Date",
        id: "expectedDeliveryDate",
        type: "input",
        inputType: "date",
        placeholder: "Select date",
      },
      {
        key: "warehouse",
        name: "Warehouse",
        id: "warehouse",
        type: "dropdown",
        inputType: "select",
        placeholder: "Select Warehouse",
        options: transformSelectOptions(warehouses || [], "id", "name"),
      },
      {
        key: "billing_address",
        name: "Billing Address",
        id: "billingAddress",
        type: "input",
        inputType: "text",
        placeholder: "Enter billing address",
      },
      {
        key: "shipping_cost",
        name: "Shipping Cost",
        id: "shippingCost",
        type: "input",
        inputType: "number",
        placeholder: "0.00",
      },
      {
        key: "payment_terms",
        name: "Payment Terms",
        id: "paymentTerms",
        type: "input",
        inputType: "text",
        placeholder: "Enter payment terms",
      },
      {
        key: "notes",
        name: "Notes",
        id: "notes",
        type: "input",
        inputType: "textarea",
        placeholder: "Enter notes",
      },
    ],
    [warehouses]
  );

  const submitHandler = () => {
    mutate({
      ...poDetails,
      vendor_quotation_id: vendorQuotationId,
      items: (items || [])?.map((item) => ({
        quotation_item_id: item.id,
        notes: "",
      })),
    });
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        setIsOpen((prev) => !prev);
      }}
    >
      <DialogTrigger asChild className="mb-2">
        <Button variant={"tertiary"}>Create Purchase Order</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle className="text-2xl text-primary underline">
          Purchase Order Details
        </DialogTitle>
        <div className="grid gap-3">
          {INPUTS.map(
            ({ id, name, type, inputType, placeholder, key, options }) => {
              if (inputType === "select") {
                return (
                  <SelectWithLabel
                    key={id}
                    id={id}
                    className="max-w-full"
                    labelText={name}
                    searchPlaceholder={`Search ${name}`}
                    placeholder={placeholder}
                    emptyLabel={`No ${name} found`}
                    options={options || []}
                    labelKey="label"
                    valueKey="value"
                    onSelect={(option) => {
                      setPoDetails((prev) => ({
                        ...prev,
                        warehouse_id: option ? Number(option.value) : undefined,
                      }));
                    }}
                    value={poDetails.warehouse_id}
                  />
                );
              }
              if (inputType === "date") {
                return (
                  <div key={id} className="grid gap-2">
                    <Label htmlFor={id}>
                      {name}
                      <span className="text-red-500">*</span>
                    </Label>
                    <DatePicker
                      onChange={(value) =>
                        setPoDetails((prev) => ({
                          ...prev,
                          expected_delivery_date: value,
                        }))
                      }
                      value={new Date(poDetails.expected_delivery_date)}
                    />
                  </div>
                );
              }
              return (
                <InputLabelGroup
                  required
                  key={id}
                  value={poDetails[key as "notes"]}
                  onChange={(e) => {
                    setPoDetails((prev) => ({
                      ...prev,
                      [key]:
                        inputType === "number"
                          ? parseFloat(e.target.value) || 0
                          : e.target.value,
                    }));
                  }}
                  id={id}
                  labelText={name}
                  type={inputType}
                  placeholder={placeholder}
                />
              );
            }
          )}
          <div className="grid grid-cols-2 gap-4">
            <DialogClose asChild>
              <Button type="button" variant={"secondary"}>
                Cancel
              </Button>
            </DialogClose>
            <Button
              onClick={submitHandler}
              type="button"
              isLoading={isPending}
              variant={"tertiary"}
            >
              Create
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GeneratePoModal;
