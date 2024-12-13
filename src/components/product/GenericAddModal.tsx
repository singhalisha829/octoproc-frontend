import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormEvent, useState } from "react";
import { toast } from "sonner";
import InputLabelGroup from "../ui/InputLabelGroup";
import { Button } from "../ui/button";
import { AxiosResponse } from "axios";
import { GenericModalData } from "@/api/masterdata";
import { masterApiQuery } from "@/react-query/masterApiQueries";

type Props = {
  name: string;
  title: string;
  mutationFn?: (info: {
    name: string;
    code: string;
  }) => Promise<AxiosResponse<any, any>>;
};

const GenericAddModal = ({ name, title, mutationFn }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [info, setInfo] = useState<GenericModalData>({
    name: "",
    code: "",
    description: "",
  });

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: mutationFn,
    onSuccess: () => {
      toast.success(`${name} added successfully!`);
      queryClient.invalidateQueries({
        queryKey: [masterApiQuery.class.getClasses.Key],
      });
      queryClient.invalidateQueries({
        queryKey: [masterApiQuery.family.getFamilies.Key],
      });
      queryClient.invalidateQueries({
        queryKey: [masterApiQuery.commodity.getCommodities.Key],
      });
      setIsOpen(false);
    },

    onError: () => {
      toast.error(`Failed to add ${name}!`);
    },
  });

  const submitHandler = () => {
    // e.preventDefault();
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
        <div className="grid gap-3">
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
            />
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
              isLoading={isPending}
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

export default GenericAddModal;
