"use client";

import { useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Upload, X, Plus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { SuccessToast } from "@/components/ui/success-toast";
import { ErrorToast } from "@/components/ui/error-toast";
import { createProperty } from "@/firebase/properties";
import { uploadImagesToSpaces } from "@/lib/spaces-upload";
import Image from "next/image";
import DropdownSelect from "@/components/general/select-comp";
import { SearchableDropdown } from "@/components/general/select-comp";
import {
  ABUJA_LOCATIONS,
  COMMON_AMENITIES,
  PRICE_TYPES,
  PROPERTY_TYPES,
  CURRENCIES,
} from "@/lib/constants";
import { toast } from "sonner";
import { formatNumberWithCommas } from "@/lib/utils";
import { PropertyFormData } from "@/common/types";

export default function AddPropertyPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<PropertyFormData>({
    title: "",
    location: "",
    price: "",
    currency: "NGN",
    priceType: "For sale",
    bedrooms: "",
    bathrooms: "",
    sqft: "",
    type: "House",
    featured: false,
    description: "",
    amenities: [],
  });

  const [images, setImages] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [newAmenity, setNewAmenity] = useState("");
  const [showAmenitiesDropdown, setShowAmenitiesDropdown] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = useCallback(
    (files: FileList | null) => {
      if (!files) return;

      const newImages = Array.from(files).filter(
        (file) =>
          file.type.startsWith("image/") &&
          !images.some((img) => img.name === file.name)
      );

      if (newImages.length + images.length > 10) {
        toast.error("Maximum 10 images allowed");

        return;
      }

      setImages((prev) => [...prev, ...newImages]);

      // Create preview URLs
      newImages.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          setImageUrls((prev) => [...prev, e.target?.result as string]);
        };
        reader.readAsDataURL(file);
      });
    },
    [images]
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

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setImageUrls((prev) => prev.filter((_, i) => i !== index));
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

    if (images.length === 0) {
      toast.error("Please upload at least one image");

      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Upload images to Digital Ocean Spaces
      const uploadedUrls = await uploadImagesToSpaces(images, (progress) => {
        setUploadProgress(progress);
      });

      // Create property data
      const propertyData = {
        title: formData.title,
        location: formData.location,
        price: parseInt(formData.price),
        currency: formData.currency as "USD" | "EUR" | "GBP" | "NGN",
        priceType: formData.priceType,
        bedrooms: parseInt(formData.bedrooms),
        bathrooms: parseInt(formData.bathrooms),
        sqft: formData.sqft == "" ? null : parseInt(formData.sqft),
        type: formData.type,
        images: uploadedUrls,
        featured: formData.featured,
        description: formData.description,
        amenities: formData.amenities,
      };

      // Save to Firebase
      const propertyId = await createProperty(propertyData);

      if (propertyId) {
        // setShowSuccessToast(true);

        toast.success(`"${formData.title}" has been added successfully!`);
        // Reset form after successful upload
        setTimeout(() => {
          setFormData({
            title: "",
            location: "",
            price: "",
            currency: "NGN",
            priceType: "For sale",
            bedrooms: "",
            bathrooms: "",
            sqft: "",
            type: "House",
            featured: false,
            description: "",
            amenities: [],
          });
          setImages([]);
          setImageUrls([]);
          setNewAmenity("");
          setShowAmenitiesDropdown(false);
        }, 1000);
      } else {
        toast.error("Failed to add property. Please try again.");
      }
    } catch (error) {
      console.error("Error adding property:", error);

      toast.error("Error adding property. Please try again.");
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="mx-auto sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={() => router.back()}
                className="flex items-center gap-2"
              >
                <ArrowLeft size={15} />
                Back
              </Button>
              <h1 className="text-base md:text-xl font-semibold text-gray-900">
                Add New Property
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Image Upload Section */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">Property Images</h2>

              {/* Drag & Drop Area */}
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
                  images.length === 0
                    ? "border-gray-300 bg-gray-50 hover:border-gray-400"
                    : "border-green-300 bg-green-50"
                }`}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <p className="text-lg font-medium text-gray-700 mb-2">
                  {images.length === 0
                    ? "Drop images here or click to upload"
                    : `${images.length} images uploaded`}
                </p>
                <p className="text-sm text-gray-500">
                  Upload up to 10 images (JPG, PNG, WebP)
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

              {/* Image Previews */}
              {images.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-md font-medium mb-3">Uploaded Images</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {imageUrls.map((url, index) => (
                      <div key={index} className="relative group">
                        <Image
                          width={200}
                          height={200}
                          src={url}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
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
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">Basic Information</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                <DropdownSelect
                  name={"type"}
                  label={"Property Type *"}
                  placeholder="Select Type"
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
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">Description</h2>
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
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">
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
                      className="text-left p-2 rounded border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors text-sm"
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
                        className="text-left p-2 rounded border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors text-sm"
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
            <CardContent className="p-6">
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

          {/* Submit Button */}
          <div className="flex gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
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
                    : "Adding Property..."}
                </>
              ) : (
                "Add Property"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
