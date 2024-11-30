"use client";
import { Button } from "@/components/ui/button";
import InputLabelGroup from "@/components/ui/InputLabelGroup";
import { SelectSeparator } from "@/components/ui/select";
import { FormEvent } from "react";

const LoginPage = () => {
  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="flex items-center justify-center h-full">
      <div className="flex flex-col border border-secondary gap-2.5 p-4 rounded aspect-video shadow-lg">
        <div className="text-3xl font-bold leading-6 text-center text-primary">
          Login
        </div>

        <form onSubmit={submitHandler} className="flex flex-col gap-5 mt-5">
          <InputLabelGroup labelText="Mobile" id="mobile" required />
          <InputLabelGroup
            type="password"
            labelText="Password"
            id="password"
            required
          />
          <SelectSeparator />
          <Button>Login</Button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
