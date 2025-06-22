import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import InputWithLabel from "@/components/general/input-field";
import DropdownSelect from "@/components/general/select-comp";

interface PropertyEditDialogProps {
  isOpen: boolean;
  onClose: () => void;
  property: {
    id: string;
    title: string;
    price: number;
    location: string;
    bedrooms: number;
    bathrooms: number;
    area: number;
    status: "Available" | "Rented" | "Maintenance";
    imageUrl: string;
    monthlyRevenue?: number;
  };
  onSave: (updatedProperty: any) => void;
}

export const PropertyEditDialog = ({
  isOpen,
  onClose,
  property,
  onSave,
}: PropertyEditDialogProps) => {
  const [formData, setFormData] = useState({
    title: property.title,
    price: property.price.toString(),
    location: property.location,
    bedrooms: property.bedrooms.toString(),
    bathrooms: property.bathrooms.toString(),
    area: property.area.toString(),
    status: property.status,
    imageUrl: property.imageUrl,
    monthlyRevenue: property.monthlyRevenue?.toString() || "",
  });

  console.log(formData.status);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const updatedProperty = {
      ...property,
      title: formData.title,
      price: parseFloat(formData.price),
      location: formData.location,
      bedrooms: parseInt(formData.bedrooms),
      bathrooms: parseInt(formData.bathrooms),
      area: parseInt(formData.area),
      status: formData.status as "Available" | "Rented" | "Maintenance",
      imageUrl: formData.imageUrl,
      monthlyRevenue: formData.monthlyRevenue
        ? parseFloat(formData.monthlyRevenue)
        : undefined,
    };

    onSave(updatedProperty);
    onClose();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto p-5">
        <DialogHeader>
          <DialogTitle>Edit Property</DialogTitle>
        </DialogHeader>

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
              value={formData.status}
              handleChange={handleInputChange}
              items={["Available", "Rented", "Maintenance"]}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="monthlyRevenue">Monthly Revenue ($)</Label>
            <Input
              id="monthlyRevenue"
              type="number"
              min="0"
              value={formData.monthlyRevenue}
              onChange={(e) =>
                handleInputChange("monthlyRevenue", e.target.value)
              }
              placeholder="Optional"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="imageUrl">Image URL</Label>
            <Textarea
              id="imageUrl"
              value={formData.imageUrl}
              onChange={(e) => handleInputChange("imageUrl", e.target.value)}
              placeholder="Enter image URL"
              rows={2}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
