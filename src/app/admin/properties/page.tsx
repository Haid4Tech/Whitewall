"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, MapPin, Bed, Bath, Square } from "lucide-react";
import { PropertyForm } from "@/components/admin/properties-form";

interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  status: "active" | "sold" | "pending";
  image: string;
}

const mockProperties: Property[] = [
  {
    id: "1",
    title: "Modern Family Home",
    price: 850000,
    location: "Downtown, City Center",
    bedrooms: 4,
    bathrooms: 3,
    sqft: 2500,
    status: "active",
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400",
  },
  {
    id: "2",
    title: "Luxury Apartment",
    price: 650000,
    location: "Uptown, Business District",
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1200,
    status: "pending",
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400",
  },
];

export default function Page() {
  const [properties, setProperties] = useState<Property[]>(mockProperties);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);

  const filteredProperties = properties.filter(
    (property) =>
      property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "sold":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Properties</h1>
          <p className="text-muted-foreground">Manage your property listings</p>
        </div>
        <Button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Property
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search properties..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProperties.map((property) => (
          <Card
            key={property.id}
            className="overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="aspect-video bg-muted relative">
              <img
                src={property.image}
                alt={property.title}
                className="w-full h-full object-cover"
              />
              <Badge
                className={`absolute top-3 right-3 ${getStatusColor(
                  property.status
                )}`}
              >
                {property.status}
              </Badge>
            </div>
            <div className="p-4 space-y-3">
              <div>
                <h3 className="font-semibold text-lg">{property.title}</h3>
                <p className="text-2xl font-bold text-primary">
                  ${property.price.toLocaleString()}
                </p>
              </div>

              <div className="flex items-center gap-1 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">{property.location}</span>
              </div>

              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Bed className="h-4 w-4" />
                  <span>{property.bedrooms} bed</span>
                </div>
                <div className="flex items-center gap-1">
                  <Bath className="h-4 w-4" />
                  <span>{property.bathrooms} bath</span>
                </div>
                <div className="flex items-center gap-1">
                  <Square className="h-4 w-4" />
                  <span>{property.sqft} sqft</span>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  Edit
                </Button>
                <Button variant="destructive" size="sm" className="flex-1">
                  Delete
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {showForm && (
        <PropertyForm
          onClose={() => setShowForm(false)}
          onSave={(property) => {
            setProperties([
              ...properties,
              { ...property, id: Date.now().toString() },
            ]);
            setShowForm(false);
          }}
        />
      )}
    </div>
  );
}
