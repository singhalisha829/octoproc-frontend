import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  CONTACT_PERSON_INPUTS,
  INITIAL_CONTACT_PERSON_DETAILS,
} from "@/utils/constants";
import { ContactPerson } from "@/interfaces/Vendors";
import InputLabelGroup from "@/components/ui/InputLabelGroup";
import { Warehouse } from "@/interfaces/Client";
import { useSearchParams } from "next/navigation";
import { transformSelectOptions } from "@/lib/utils";
import { City, Country, State } from "@/interfaces/common";
import SelectWithLabel from "../ui/SelectWithLabel";

type Props = {
  onSuccess?: (person: Warehouse) => void;
  states: State[];
  cities: City[];
  countries: Country[];
};

const AddWarehouseModel = ({ onSuccess, states, cities, countries }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [warehouseDetails, setWarehouseDetails] = useState<Warehouse>({
    name: "",
    address: "",
    code: "",
    city_id: null,
    state_id: null,
    country_id: null,
    enterprise_client_id: Number(id),
  });

  const INPUTS = useMemo(
    () => [
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
    ],
    [states, cities, countries]
  );

  const submitHandler = () => {
    if (onSuccess) {
      onSuccess(warehouseDetails);

      setIsOpen(false);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(change) => {
        setIsOpen(change);
      }}
    >
      <DialogTrigger asChild>
        <Button variant={"tertiary"}>Add Warehouse</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle className="text-2xl text-primary underline">
          Warehouse Details
        </DialogTitle>
        <div className="grid gap-3">
          {INPUTS.map(
            ({ id, name, type, inputType, placeholder, options, key }) => {
              if (type === "input") {
                return (
                  <InputLabelGroup
                    value={warehouseDetails[key as "name"]}
                    onChange={(e) => {
                      setWarehouseDetails((prev) => ({
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
                    value={warehouseDetails[key as "name"]}
                    onSelect={(option) => {
                      setWarehouseDetails((prev) => ({
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
          <div className="grid grid-cols-2 gap-4">
            <DialogClose asChild>
              <Button type="button" variant={"secondary"}>
                Cancel
              </Button>
            </DialogClose>
            <Button
              onClick={() => submitHandler()}
              type="button"
              // isLoading={isPending}
              variant={"tertiary"}
            >
              Add
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddWarehouseModel;
