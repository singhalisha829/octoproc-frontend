import {
  ControlledComboBox,
  ControlledComboBoxProps,
  Option,
} from "@/components/ui/ControlledComboBox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface Props<TData> extends ControlledComboBoxProps<TData> {
  labelText?: string;
  id?: string;
  labelClassName?: string;
}

export default function SelectWithLabel<TData extends Option[]>({
  labelText,
  id,
  labelClassName,
  ...rest
}: Props<TData>) {
  return (
    <div className="grid gap-2">
      {labelText && (
        <Label
          htmlFor={id}
          className={cn("", labelClassName && labelClassName)}
        >
          {labelText} {<span className="text-red-500">*</span>}
        </Label>
      )}
      <ControlledComboBox {...rest} />
    </div>
  );
}
