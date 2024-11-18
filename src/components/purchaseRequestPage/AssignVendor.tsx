import { Button } from "@/components/ui/button";
import { ComboBox } from "@/components/ui/ComboBox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { VENDORS } from "@/utils/constants";
import { CircleCheck } from "lucide-react";
import { useCallback, useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Vendor } from "@/interfaces/Stock";


type Props = {
  vendors: Array<Vendor>;
};

const AssignVendor = ({ vendors }: Props) => {
  const [assignedVendors, setAssignedVendors] = useState<Vendor[]>(vendors);
  const [vendorInfo, setVendorInfo] = useState({
    name: "",
    id: "",
    quantity: 0,
  });

  const onVendorSelect = useCallback((value: string, valueLabel: string) => {
    setVendorInfo((prev) => ({ ...prev, id: value, name: valueLabel }));
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" className="text-zinc-950 font-semibold">
          Assign Vendor
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

              <ComboBox
                searchPlaceholder="Search Vendor"
                placeholder="Select Vendor"
                options={VENDORS}
                emptyLabel="No vendor found"
                onSelect={onVendorSelect}
              />
            </div>

            <div className="grid gap-1.5">
              <Label asChild className="font-semibold text-gray-700">
                <p>Quantity:</p>
              </Label>
              <Input
                value={vendorInfo.quantity}
                onChange={(e) =>
                  setVendorInfo((prev) => ({
                    ...prev,
                    quantity: Number(e.target.value),
                  }))
                }
                placeholder="0"
                type="number"
              />
            </div>
            <div className="flex items-center gap-2 pt-5">
              <button
                className="bg-green-500 rounded-full hover:bg-green-600"
                onClick={(e) => {
                  e.stopPropagation();
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
          <Button className="mt-5" variant={"tertiary"} size={"lg"}>
            Submit
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AssignVendor;
