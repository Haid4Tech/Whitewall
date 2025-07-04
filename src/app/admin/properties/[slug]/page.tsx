/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Edit,
  Trash2,
  Eye,
  MapPin,
  Bed,
  Bath,
  Square,
  Star,
  Building,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PropertyEditDialog } from "@/components/admin/properties/property-edit-modal";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import {
  getPropertyBySlug,
  deleteProperty,
  updateProperty,
} from "@/firebase/properties";
import { ListingStatus, Property } from "@/common/types";
import LoadingSpinner from "@/components/ui/loading-spinner";
import AdminNavHeader from "@/components/general/admin-nav-header";
import { toast } from "sonner";
import { AvailabilityToggle } from "@/components/ui/segmented-toggle";
import Image from "next/image";

export default function PropertyDetailPage() {
  const params = useParams();
  const router = useRouter();
  const propertySlug = params.slug as string;

  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [propertyStatus, setPropertyStatus] = useState(property?.status);

  const handlePropertyFetch = useCallback(async () => {
    const fetchedProperty = await getPropertyBySlug(propertySlug);

    if (fetchedProperty) {
      setProperty(fetchedProperty);
    } else {
      setError("Property not found");
    }
  }, [propertySlug]);

  // Fetch property details
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);
        setError(null);
        await handlePropertyFetch();
      } catch (err) {
        console.error("Error fetching property:", err);
        setError("Failed to load property details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (propertySlug) {
      fetchProperty();
    }
  }, [propertySlug]);

  const handleEditProperty = () => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(max-width: 640px)").matches
    ) {
      // On mobile, redirect to the edit page
      router.push(`/admin/properties/${propertySlug}/edit`);
    } else {
      // On desktop/tablet, open modal

      setIsEditDialogOpen(true);
    }
  };

  const handleSaveProperty = (updatedProperty: Property) => {
    setProperty(updatedProperty);
    toast.success("Property updated successfully!");
  };

  const handleDeleteProperty = async () => {
    if (!property) return;
    setIsDeleteDialogOpen(true);
  };

  const onToggleAvailability = (available: boolean) => {
    handleAvailabilityToggle(available);
  };

  async function handleAvailabilityToggle(available: boolean) {
    try {
      // Create updated property data
      const updatedPropertyData = {
        status: available
          ? ("Available" as ListingStatus)
          : ("Sold" as ListingStatus),
      };

      // Update in Firebase
      const success = await updateProperty(property!.id, updatedPropertyData);

      if (success) {
        toast.success("Property updated successfully!");
        // Call the onSave callback with updated data

        await handlePropertyFetch();
        setPropertyStatus(available ? "Available" : "Sold");
      } else {
        toast.error("Failed to update property. Please try again.");
      }
    } catch (error) {
      console.error("Error updating property:", error);
      toast.error("Error updating property. Please try again.");
    } finally {
      /*    setIsUploading(false);
      setUploadProgress(0); */
    }
  }

  const confirmDelete = async () => {
    if (!property) return;

    try {
      setIsDeleting(true);
      const success = await deleteProperty(property.id);
      if (success) {
        toast.success("Property updated successfully!");
        setTimeout(() => {
          router.push("/admin/properties");
        }, 1500);
      } else {
        toast.error("Failed to delete property. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting property:", error);
      toast.error("Error deleting property. Please try again.");
    } finally {
      setIsDeleting(false);
      setIsDeleteDialogOpen(false);
    }
  };

  const cancelDelete = () => {
    setIsDeleteDialogOpen(false);
  };

  const formatPrice = (price: number, priceType: string) => {
    const formattedPrice = price.toLocaleString();
    switch (priceType) {
      case "for sale":
        return `$${formattedPrice}`;
      case "per month":
        return `$${formattedPrice}/month`;
      case "per year":
        return `$${formattedPrice}/year`;
      case "per week":
        return `$${formattedPrice}/week`;
      default:
        return `$${formattedPrice}`;
    }
  };

  const formatDate = (date: string | Date | any) => {
    if (!date) return "N/A";

    let dateObj: Date;

    if (typeof date === "string") {
      dateObj = new Date(date);
    } else if (date && typeof date === "object" && date.toDate) {
      // Handle Firebase Timestamp
      dateObj = date.toDate();
    } else if (date instanceof Date) {
      dateObj = date;
    } else {
      dateObj = new Date();
    }

    return dateObj.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <LoadingSpinner size="lg" />
        <p className="mt-4 text-gray-600">Loading property details...</p>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            {error || "Property Not Found"}
          </h2>
          <p className="text-gray-600 mb-4">
            {error || "The property you're looking for doesn't exist."}
          </p>
          <Button onClick={() => router.push("/admin/properties")}>
            Back to Properties
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <AdminNavHeader header={"Property Details"} />

      <div className="mx-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Property Title and Status */}
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row items-start justify-between gap-3">
                  <div>
                    <CardTitle className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                      {property.title}
                    </CardTitle>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin size={12} />
                      <span className="text-sm">{property.location}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2 ml-auto">
                    <Badge
                      variant={property.featured ? "default" : "secondary"}
                      className="flex items-center gap-1"
                    >
                      {property.featured && <Star className="h-3 w-3" />}
                      {property.featured ? "Featured" : "Standard"}
                    </Badge>
                    <div className="text-2xl font-bold text-blue-600">
                      {formatPrice(property.price, property.priceType)}
                    </div>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Image Gallery */}
            {property.images && property.images.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {/* Main Image */}
                    <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
                      <Image
                        width={200}
                        height={200}
                        src={property.images[currentImageIndex]}
                        alt={`${property.title} - Image ${
                          currentImageIndex + 1
                        }`}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Thumbnail Navigation */}
                    {property.images.length > 1 && (
                      <div className="grid grid-cols-6 gap-2">
                        {property.images.map((image, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                              index === currentImageIndex
                                ? "border-blue-500"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                          >
                            <Image
                              width={200}
                              height={200}
                              src={image}
                              alt={`Thumbnail ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Property Details */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-semibold">
                  Property Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Bed className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Bedrooms</p>
                      <p className="font-semibold">{property.bedrooms}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Bath className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Bathrooms</p>
                      <p className="font-semibold">{property.bathrooms}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Square className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Square Feet</p>
                      <p className="font-semibold">
                        {property.sqft ? property.sqft.toLocaleString() : "N/A"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-orange-100 rounded-lg">
                      <Building className="h-5 w-5 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Type</p>
                      <p className="font-semibold capitalize">
                        {property.type}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-semibold">
                  Description
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  {property.description || "No description available."}
                </p>
              </CardContent>
            </Card>

            {/* Amenities */}
            {property.amenities && property.amenities.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl font-semibold">
                    Amenities & Features
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {property.amenities.map((amenity, index) => (
                      <Badge key={index} variant="secondary">
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                onClick={handleEditProperty}
                className="flex items-center gap-2 w-full"
              >
                <Edit size={15} />
                Edit
              </Button>
              <Button
                variant="destructive"
                onClick={handleDeleteProperty}
                className="flex items-center gap-2 w-full"
              >
                <Trash2 size={15} />
                Delete
              </Button>
            </div>
            {/* Property Status */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  Property Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Status</span>
                    <Badge variant="outline" className="capitalize">
                      {property.status || "Available"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Price Type</span>
                    <span className="font-medium capitalize">
                      {property.priceType.replace(" ", " ")}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Featured</span>
                    <span className="font-medium">
                      {property.featured ? "Yes" : "No"}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Property Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  Property Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Property ID</span>
                    <span className="font-mono text-sm">{property.id}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Created</span>
                    <span className="font-medium">
                      {formatDate(property.createdAt || new Date())}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Last Updated</span>
                    <span className="font-medium">
                      {formatDate(property.updatedAt || new Date())}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 pb-3">
                  <Button
                    onClick={handleEditProperty}
                    className="w-full flex items-center gap-2"
                  >
                    <Edit size={12} />
                    Edit Property
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => router.push(`/properties/${property.slug}`)}
                    className="w-full flex items-center gap-2"
                  >
                    <Eye size={12} />
                    View Public Page
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={handleDeleteProperty}
                    className="w-full flex items-center gap-2"
                  >
                    <Trash2 size={12} />
                    Delete Property
                  </Button>

                  <AvailabilityToggle
                    options={[
                      { label: "Available", value: "available" },
                      { label: "Sold", value: "sold" },
                    ]}
                    value={propertyStatus?.toLowerCase() ?? "available"}
                    onChange={(val) =>
                      onToggleAvailability(val === "available")
                    }
                    className="shadow-sm"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Edit Dialog */}
      {property && (
        <PropertyEditDialog
          isOpen={isEditDialogOpen}
          onClose={() => setIsEditDialogOpen(false)}
          property={property}
          onSave={handleSaveProperty}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
        title="Delete Property"
        description={
          property
            ? `Are you sure you want to delete "${property.title}"? This action cannot be undone and will permanently remove the property from the system.`
            : ""
        }
        confirmText="Delete Property"
        cancelText="Cancel"
        variant="danger"
        isLoading={isDeleting}
      />
    </div>
  );
}
