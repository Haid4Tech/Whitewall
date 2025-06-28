import { Heart, MapPin, Bed, Bath, Square } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Property } from "@/common/types";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface PropertyCardProps {
  property: Property;
}

export const PropertyCard = ({ property }: PropertyCardProps) => {
  // Check if property has required fields
  if (!property || !property.images || !property.images[0]) {
    return null;
  }

  return (
    <Link href={`/properties/${property.slug}`} passHref legacyBehavior>
      <a className="block">
        <Card className="group cursor-pointer overflow-hidden hover-scale transition-all duration-300 hover:shadow-2xl animate-fade-in">
          <div className="relative overflow-hidden">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                width={200}
                height={200}
                src={property.images[0]}
                alt={property.title}
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </motion.div>

            <motion.div
              className="absolute top-3 left-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <Badge
                variant="secondary"
                className="bg-white/90 text-foreground"
              >
                {property.type}
              </Badge>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-3 right-3 bg-white/90 hover:bg-white"
              >
                <Heart className="h-4 w-4" />
              </Button>
            </motion.div>

            {property.featured && (
              <motion.div
                className="absolute bottom-3 left-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <Badge className="bg-primary-gold text-white">Featured</Badge>
              </motion.div>
            )}
          </div>

          <CardContent className="p-4">
            <motion.div
              className="mb-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-primary transition-colors">
                {property.title}
              </h3>
              <div className="flex items-center text-muted-foreground text-sm mt-1">
                <MapPin className="h-4 w-4 mr-1" />
                {property.location}
              </div>
            </motion.div>

            <motion.div
              className="flex items-center justify-between mb-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <motion.div
                className="text-2xl font-bold text-primary"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                ₦{property?.price?.toLocaleString() ?? 0}
              </motion.div>
              <div className="text-sm text-muted-foreground">
                {property.priceType}
              </div>
            </motion.div>

            <motion.div
              className="flex items-center gap-4 text-sm text-muted-foreground"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              <motion.div
                className="flex items-center"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                <Bed className="h-4 w-4 mr-1" />
                {property.bedrooms}
              </motion.div>
              <motion.div
                className="flex items-center"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                <Bath className="h-4 w-4 mr-1" />
                {property.bathrooms}
              </motion.div>
              <motion.div
                className="flex items-center"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                <Square className="h-4 w-4 mr-1" />
                {property.sqft} sqft
              </motion.div>
            </motion.div>
          </CardContent>
        </Card>
      </a>
    </Link>
  );
};
