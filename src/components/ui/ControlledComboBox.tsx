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

export type Option = { value?: string | number | undefined; label: string };

export type ControlledComboBoxProps<TData> = {
  options: TData;
  placeholder: string;
  emptyLabel: string;
  searchPlaceholder: string;
  className?: string;
  onSelect: (selectedOption: Option | null) => void;
  value?: string | number | null;
  valueKey?: string;
  labelKey?: string;
  addNewCta?: JSX.Element;
};

const filter = (searchKeyWord: string, options: Array<Option>) => {
  if (!searchKeyWord) return options;
  return options.filter(
    (option) =>
      option.label.toLowerCase().includes(searchKeyWord.toLowerCase()) ||
      String(option.value).toLowerCase().includes(searchKeyWord.toLowerCase())
  );
};

export function ControlledComboBox<TData extends Option[]>({
  options,
  placeholder = "Select",
  emptyLabel = "No Options Found",
  searchPlaceholder = "Search...",
  className,
  onSelect = () => {},
  valueKey = "value",
  labelKey = "label",
  value,
  addNewCta,
}: ControlledComboBoxProps<TData>) {
  const [open, setOpen] = React.useState(false);
  const [searchKeyWord, setSearchKeyWord] = React.useState("");

  const filterredOptions = filter(searchKeyWord, options);

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
        <Command shouldFilter={false}>
          <CommandInput
            value={searchKeyWord}
            onValueChange={(e) => {
              console.log(
                e,
                options.filter(
                  (option) =>
                    option.label.toLowerCase().includes(e.toLowerCase()) ||
                    String(option.value).toLowerCase().includes(e.toLowerCase())
                )
              );

              setSearchKeyWord(e);
            }}
            placeholder={searchPlaceholder}
          />
          <CommandList>
            <CommandEmpty>{emptyLabel}</CommandEmpty>
            <CommandGroup>
              {filterredOptions.map((option) => (
                <CommandItem
                  key={option[valueKey as "value"]}
                  value={String(option[valueKey as "value"])}
                  onSelect={(currentValue) => {
                    value === Number(currentValue)
                      ? onSelect(null)
                      : onSelect(option);
                    setSearchKeyWord("");
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
              {addNewCta && addNewCta}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
