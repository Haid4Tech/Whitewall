import {
  MapPin,
  Bed,
  Bath,
  Maximize2,
  Calendar,
  DollarSign,
  Edit,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

import PropertiesDropDown from "./properties-dropdown";
import { Property } from "@/common/types";
import { formatTimestamp } from "@/lib/utils";

interface PropertyCardProps {
  property: Property;
  onEdit?: () => void;
  onView?: () => void;
  onDelete?: () => void;
}

export const AdminPropertyCard = ({
  property,
  onEdit,
  onView,
  onDelete,
}: PropertyCardProps) => {
  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case "rented":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      case "maintenance":
        return "bg-orange-100 text-orange-800 hover:bg-orange-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 bg-white">
      <div className="relative">
        <div className="aspect-[4/3] overflow-hidden">
          <img
            src={property.images[0]}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Status Badge */}
        <Badge
          className={`absolute top-3 left-3 capitalize font-medium ${getStatusColor(
            status
          )}`}
        >
          {status}
        </Badge>

        {/* Actions Dropdown */}
        <div className="absolute top-3 right-3">
          <PropertiesDropDown
            onEdit={onEdit}
            onView={onView}
            onDelete={onDelete}
          />
        </div>

        {/* Price Overlay */}
        <div className="absolute bottom-3 left-3">
          <div className="bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-sm">
            <div className="text-2xl font-bold text-gray-900">
              {formatPrice(property.price)}
            </div>
          </div>
        </div>
      </div>

      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Title and Location */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 transition-colors line-clamp-1">
              {property.title}
            </h3>
            <div className="flex items-center text-gray-600 mt-1">
              <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
              <span className="text-sm line-clamp-1">{property.location}</span>
            </div>
          </div>

          {/* Property Details */}
          <div className="flex items-center gap-4 text-gray-600">
            <div className="flex items-center">
              <Bed className="h-4 w-4 mr-1" />
              <span className="text-sm font-medium">{property.bedrooms}</span>
            </div>
            <div className="flex items-center">
              <Bath className="h-4 w-4 mr-1" />
              <span className="text-sm font-medium">{property.bathrooms}</span>
            </div>
            <div className="flex items-center">
              <Maximize2 className="h-4 w-4 mr-1" />
              <span className="text-sm font-medium">
                {property.sqft.toLocaleString()} ft²
              </span>
            </div>
          </div>

          {/* Date Added */}
          <div className="flex items-center text-gray-400 text-xs">
            <Calendar className={"mr-1"} size={13} />
            Added {formatTimestamp(property.createdAt)}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={onView}
            >
              <Eye className="h-4 w-4 mr-2" />
              View
            </Button>
            <Button size="sm" className="flex-1" onClick={onEdit}>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
