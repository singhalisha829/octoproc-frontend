"use client";
import { addProduct } from "@/api/masterdata/product";
import { addManufacturer } from "@/api/masterdata/product/manufacturer";
import {
  addClass,
  addCommodity,
  addFamily,
  addSegment,
  getClasses,
  getCommodies,
  getFamilies,
  getSegments,
} from "@/api/masterdata/product/unspsc";
import { addVendor } from "@/api/masterdata/vendor";
import Header from "@/components/globals/Header";
import GenericAddModal from "@/components/product/GenericAddModal";
import { Button } from "@/components/ui/button";
import InputLabelGroup from "@/components/ui/InputLabelGroup";
import SelectWithLabel from "@/components/ui/SelectWithLabel";
import { transformSelectOptions } from "@/lib/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FormEvent, useMemo, useState } from "react";
import { toast } from "sonner";

interface ProductDetails {
  name: string;
  description: string;
  unspsc: string;
  uom_id: number | null;
  hsn_code: string;
  manufacturer_id: null | number;
  manufacturer_sku_code: string;
  data: null | unknown;
  segment: null | number;
  family: null | number;
  class: null | number;
  commodity: null | number;
}

const AddOrEditProductPage = () => {
  const [productDetails, setProductDetails] = useState<ProductDetails>({
    name: "",
    description: "",
    unspsc: "",
    uom_id: null,
    hsn_code: "",
    manufacturer_id: null,
    manufacturer_sku_code: "",
    data: null,
    segment: null,
    family: null,
    class: null,
    commodity: null,
  });

  const { data: segments } = useQuery({
    queryKey: ["segments"],
    queryFn: getSegments,
  });
  const { data: families } = useQuery({
    queryKey: ["families", productDetails.segment],
    queryFn: () =>
      getFamilies(productDetails?.segment ? [productDetails?.segment] : []),
    enabled: !!productDetails.segment,
  });
  const { data: classes } = useQuery({
    queryKey: ["classes", productDetails.family],
    queryFn: () =>
      getClasses(productDetails?.family ? [productDetails?.family] : []),
    enabled: !!productDetails.family,
  });
  const { data: commodities } = useQuery({
    queryKey: ["commodities", productDetails?.class],
    queryFn: () =>
      getCommodies(productDetails?.class ? [productDetails?.class] : []),
    enabled: !!productDetails?.class,
  });

  console.log({ segments, classes, commodities, families });

  const { mutate, isPending } = useMutation({
    mutationFn: addProduct,
    onSuccess: (res) => {
      console.log(res);
      toast.success("Product added successfully!");
    },
    onError: () => {
      toast.error("Failed to add product!");
    },
  });

  /**
   
    segment: null,
    family: null,
    class: null,
    commodity: null,
   */

  const INPUTS = useMemo(
    () => [
      {
        key: "name",
        name: "Name",
        id: "name",
        type: "input",
        inputType: "text",
        placeholder: "Name",
      },

      {
        key: "description",
        name: "Description",
        id: "description",
        type: "input",
        inputType: "text",
        placeholder: "Description",
      },
      {
        key: "hsn_code",
        name: "HSN Code",
        id: "hsn_code",
        type: "input",
        inputType: "text",
        placeholder: "HSN Code",
      },
      {
        key: "manufacturer_id",
        name: "Manufacturer",
        id: "manufacturer_id",
        type: "dropdown",
        options: [],
        inputType: "select",
        placeholder: "Manufacturer",
        mutationFn: addManufacturer,
      },
      {
        key: "manufacturer_sku_code",
        name: "Manufacturer Sku Code",
        id: "manufacturer_sku_code",
        type: "input",
        inputType: "text",
        placeholder: "Manufacturer Sku Code",
      },

      {
        key: "segment",
        name: "Segment",
        id: "segment",
        type: "dropdown",
        options: transformSelectOptions(segments, "id", "name"),
        inputType: "select",
        placeholder: "Segment",
        mutationFn: addSegment,
      },
      {
        key: "family",
        name: "Family",
        id: "family",
        type: "dropdown",
        options: transformSelectOptions(families, "id", "name"),
        inputType: "select",
        placeholder: "Family",
        mutationFn: addFamily,
      },
      {
        key: "class",
        name: "Class",
        id: "class",
        type: "dropdown",
        options: transformSelectOptions(classes, "id", "name"),
        inputType: "select",
        placeholder: "class",
        mutationFn: addClass,
      },
      {
        key: "commodity",
        name: "Commodity",
        id: "commodity",
        type: "dropdown",
        options: transformSelectOptions(commodities, "id", "name"),
        inputType: "select",
        placeholder: "commodity",
        mutationFn: addCommodity,
      },
    ],
    [segments, commodities, classes, families]
  );

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const {
      hsn_code,
      manufacturer_id,
      manufacturer_sku_code,
      unspsc,
      uom_id,
      name,
      description,
      data,
    } = productDetails;

    if (!manufacturer_id || !uom_id) return;
    mutate({
      hsn_code,
      manufacturer_id,
      manufacturer_sku_code,
      unspsc,
      uom_id,
      name,
      description,
      data,
    });
  };

  return (
    <>
      <Header title="Add Product" description="" />
      <form
        className=" grid gap-5 bg-white rounded-md p-5 shadow-lg "
        onSubmit={submitHandler}
      >
        <p className="text-xl leading-8 font-bold text-primary underline">
          Product Details
        </p>
        <div className="grid grid-cols-3 gap-4">
          {INPUTS.map(
            ({
              id,
              name,
              type,
              inputType,
              placeholder,
              options,
              key,
              mutationFn,
            }) => {
              if (type === "input") {
                return (
                  <InputLabelGroup
                    value={productDetails[key as "name"]}
                    onChange={(e) => {
                      setProductDetails((prev) => ({
                        ...prev,
                        [key]: e.target.value,
                      }));
                    }}
                    key={id}
                    id={id}
                    labelText={name}
                    type={inputType}
                    placeholder={placeholder}
                  />
                );
              }
              if (type === "dropdown") {
                return (
                  <SelectWithLabel
                    value={productDetails[key as "name"]}
                    onSelect={(option) => {
                      console.log(option);
                      setProductDetails((prev) => ({
                        ...prev,
                        [key]: option ? option["id" as "value"] : "",
                      }));
                    }}
                    key={id}
                    id={id}
                    className="max-w-full"
                    labelText={name}
                    searchPlaceholder={`Search ${name}`}
                    placeholder={placeholder}
                    options={options || []}
                    emptyLabel={`No ${name} found`}
                    valueKey="value"
                    labelKey="label"
                    addNewCta={
                      <GenericAddModal
                        title={`Add ${name}`}
                        mutationFn={mutationFn}
                      />
                    }
                  />
                );
              }
            }
          )}
        </div>

        <Button
          isLoading={isPending}
          type="submit"
          className="max-w-fit ml-auto"
        >
          Add Product
        </Button>
      </form>
    </>
  );
};

export default AddOrEditProductPage;
