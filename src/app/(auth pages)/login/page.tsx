"use client";
import { login } from "@/api/auth";
import { Button } from "@/components/ui/button";
import InputLabelGroup from "@/components/ui/InputLabelGroup";
import { SelectSeparator } from "@/components/ui/select";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "@/data/constants";
import { LoginInfo } from "@/interfaces/auth";
import { isEmail, isPhone } from "@/lib/utils";
import { LocalStorageService } from "@/services/LocalStorageService";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast } from "sonner";

const LoginPage = () => {
  const router = useRouter();
  const [loginInfo, setLoginInfo] = useState<LoginInfo>({
    email: "",
    phone: "",
    password: "",
  });
  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess: ({ data }) => {
      LocalStorageService.set(ACCESS_TOKEN_KEY, data?.data?.access_token);
      LocalStorageService.set(REFRESH_TOKEN_KEY, data?.data?.refresh_token);
      toast.success("Login Successfully!.");
      router.push("/");
    },
    onError: () => {
      toast.error("Failed to login!");
    },
  });
  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isPhoneValid = isPhone(loginInfo.email);
    const isEmailValid = isEmail(loginInfo.email);

    if (isEmailValid || isPhoneValid) {
      if (isEmailValid) {
        mutate({
          password: loginInfo.password,
          email: loginInfo.email,
          phone: "",
        });
        return;
      }
      if (isPhoneValid) {
        mutate({
          password: loginInfo.password,
          email: "",
          phone: loginInfo.email,
        });
        return;
      }
    }
    return null;
  };

  return (
    <div className="flex items-center justify-center h-full">
      <div className="flex flex-col border border-secondary gap-2.5 p-4 rounded aspect-video shadow-lg">
        <div className="text-3xl font-bold leading-6 text-center text-primary">
          Login
        </div>

        <form onSubmit={submitHandler} className="flex flex-col gap-5 mt-5">
          <InputLabelGroup
            value={loginInfo.email}
            onChange={(e) => {
              const { value } = e.target;
              setLoginInfo((prev) => ({
                ...prev,
                email: value,
              }));
            }}
            labelText="Email / Mobile"
            id="mobile"
            required
          />
          <InputLabelGroup
            value={loginInfo.password}
            onChange={(e) =>
              setLoginInfo((prev) => ({ ...prev, password: e.target.value }))
            }
            type="password"
            labelText="Password"
            id="password"
            required
          />
          <SelectSeparator />
          <Button isLoading={isPending}>Login</Button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
