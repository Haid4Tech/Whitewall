"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Edit, Trash2, Eye, MapPin, Bed, Bath, Square, Star, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PropertyEditDialog } from "@/components/admin/properties/property-edit-modal";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { getPropertyById, deleteProperty } from "@/firebase/properties";
import { Property } from "@/common/types";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { SuccessToast } from "@/components/ui/success-toast";
import { ErrorToast } from "@/components/ui/error-toast";

export default function PropertyDetailPage() {
  const params = useParams();
  const router = useRouter();
  const propertyId = params.id as string;

  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch property details
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);
        setError(null);
        const fetchedProperty = await getPropertyById(propertyId);
        
        if (fetchedProperty) {
          setProperty(fetchedProperty);
        } else {
          setError("Property not found");
        }
      } catch (err) {
        console.error("Error fetching property:", err);
        setError("Failed to load property details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (propertyId) {
      fetchProperty();
    }
  }, [propertyId]);

  const handleEditProperty = () => {
    setIsEditDialogOpen(true);
  };

  const handleSaveProperty = (updatedProperty: Property) => {
    setProperty(updatedProperty);
    setShowSuccessToast(true);
  };

  const handleDeleteProperty = async () => {
    if (!property) return;
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!property) return;

    try {
      setIsDeleting(true);
      const success = await deleteProperty(property.id);
      if (success) {
        setShowSuccessToast(true);
        setTimeout(() => {
          router.push("/admin/properties");
        }, 1500);
      } else {
        setErrorMessage("Failed to delete property. Please try again.");
        setShowErrorToast(true);
      }
    } catch (error) {
      console.error("Error deleting property:", error);
      setErrorMessage("Error deleting property. Please try again.");
      setShowErrorToast(true);
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={() => router.back()}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
              <h1 className="text-xl font-semibold text-gray-900">
                Property Details
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={handleEditProperty}
                className="flex items-center gap-2"
              >
                <Edit className="h-4 w-4" />
                Edit
              </Button>
              <Button
                variant="destructive"
                onClick={handleDeleteProperty}
                className="flex items-center gap-2"
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Property Title and Status */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
                      {property.title}
                    </CardTitle>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="h-4 w-4" />
                      <span>{property.location}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
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
                      <img
                        src={property.images[currentImageIndex]}
                        alt={`${property.title} - Image ${currentImageIndex + 1}`}
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
                            <img
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
                <CardTitle className="text-xl font-semibold">Property Details</CardTitle>
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
                      <p className="font-semibold">{property.sqft.toLocaleString()}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-orange-100 rounded-lg">
                      <Building className="h-5 w-5 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Type</p>
                      <p className="font-semibold capitalize">{property.type}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Description</CardTitle>
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
                  <CardTitle className="text-xl font-semibold">Amenities & Features</CardTitle>
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
            {/* Property Status */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Property Status</CardTitle>
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
                <CardTitle className="text-lg font-semibold">Property Information</CardTitle>
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
                <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button
                    onClick={handleEditProperty}
                    className="w-full flex items-center gap-2"
                  >
                    <Edit className="h-4 w-4" />
                    Edit Property
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => router.push(`/properties/${property.id}`)}
                    className="w-full flex items-center gap-2"
                  >
                    <Eye className="h-4 w-4" />
                    View Public Page
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={handleDeleteProperty}
                    className="w-full flex items-center gap-2"
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete Property
                  </Button>
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

      {/* Success Toast */}
      <SuccessToast
        isVisible={showSuccessToast}
        onClose={() => setShowSuccessToast(false)}
        message="Property updated successfully!"
      />

      {/* Error Toast */}
      <ErrorToast
        isVisible={showErrorToast}
        onClose={() => setShowErrorToast(false)}
        message={errorMessage || "An error occurred. Please try again."}
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
        title="Delete Property"
        description={property ? `Are you sure you want to delete "${property.title}"? This action cannot be undone and will permanently remove the property from the system.` : ""}
        confirmText="Delete Property"
        cancelText="Cancel"
        variant="danger"
        isLoading={isDeleting}
      />
    </div>
  );
} 