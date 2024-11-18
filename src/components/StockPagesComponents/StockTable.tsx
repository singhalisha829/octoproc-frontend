//@ts-ignore
//@ts-nocheck
import React, { useState } from "react";
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
import { Badge } from "../ui/badge";

type Props = {
  items: Item[];
  headers?: Array<{ label: string; value: string }>;
  addItem?: (item: Item) => void;
  deleteItem?: (item: Item) => void;
};

const StockTable = ({
  items,
  headers = [
    { label: "Part ID", value: "partId" },
    { label: "Part Name", value: "partName" },
    { label: "Unit Price", value: "unitPrice" },
    { label: "Quantity", value: "quantity" },
  ],
  addItem = () => {},
  deleteItem = () => {},
}: Props) => {
  const [itemDetails, setItemDetails] = useState<Item>({
    partId: "",
    partName: "",
    quantity: 0,
    unitPrice: 0,
    quantityUnit: "",
  });

  return (
    <Table>
      <TableHeader>
        <TableRow
          className="grid "
          style={{
            gridTemplateColumns: `repeat(${headers.length + 1}, 1fr)`,
          }}
        >
          {headers.map((header) => (
            <TableHead
              className="flex items-center justify-center text-center"
              key={header.value}
            >
              {header.label}
            </TableHead>
          ))}
          <TableHead className="flex items-center justify-center text-center"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow
          className="grid"
          style={{
            gridTemplateColumns: `repeat(${headers.length + 1}, 1fr)`,
          }}
        >
          <TableCell className="flex items-center justify-center text-center">
            {itemDetails.partId && (
              <Badge variant={"tertiary"}>{itemDetails.partId}</Badge>
            )}
          </TableCell>

          <TableCell className="flex items-center justify-center text-center">
            <ComboBox
              searchPlaceholder="Search Part ID/Name"
              emptyLabel="No part found"
              placeholder="Select Part ID/Name"
              options={PARTS}
              onSelect={(value, valueLabel) => {
                setItemDetails((prev) => ({
                  ...prev,
                  partId: value,
                  partName: valueLabel,
                }));
              }}
            />
          </TableCell>

          {headers.find((header) => header.value === "unitPrice") && (
            <TableCell className="flex items-center justify-center text-center">
              <Input
                placeholder="0.00"
                type="number"
                className="max-w-[180px]"
                value={itemDetails.unitPrice}
                onChange={(e) =>
                  setItemDetails((prev) => ({
                    ...prev,
                    unitPrice: Number(e.target.value),
                  }))
                }
              />
            </TableCell>
          )}
          {headers.find((header) => header.value === "quantity") && (
            <TableCell className="flex items-center justify-center text-center">
              <div className="flex items-center">
                <Input
                  className="rounded-r-none max-w-20"
                  id="Quantity"
                  type="number"
                  placeholder="0.00"
                  value={itemDetails.quantity}
                  onChange={(e) =>
                    setItemDetails((prev) => ({
                      ...prev,
                      quantity: Number(e.target.value),
                    }))
                  }
                />
                <ComboBox
                  className="rounded-l-none border-l-0"
                  searchPlaceholder="Search Unit"
                  placeholder="Select Unit"
                  options={UNITS}
                  emptyLabel="No unit found"
                  onSelect={(value, valueLabel) => {
                    setItemDetails((prev) => ({
                      ...prev,
                      quantityUnit: value,
                    }));
                  }}
                />
              </div>
            </TableCell>
          )}

          <TableCell className="flex gap-4 items-center justify-center text-center">
            <button
              className="bg-green-500 rounded-full hover:bg-green-600"
              onClick={(e) => {
                e.stopPropagation();
                addItem(itemDetails);
                setItemDetails({
                  partId: "",
                  partName: "",
                  quantity: 0,
                  unitPrice: 0,
                  quantityUnit: "",
                });
              }}
            >
              <CircleCheck color="white" size={30} />
            </button>
            <button
              className="bg-primary  rounded-full hover:bg-red-600 p-[2px]"
              onClick={(e) => {
                e.stopPropagation();
                setItemDetails({
                  partId: "",
                  partName: "",
                  quantity: 0,
                  unitPrice: 0,
                  quantityUnit: "",
                });
              }}
            >
              <X color="white" size={24} />
            </button>
          </TableCell>
        </TableRow>
        {items.map((item) => (
          <TableRow
            key={item.partId}
            className="grid"
            style={{
              gridTemplateColumns: `repeat(${headers.length + 1}, 1fr)`,
            }}
          >
            {headers.map((header) => (
              <TableCell
                key={header.value}
                className="flex items-center justify-center text-center"
              >
                {item[header.value as keyof Item] ?? ""}{" "}
                {header.value === "quantity" && item.quantityUnit}
              </TableCell>
            ))}

            <TableCell className="flex gap-4 items-center justify-center text-center">
              <button
                className="bg-primary rounded-full hover:bg-red-600 p-1.5"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteItem(item);
                }}
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
