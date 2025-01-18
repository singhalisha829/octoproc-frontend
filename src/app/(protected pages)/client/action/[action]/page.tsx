"use client";
import { addClient, getClient, updateClient } from "@/api/enterprise";
import {
  getCitites,
  getCountriesList,
  getStates,
} from "@/api/masterdata/common";
import AddContantPersonModal from "@/components/clientPageComponents/AddContantPersonModal";
import AddWarehouseModel from "@/components/clientPageComponents/AddWarehouseModel";
import Header from "@/components/globals/Header";
import { Button } from "@/components/ui/button";
import InputLabelGroup from "@/components/ui/InputLabelGroup";
import SelectWithLabel from "@/components/ui/SelectWithLabel";
import { ClientDetails, Warehouse } from "@/interfaces/Client";
import { ContactPerson } from "@/interfaces/Vendors";
import { transformSelectOptions } from "@/lib/utils";
import { enterpriseQueries } from "@/react-query/enterpriseQueries";
import { CONTACT_PERSON_INPUTS } from "@/utils/constants";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { useParams, useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

const WAREHOUSE_INPUTS = [
  {
    key: "name",
    name: "Name",
    id: "warehouseName",
    type: "input",
    inputType: "text",
    placeholder: "Name",
  },
  {
    key: "address",
    name: "Address",
    id: "address",
    type: "input",
    inputType: "text",
    placeholder: "Address",
  },
  {
    key: "code",
    name: "Code",
    id: "code",
    type: "input",
    inputType: "text",
    placeholder: "DEL",
  },
  {
    key: "country_id",
    name: "Country",
    id: "country",
    type: "dropdown",
    options: [],
    inputType: "select",
    placeholder: "Country",
  },
  {
    key: "state_id",
    name: "State",
    id: "state",
    type: "dropdown",
    options: [],
    inputType: "select",
    placeholder: "State",
  },
  {
    key: "city_id",
    name: "City",
    id: "city",
    type: "dropdown",
    options: [],
    inputType: "select",
    placeholder: "City",
  },
];

const INITIAL_CLIENT_DETAILS = {
  name: "",
  // code: "",
  address_line_1: "",
  address_line_2: "",
  city_id: null,
  state_id: null,
  country_id: null,
  pincode: "",
  pan_number: "",
  gst_number: "",
};

const AddOrEditClient = () => {
  const { action } = useParams<{
    action: string;
  }>();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [clientDetails, setClientDetails] = useState<ClientDetails>(
    INITIAL_CLIENT_DETAILS
  );
  const [contactPersons, setContactPersons] = useState<Array<ContactPerson>>(
    []
  );
  const [warehouses, setWarehouses] = useState<Array<Warehouse>>([]);

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

  const { data: client, isLoading } = useQuery({
    queryKey: [enterpriseQueries.client.getClient.key],
    queryFn: () => getClient(id as string),
    enabled: !!id,
  });

  // Separate mutations for add and edit
  const addClientMutation = useMutation({
    mutationFn: addClient,
    onSuccess: () => {
      toast.success("Client added successfully!");
      setClientDetails(INITIAL_CLIENT_DETAILS);
      setContactPersons([]);
    },
    onError: () => {
      toast.error("Failed to add client!");
    },
  });

  const editClientMutation = useMutation({
    mutationFn: updateClient,
    onSuccess: () => {
      toast.success("Client updated successfully!");
    },
    onError: () => {
      toast.error("Failed to update client!");
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

      // {
      //   key: "code",
      //   name: "Code",
      //   id: "code",
      //   type: "input",
      //   inputType: "text",
      //   placeholder: "Code",
      // },
      {
        key: "address_line_1",
        name: "Address Line 1",
        id: "address_line_1",
        type: "input",
        inputType: "text",
        placeholder: "Address Line 1",
      },
      {
        key: "address_line_2",
        name: "Address Line 2",
        id: "address",
        type: "input",
        inputType: "text",
        placeholder: "Address Line 2",
      },
      {
        key: "country_id",
        name: "Country",
        id: "country",
        type: "dropdown",
        options: transformSelectOptions(countries, "id", "name"),
        inputType: "select",
        placeholder: "Country",
      },
      {
        key: "state_id",
        name: "State",
        id: "state",
        type: "dropdown",
        options: transformSelectOptions(states, "id", "name"),
        inputType: "select",
        placeholder: "State",
      },
      {
        key: "city_id",
        name: "City",
        id: "city",
        type: "dropdown",
        options: transformSelectOptions(cities, "id", "name"),
        inputType: "select",
        placeholder: "City",
      },
      {
        key: "pincode",
        name: "Pin Code",
        id: "pincode-client",
        type: "input",
        inputType: "text",
        placeholder: "110084",
      },
      {
        key: "gst_number",
        name: "GST No.",
        id: "gst_number",
        type: "input",
        inputType: "text",
        placeholder: "1234567898765",
      },
      {
        key: "pan_number",
        name: "PAN No.",
        id: "pan_number",
        type: "input",
        inputType: "text",
        placeholder: "FWEPXXXRV",
      },
    ],
    [cities, states, countries]
  );

  useEffect(() => {
    if (!client) return;
    const {
      id: _,
      contact_persons,
      name,
      address_line_1,
      address_line_2,
      city_id,
      code,
      country_id,
      gst_number,
      pan_number,
      pincode,
      state_id,
    } = client?.client;
    setClientDetails((prev) => ({
      ...prev,
      address_line_1,
      address_line_2,
      city_id,
      code,
      country_id,
      gst_number,
      pan_number,
      pincode,
      name,
      state_id,
      contact_persons,
    }));
    setContactPersons(client.contact_persons);
    setWarehouses(client.warehouses);
  }, [client, id]);

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const submissionData = {
      ...clientDetails,
    };

    if (action === "edit" && id) {
      editClientMutation.mutate({
        id: +id,
        ...submissionData,
      });
    } else {
      addClientMutation.mutate({
        ...submissionData,
        contact_persons: contactPersons,
      });
    }
  };

  const isEditMode = action === "edit" && !!id;
  const isPending = addClientMutation.isPending || editClientMutation.isPending;

  return (
    <>
      <Header title="Add Client" description="" />
      <form
        className=" grid gap-5 bg-white rounded-md p-5 shadow-lg"
        onSubmit={submitHandler}
      >
        <p className="text-xl leading-8 font-bold text-primary underline">
          Client Details
        </p>
        <div className="grid grid-cols-3 gap-4">
          {INPUTS.map(
            ({ id, name, type, inputType, placeholder, options, key }) => {
              if (type === "input") {
                return (
                  <InputLabelGroup
                    value={clientDetails[key as "name"] || ""}
                    onChange={(e) => {
                      setClientDetails((prev) => ({
                        ...prev,
                        [key]: e.target.value,
                      }));
                    }}
                    key={id}
                    id={id}
                    labelText={name}
                    type={inputType}
                    placeholder={placeholder}
                    disabled={action === "view"}
                  />
                );
              }
              if (type === "dropdown") {
                return (
                  <SelectWithLabel
                    value={clientDetails[key as "name"] || ""}
                    onSelect={(option) => {
                      setClientDetails((prev) => ({
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
                    disabled={action === "view"}
                  />
                );
              }
            }
          )}
        </div>
        <div className="flex items-center justify-between">
          <p className="text-xl leading-8 font-bold text-primary underline">
            Contact Persons
          </p>
          {action !== "view" && (
            <AddContantPersonModal
              onSuccess={(person) => {
                setContactPersons((prev) => [...prev, person]);
              }}
            />
          )}
        </div>
        {contactPersons.length > 0 && (
          <div className="grid gap-4">
            {contactPersons.map((person, index) => (
              <div
                className="grid grid-cols-3 gap-3 p-4 border rounded-md relative"
                key={index}
              >
                <Button
                  type="button"
                  onClick={() => {
                    setContactPersons((prev) =>
                      prev.filter((cp) => cp.email !== person.email)
                    );
                  }}
                  variant={"destructive"}
                  size={"icon"}
                  className="absolute top-1 right-1"
                >
                  <Trash2 />
                </Button>
                {CONTACT_PERSON_INPUTS.map((input) => (
                  <div className="flex items-center gap-3" key={input.key}>
                    <p className=" font-semibold text-primary">{input.name}:</p>
                    <p className="font-medium">
                      {person[input.key as "email"]}
                    </p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
        {action !== "add" && !client?.client && (
          <>
            <div className="flex items-center justify-between">
              <p className="text-xl leading-8 font-bold text-primary underline">
                Warehouses
              </p>
              {action !== "view" && (
                <AddWarehouseModel
                  states={states}
                  cities={cities}
                  countries={countries}
                  onSuccess={(warehouse) => {
                    setWarehouses((prev) => [...prev, warehouse]);
                  }}
                />
              )}
            </div>

            {warehouses.length > 0 && (
              <div className="grid gap-4">
                {warehouses.map((warehouse, index) => (
                  <div
                    className="grid grid-cols-3 gap-3 p-4 border rounded-md relative"
                    key={index}
                  >
                    <Button
                      type="button"
                      onClick={() => {
                        setWarehouses((prev) =>
                          prev.filter(
                            (w) => w.warehouse_id !== warehouse.warehouse_id
                          )
                        );
                      }}
                      variant={"destructive"}
                      size={"icon"}
                      className="absolute top-1 right-1"
                    >
                      <Trash2 />
                    </Button>
                    {WAREHOUSE_INPUTS.map((input) => (
                      <div className="flex items-center gap-3" key={input.key}>
                        <p className=" font-semibold text-primary">
                          {input.name}:
                        </p>
                        <p className="font-medium">
                          {warehouse[input.key as "warehouse_id"]}
                        </p>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {action !== "view" && (
          <Button
            isLoading={isPending}
            type="submit"
            className="max-w-fit ml-auto"
            variant="tertiary"
          >
            {isEditMode ? "Update Client" : "Add Client"}
          </Button>
        )}
      </form>
    </>
  );
};

export default AddOrEditClient;
