"use client";

import { useState } from "react";
import InputWithLabel from "@/components/general/input-field";
import { Property } from "@/common/types";
import { initialProperties } from "@/common/initial-values";
import DropdownSelect from "@/components/general/select-comp";
import { Button } from "@/components/ui/button";
// import UploadImage from "@/components/general/upload-image";

const AddProperties = () => {
  const [formData, setFormData] = useState<Property>(initialProperties);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputWithLabel
            items={{
              htmlfor: "title",
              label: "Property Title",
              name: "title",
              type: "text",
              placeholder: "Property Title",
            }}
            onChange={(e) => handleInputChange("title", e.target.value)}
          />

          <InputWithLabel
            items={{
              htmlfor: "price",
              label: "Price ($)",
              name: "price",
              type: "number",
              placeholder: "Price ($)",
            }}
            onChange={(e) => handleInputChange("price", e.target.value)}
          />
        </div>

        <InputWithLabel
          items={{
            id: "location",
            htmlfor: "location",
            label: "Location",
            name: "location",
            type: "text",
            placeholder: "Location",
          }}
          onChange={(e) => handleInputChange("location", e.target.value)}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputWithLabel
            min="0"
            items={{
              id: "bedrooms",
              htmlfor: "bedrooms",
              label: "Bedrooms",
              name: "bedrooms",
              type: "number",
              placeholder: "Bedrooms",
            }}
            value={formData.bedrooms}
            onChange={(e) => handleInputChange("bedrooms", e.target.value)}
          />

          <InputWithLabel
            min="0"
            items={{
              id: "bathrooms",
              htmlfor: "bathrooms",
              label: "Bathrooms",
              name: "bathrooms",
              type: "number",
              placeholder: "Bathrooms",
            }}
            value={formData.bathrooms}
            onChange={(e) => handleInputChange("bedrooms", e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border border-red-400">
          <InputWithLabel
            min="0"
            items={{
              id: "area",
              htmlfor: "area",
              label: "Area (sq ft)",
              name: "area",
              type: "number",
              placeholder: "Area (sq ft)",
            }}
            value={formData.bathrooms}
            onChange={(e) => handleInputChange("area", e.target.value)}
          />

          <DropdownSelect
            name={"status"}
            label={"Status"}
            placeholder="Select Status"
            value={formData?.status ?? ""}
            handleChange={handleInputChange}
            items={["Available", "Rented", "Maintenance"]}
          />
        </div>

        <div className="space-y-2">
          <InputWithLabel
            min="0"
            items={{
              id: "monthlyRevenue",
              htmlfor: "monthlyRevenue",
              label: "Monthly Revenue ($)",
              name: "monthlyRevenue",
              type: "number",
              placeholder: "Enter Monthly Revenue ($)",
            }}
            value={formData.bathrooms}
            onChange={(e) =>
              handleInputChange("monthlyRevenue", e.target.value)
            }
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <p>Image URL</p>
          <input type="file" />
          {/* <Textarea
            id="imageUrl"
            value={formData.imageUrl}
            onChange={(e) => handleInputChange("imageUrl", e.target.value)}
            placeholder="Enter image URL"
            rows={2}
          /> */}
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </div>
  );
};

export default AddProperties;
