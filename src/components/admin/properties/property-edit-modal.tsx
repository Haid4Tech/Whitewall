/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
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
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { SuccessToast } from "@/components/ui/success-toast";
import { ErrorToast } from "@/components/ui/error-toast";
import { updateProperty } from "@/firebase/properties";
import {
  uploadImagesToSpaces,
  deleteImageFromSpaces,
} from "@/lib/spaces-upload";
import DropdownSelect, {
  SearchableDropdown,
} from "@/components/general/select-comp";
import { Upload, X, Plus, Loader2, Trash2, Link } from "lucide-react";
import { formatNumberWithCommas, generateSlug } from "@/lib/utils";
import {
  ABUJA_LOCATIONS,
  COMMON_AMENITIES,
  CURRENCIES,
  PRICE_TYPES,
  PROPERTY_TYPES,
} from "@/lib/constants";
import { Property, PropertyFormData } from "@/common/types";

interface PropertyEditDialogProps {
  isOpen: boolean;
  onClose: () => void;
  property: Property;
  onSave: (updatedProperty: any) => void;
}

export const PropertyEditDialog = ({
  isOpen,
  onClose,
  property,
  onSave,
}: PropertyEditDialogProps) => {
  const [formData, setFormData] = useState<PropertyFormData>({
    title: property.title,
    location: property.location,
    price: property.price.toString(),
    priceType: property.priceType,
    bedrooms: property.bedrooms.toString(),
    currency: property.currency,
    bathrooms: property.bathrooms.toString(),
    sqft: property.sqft != null ? property.sqft!.toString() : "",
    type: property.type,
    featured: property.featured,
    description: property.description,
    amenities: property.amenities || [],
  });

  const [currentSlug, setCurrentSlug] = useState(property.slug || "");
  const [previewSlug, setPreviewSlug] = useState("");
  const [existingImages, setExistingImages] = useState<string[]>(
    property.images || []
  );
  const [newImages, setNewImages] = useState<File[]>([]);
  const [newImageUrls, setNewImageUrls] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [newAmenity, setNewAmenity] = useState("");
  const [showAmenitiesDropdown, setShowAmenitiesDropdown] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Reset form when property changes
  useEffect(() => {
    setFormData({
      title: property.title,
      location: property.location,
      price: property.price.toString(),
      priceType: property.priceType,
      bedrooms: property.bedrooms.toString(),
      bathrooms: property.bathrooms.toString(),
      sqft: property.sqft?.toString() ?? "",
      currency: property.currency,
      type: property.type,
      featured: property.featured,
      description: property.description,
      amenities: property.amenities || [],
    });
    setCurrentSlug(property.slug || "");
    setPreviewSlug("");
    setExistingImages(property.images || []);
    setNewImages([]);
    setNewImageUrls([]);
  }, [property]);

  // Update preview slug when title changes
  useEffect(() => {
    if (formData.title) {
      setPreviewSlug(generateSlug(formData.title));
    } else {
      setPreviewSlug("");
    }
  }, [formData.title]);

  const handleImageUpload = useCallback(
    (files: FileList | null) => {
      if (!files) return;

      const newImageFiles = Array.from(files).filter(
        (file) =>
          file.type.startsWith("image/") &&
          !newImages.some((img) => img.name === file.name)
      );

      if (
        newImageFiles.length + newImages.length + existingImages.length >
        10
      ) {
        setErrorMessage("Maximum 10 images allowed");
        setShowErrorToast(true);
        return;
      }

      setNewImages((prev) => [...prev, ...newImageFiles]);

      // Create preview URLs
      newImageFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          setNewImageUrls((prev) => [...prev, e.target?.result as string]);
        };
        reader.readAsDataURL(file);
      });
    },
    [newImages, existingImages]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      handleImageUpload(e.dataTransfer.files);
    },
    [handleImageUpload]
  );

  const removeNewImage = (index: number) => {
    setNewImages((prev) => prev.filter((_, i) => i !== index));
    setNewImageUrls((prev) => prev.filter((_, i) => i !== index));
  };

  const removeExistingImage = async (imageUrl: string) => {
    try {
      await deleteImageFromSpaces(imageUrl);
      setExistingImages((prev) => prev.filter((url) => url !== imageUrl));
    } catch (error) {
      console.error("Error deleting image:", error);
      setErrorMessage("Failed to delete image");
      setShowErrorToast(true);
    }
  };

  const addAmenity = () => {
    if (newAmenity.trim() && !formData.amenities.includes(newAmenity.trim())) {
      setFormData((prev) => ({
        ...prev,
        amenities: [...prev.amenities, newAmenity.trim()],
      }));
      setNewAmenity("");
    }
  };

  const addCommonAmenity = (amenity: string) => {
    if (!formData.amenities.includes(amenity)) {
      setFormData((prev) => ({
        ...prev,
        amenities: [...prev.amenities, amenity],
      }));
    }
  };

  const removeAmenity = (amenity: string) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.filter((a) => a !== amenity),
    }));
  };

  const filteredCommonAmenities = COMMON_AMENITIES.filter(
    (amenity) => !formData.amenities.includes(amenity)
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (existingImages.length === 0 && newImages.length === 0) {
      setErrorMessage("Please upload at least one image");
      setShowErrorToast(true);
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      let finalImageUrls = [...existingImages];

      // Upload new images if any
      if (newImages.length > 0) {
        const uploadedUrls = await uploadImagesToSpaces(
          newImages,
          (progress) => {
            setUploadProgress(progress);
          }
        );
        finalImageUrls = [...existingImages, ...uploadedUrls];
      }

      // Create updated property data
      const updatedPropertyData = {
        title: formData.title,
        location: formData.location,
        price: parseInt(formData.price),
        priceType: formData.priceType,
        bedrooms: parseInt(formData.bedrooms),
        bathrooms: parseInt(formData.bathrooms),
        sqft: formData.sqft == "" ? null : parseInt(formData.sqft),
        type: formData.type,
        images: finalImageUrls,
        featured: formData.featured,
        description: formData.description,
        amenities: formData.amenities,
      };

      // Update in Firebase
      const success = await updateProperty(property.id, updatedPropertyData);

      if (success) {
        setShowSuccessToast(true);
        // Call the onSave callback with updated data
        onSave({
          ...property,
          ...updatedPropertyData,
        });

        // Reset new images after successful update
        setNewImages([]);
        setNewImageUrls([]);

        // Close modal after a short delay
        setTimeout(() => {
          onClose();
        }, 1500);
      } else {
        setErrorMessage("Failed to update property. Please try again.");
        setShowErrorToast(true);
      }
    } catch (error) {
      console.error("Error updating property:", error);
      setErrorMessage("Error updating property. Please try again.");
      setShowErrorToast(true);
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  //max-w-[95vw]
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full sm:max-w-2xl max-w-screen sm:max-h-[90vh] max-h-screen overflow-y-auto p-0">
        <DialogHeader className="p-4 sm:p-6 pb-0">
          <DialogTitle className="text-lg sm:text-xl font-semibold">
            Edit Property
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-6">
          {/* Image Upload Section */}
          <Card>
            <CardContent className="p-4 sm:p-6">
              <h2 className="text-base sm:text-lg font-semibold mb-4">
                Property Images
              </h2>

              {/* Existing Images */}
              {existingImages.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-md font-medium mb-3">Current Images</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {existingImages.map((url, index) => (
                      <div key={index} className="relative group">
                        <Image
                          width={200}
                          height={200}
                          src={url}
                          alt={`Property ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeExistingImage(url)}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Drag & Drop Area for New Images */}
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
                  newImages.length === 0
                    ? "border-gray-300 bg-gray-50 hover:border-gray-400"
                    : "border-green-300 bg-green-50"
                }`}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <p className="text-lg font-medium text-gray-700 mb-2">
                  {newImages.length === 0
                    ? "Drop new images here or click to upload"
                    : `${newImages.length} new images selected`}
                </p>
                <p className="text-sm text-gray-500">
                  Upload up to {10 - existingImages.length} more images (JPG,
                  PNG, WebP)
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e.target.files)}
                  className="hidden"
                />
              </div>

              {/* New Image Previews */}
              {newImages.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-md font-medium mb-3">New Images</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {newImageUrls.map((url, index) => (
                      <div key={index} className="relative group">
                        <Image
                          width={200}
                          height={200}
                          src={url}
                          alt={`New Preview ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeNewImage(index)}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Basic Information */}
          <Card>
            <CardContent className="p-4 sm:p-6">
              <h2 className="text-base sm:text-lg font-semibold mb-4">
                Basic Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div className="flex flex-col gap-3">
                  <Label htmlFor="title">Property Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                    placeholder="e.g., Modern 3-Bedroom Villa"
                    required
                  />
                </div>

                {/* Slug Preview */}
                <div className="flex flex-col gap-3">
                  <Label className="flex items-center gap-2">
                    <Link className="h-4 w-4" />
                    URL Slug
                  </Label>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">/properties/</span>
                    <Input
                      value={previewSlug || currentSlug}
                      readOnly
                      className="flex-1 bg-gray-50"
                      placeholder="slug-will-be-generated"
                    />
                  </div>
                  {previewSlug && previewSlug !== currentSlug && (
                    <p className="text-xs text-blue-600">
                      Slug will be updated when you save
                    </p>
                  )}
                </div>

                <DropdownSelect
                  name={"type"}
                  label={"Property Type *"}
                  placeholder="Select property type"
                  value={formData.type}
                  handleChange={handleInputChange}
                  items={PROPERTY_TYPES.map(
                    (type) => type.charAt(0).toUpperCase() + type.slice(1)
                  )}
                />

                <SearchableDropdown
                  name={"location"}
                  label={"Location *"}
                  placeholder="Select Location"
                  value={formData.location}
                  handleChange={handleInputChange}
                  items={ABUJA_LOCATIONS}
                />

                <div className="flex flex-col gap-3">
                  <Label htmlFor="price">Price *</Label>
                  <div className="flex gap-2">
                    <Input
                      id="price"
                      type="text"
                      value={formatNumberWithCommas(formData.price)}
                      onChange={(e) => {
                        const raw = e.target.value.replace(/,/g, "");
                        if (/^\d*$/.test(raw)) {
                          setFormData((prev) => ({
                            ...prev,
                            price: raw,
                          }));
                        }
                      }}
                      placeholder="Enter price"
                      required
                      className="flex-1"
                    />
                    <div className="w-24">
                      <DropdownSelect
                        name="currency"
                        label=""
                        placeholder="Currency"
                        value={formData.currency}
                        handleChange={handleInputChange}
                        items={CURRENCIES}
                      />
                    </div>
                  </div>
                </div>

                <DropdownSelect
                  name={"priceType"}
                  label={"Price Type *"}
                  placeholder="Select price type"
                  value={formData.priceType}
                  handleChange={handleInputChange}
                  items={PRICE_TYPES.map(
                    (type) => type.charAt(0).toUpperCase() + type.slice(1)
                  )}
                />

                <div className="flex flex-col gap-3">
                  <Label htmlFor="sqft">Square Feet</Label>
                  <Input
                    id="sqft"
                    type="number"
                    value={formData.sqft}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, sqft: e.target.value }))
                    }
                    placeholder="e.g., 2500"
                  />
                </div>

                <div className="flex flex-col gap-3">
                  <Label htmlFor="bedrooms">Bedrooms *</Label>
                  <Input
                    id="bedrooms"
                    type="number"
                    value={formData.bedrooms}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        bedrooms: e.target.value,
                      }))
                    }
                    placeholder="e.g., 3"
                    required
                  />
                </div>

                <div className="flex flex-col gap-3">
                  <Label htmlFor="bathrooms">Bathrooms *</Label>
                  <Input
                    id="bathrooms"
                    type="number"
                    value={formData.bathrooms}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        bathrooms: e.target.value,
                      }))
                    }
                    placeholder="e.g., 2"
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Description */}
          <Card>
            <CardContent className="p-4 sm:p-6">
              <h2 className="text-base sm:text-lg font-semibold mb-4">
                Description
              </h2>
              <Textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder="Describe the property, its features, and what makes it special..."
                rows={6}
                required
              />
            </CardContent>
          </Card>

          {/* Amenities */}
          <Card>
            <CardContent className="p-4 sm:p-6">
              <h2 className="text-base sm:text-lg font-semibold mb-4">
                Amenities & Features
              </h2>

              {/* Common Amenities Section */}
              <div className="mb-6">
                <h3 className="text-md font-medium mb-3">Common Amenities</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                  {filteredCommonAmenities.slice(0, 20).map((amenity) => (
                    <button
                      key={amenity}
                      type="button"
                      onClick={() => addCommonAmenity(amenity)}
                      className="text-left p-2 rounded border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors text-xs overflow-clip"
                    >
                      {amenity}
                    </button>
                  ))}
                </div>
                {filteredCommonAmenities.length > 20 && (
                  <div className="mt-3">
                    <button
                      type="button"
                      onClick={() =>
                        setShowAmenitiesDropdown(!showAmenitiesDropdown)
                      }
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      {showAmenitiesDropdown
                        ? "Show Less"
                        : `Show ${filteredCommonAmenities.length - 20} More`}
                    </button>
                  </div>
                )}
                {showAmenitiesDropdown && (
                  <div className="mt-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                    {filteredCommonAmenities.slice(20).map((amenity) => (
                      <button
                        key={amenity}
                        type="button"
                        onClick={() => addCommonAmenity(amenity)}
                        className="text-left p-2 rounded border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors text-xs overflow-clip"
                      >
                        {amenity}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Custom Amenities Section */}
              <div className="mb-4">
                <h3 className="text-md font-medium mb-3">Add Custom Amenity</h3>
                <div className="flex gap-2">
                  <Input
                    value={newAmenity}
                    onChange={(e) => setNewAmenity(e.target.value)}
                    placeholder="Add a custom amenity (e.g., Rooftop Garden)"
                    onKeyPress={(e) =>
                      e.key === "Enter" && (e.preventDefault(), addAmenity())
                    }
                  />
                  <Button type="button" onClick={addAmenity} variant="outline">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Selected Amenities */}
              {formData.amenities.length > 0 && (
                <div>
                  <h3 className="text-md font-medium mb-3">
                    Selected Amenities ({formData.amenities.length})
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {formData.amenities.map((amenity, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
                        {amenity}
                        <button
                          type="button"
                          onClick={() => removeAmenity(amenity)}
                          className="ml-1 hover:text-red-500"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Featured Property */}
          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold">Featured Property</h2>
                  <p className="text-sm text-gray-600">
                    Featured properties appear prominently in search results
                  </p>
                </div>
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      featured: e.target.checked,
                    }))
                  }
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
              </div>
            </CardContent>
          </Card>

          {/* Submit Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={isUploading}
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1" disabled={isUploading}>
              {isUploading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  {uploadProgress > 0
                    ? `Uploading... ${uploadProgress}%`
                    : "Updating Property..."}
                </>
              ) : (
                "Update Property"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>

      {/* Success Toast */}
      <SuccessToast
        isVisible={showSuccessToast}
        onClose={() => setShowSuccessToast(false)}
        message={`"${formData.title}" has been updated successfully!`}
      />

      {/* Error Toast */}
      <ErrorToast
        isVisible={showErrorToast}
        onClose={() => setShowErrorToast(false)}
        message={errorMessage || "Failed to update property. Please try again."}
      />
    </Dialog>
  );
};
