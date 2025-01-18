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
import { useMutation } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { DatePicker } from "../ui/DatePicker";

type Props = {
  onSuccess?: (po: GeneratePurchaseOrderDetails) => void;
  vendorQuotationId: number;
  items?: QuotationItem[];
};

const GeneratePoModal = ({ onSuccess, vendorQuotationId, items }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [poDetails, setPoDetails] = useState<GeneratePurchaseOrderDetails>({
    vendor_quotation_id: vendorQuotationId,
    expected_delivery_date: "",
    shipping_address: "",
    billing_address: "",
    shipping_cost: 0.0,
    payment_terms: "",
    notes: "",
  });

  const { mutate, isPending } = useMutation({
    mutationFn: createPurchaseOrder,
    onSuccess: (response) => {
      if (onSuccess) {
        onSuccess(response.data);
        setIsOpen(false);
      }
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
        key: "shipping_address",
        name: "Shipping Address",
        id: "shippingAddress",
        type: "input",
        inputType: "text",
        placeholder: "Enter shipping address",
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
    []
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
      onOpenChange={(change) => {
        setIsOpen(change);
      }}
    >
      <DialogTrigger asChild>
        <Button variant={"tertiary"}>Create Purchase Order</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle className="text-2xl text-primary underline">
          Purchase Order Details
        </DialogTitle>
        <div className="grid gap-3">
          {INPUTS.map(({ id, name, type, inputType, placeholder, key }) => {
            if (inputType === "date") {
              return (
                <DatePicker
                  key={id}
                  onChange={(value) =>
                    setPoDetails((prev) => ({
                      ...prev,
                      expected_delivery_date: value,
                    }))
                  }
                  value={new Date(poDetails.expected_delivery_date)}
                />
              );
            }
            return (
              <InputLabelGroup
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
          })}
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
