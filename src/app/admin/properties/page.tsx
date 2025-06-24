"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Property } from "@/common/types";

import { AdminPropertyCard } from "@/components/admin/properties/admin-property-card";
import { PropertyEditDialog } from "@/components/admin/properties/property-edit-modal";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SuccessToast } from "@/components/ui/success-toast";
import { ErrorToast } from "@/components/ui/error-toast";

import { getProperties, deleteProperty } from "@/firebase/properties";
import LoadingSpinner from "@/components/ui/loading-spinner";

export default function Page() {
  const router = useRouter();
  // const [properties, setProperties] = useState(initialProperties);

  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [deletingPropertyId, setDeletingPropertyId] = useState<string | null>(
    null
  );
  const [propertyToDelete, setPropertyToDelete] = useState<Property | null>(
    null
  );
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const totalProperties = properties.length;
  const availableProperties = properties.filter(
    (p) => p.status === "Available"
  ).length;
  const soldProperties = properties.filter((p) => p.status === "Sold").length;

  const handleEditProperty = (property: Property) => {
    setEditingProperty(property);
    setIsEditDialogOpen(true);
  };

  const handleSaveProperty = (updatedProperty: Property) => {
    // Update the property in the list
    setProperties((prev) =>
      prev.map((p) => (p.id === updatedProperty.id ? updatedProperty : p))
    );
    setSuccessMessage(
      `Property "${updatedProperty.title}" updated successfully`
    );
    setShowSuccessToast(true);
  };

  const handleViewProperty = (property: Property) => {
    router.push(`/admin/properties/${property.id}`);
  };

  const handleDeleteProperty = async (property: Property) => {
    setPropertyToDelete(property);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!propertyToDelete) return;

    try {
      setDeletingPropertyId(propertyToDelete.id);
      const success = await deleteProperty(propertyToDelete.id);
      if (success) {
        // Remove the property from the local state
        setProperties((prev) =>
          prev.filter((p) => p.id !== propertyToDelete.id)
        );
        setSuccessMessage(
          `Property "${propertyToDelete.title}" deleted successfully`
        );
        setShowSuccessToast(true);
      } else {
        setErrorMessage("Failed to delete property. Please try again.");
        setShowErrorToast(true);
      }
    } catch (error) {
      console.error("Error deleting property:", error);
      setErrorMessage("Error deleting property. Please try again.");
      setShowErrorToast(true);
    } finally {
      setDeletingPropertyId(null);
      setPropertyToDelete(null);
      setIsDeleteDialogOpen(false);
    }
  };

  const cancelDelete = () => {
    setPropertyToDelete(null);
    setIsDeleteDialogOpen(false);
  };

  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 10000000,
    bedrooms: 0,
    propertyType: "all",
    location: "",
  });

  // const filteredProperties = useMemo(() => {
  //   return properties.filter((property) => {
  //     const matchesSearch =
  //       property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //       property.location.toLowerCase().includes(searchQuery.toLowerCase());
  //     const matchesPrice =
  //       property.price >= filters.minPrice &&
  //       property.price <= filters.maxPrice;
  //     const matchesBedrooms =
  //       filters.bedrooms === 0 || property.bedrooms >= filters.bedrooms;
  //     const matchesType =
  //       filters.propertyType === "all" ||
  //       property.type === filters.propertyType;
  //     const matchesLocation =
  //       !filters.location ||
  //       property.location
  //         .toLowerCase()
  //         .includes(filters.location.toLowerCase());

  //     return (
  //       matchesSearch &&
  //       matchesPrice &&
  //       matchesBedrooms &&
  //       matchesType &&
  //       matchesLocation
  //     );
  //   });
  // }, [searchQuery, filters]);

  // Fetch properties on component mount
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        setError(null);
        const fetchedProperties = await getProperties();
        setProperties(fetchedProperties);
      } catch (err) {
        console.error("Error fetching properties:", err);
        setError("Failed to load properties. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <LoadingSpinner size="lg" />
        <p className="mt-4 text-muted-foreground">Loading properties...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-foreground mb-2">
            Error Loading Properties
          </h2>
          <p className="text-muted-foreground mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Try Again
          </button>
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
            <Button
              onClick={() => router.push("/admin/properties/add")}
              className=""
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Property
            </Button>
          </div>
        </div>
      </div>

      <div className="w-full mx-auto py-8">
        {/* Stats Cards */}
        {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Home className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Total Properties
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {totalProperties}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <MapPin className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Available</p>
                <p className="text-2xl font-bold text-gray-900">
                  {availableProperties}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Building className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Rented</p>
                <p className="text-2xl font-bold text-gray-900">
                  {rentedProperties}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Building className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Monthly Revenue
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  ${totalRevenue.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div> */}

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {properties.map((property) => (
            <div key={property.id}>
              <AdminPropertyCard
                property={property}
                onEdit={() => handleEditProperty(property)}
                onView={() => handleViewProperty(property)}
                onDelete={() => handleDeleteProperty(property)}
                isDeleting={deletingPropertyId === property.id}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Edit Dialog */}
      {editingProperty && (
        <PropertyEditDialog
          isOpen={isEditDialogOpen}
          onClose={() => {
            setIsEditDialogOpen(false);
            setEditingProperty(null);
          }}
          property={editingProperty}
          onSave={handleSaveProperty}
        />
      )}

      {/* Success Toast */}
      <SuccessToast
        isVisible={showSuccessToast}
        onClose={() => setShowSuccessToast(false)}
        message={successMessage}
      />

      {/* Error Toast */}
      <ErrorToast
        isVisible={showErrorToast}
        onClose={() => setShowErrorToast(false)}
        message={errorMessage}
      />

      {/* Delete Dialog */}
      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
        title="Delete Property"
        description={
          propertyToDelete
            ? `Are you sure you want to delete "${propertyToDelete.title}"? This action cannot be undone.`
            : ""
        }
        confirmText="Delete Property"
        cancelText="Cancel"
        variant="danger"
        isLoading={deletingPropertyId === propertyToDelete?.id}
      />
    </div>
  );
}
