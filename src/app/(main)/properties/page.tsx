"use client";

import { useState, useMemo, useEffect } from "react";
import { PropertiesHero } from "@/components/properties/property-hero";
import { SearchFilters } from "@/components/properties/search-filters";
import { PropertyCard } from "@/components/properties/property-card";
import { PropertyModal } from "@/components/properties/property-modal";
import { Property } from "@/common/types";
import { getProperties, searchProperties } from "@/firebase/properties";
import LoadingSpinner from "@/components/ui/loading-spinner";
// import { LoadingSpinner } from "@/components/ui/loading-spinner";

export default function Page() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
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

  useEffect(() => {
    const getPropertiesData = async () => {
      const response = await getProperties();
      setProperties(response);
    };

    getPropertiesData();
  }, []);

  useEffect(() => {
    const getPropertiesData = async () => {
      const response = await getProperties();
      setProperties(response);
    };

    getPropertiesData();
  }, []);

  useEffect(() => {
    const getPropertiesData = async () => {
      const response = await getProperties();
      setProperties(response);
    };

    getPropertiesData();
  }, []);

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

  // Filter properties based on search and filters
  const filteredProperties = useMemo(() => {
    if (loading) return [];

    return properties.filter((property) => {
      const matchesSearch =
        property?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property?.location?.toLowerCase().includes(searchQuery.toLowerCase());
      property?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property?.location?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPrice =
        property?.price &&
        property?.price >= filters.minPrice &&
        property?.price <= filters.maxPrice;
      property?.price &&
        property?.price >= filters.minPrice &&
        property?.price <= filters.maxPrice;
      const matchesBedrooms =
        filters.bedrooms === 0 || (property?.bedrooms ?? 0) >= filters.bedrooms;
      filters.bedrooms === 0 || (property?.bedrooms ?? 0) >= filters.bedrooms;
      const matchesType =
        filters.propertyType === "all" ||
        property.type === filters.propertyType;
      const matchesLocation =
        !filters.location || property?.location?.toLowerCase();
      property?.location
        ?.toLowerCase()
        .includes(filters.location.toLowerCase());

      return (
        matchesSearch &&
        matchesPrice &&
        matchesBedrooms &&
        matchesType &&
        matchesLocation
      );
    });
  }, [properties, searchQuery, filters, loading]);

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
            <PropertyCard key={property.id} property={property} />
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
