import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { HTMLAttributes, useState } from "react";

interface Props extends HTMLAttributes<HTMLInputElement> {
  labelText: string;
  required?: boolean;
  value?: string | number;
  type?: string;
  icon?: JSX.Element;
}

const InputLabelGroup = ({
  labelText,
  id,
  required,
  onChange,
  value,
  type = "text",
  icon,
}: Props) => {
  const [isShowingPassword, setIsShowingPassword] = useState(false);

  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>
        {labelText} {<span className="text-red-500">*</span>}
      </Label>
      <div className="relative">
        {icon && (
          <div className="absolute right-1 top-1/2 -translate-y-1/2">
            {icon}
          </div>
        )}

        {type === "password" && (
          <Button
            onClick={() => {
              setIsShowingPassword((prev) => !prev);
            }}
            type="button"
            size={"icon"}
            variant={"ghost"}
            className="absolute right-1 top-1/2 -translate-y-1/2 h-auto p-1"
          >
            {isShowingPassword ? <Eye /> : <EyeOff />}
          </Button>
        )}
        <Input
          required={required}
          type={type === "password" && isShowingPassword ? "text" : type}
          id={id}
          value={value}
          onChange={onChange}
          className="min-w-[400px]"
        />
      </div>
    </div>
  );
};

export default InputLabelGroup;
