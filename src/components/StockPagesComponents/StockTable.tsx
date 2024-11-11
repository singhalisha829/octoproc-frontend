import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CircleCheck, Trash, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Item } from "@/interfaces/Stock";
import { ComboBox } from "../ui/ComboBox";
import { PARTS, UNITS } from "@/utils/constants";

const HEADERS = ["Part ID", "Part Name", "Unit Price", "Quantity"];

type Props = {
  items: Item[];
};

const StockTable = ({ items }: Props) => {
  return (
    <Table>
      <TableHeader>
        <TableRow className="grid grid-cols-5">
          {HEADERS.map((header) => (
            <TableHead
              className="flex items-center justify-center text-center"
              key={header}
            >
              {header}
            </TableHead>
          ))}
          <TableHead className="flex items-center justify-center text-center"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow className="grid grid-cols-5">
          <TableCell></TableCell>

          <TableCell className="flex items-center justify-center text-center">
            <ComboBox
              searchPlaceholder="Search Part ID/Name"
              emptyLabel="No part found"
              placeholder="Select Part ID/Name"
              options={PARTS}
            />
          </TableCell>

          <TableCell className="flex items-center justify-center text-center">
            <Input placeholder="0.00" type="number" className="max-w-[180px]" />
          </TableCell>

          <TableCell className="flex items-center justify-center text-center">
            <div className="flex items-center">
              <Input
                className="rounded-r-none max-w-20"
                id="Quantity"
                type="number"
                placeholder="0.00"
              />
              <ComboBox
                className="rounded-l-none border-l-0"
                searchPlaceholder="Search Unit"
                placeholder="Select Unit"
                options={UNITS}
                emptyLabel="No unit found"
              />
            </div>
          </TableCell>

          <TableCell className="flex gap-4 items-center justify-center text-center">
            <button
              className="bg-green-500 rounded-full hover:bg-green-600"
              onClick={(e) => e.stopPropagation()}
            >
              <CircleCheck color="white" size={30} />
            </button>
            <button
              className="bg-primary  rounded-full hover:bg-red-600 p-[2px]"
              onClick={(e) => e.stopPropagation()}
            >
              <X color="white" size={24} />
            </button>
          </TableCell>
        </TableRow>
        {items.map((item) => (
          <TableRow key={item.partId} className="grid grid-cols-5">
            <TableCell>{item.partId}</TableCell>

            <TableCell className="flex items-center justify-center text-center">
              {item?.partName}
            </TableCell>

            <TableCell className="flex items-center justify-center text-center">
              {item?.unitPrice}
            </TableCell>

            <TableCell className="flex items-center justify-center text-center">
              {String(item?.quantity)}
            </TableCell>

            <TableCell className="flex gap-4 items-center justify-center text-center">
              <button
                className="bg-primary rounded-full hover:bg-red-600 p-1.5"
                onClick={(e) => e.stopPropagation()}
              >
                <Trash color="white" size={20} />
              </button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default StockTable;
