import { getVendors } from "@/api/masterdata/vendor";
import { assignVendor } from "@/api/purchaseRequest";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AssignedVendorInItemwise, Item } from "@/interfaces/Stock";
import { transformSelectOptions } from "@/lib/utils";
import { masterApiQuery } from "@/react-query/masterApiQueries";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CircleCheck, Trash } from "lucide-react";
import { useParams } from "next/navigation";
import { useCallback, useMemo, useState, useEffect } from "react";
import { toast } from "sonner";
import { ControlledComboBox } from "../ui/ControlledComboBox";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { enterpriseQueries } from "@/react-query/enterpriseQueries";
import { purchaseRequestQueries } from "@/react-query/purchaseRequest";

type Props = {
  vendors: Array<AssignedVendorInItemwise>;
  maxQuantity: number;
  row: Item;
};

const AssignVendor = ({ vendors, maxQuantity, row }: Props) => {
  console.log('vendors', vendors);
  const params = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [assignedVendors, setAssignedVendors] = useState<
    AssignedVendorInItemwise[]
  >([]);
  const [vendorInfo, setVendorInfo] = useState<{
    name: string;
    id?: null | number;
    quantity: number | null;
  }>({
    name: "",
    id: null,
    quantity: 0,
  });
  const queryClient = useQueryClient();

  useEffect(() => {
    if (vendors && vendors.length > 0) {
      setAssignedVendors((prev) => {
        // Create a Map to store unique vendors by ID
        const mergedVendorsMap = new Map();
  
        // Add existing assigned vendors first
        prev.forEach((vendor) => mergedVendorsMap.set(vendor.id, vendor));
  
        // Add vendors from props (overwriting if ID already exists)
        vendors.forEach((vendor) => 
          mergedVendorsMap.set(vendor.vendor.id, {
            quantity: Number(vendor.quantity),
            vendor: {
              id: vendor.vendor.id,
              name: vendor.vendor.name,
            },
            id: vendor.vendor.id,
          })
        );
  
        // Convert Map back to array and set state
        return Array.from(mergedVendorsMap.values());
      });
    }
  }, [vendors]);
  
  const { mutate } = useMutation({
    mutationFn: assignVendor,
    onSuccess: () => {
      toast.success("Vendor assigned successfully");
      queryClient.invalidateQueries({
        queryKey: [
          purchaseRequestQueries.purchaseRequest.getItemWiseAssignedVendor.key,
        ],
      });
      queryClient.invalidateQueries({
        queryKey: [
          purchaseRequestQueries.purchaseRequest.getVendorsAssignments.key,
        ],
      });
      setAssignedVendors([]);
      setVendorInfo({
        name: "",
        id: null,
        quantity: 0,
      });
      setIsOpen(false);
    },
    onError: () => {
      toast.error("Failed to assign vendor");
    },
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
      purchase_request_item_id: Number(row.id),
      assignments: assignedVendors.map((vendor) => ({
        quantity: Number(vendor.quantity),
        vendor_id: Number(vendor.vendor.id),
        uom_id: row.uom_id,
      })),
    });
  };

  const vendorsOptions = useMemo(
    () => transformSelectOptions(vendorsList, "id", "name"),
    [vendorsList]
  );

  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen((prev) => !prev)}>
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
                  setAssignedVendors((prev) => {
                    const updatedVendors = prev.map((vendor) =>
                      vendor.id === vendorInfo.id
                        ? { ...vendor, quantity: vendor.quantity + Number(vendorInfo.quantity) }
                        : vendor
                    );
              
                    // Check if the vendor was updated, if not, add a new entry
                    const isExisting = prev.some((vendor) => vendor.id === vendorInfo.id);
                    return isExisting
                      ? updatedVendors
                      : [...updatedVendors, {
                          quantity: Number(vendorInfo.quantity),
                          vendor: { id: Number(vendorInfo.id), name: vendorInfo.name },
                          id: Number(vendorInfo.id),
                        }];
                  });

                  // Reset input fields
                  setVendorInfo({ name: "", id: null, quantity: 0 });
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
                  gridTemplateColumns: `3fr 3fr 1fr`,
                }}
              >
                <TableHead className="flex items-center ">Name</TableHead>
                <TableHead className="flex items-center ">Quantity</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assignedVendors.map((vendor) => (
                <TableRow
                  key={vendor.id}
                  className="grid"
                  style={{
                    gridTemplateColumns: `3fr 3fr 1fr`,
                  }}
                >
                  <TableCell className="flex items-center ">
                    {vendor.vendor.name}
                  </TableCell>
                  <TableCell className="flex items-center">
                    {vendor.quantity}
                  </TableCell>
                  <TableCell>
                  <button
                      className="bg-primary rounded-full hover:bg-red-600 p-1.5"
                      onClick={(e) => {
                        e.stopPropagation();
                        setAssignedVendors((prev) =>
                          prev.filter((v) => v.id !== vendor.id) // Remove the vendor by filtering
                        );
                      }}
              >
                <Trash color="white" size={20} />
              </button>
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
