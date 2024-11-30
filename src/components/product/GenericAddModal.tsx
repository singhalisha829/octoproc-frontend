import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useMutation } from "@tanstack/react-query";
import { FormEvent, useState } from "react";
import { toast } from "sonner";
import InputLabelGroup from "../ui/InputLabelGroup";
import { Button } from "../ui/button";
import { AxiosResponse } from "axios";
import { GenericModalData } from "@/api/masterdata";

type Props = {
  title: string;
  mutationFn?: (info: {
    name: string;
    code: string;
  }) => Promise<AxiosResponse<any, any>>;
};

const GenericAddModal = ({ title, mutationFn }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [info, setInfo] = useState<GenericModalData>({
    name: "",
    code: "",
    description: "",
  });

  const { mutate, isPending } = useMutation({
    mutationFn: mutationFn,
    onSuccess: () => {
      toast.success("Manufacturer added successfully!");
      setIsOpen(false);
    },

    onError: () => {
      toast.error("Failed to add manufacturer!");
    },
  });

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(info);
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(change) => {
        setIsOpen(change);
      }}
    >
      <DialogTrigger asChild>
        <Button variant={"tertiary"} className="w-full">
          {title}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle className="text-2xl text-primary">{title}</DialogTitle>
        <form onSubmit={submitHandler} className="grid gap-3">
          <InputLabelGroup
            labelText="Name"
            value={info.name}
            onChange={(e) => {
              const { value } = e.target;
              setInfo((prev) => ({
                ...prev,
                name: value,
              }));
            }}
            id="name"
            required
          />
          <InputLabelGroup
            labelText="Code"
            value={info.code}
            onChange={(e) => {
              const { value } = e.target;
              setInfo((prev) => ({
                ...prev,
                code: value,
              }));
            }}
            id="code"
            required
          />
          {!title.includes("Manufacturer") && (
            <InputLabelGroup
              labelText="Description"
              value={info.description}
              onChange={(e) => {
                const { value } = e.target;
                setInfo((prev) => ({
                  ...prev,
                  description: value,
                }));
              }}
              id="Description"
              required
            />
          )}
          <div className="grid grid-cols-2 gap-4">
            <DialogClose asChild>
              <Button type="button" variant={"secondary"}>
                Cancel
              </Button>
            </DialogClose>
            <Button isLoading={isPending} variant={"tertiary"}>
              Add
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default GenericAddModal;
