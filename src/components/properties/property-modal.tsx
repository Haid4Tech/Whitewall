import { MapPin, Bed, Bath, Square, Calendar, Star } from "lucide-react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogHeader,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Property } from "@/common/types";
import Image from "next/image";

interface PropertyModalProps {
  property: Property | null;
  isOpen: boolean;
  onClose: () => void;
  admin?: boolean;
}

export const PropertyModal = ({
  property,
  isOpen,
  onClose,
  admin,
}: PropertyModalProps) => {
  if (!property) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTitle></DialogTitle>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto scrollbar-width">
        <DialogHeader className="relative p-0">
          <div className="relative">
            <Image
              width={200}
              height={200}
              src={property.images[0]}
              alt={property.title}
              className="w-full h-64 object-cover"
            />

            {property.featured && (
              <Badge className="absolute top-4 left-4 bg-gradient-to-r from-blue-600 to-purple-600">
                Featured Property
              </Badge>
            )}
          </div>
        </DialogHeader>

        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl font-bold mb-2">{property.title}</h2>
              <div className="flex items-center text-muted-foreground mb-2">
                <MapPin className="h-4 w-4 mr-1" />
                {property.location}
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">{property.type}</Badge>
                <div className="flex items-center text-sm">
                  <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
                  4.8 (24 reviews)
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-primary">
                ${property.price.toLocaleString()}
              </div>
              <div className="text-muted-foreground">{property.priceType}</div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6 mb-6">
            <div className="flex items-center justify-center p-4 bg-muted rounded-lg">
              <Bed className="h-5 w-5 mr-2 text-primary" />
              <span className="font-semibold">
                {property.bedrooms} Bedrooms
              </span>
            </div>
            <div className="flex items-center justify-center p-4 bg-muted rounded-lg">
              <Bath className="h-5 w-5 mr-2 text-primary" />
              <span className="font-semibold">
                {property.bathrooms} Bathrooms
              </span>
            </div>
            <div className="flex items-center justify-center p-4 bg-muted rounded-lg">
              <Square className="h-5 w-5 mr-2 text-primary" />
              <span className="font-semibold">{property.sqft} sqft</span>
            </div>
          </div>

          <Separator className="my-6" />

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Description</h3>
            <p className="text-muted-foreground leading-relaxed">
              {property.description}
            </p>
          </div>

          <div className="mb-6 w-full">
            <h3 className="text-lg font-semibold mb-3">Features & Amenities</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {property.amenities.map((amenity, index) => (
                <div
                  key={index}
                  className="flex items-center p-2 bg-muted rounded"
                >
                  <span className="text-sm">{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          <Separator className="my-6" />

          {admin ? (
            <div className="flex gap-4">
              <Button variant={"destructive"} className="flex-1">
                <Calendar className="mr-2 h-4 w-4" />
                Delete property
              </Button>
              <Button variant="outline" className="flex-1">
                Edit property
              </Button>
            </div>
          ) : (
            <div className="flex gap-4">
              <Button className="flex-1">
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Viewing
              </Button>
              <Button variant="outline" className="flex-1">
                Contact Agent
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
