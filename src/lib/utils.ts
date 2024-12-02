import { PurchaseRequestItem } from "@/interfaces/PurchaseRequest";
import { Item } from "@/interfaces/Stock";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isEmail = (value: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
  if (emailRegex.test(value)) return true;
  return false;
};
export const isPhone = (value: string): boolean => {
  const phoneRegex = /^[6-9]\d{9}$/;
  if (phoneRegex.test(value)) return true;
  return false;
};

export function transformSelectOptions<
  TData extends { id?: string | number | undefined; name: string }[]
>(options: TData | undefined, key: string, label: string) {
  if (!options) return [];
  const formattedOptions = options?.map((option) => ({
    ...option,
    value: option[key as "id"],
    label: option[label as "name"],
  }));

  return formattedOptions;
}

export const formatItems = (items: PurchaseRequestItem[]): Item[] => {
  if (!items) return [];
  const formattedItems: Item[] = items.map((item) => ({
    quantity: item.quantity,
    unitPrice: 0,
    productId: item.product.id,
    productName: item.product.name,
    uom_id: item.product.uom_id,
  }));
  if (formattedItems) return formattedItems;
  return [];
};
