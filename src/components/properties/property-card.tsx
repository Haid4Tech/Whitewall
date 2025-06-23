import { Heart, MapPin, Bed, Bath, Square } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Property } from "@/common/types";
import Image from "next/image";
import Link from "next/link";

interface PropertyCardProps {
  property: Property;
}

export const PropertyCard = ({ property }: PropertyCardProps) => {
  return (
    <Link href={`/properties/${property.id}`} passHref legacyBehavior>
      <a className="block">
        <Card className="group cursor-pointer overflow-hidden hover-scale transition-all duration-300 hover:shadow-2xl animate-fade-in">
          <div className="relative overflow-hidden">
            <Image
              width={200}
              height={200}
              src={property.images[0]}
              alt={property.title}
              className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute top-3 left-3">
              <Badge
                variant="secondary"
                className="bg-white/90 text-foreground"
              >
                {property.type}
              </Badge>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-3 right-3 bg-white/90 hover:bg-white"
            >
              <Heart className="h-4 w-4" />
            </Button>
            {property.featured && (
              <div className="absolute bottom-3 left-3">
                <Badge className="bg-primary-gold text-white">Featured</Badge>
              </div>
            )}
          </div>

          <CardContent className="p-4">
            <div className="mb-2">
              <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-primary transition-colors">
                {property.title}
              </h3>
              <div className="flex items-center text-muted-foreground text-sm mt-1">
                <MapPin className="h-4 w-4 mr-1" />
                {property.location}
              </div>
            </div>

            <div className="flex items-center justify-between mb-3">
              <div className="text-2xl font-bold text-primary">
                ${property.price.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">
                {property.priceType}
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Bed className="h-4 w-4 mr-1" />
                {property.bedrooms}
              </div>
              <div className="flex items-center">
                <Bath className="h-4 w-4 mr-1" />
                {property.bathrooms}
              </div>
              <div className="flex items-center">
                <Square className="h-4 w-4 mr-1" />
                {property.sqft} sqft
              </div>
            </div>
          </CardContent>
        </Card>
      </a>
    </Link>
  );
};
