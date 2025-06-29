import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import DropdownSelect from "@/components/general/select-comp";
import InputWithLabel from "@/components/general/input-field";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import { Filter, Search, X, SlidersHorizontal } from "lucide-react";
import { SegmentedToggle } from "@/components/ui/segmented-toggle";
import {
  ABUJA_LOCATIONS,
  PRICE_TYPES,
  PROPERTY_TYPES,
  STATUS_OPTIONS,
  FEATURED_PROP,
} from "@/lib/constants";

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

interface PropertyFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  onClearFilters: () => void;
  isGroupedByLocation: boolean;
  onToggleGrouping: (grouped: boolean) => void;
  totalProperties: number;
  filteredCount: number;
}

export const PropertyFilters: React.FC<PropertyFiltersProps> = ({
  filters,
  onFiltersChange,
  onClearFilters,
  isGroupedByLocation,
  onToggleGrouping,
  totalProperties,
  filteredCount,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  const commonAmenities = [
    "Swimming Pool",
    "Gym/Fitness Center",
    "Air Conditioning",
    "Security System",
    "Parking Space",
    "Furnished",
    "Modern Appliances",
    "Balcony/Terrace",
    "Garden/Park",
    "Elevator",
  ];

  const updateFilter = (
    key: keyof FilterState,
    value: string | boolean | null | string[]
  ) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const handleAmenityToggle = (amenity: string) => {
    const newAmenities = selectedAmenities.includes(amenity)
      ? selectedAmenities.filter((a) => a !== amenity)
      : [...selectedAmenities, amenity];

    setSelectedAmenities(newAmenities);
    updateFilter("amenities", newAmenities);
  };

  const hasActiveFilters = Object.values(filters).some(
    (value) =>
      (typeof value === "string" && value !== "") ||
      (Array.isArray(value) && value.length > 0) ||
      (typeof value === "boolean" && value !== null)
  );

  const clearAllFilters = () => {
    onClearFilters();
    setSelectedAmenities([]);
  };

  return (
    <div className="mb-6 border-t-1 border-b-1 py-2 border-gray-300">
      <div>
        <div className=" flex flex-row gap-4 items-top justify-between">
          <div className="flex flex-col gap-2">
            <div className="hidden sm:flex items-center gap-1">
              <Filter className={"text-muted-foreground"} size={15} />

              <Label className="text-sm font-medium">Filters & Options</Label>
              {hasActiveFilters && (
                <Badge variant="secondary" className="ml-2">
                  {filteredCount} of {totalProperties}
                </Badge>
              )}
            </div>
            {/* Expand/Collapse Button */}

            <Button
              variant="outline"
              onClick={() => setIsExpanded(!isExpanded)}
              className="mb-4 w-max"
            >
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              {isExpanded ? "Hide Filters" : "Show Filters"}
            </Button>
          </div>

          {/* Group by Location Segmented Toggle */}
          <div className="flex flex-col gap-2 items-end ">
            <Label className="hidden sm:block text-sm font-medium ml-2">
              Group by Location
            </Label>
            <SegmentedToggle
              options={[
                { label: "List", value: "list" },
                { label: "Grouped", value: "grouped" },
              ]}
              value={isGroupedByLocation ? "grouped" : "list"}
              onChange={(val) => onToggleGrouping(val === "grouped")}
            />
          </div>
        </div>
      </div>

      <Collapsible open={isExpanded}>
        <CollapsibleContent>
          <CardContent className="p-3 border border-gray-200 shadow-md rounded-lg space-y-6">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search properties by title, location, or description..."
                value={filters.searchQuery}
                onChange={(e) => updateFilter("searchQuery", e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Basic Filters */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Location */}
              <DropdownSelect
                label="Location"
                placeholder="Select Location"
                name="location"
                value={filters.location}
                handleChange={(name, value) =>
                  updateFilter(name as keyof FilterState, value)
                }
                items={ABUJA_LOCATIONS}
              />

              {/* Property Type */}
              <DropdownSelect
                label="Property Type"
                placeholder="Select Property Type"
                name="propertyType"
                value={filters.propertyType}
                handleChange={(name, value) =>
                  updateFilter(name as keyof FilterState, value)
                }
                items={PROPERTY_TYPES}
              />

              {/* Price Type */}
              <DropdownSelect
                label="Price Type"
                placeholder="Select Price Type"
                name="priceType"
                value={filters.priceType}
                handleChange={(name, value) =>
                  updateFilter(name as keyof FilterState, value)
                }
                items={PRICE_TYPES}
              />

              {/* Status */}
              <DropdownSelect
                label="Status"
                placeholder="Select Status"
                name="status"
                value={filters.status}
                handleChange={(name, value) =>
                  updateFilter(name as keyof FilterState, value)
                }
                items={STATUS_OPTIONS}
              />
            </div>

            {/* Price Range */}
            <div className="space-y-3">
              <Label>Price Range (₦)</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputWithLabel
                  items={{
                    htmlfor: "minPrice",
                    label: "Minimum Price",
                    name: "minPrice",
                    type: "number",
                    placeholder: "0",
                  }}
                  onChange={(e) => updateFilter("minPrice", e.target.value)}
                />
                <InputWithLabel
                  items={{
                    htmlfor: "maxPrice",
                    label: "Maximum Price",
                    name: "maxPrice",
                    type: "number",
                    placeholder: "0",
                  }}
                  onChange={(e) => updateFilter("maxPrice", e.target.value)}
                />
              </div>
            </div>

            {/* Bedrooms & Bathrooms */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Bedrooms Range */}

              <div className="space-y-3">
                <Label>Bedrooms</Label>
                <div className="grid grid-cols-2 gap-4">
                  <InputWithLabel
                    items={{
                      htmlfor: "minBedrooms",
                      label: "Min",
                      name: "minBedrooms",
                      type: "number",
                      placeholder: "0",
                    }}
                    onChange={(e) =>
                      updateFilter("minBedrooms", e.target.value)
                    }
                  />
                  <InputWithLabel
                    items={{
                      htmlfor: "maxBedrooms",
                      label: "Max",
                      name: "maxBedrooms",
                      type: "number",
                      placeholder: "0",
                    }}
                    onChange={(e) =>
                      updateFilter("maxBedrooms", e.target.value)
                    }
                  />
                </div>
              </div>

              {/* Bathrooms Range */}
              <div className="space-y-3">
                <Label>Bathrooms</Label>
                <div className="grid grid-cols-2 gap-4">
                  <InputWithLabel
                    items={{
                      htmlfor: "minBathrooms",
                      label: "Min",
                      name: "minBathrooms",
                      type: "number",
                      placeholder: "0",
                    }}
                    onChange={(e) =>
                      updateFilter("minBathrooms", e.target.value)
                    }
                  />
                  <InputWithLabel
                    items={{
                      htmlfor: "maxBathrooms",
                      label: "Max",
                      name: "maxBathrooms",
                      type: "number",
                      placeholder: "0",
                    }}
                    onChange={(e) =>
                      updateFilter("maxBathrooms", e.target.value)
                    }
                  />
                </div>
              </div>
            </div>

            {/* Square Feet Range */}
            <div className="space-y-3">
              <Label>Square Feet</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputWithLabel
                  items={{
                    htmlfor: "minSqft",
                    label: "Minimum Sqft",
                    name: "minSqft",
                    type: "number",
                    placeholder: "0",
                  }}
                  onChange={(e) => updateFilter("minSqft", e.target.value)}
                />
                <InputWithLabel
                  items={{
                    htmlfor: "maxSqft",
                    label: "Maximum Sqft",
                    name: "maxSqft",
                    type: "number",
                    placeholder: "0",
                  }}
                  onChange={(e) => updateFilter("maxSqft", e.target.value)}
                />
              </div>
            </div>

            {/* Featured Property */}
            <div className="space-y-3">
              <Label>Featured Property</Label>
              <div className="flex items-center gap-4">
                {FEATURED_PROP.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="radio"
                      id={item.id}
                      name={item.name}
                      checked={filters.featured === item.checked}
                      onChange={() => updateFilter("featured", item.id)}
                    />
                    <Label htmlFor={item.id}>{item.label}</Label>
                  </div>
                ))}

                {/* <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    id="featured-all"
                    name="featured"
                    checked={filters.featured === null}
                    onChange={() => updateFilter("featured", null)}
                  />
                  <Label htmlFor="featured-all">All Properties</Label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    id="featured-yes"
                    name="featured"
                    checked={filters.featured === true}
                    onChange={() => updateFilter("featured", true)}
                  />
                  <Label htmlFor="featured-yes">Featured Only</Label>
                </div>
                <div className="flex items-center gap-2 cursor-pointer transition-all ease-in-out duration-150">
                  <input
                    type="radio"
                    id="featured-no"
                    name="featured"
                    checked={filters.featured === false}
                    onChange={() => updateFilter("featured", false)}
                  />
                  <Label htmlFor="featured-no">Not Featured</Label>
                </div> */}
              </div>
            </div>

            {/* Amenities */}
            <div className="space-y-3">
              <Label>Amenities</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
                {commonAmenities.map((amenity) => (
                  <button
                    key={amenity}
                    type="button"
                    onClick={() => handleAmenityToggle(amenity)}
                    className={`cursor-pointer text-left p-2 rounded border text-sm transition-colors ${
                      selectedAmenities.includes(amenity)
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    {amenity}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-4 border-t">
              <div className="flex items-center gap-2">
                {hasActiveFilters && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearAllFilters}
                    className="flex items-center gap-2"
                  >
                    <X className="h-4 w-4" />
                    Clear All Filters
                  </Button>
                )}
              </div>
              <div className="text-sm text-muted-foreground">
                {filteredCount} of {totalProperties} properties
              </div>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};
