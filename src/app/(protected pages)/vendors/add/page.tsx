"use client";
import {
  getCitites,
  getCountriesList,
  getStates,
} from "@/api/masterdata/common";
import { addVendor } from "@/api/masterdata/vendor";
import Header from "@/components/globals/Header";
import { Button } from "@/components/ui/button";
import InputLabelGroup from "@/components/ui/InputLabelGroup";
import SelectWithLabel from "@/components/ui/SelectWithLabel";
import { ContactPerson } from "@/interfaces/Vendors";
import { transformSelectOptions } from "@/lib/utils";
import {
  CONTACT_PERSON_INPUTS,
  INITIAL_CONTACT_PERSON_DETAILS,
} from "@/utils/constants";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FormEvent, useMemo, useState } from "react";
import { toast } from "sonner";

const INITIAL_VENDOR_DETAILS = {
  bussinessName: "",
  contactPersonName: "",
  mobileNo: "",
  email: "",
  address: "",
  state: "",
  city: "",
  country: "",
  gstIn: "",
  pan: "",
};

const AddVendorPage = () => {
  const [vendorDetails, setVendorDetails] = useState(INITIAL_VENDOR_DETAILS);
  const [contactPersonDetails, setContactPersonDetails] =
    useState<ContactPerson>(INITIAL_CONTACT_PERSON_DETAILS);

  const { data: cities } = useQuery({
    queryKey: ["cities"],
    queryFn: getCitites,
  });
  const { data: countries } = useQuery({
    queryKey: ["country"],
    queryFn: getCountriesList,
  });
  const { data: states } = useQuery({
    queryKey: ["states"],
    queryFn: getStates,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: addVendor,
    onSuccess: () => {
      toast.success("Vendor added successfully!");
      setVendorDetails(INITIAL_VENDOR_DETAILS);
      setContactPersonDetails(INITIAL_CONTACT_PERSON_DETAILS);
    },
    onError: () => {
      toast.error("Failed to add vendor!");
    },
  });

  const INPUTS = useMemo(
    () => [
      {
        key: "bussinessName",
        name: "Bussiness Name",
        id: "business-name",
        type: "input",
        inputType: "text",
        placeholder: "Bussiness Name",
      },

      {
        key: "mobileNo",
        name: "Bussiness Mobile No.",
        id: "mobile",
        type: "input",
        inputType: "number",
        placeholder: "Mobile No.",
      },
      {
        key: "email",
        name: "Bussiness Email",
        id: "email",
        type: "input",
        inputType: "email",
        placeholder: "Email",
      },
      {
        key: "address",
        name: "Bussiness Address",
        id: "address",
        type: "input",
        inputType: "text",
        placeholder: "Address",
      },
      {
        key: "country",
        name: "Country",
        id: "country",
        type: "dropdown",
        options: transformSelectOptions(countries, "id", "name"),
        inputType: "select",
        placeholder: "Country",
      },
      {
        key: "state",
        name: "State",
        id: "state",
        type: "dropdown",
        options: transformSelectOptions(states, "id", "name"),
        inputType: "select",
        placeholder: "State",
      },
      {
        key: "city",
        name: "City",
        id: "city",
        type: "dropdown",
        options: transformSelectOptions(cities, "id", "name"),
        inputType: "select",
        placeholder: "City",
      },
      {
        key: "gstIn",
        name: "GST-IN",
        id: "gst-in",
        type: "input",
        inputType: "text",
        placeholder: "GST-IN",
      },
      {
        key: "pan",
        name: "PAN",
        id: "pan",
        type: "input",
        inputType: "text",
        placeholder: "PAN",
      },
    ],
    [cities, states, countries]
  );

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({
      name: vendorDetails.bussinessName,
      address: vendorDetails.address,
      city_id: Number(vendorDetails.city),
      state_id: Number(vendorDetails.state),
      country_id: Number(vendorDetails.country),
      pan: vendorDetails.pan,
      contact_persons: [contactPersonDetails],
      data: null,
      gstin: vendorDetails.gstIn,
      phone: vendorDetails.mobileNo,
      email: vendorDetails.email,
    });
  };

  return (
    <>
      <Header title="Add Vendor" description="" />
      <form
        className=" grid gap-5 bg-white rounded-md p-5 shadow-lg "
        onSubmit={submitHandler}
      >
        <p className="text-xl leading-8 font-bold text-primary underline">
          Vendor Details
        </p>
        <div className="grid grid-cols-3 gap-4">
          {INPUTS.map(
            ({ id, name, type, inputType, placeholder, options, key }) => {
              if (type === "input") {
                return (
                  <InputLabelGroup
                    value={vendorDetails[key as "bussinessName"]}
                    onChange={(e) => {
                      setVendorDetails((prev) => ({
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
                    value={vendorDetails[key as "bussinessName"]}
                    onSelect={(option) => {
                      setVendorDetails((prev) => ({
                        ...prev,
                        [key]: option ? option.value : "",
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
                  />
                );
              }
            }
          )}
        </div>
        <p className="text-xl leading-8 font-bold text-primary underline">
          Contact Person Details
        </p>
        <div className="grid grid-cols-3 gap-4">
          {CONTACT_PERSON_INPUTS.map(
            ({ id, name, type, inputType, placeholder, key }) => {
              if (type === "input") {
                return (
                  <InputLabelGroup
                    value={contactPersonDetails[key as keyof ContactPerson]}
                    onChange={(e) => {
                      setContactPersonDetails((prev) => ({
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
            }
          )}
        </div>

        <Button
          isLoading={isPending}
          type="submit"
          className="max-w-fit ml-auto"
        >
          Add Vendor
        </Button>
      </form>
    </>
  );
};

export default AddVendorPage;
