import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  CONTACT_PERSON_INPUTS,
  INITIAL_CONTACT_PERSON_DETAILS,
} from "@/utils/constants";
import { ContactPerson } from "@/interfaces/Vendors";
import InputLabelGroup from "@/components/ui/InputLabelGroup";

type Props = {
  onSuccess?: (person: ContactPerson) => void;
};

const AddContantPersonModal = ({ onSuccess }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [contactPersonDetails, setContactPersonDetails] =
    useState<ContactPerson>(INITIAL_CONTACT_PERSON_DETAILS);

  const submitHandler = () => {
    if (onSuccess) {
      onSuccess(contactPersonDetails);
      setContactPersonDetails(INITIAL_CONTACT_PERSON_DETAILS);
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
        <Button variant={"tertiary"}>Add Person</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle className="text-2xl text-primary underline">
          Contact Person Details
        </DialogTitle>
        <div className="grid gap-3">
          {CONTACT_PERSON_INPUTS.map(
            ({ id, name, type, inputType, placeholder, key }) => {
              if (type === "input") {
                return (
                  <InputLabelGroup
                    required={true}
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

export default AddContantPersonModal;
