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
