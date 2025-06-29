"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { SlidersHorizontal, X } from "lucide-react";

interface Filters {
  minPrice: number;
  maxPrice: number;
  bedrooms: number;
  propertyType: string;
  location: string;
}

interface SearchFiltersProps {
  filters: Filters;
  setFilters: (filters: Filters) => void;
}

export const SearchFilters = ({ filters, setFilters }: SearchFiltersProps) => {
  const [showFilters, setShowFilters] = useState(false);

  const updateFilter = (key: keyof Filters, value: string | number) => {
    setFilters({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    setFilters({
      minPrice: 0,
      maxPrice: 10000000,
      bedrooms: 0,
      propertyType: "all",
      location: "",
    });
  };

  return (
    <div className="mb-8">
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="mb-4 hover-scale"
        >
          <SlidersHorizontal className="mr-2 h-4 w-4" />
          {showFilters ? "Hide Filters" : "Show Filters"}
        </Button>
      </motion.div>

      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <Card>
              <CardContent className="p-6">
                <motion.div 
                  className="flex justify-between items-center mb-4"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  <h3 className="text-lg font-semibold">Filter Properties</h3>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button variant="ghost" size="sm" onClick={clearFilters}>
                      <X className="mr-2 h-4 w-4" />
                      Clear All
                    </Button>
                  </motion.div>
                </motion.div>

                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: {},
                    visible: {
                      transition: {
                        staggerChildren: 0.1,
                        delayChildren: 0.2,
                      },
                    },
                  }}
                >
                  <motion.div
                    variants={{
                      hidden: { y: 20, opacity: 0 },
                      visible: { y: 0, opacity: 1 },
                    }}
                    whileHover={{ y: -2 }}
                  >
                    <label className="block text-sm font-medium mb-2">
                      Min Price
                    </label>
                    <Input
                      type="number"
                      placeholder="Min Price"
                      value={filters.minPrice}
                      onChange={(e) =>
                        updateFilter("minPrice", parseInt(e.target.value) || 0)
                      }
                    />
                  </motion.div>

                  <motion.div
                    variants={{
                      hidden: { y: 20, opacity: 0 },
                      visible: { y: 0, opacity: 1 },
                    }}
                    whileHover={{ y: -2 }}
                  >
                    <label className="block text-sm font-medium mb-2">
                      Max Price
                    </label>
                    <Input
                      type="number"
                      placeholder="Max Price"
                      value={filters.maxPrice === 10000000 ? "" : filters.maxPrice}
                      onChange={(e) =>
                        updateFilter(
                          "maxPrice",
                          parseInt(e.target.value) || 10000000
                        )
                      }
                    />
                  </motion.div>

                  <motion.div
                    variants={{
                      hidden: { y: 20, opacity: 0 },
                      visible: { y: 0, opacity: 1 },
                    }}
                    whileHover={{ y: -2 }}
                  >
                    <label className="block text-sm font-medium mb-2">
                      Bedrooms
                    </label>
                    <Select
                      value={filters.bedrooms.toString()}
                      onValueChange={(value) =>
                        updateFilter("bedrooms", parseInt(value))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Any" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">Any</SelectItem>
                        <SelectItem value="1">1+</SelectItem>
                        <SelectItem value="2">2+</SelectItem>
                        <SelectItem value="3">3+</SelectItem>
                        <SelectItem value="4">4+</SelectItem>
                        <SelectItem value="5">5+</SelectItem>
                      </SelectContent>
                    </Select>
                  </motion.div>

                  <motion.div
                    variants={{
                      hidden: { y: 20, opacity: 0 },
                      visible: { y: 0, opacity: 1 },
                    }}
                    whileHover={{ y: -2 }}
                  >
                    <label className="block text-sm font-medium mb-2">
                      Property Type
                    </label>
                    <Select
                      value={filters.propertyType}
                      onValueChange={(value) => updateFilter("propertyType", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="house">House</SelectItem>
                        <SelectItem value="apartment">Apartment</SelectItem>
                        <SelectItem value="villa">Villa</SelectItem>
                        <SelectItem value="condo">Condo</SelectItem>
                      </SelectContent>
                    </Select>
                  </motion.div>

                  <motion.div
                    variants={{
                      hidden: { y: 20, opacity: 0 },
                      visible: { y: 0, opacity: 1 },
                    }}
                    whileHover={{ y: -2 }}
                  >
                    <label className="block text-sm font-medium mb-2">
                      Location
                    </label>
                    <Input
                      placeholder="Enter location"
                      value={filters.location}
                      onChange={(e) => updateFilter("location", e.target.value)}
                    />
                  </motion.div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
