"use client";
import {
  getVendorsAssignment,
  getVendorsAssignments,
  uploadQuotation,
} from "@/api/purchaseRequest";
import Container from "@/components/globals/Container";
import Header from "@/components/globals/Header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { purchaseRequestQueries } from "@/react-query/purchaseRequest";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const json = {
  pr_vendor_assignment_id: 1,
  file_url: "",
  additional_notes: "...",
  items: [
    {
      pr_vendor_assignment_item_id: 1,
      unit_price: 1,
      uom_id: 1,
      tax_rate: 18.0,
      additional_notes: "...",
    },
  ],
};

export interface QuotationInfo {
  pr_vendor_assignment_id: number;
  file_url: string;
  additional_notes: string;
  items: Array<{
    pr_vendor_assignment_item_id: number;
    unit_price: number;
    uom_id: number | null;
    tax_rate: number;
    additional_notes: string;
  }>;
}

const UploadQuotationPage = () => {
  const params = useParams<{
    id: string;
    assignmentId: string;
  }>();
  const router = useRouter();
  const [quotationInfo, setQuotationInfo] = useState<QuotationInfo>({
    pr_vendor_assignment_id: Number(params.assignmentId),
    file_url: "",
    additional_notes: "...",
    items: [
      {
        pr_vendor_assignment_item_id: 1,
        unit_price: 0,
        uom_id: null,
        tax_rate: 0,
        additional_notes: "...",
      },
    ],
  });

  const {
    data: vendorAssignment,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: [purchaseRequestQueries.purchaseRequest.getVendorsAssignment.key],
    queryFn: () => getVendorsAssignment(params.id, params.assignmentId),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: uploadQuotation,
    onSuccess: () => {
      toast.success("Quotation uploaded successfully");
      router.replace(`/purchase-request/${params.id}/view-vendors`);
    },
    onError: () => {
      toast.error("Failed to upload quotation");
    },
  });

  useEffect(() => {
    setQuotationInfo({
      pr_vendor_assignment_id: Number(params.assignmentId),
      file_url: "",
      additional_notes: "...",
      items:
        vendorAssignment?.items?.map((item) => ({
          pr_vendor_assignment_item_id: item.id,
          unit_price: 0,
          uom_id: item.purchase_request_item.product.uom_id,
          tax_rate: 0,
          additional_notes: "...",
        })) || [],
    });
  }, [vendorAssignment]);

  const handleChangeInput = (name: string, value: string, id: number) => {
    const itemIndex = quotationInfo.items.findIndex(
      (item) => item.pr_vendor_assignment_item_id === id
    );
    if (itemIndex < 0) return toast.error("Something went wrong. ");
    console.log(itemIndex);
    setQuotationInfo((prev) => {
      const updatedItems = [...prev.items];
      updatedItems[itemIndex] = { ...updatedItems[itemIndex], [name]: value };
      return { ...prev, items: updatedItems };
    });
  };

  if (isLoading || isFetching) return null;
  return (
    <>
      <Header title="Upload Quotation" description="" />

      <Container className="grid gap-4 ">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <p className="font-bold text-lg">
              {vendorAssignment?.vendor?.name}
            </p>
            <Badge variant={"tertiary"}>{vendorAssignment?.status}</Badge>
          </div>
          <div className="flex items-center gap-2">
            <Button variant={"tertiary"} asChild>
              <label className="cursor-pointer" htmlFor="file">
                Upload file
              </label>
            </Button>
            <input className="sr-only" type="file" id="file" />
          </div>
        </div>
        <Table className="rounded-md border">
          <TableHeader>
            <TableRow>
              <TableHead className="font-bold text-zinc-950 text-center">
                Product ID
              </TableHead>
              <TableHead className="font-bold text-zinc-950 text-center">
                Product Name
              </TableHead>
              <TableHead className="font-bold text-zinc-950 text-center">
                Quantity
              </TableHead>
              <TableHead className="font-bold text-zinc-950 text-center">
                Unit Price
              </TableHead>
              <TableHead className="font-bold text-zinc-950 text-center">
                GST Rate
              </TableHead>
              <TableHead className="font-bold text-zinc-950 text-center">
                Notes
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vendorAssignment?.items.map((item) => {
              const itemValues = quotationInfo.items.find(
                (it) => it.pr_vendor_assignment_item_id === item.id
              );
              return (
                <TableRow key={item.id}>
                  <TableCell className="text-center">
                    <Badge variant={"tertiary"}>
                      #{item.purchase_request_item.product.id}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    {item.purchase_request_item.product.name}
                  </TableCell>
                  <TableCell className="text-center">{item.quantity}</TableCell>
                  <TableCell className="">
                    <Input
                      value={itemValues?.unit_price || ""}
                      onChange={(e) => {
                        handleChangeInput(
                          "unit_price",
                          e.target.value,
                          item.id
                        );
                      }}
                      inputMode="numeric"
                      className="max-w-[100px] mx-auto"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      value={itemValues?.tax_rate || ""}
                      onChange={(e) => {
                        handleChangeInput("tax_rate", e.target.value, item.id);
                      }}
                      inputMode="numeric"
                      className="max-w-[100px] mx-auto"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      value={itemValues?.additional_notes || ""}
                      onChange={(e) => {
                        handleChangeInput(
                          "additional_notes",
                          e.target.value,
                          item.id
                        );
                      }}
                      className="max-w-xs mx-auto"
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Container>
      <Container className="fixed bottom-0 left-[320px] right-0 shadow-inner flex rounded-none items-center justify-end gap-2">
        <Button
          onClick={() => {
            router.back();
          }}
          variant={"secondary"}
          size={"lg"}
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            mutate(quotationInfo);
          }}
          size={"lg"}
          variant={"tertiary"}
          isLoading={isPending}
        >
          Upload Quotation
        </Button>
      </Container>
    </>
  );
};

export default UploadQuotationPage;
