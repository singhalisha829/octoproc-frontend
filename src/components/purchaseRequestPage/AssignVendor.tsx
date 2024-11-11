import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ComboBox } from "@/components/ui/ComboBox";
import { VENDORS } from "@/utils/constants";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { CircleCheck, X } from "lucide-react";

export type Vendor = {
  name: string;
  id: number;
};

type Props = {
  vendors: Array<Vendor>;
};

const AssignVendor = ({ vendors }: Props) => {
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
              />
            </div>

            <div className="grid gap-1.5">
              <Label asChild className="font-semibold text-gray-700">
                <p>Quantity:</p>
              </Label>
              <Input placeholder="0" type="number" />
            </div>
            <div className="flex items-center gap-2 pt-5">
              <button
                className="bg-green-500 rounded-full hover:bg-green-600"
                onClick={(e) => e.stopPropagation()}
              >
                <CircleCheck color="white" size={30} />
              </button>
            </div>
          </div>

          {vendors.map((vendor) => (
            <div
              className="flex items-center justify-between gap-1"
              key={vendor.id}
            ></div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AssignVendor;
