"use client";

import { useState, useMemo } from "react";
import { PropertiesHero } from "@/components/properties/property-hero";
import { SearchFilters } from "@/components/properties/search-filters";
import { PropertyCard } from "@/components/properties/property-card";
import { PropertyModal } from "@/components/properties/property-modal";
import { Property } from "@/common/types";
import { properties } from "@/common/data";

export default function Page() {
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

  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      const matchesSearch =
        property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPrice =
        property.price >= filters.minPrice &&
        property.price <= filters.maxPrice;
      const matchesBedrooms =
        filters.bedrooms === 0 || property.bedrooms >= filters.bedrooms;
      const matchesType =
        filters.propertyType === "all" ||
        property.type === filters.propertyType;
      const matchesLocation =
        !filters.location ||
        property.location
          .toLowerCase()
          .includes(filters.location.toLowerCase());

      return (
        matchesSearch &&
        matchesPrice &&
        matchesBedrooms &&
        matchesType &&
        matchesLocation
      );
    });
  }, [searchQuery, filters]);

  return (
    <div className="min-h-screen bg-background">
      <PropertiesHero
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <div className="container mx-auto px-4 py-8">
        <SearchFilters filters={filters} setFilters={setFilters} />

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            {filteredProperties.length} Properties Available
          </h2>
          <p className="text-muted-foreground">
            Discover your perfect home from our curated selection
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onClick={() => setSelectedProperty(property)}
            />
          ))}
        </div>

        {filteredProperties.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No properties found
            </h3>
            <p className="text-muted-foreground">
              Try adjusting your search criteria
            </p>
          </div>
        )}
      </div>

      <PropertyModal
        property={selectedProperty}
        isOpen={!!selectedProperty}
        onClose={() => setSelectedProperty(null)}
      />
    </div>
  );
}
