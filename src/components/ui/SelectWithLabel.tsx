import { Button } from "@/components/ui/button";
import {
  ControlledComboBox,
  ControlledComboBoxProps,
} from "@/components/ui/ControlledComboBox";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";

interface Props extends ControlledComboBoxProps {
  labelText: string;
  id?: string;
}

const SelectWithLabel = ({ labelText, id, ...rest }: Props) => {
  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>
        {labelText} {<span className="text-red-500">*</span>}
      </Label>
      <ControlledComboBox {...rest} />
    </div>
  );
};

export default SelectWithLabel;
