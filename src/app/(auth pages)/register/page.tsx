"use client";
import { register } from "@/api/auth";
import { Button } from "@/components/ui/button";
import InputLabelGroup from "@/components/ui/InputLabelGroup";
import { SelectSeparator } from "@/components/ui/select";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "@/data/constants";
import { RegisterInfo } from "@/interfaces/auth";
import { isEmail, isPhone } from "@/lib/utils";
import { LocalStorageService } from "@/services/LocalStorageService";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast } from "sonner";

// email: "",
//     phone: "",
//     password: "",
//     firstName: "",
//     lastName: "",

const registerFields = [
  {
    name: "email",
    type: "email",
    label: "Email",
  },
  {
    name: "phone",
    type: "text",
    label: "Mobile",
  },
  {
    name: "firstName",
    type: "text",
    label: "First Name",
  },
  {
    name: "lastName",
    type: "text",
    label: "Last Name",
  },
  {
    name: "password",
    type: "password",
    label: "Password",
  },
  {
    name: "confirmPassword",
    type: "password",
    label: "Confirm Password",
  },
];

const RegisterPage = () => {
  const router = useRouter();
  const [registerInfo, setRegisterInfo] = useState<RegisterInfo>({
    email: "",
    phone: "",
    password: "",
    firstName: "",
    lastName: "",
    confirmPassword: "",
  });
  const { mutate, isPending } = useMutation({
    mutationFn: register,
    onSuccess: ({ data }) => {
      console.log(data);
      LocalStorageService.set(ACCESS_TOKEN_KEY, data?.data?.access_token);
      LocalStorageService.set(REFRESH_TOKEN_KEY, data?.data?.refresh_token);
      toast.success("Registered Successfully!.");
      router.push("/");
    },
    onError: () => {
      toast.error("Failed to register!");
    },
  });
  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isPhoneValid = isPhone(registerInfo.phone);
    const isEmailValid = isEmail(registerInfo.email);

    if (!isEmailValid) return toast.error("Please enter valid email!");
    if (!isPhoneValid) return toast.error("Please enter valid mobile!");

    if (registerInfo.password !== registerInfo.confirmPassword) {
      return toast.error("Confirm password does not match password");
    }
    mutate(registerInfo);
    return null;
  };

  return (
    <div className="flex items-center justify-center h-full">
      <div className="flex flex-col border border-secondary gap-2.5 p-4 rounded shadow-lg w-full max-w-md">
        <div className="text-3xl font-bold leading-6 text-center text-primary">
          Register
        </div>

        <form onSubmit={submitHandler} className="flex flex-col gap-5 mt-5">
          {registerFields.map((field) => (
            <InputLabelGroup
              key={field.name}
              value={registerInfo[field.name as "email"]}
              onChange={(e) => {
                const { value } = e.target;
                setRegisterInfo((prev) => ({
                  ...prev,
                  [field.name]: value,
                }));
              }}
              labelText={field.label}
              id={field.name}
              required
            />
          ))}

          <SelectSeparator />
          <Button isLoading={isPending}>Register</Button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
