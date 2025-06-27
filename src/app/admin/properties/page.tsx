"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Property } from "@/common/types";

import { AdminPropertyCard } from "@/components/admin/properties/admin-property-card";
import { PropertyEditDialog } from "@/components/admin/properties/property-edit-modal";
import { PropertyFilters } from "@/components/admin/properties/property-filters";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { Plus, MapPin, Grid3X3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SuccessToast } from "@/components/ui/success-toast";
import { ErrorToast } from "@/components/ui/error-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { getProperties, deleteProperty } from "@/firebase/properties";
import LoadingSpinner from "@/components/ui/loading-spinner";

interface FilterState {
  searchQuery: string;
  location: string;
  propertyType: string;
  priceType: string;
  status: string;
  minPrice: string;
  maxPrice: string;
  minBedrooms: string;
  maxBedrooms: string;
  minBathrooms: string;
  maxBathrooms: string;
  minSqft: string;
  maxSqft: string;
  featured: boolean | null;
  amenities: string[];
}

export default function Page() {
  const router = useRouter();
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
  const [isGroupedByLocation, setIsGroupedByLocation] = useState(false);

  // Filter state
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: "",
    location: "",
    propertyType: "",
    priceType: "",
    status: "",
    minPrice: "",
    maxPrice: "",
    minBedrooms: "",
    maxBedrooms: "",
    minBathrooms: "",
    maxBathrooms: "",
    minSqft: "",
    maxSqft: "",
    featured: null,
    amenities: [],
  });

  const totalProperties = properties.length;

  // Filter properties based on current filters
  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      // Search query
      const searchLower = filters.searchQuery.toLowerCase();
      const matchesSearch =
        !filters.searchQuery ||
        property.title.toLowerCase().includes(searchLower) ||
        property.location.toLowerCase().includes(searchLower) ||
        property.description.toLowerCase().includes(searchLower);

      // Location
      const matchesLocation =
        !filters.location || property.location === filters.location;

      // Property type
      const matchesType =
        !filters.propertyType || property.type === filters.propertyType;

      // Price type
      const matchesPriceType =
        !filters.priceType || property.priceType === filters.priceType;

      // Status
      const matchesStatus =
        !filters.status || property.status === filters.status;

      // Price range
      const minPrice = filters.minPrice ? parseInt(filters.minPrice) : 0;
      const maxPrice = filters.maxPrice ? parseInt(filters.maxPrice) : Infinity;
      const matchesPrice =
        property.price >= minPrice && property.price <= maxPrice;

      // Bedrooms range
      const minBedrooms = filters.minBedrooms
        ? parseInt(filters.minBedrooms)
        : 0;
      const maxBedrooms = filters.maxBedrooms
        ? parseInt(filters.maxBedrooms)
        : Infinity;
      const matchesBedrooms =
        property.bedrooms >= minBedrooms && property.bedrooms <= maxBedrooms;

      // Bathrooms range
      const minBathrooms = filters.minBathrooms
        ? parseInt(filters.minBathrooms)
        : 0;
      const maxBathrooms = filters.maxBathrooms
        ? parseInt(filters.maxBathrooms)
        : Infinity;
      const matchesBathrooms =
        property.bathrooms >= minBathrooms &&
        property.bathrooms <= maxBathrooms;

      // Square feet range
      const minSqft = filters.minSqft ? parseInt(filters.minSqft) : 0;
      const maxSqft = filters.maxSqft ? parseInt(filters.maxSqft) : Infinity;
      const matchesSqft = property.sqft >= minSqft && property.sqft <= maxSqft;

      // Featured
      const matchesFeatured =
        filters.featured === null || property.featured === filters.featured;

      // Amenities
      const matchesAmenities =
        filters.amenities.length === 0 ||
        filters.amenities.every((amenity) =>
          property.amenities.includes(amenity)
        );

      return (
        matchesSearch &&
        matchesLocation &&
        matchesType &&
        matchesPriceType &&
        matchesStatus &&
        matchesPrice &&
        matchesBedrooms &&
        matchesBathrooms &&
        matchesSqft &&
        matchesFeatured &&
        matchesAmenities
      );
    });
  }, [properties, filters]);

  // Group properties by location
  const groupedProperties = useMemo(() => {
    if (!isGroupedByLocation) return null;

    const groups: { [key: string]: Property[] } = {};
    filteredProperties.forEach((property) => {
      const location = property.location;
      if (!groups[location]) {
        groups[location] = [];
      }
      groups[location].push(property);
    });

    return Object.entries(groups).sort(([a], [b]) => a.localeCompare(b));
  }, [filteredProperties, isGroupedByLocation]);

  const handleEditProperty = (property: Property) => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(max-width: 640px)").matches
    ) {
      // On mobile, redirect to the edit page
      router.push(`/admin/properties/${property.slug}/edit`);
    } else {
      // On desktop/tablet, open modal
      setEditingProperty(property);
      setIsEditDialogOpen(true);
    }
  };

  const handleSaveProperty = (updatedProperty: Property) => {
    setProperties((prev) =>
      prev.map((p) => (p.id === updatedProperty.id ? updatedProperty : p))
    );
    setSuccessMessage(
      `Property "${updatedProperty.title}" updated successfully`
    );
    setShowSuccessToast(true);
  };

  const handleViewProperty = (property: Property) => {
    router.push(`/admin/properties/${property.slug}`);
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

  const handleFiltersChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      searchQuery: "",
      location: "",
      propertyType: "",
      priceType: "",
      status: "",
      minPrice: "",
      maxPrice: "",
      minBedrooms: "",
      maxBedrooms: "",
      minBathrooms: "",
      maxBathrooms: "",
      minSqft: "",
      maxSqft: "",
      featured: null,
      amenities: [],
    });
  };

  const handleToggleGrouping = (grouped: boolean) => {
    setIsGroupedByLocation(grouped);
  };

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
    <div className="min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-row items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Properties</h2>
            <p className="text-muted-foreground">
              Manage your properties, view details, and edit listings.
            </p>
          </div>
          <Button onClick={() => router.push(`/admin/properties/add`)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Property
          </Button>
        </div>
      </div>

      {/* Filters */}
      <PropertyFilters
        filters={filters}
        onFiltersChange={handleFiltersChange}
        onClearFilters={handleClearFilters}
        isGroupedByLocation={isGroupedByLocation}
        onToggleGrouping={handleToggleGrouping}
        totalProperties={totalProperties}
        filteredCount={filteredProperties.length}
      />

      {/* Properties Display */}
      <div className="space-y-6">
        {isGroupedByLocation && groupedProperties ? (
          // Grouped by location
          groupedProperties.map(([location, locationProperties]) => (
            <Card
              key={location}
              className="shadow-none pb-4 border-b-1 border-gray-300 rounded-none"
            >
              <CardHeader>
                <div className="flex items-baseline gap-1">
                  <div className="flex items-center gap-1">
                    <MapPin className={"text-muted-foreground"} size={15} />
                    <CardTitle className="text-lg">{location}</CardTitle>
                  </div>
                  <Badge
                    className="text-primary-gold font-bold"
                    variant="secondary"
                  >
                    {locationProperties.length}{" "}
                    {locationProperties.length > 1 ? "properties" : "property"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {locationProperties.map((property) => (
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
              </CardContent>
            </Card>
          ))
        ) : (
          // Regular grid layout
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProperties.map((property) => (
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
        )}

        {/* Empty State */}
        {filteredProperties.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Grid3X3 className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                No properties found
              </h3>
              <p className="text-muted-foreground text-center mb-4">
                {totalProperties === 0
                  ? "You haven't added any properties yet."
                  : "No properties match your current filters."}
              </p>
              {totalProperties === 0 ? (
                <Button onClick={() => router.push(`/admin/properties/add`)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your First Property
                </Button>
              ) : (
                <Button variant="outline" onClick={handleClearFilters}>
                  Clear All Filters
                </Button>
              )}
            </CardContent>
          </Card>
        )}
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
