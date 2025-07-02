"use client";

import React, { FC, InputHTMLAttributes } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IFieldItems } from "@/common/types";

interface InputWithLabelProps extends InputHTMLAttributes<HTMLInputElement> {
  items: IFieldItems;
}

const InputWithLabel: FC<InputWithLabelProps> = ({ items, ...rest }) => {
  return (
    <div className={"space-y-3"}>
      <Label className={"capitalize"} htmlFor={items.htmlfor}>
        {items.label} {items.compulsory && "*"}
      </Label>
      <Input
        required={items.compulsory}
        autoComplete={items.id}
        id={items.id}
        type={items.type?.trim()}
        placeholder={items.placeholder}
        {...rest}
      />
    </div>
  );
};

export default InputWithLabel;
