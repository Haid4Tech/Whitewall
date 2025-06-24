"use client";

import React, { FC, InputHTMLAttributes } from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { IFieldItems } from "@/common/types";

interface TextAreaWithLabelProps
  extends InputHTMLAttributes<HTMLTextAreaElement> {
  items: IFieldItems;
}

const TextAreaComp: FC<TextAreaWithLabelProps> = ({ items, ...rest }) => {
  return (
    <div className={"grid w-full items-center gap-3"}>
      <Label htmlFor="imageUrl">Image URL</Label>
      <Textarea
        id={items.id}
        type={items.type?.trim()}
        placeholder={items.placeholder}
        required={items.compulsory}
        autoComplete={items.id}
        rows={items.row || 3}
        {...rest}
      />
    </div>
  );
};

export default TextAreaComp;
