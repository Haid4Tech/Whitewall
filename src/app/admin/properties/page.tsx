"use client";

import { useState, useMemo } from "react";
import { PropertiesHero } from "@/components/properties/property-hero";
import { SearchFilters } from "@/components/properties/search-filters";
import { PropertyCard } from "@/components/properties/property-card";
import { PropertyModal } from "@/components/properties/property-modal";
import { Property } from "@/common/types";
import { properties } from "@/common/data";

import { AdminPropertyCard } from "@/components/admin/properties/admin-property-card";
import { PropertyEditDialog } from "@/components/admin/properties/property-edit-modal";
import { Building, Home, MapPin, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

import { initialProperties } from "@/common/properties";

import { useMainContext } from "@/components/provider/main-provider";

export default function Page() {
  const [properties, setProperties] = useState(initialProperties);
  const [editingProperty, setEditingProperty] = useState<
    (typeof initialProperties)[0] | null
  >(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const totalProperties = properties.length;
  const availableProperties = properties.filter(
    (p) => p.status === "Available"
  ).length;
  const rentedProperties = properties.filter(
    (p) => p.status === "Rented"
  ).length;
  const totalRevenue = properties.reduce(
    (sum, p) => sum + (p.monthlyRevenue || 0),
    0
  );

  const handleEditProperty = (property: (typeof initialProperties)[0]) => {
    setEditingProperty(property);
    setIsEditDialogOpen(true);
  };

  const handleSaveProperty = (
    updatedProperty: (typeof initialProperties)[0]
  ) => {
    setProperties((prev) =>
      prev.map((p) => (p.id === updatedProperty.id ? updatedProperty : p))
    );
    // toast({
    //   title: "Property Updated",
    //   description: "Property details have been successfully updated.",
    // });
  };

  const handleViewProperty = (property: (typeof initialProperties)[0]) => {
    // toast({
    //   title: "View Property",
    //   description: `Viewing details for ${property.title}`,
    // });
  };

  const handleDeleteProperty = (property: (typeof initialProperties)[0]) => {
    // toast({
    //   title: "Delete Property",
    //   description: `Delete functionality for ${property.title}`,
    // });
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Button className="">
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
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Properties
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {properties.map((property) => (
            <AdminPropertyCard
              key={property.id}
              {...property}
              onEdit={() => handleEditProperty(property)}
              onView={() => handleViewProperty(property)}
              onDelete={() => handleDeleteProperty(property)}
            />
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
    </div>
  );
}
