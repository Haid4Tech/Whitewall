import { FC } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface IDropdownSelect {
  placeholder: string;
  name: string;
  value: string;
  handleChange: (status: string, value: string) => void;
  items: string[];
  label?: string;
}

const DropdownSelect: FC<IDropdownSelect> = ({
  placeholder,
  name,
  value,
  handleChange,
  items,
  label,
}) => {
  return (
    <div className="grid w-full items-center gap-2">
      {label && <Label htmlFor="status">{label}</Label>}
      <Select
        value={value}
        onValueChange={(value) => handleChange(name, value)}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {items.map((item, index) => (
            <SelectItem
              className="cursor-pointer w-full"
              key={index}
              value={item}
            >
              {item}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default DropdownSelect;
