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
    <div className={"grid w-full items-center gap-3"}>
      <div className="flex flex-row gap-2 items-center">
        <Label className={"capitalize text-sm"} htmlFor={items.htmlfor}>
          {items.label}
        </Label>
        {items.compulsory && <p className="text-danger">*</p>}
      </div>
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

export default React.memo(InputWithLabel);
