import { MergedVendorAssignment, PurchaseRequestItem, VendorAssignment } from "@/interfaces/PurchaseRequest";
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
    assignments: item?.assignments || [],
    id: item.id,
    assigned_quantity: item.assigned_quantity,
    unit_symbol: item.product.uom?.symbol
  }));
  if (formattedItems) return formattedItems;
  return [];
};

export const insertQoutationDetailsInVendorAssignment = (assignments: VendorAssignment[]): VendorAssignment[] => {
  if (!assignments || assignments.length === 0) return [];

  return assignments.map((assignment) => {
    const quotation = assignment.quotations?.[0]; // Get the first quotation for this assignment

    const itemsWithPrice = assignment.items.map((item) => {
      const matchedQuotationItem = quotation?.items.find(qItem => qItem.assignment_item_id === item.id);
      return {
        ...item,
        unit_price: matchedQuotationItem ? matchedQuotationItem.unit_price : undefined,
        tax_amount: matchedQuotationItem ? matchedQuotationItem.tax_amount : undefined,
        total_value: matchedQuotationItem ? matchedQuotationItem.net_amount : undefined,
        total_amount: matchedQuotationItem ? matchedQuotationItem.total_amount : undefined,
        tax_rate: matchedQuotationItem ? (matchedQuotationItem.tax_amount * 100)/matchedQuotationItem.net_amount : undefined,
      };
    });

    return {
      ...assignment,
      items: itemsWithPrice,
    };
  });
};



export const mergeVendorAssignmentWithQuotations = (
  vendorAssignment: VendorAssignment
): MergedVendorAssignment => {
  const mergedItems = vendorAssignment.items.map((item) => {
    // Find matching quotation item
    const matchingQuotation = vendorAssignment.quotations.find((quotation) =>
      quotation.items.some((qItem) => qItem.assignment_item_id === item.id)
    );

    return {
      ...item,
      quotation: matchingQuotation,
    };
  });

  return {
    ...vendorAssignment,
    items: mergedItems,
  };
};

export function formatEnumString(value: string): string {
  return value
    .toLowerCase()
    .replace(/_/g, ' ') // Replace underscores with spaces
    .replace(/\b\w/g, char => char.toUpperCase()); // Capitalize first letter of each word
}

export function dateFormat(dateStr: string) {  // Change 'String' to 'string'
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  
  if (!dateStr || dateStr.trim() === "") return ""; // Handle empty or whitespace-only strings

  const date = new Date(dateStr);  
  if (isNaN(date.getTime())) return ""; // Handle invalid date strings

  const day = date.getDate().toString().padStart(2, "0");
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear().toString();

  return `${day} ${month} ${year}`;
}
