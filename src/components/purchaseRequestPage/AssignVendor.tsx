import { Button } from "@/components/ui/button";
import { ComboBox } from "@/components/ui/ComboBox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { VENDORS } from "@/utils/constants";
import { CircleCheck } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Item, Vendor } from "@/interfaces/Stock";
import { useMutation, useQuery } from "@tanstack/react-query";
import { assignVendor } from "@/api/purchaseRequest";
import { useParams } from "next/navigation";
import { masterApiQuery } from "@/react-query/masterApiQueries";
import { getVendors } from "@/api/masterdata/vendor";
import { transformSelectOptions } from "@/lib/utils";
import { ControlledComboBox } from "../ui/ControlledComboBox";

type Props = {
  vendors: Array<Vendor>;
  maxQuantity: number;
  row: Item;
};

const AssignVendor = ({ vendors, maxQuantity, row }: Props) => {
  const params = useParams();
  const [assignedVendors, setAssignedVendors] = useState<Vendor[]>(vendors);
  const [vendorInfo, setVendorInfo] = useState<{
    name: string;
    id?: null | number;
    quantity: number | null;
  }>({
    name: "",
    id: null,
    quantity: 0,
  });

  const { mutate } = useMutation({
    mutationFn: assignVendor,
  });

  const { data: vendorsList, isLoading } = useQuery({
    queryKey: [masterApiQuery.vendor.getVendors.Key],
    queryFn: getVendors,
  });

  const onVendorSelect = useCallback(
    (value: number | undefined | null, valueLabel: string | undefined) => {
      if (!value || !valueLabel) {
        return;
      }
      console.log(value, valueLabel);
      setVendorInfo((prev) => ({
        ...prev,
        id: value,
        name: String(valueLabel),
      }));
    },
    []
  );

  const handleAssign = () => {
    if (!row.productId || !params.id) return;
    mutate({
      purchase_request_id: Number(params?.id),
      purchase_request_item_id: Number(row?.id),
      assignments: assignedVendors.map((vendor) => ({
        quantity: Number(vendor.quantity),
        vendor_id: Number(vendor.id),
        uom_id: row.uom_id,
      })),
    });
  };
  console.log(row);

  const vendorsOptions = useMemo(
    () => transformSelectOptions(vendorsList, "id", "name"),
    [vendorsList]
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" className="text-zinc-950 font-semibold">
          {vendors.length > 0 ? "Edit" : "Assign "} Vendor
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Assign Vendor</DialogTitle>
        </DialogHeader>
        <div className="grid gap-1.5 ">
          <div className="flex items-center justify-between gap-1">
            <div className="grid gap-1.5">
              <Label asChild className="font-semibold text-gray-700">
                <p>Vendor:</p>
              </Label>

              <ControlledComboBox
                searchPlaceholder="Search Vendor"
                placeholder="Select Vendor"
                options={vendorsOptions}
                emptyLabel="No vendor found"
                onSelect={(option) =>
                  onVendorSelect(Number(option?.value), option?.label)
                }
                value={vendorInfo.id}
              />
            </div>

            <div className="grid gap-1.5">
              <Label asChild className="font-semibold text-gray-700">
                <p>
                  Quantity (max:{" "}
                  {maxQuantity -
                    assignedVendors?.reduce(
                      (count, vendor) => count + Number(vendor.quantity || 0),
                      0
                    )}
                  ):
                </p>
              </Label>
              <Input
                maxLength={
                  maxQuantity -
                  assignedVendors?.reduce(
                    (count, vendor) => count + Number(vendor.quantity || 0),
                    0
                  )
                }
                value={String(vendorInfo.quantity)}
                onChange={(e) => {
                  if (Number(e.target.value) > maxQuantity) {
                    return toast.error(
                      `Please enter a value less than ${
                        maxQuantity -
                        assignedVendors?.reduce(
                          (count, vendor) =>
                            count + Number(vendor.quantity || 0),
                          0
                        )
                      }`
                    );
                  }
                  setVendorInfo((prev) => ({
                    ...prev,
                    quantity: Number(e.target.value),
                  }));
                }}
                placeholder="0"
                type="number"
              />
            </div>
            <div className="flex items-center gap-2 pt-5">
              <button
                className="bg-green-500 rounded-full hover:bg-green-600"
                onClick={(e) => {
                  e.stopPropagation();
                  if (!vendorInfo.id || !vendorInfo.name) {
                    return toast.error("Please choose vendor.");
                  }
                  if (!vendorInfo.quantity) {
                    return toast.error("Please enter quantity.");
                  }
                  setAssignedVendors((prev) => [...prev, vendorInfo]);
                }}
              >
                <CircleCheck color="white" size={30} />
              </button>
            </div>
          </div>

          <Table className="p-5">
            <TableHeader>
              <TableRow
                className="grid "
                style={{
                  gridTemplateColumns: `repeat(2, 1fr)`,
                }}
              >
                <TableHead className="flex items-center ">Name</TableHead>
                <TableHead className="flex items-center ">Quantity</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assignedVendors.map((vendor) => (
                <TableRow
                  key={vendor.id}
                  className="grid"
                  style={{
                    gridTemplateColumns: `repeat(2, 1fr)`,
                  }}
                >
                  <TableCell className="flex items-center ">
                    {vendor.name}
                  </TableCell>
                  <TableCell className="flex items-center">
                    {vendor.quantity}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Button
            onClick={() => {
              handleAssign();
            }}
            className="mt-5"
            variant={"tertiary"}
            size={"lg"}
          >
            Submit
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AssignVendor;
