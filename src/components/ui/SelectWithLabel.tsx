import {
  ControlledComboBox,
  ControlledComboBoxProps,
  Option,
} from "@/components/ui/ControlledComboBox";
import { Label } from "@/components/ui/label";

interface Props<TData> extends ControlledComboBoxProps<TData> {
  labelText?: string;
  id?: string;
}

export default function SelectWithLabel<TData extends Option[]>({
  labelText,
  id,
  ...rest
}: Props<TData>) {
  return (
    <div className="grid gap-2">
      {labelText && (
        <Label htmlFor={id}>
          {labelText} {<span className="text-red-500">*</span>}
        </Label>
      )}
      <ControlledComboBox {...rest} />
    </div>
  );
}
