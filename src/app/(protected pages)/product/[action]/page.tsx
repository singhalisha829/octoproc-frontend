"use client";
import { addProduct } from "@/api/masterdata/product";
import {
  addManufacturer,
  getManufacturers,
} from "@/api/masterdata/product/manufacturer";
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
import { getUoms, getUomTypes } from "@/api/masterdata/product/uom";
import { addVendor } from "@/api/masterdata/vendor";
import Header from "@/components/globals/Header";
import GenericAddModal from "@/components/product/GenericAddModal";
import { Button } from "@/components/ui/button";
import InputLabelGroup from "@/components/ui/InputLabelGroup";
import SelectWithLabel from "@/components/ui/SelectWithLabel";
import { transformSelectOptions } from "@/lib/utils";
import { masterApiQuery } from "@/react-query/masterApiQueries";
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
  uomType: string | null;
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
    uomType: null,
  });

  const { data: manufacturers } = useQuery({
    queryKey: [masterApiQuery.manufacturer.getManufacturers.Key],
    queryFn: getManufacturers,
  });

  const { data: uomType } = useQuery({
    queryKey: [masterApiQuery.uom.getUomTypes.endpoint],
    queryFn: getUomTypes,
  });
  const { data: uoms } = useQuery({
    queryKey: [masterApiQuery.uom.getUoms.endpoint, productDetails.uomType],
    queryFn: () => getUoms(productDetails.uomType),
    enabled: !!productDetails.uomType,
  });

  const { data: segments } = useQuery({
    queryKey: [masterApiQuery.segment.getSegments.Key],
    queryFn: getSegments,
  });
  const { data: families } = useQuery({
    queryKey: [masterApiQuery.family.getFamilies.Key, productDetails.segment],
    queryFn: () =>
      getFamilies(productDetails?.segment ? [productDetails?.segment] : []),
    enabled: !!productDetails.segment,
  });
  const { data: classes } = useQuery({
    queryKey: [masterApiQuery.class.getClasses.Key, productDetails.family],
    queryFn: () =>
      getClasses(productDetails?.family ? [productDetails?.family] : []),
    enabled: !!productDetails.family,
  });
  const { data: commodities } = useQuery({
    queryKey: [
      masterApiQuery.commodity.getCommodities.Key,
      productDetails?.class,
    ],
    queryFn: () =>
      getCommodies(productDetails?.class ? [productDetails?.class] : []),
    enabled: !!productDetails?.class,
  });

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
        options: transformSelectOptions(manufacturers, "id", "name"),
        inputType: "select",
        placeholder: "Manufacturer",
        addNewCta: (
          <GenericAddModal
            name={"Manufacturer"}
            title={`Add Manufacturer`}
            mutationFn={addManufacturer}
          />
        ),
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
        key: "uomType",
        name: "UOM Type",
        id: "uom-type",
        type: "dropdown",
        options: transformSelectOptions(uomType, "name", "name"),
        inputType: "select",
        placeholder: "Weight",
      },
      {
        key: "uom_id",
        name: "UOM",
        id: "uom",
        type: "dropdown",
        options: transformSelectOptions(uoms, "id", "name"),
        inputType: "select",
        placeholder: "Weight",
      },
      {
        key: "segment",
        name: "Segment",
        id: "segment",
        type: "dropdown",
        options: transformSelectOptions(segments, "id", "name"),
        inputType: "select",
        placeholder: "Segment",
        addNewCta: (
          <GenericAddModal
            name={"Segment"}
            title={`Add Segment`}
            mutationFn={addSegment}
          />
        ),
      },
      {
        key: "family",
        name: "Family",
        id: "family",
        type: "dropdown",
        options: transformSelectOptions(families, "id", "name"),
        inputType: "select",
        placeholder: "Family",
        addNewCta: (
          <GenericAddModal
            name={"Family"}
            title={`Add Family`}
            mutationFn={(info) =>
              addFamily({ ...info, segment_id: Number(productDetails.segment) })
            }
          />
        ),
      },
      {
        key: "class",
        name: "Class",
        id: "class",
        type: "dropdown",
        options: transformSelectOptions(classes, "id", "name"),
        inputType: "select",
        placeholder: "class",
        addNewCta: (
          <GenericAddModal
            name={"Class"}
            title={`Add Class`}
            mutationFn={(info) =>
              addClass({ ...info, family_id: Number(productDetails.family) })
            }
          />
        ),
      },
      {
        key: "commodity",
        name: "Commodity",
        id: "commodity",
        type: "dropdown",
        options: transformSelectOptions(commodities, "id", "name"),
        inputType: "select",
        placeholder: "commodity",
        addNewCta: (
          <GenericAddModal
            name={"Commodity"}
            title={`Add Commodity`}
            mutationFn={(info) =>
              addCommodity({ ...info, class_id: Number(productDetails.class) })
            }
          />
        ),
      },
    ],
    [segments, commodities, classes, families, manufacturers, uomType, uoms]
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

    if (!manufacturer_id || !uom_id)
      return toast.error("Please fill all the fields.");
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
              addNewCta,
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
                      setProductDetails((prev) => ({
                        ...prev,
                        [key]: option ? option.value : "",
                        unspsc:
                          key === "commodity"
                            ? //@ts-ignore
                              option?.unspsc?.code
                            : prev.unspsc,
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
                    addNewCta={addNewCta}
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
