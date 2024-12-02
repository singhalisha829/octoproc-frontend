"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export type ComboBoxProps = {
  options: Array<{ value: string; label: string }>;
  placeholder: string;
  emptyLabel: string;
  searchPlaceholder: string;
  className?: string;
  onSelect?: (value: string, valueLabel: string) => void;
  valueKey?: string;
  labelKey?: string;
};

export function ComboBox({
  options,
  placeholder = "Select",
  emptyLabel = "No Options Found",
  searchPlaceholder = "Search...",
  className,
  onSelect = () => {},
  valueKey = "value",
  labelKey = "label",
}: ComboBoxProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [valueLabel, setValueLabel] = React.useState("");

  React.useEffect(() => {
    onSelect(value, valueLabel);
  }, [value, valueLabel]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("max-w-[200px] justify-between", className)}
        >
          {value
            ? options.find((option) => option[valueKey as "value"] === value)?.[
                labelKey as "label"
              ]
            : placeholder}
          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full max-w-full p-0">
        <Command>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandList>
            <CommandEmpty>{emptyLabel}</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={`${option[valueLabel as "label"]}${
                    option[valueKey as "value"]
                  }`}
                  value={option[valueKey as "value"]}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setValueLabel(
                      currentValue === value ? "" : option[labelKey as "label"]
                    );
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === option[valueKey as "value"]
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {option[labelKey as "label"]}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
