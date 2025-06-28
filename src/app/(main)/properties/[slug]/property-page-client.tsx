/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, useInView } from "framer-motion";
import {
  MapPin,
  Bed,
  Bath,
  Square,
  Calendar,
  Star,
  ArrowLeft,
  Heart,
  Share2,
  Phone,
  Mail,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Home,
  Car,
  Wifi,
  Coffee,
  Dumbbell,
  Shield,
  Users,
  Copy,
  Facebook,
  Twitter,
  Linkedin,
} from "lucide-react";
import { FaDog, FaSwimmingPool, FaWhatsapp } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Property } from "@/common/types";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";

export default function PropertyDetailPage({
  property,
}: {
  property: Property | null;
}) {
  //   const params = useParams();
  const router = useRouter();
  //   const [property, setProperty] = useState<Property | null>(null);
  //   const [loading, setLoading] = useState(true);
  const [error] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [expandedImage, setExpandedImage] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);

  // Animation refs
  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const descriptionRef = useRef(null);
  const amenitiesRef = useRef(null);
  const galleryRef = useRef(null);
  const contactRef = useRef(null);
  const agentRef = useRef(null);

  const isHeroInView = useInView(heroRef, { once: true });
  const isStatsInView = useInView(statsRef, { once: true, margin: "-100px" });
  const isDescriptionInView = useInView(descriptionRef, {
    once: true,
    margin: "-100px",
  });
  const isAmenitiesInView = useInView(amenitiesRef, {
    once: true,
    margin: "-100px",
  });
  const isGalleryInView = useInView(galleryRef, {
    once: true,
    margin: "-100px",
  });
  const isContactInView = useInView(contactRef, {
    once: true,
    margin: "-100px",
  });
  const isAgentInView = useInView(agentRef, { once: true, margin: "-100px" });

  const nextImage = () => {
    if (!property) return;
    setCurrentImageIndex((prev) =>
      prev === property.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    if (!property) return;
    setCurrentImageIndex((prev) =>
      prev === 0 ? property.images.length - 1 : prev - 1
    );
  };

  const shareProperty = async () => {
    if (!property) return;

    setIsSharing(true);
    router.refresh(); //To trigger generateMetadata()

    try {
      const shareData = {
        title: property.title,
        text: `Check out this amazing ${property.type} in ${
          property.location
        }! ${property.description.substring(0, 100)}...`,
        url: window.location.href,
      };

      // Try to use Web Share API first (mobile devices)
      if (
        navigator.share &&
        navigator.canShare &&
        navigator.canShare(shareData)
      ) {
        await navigator.share(shareData);
      } else {
        // Show share options for desktop
        setShowShareOptions(true);
      }
    } catch (error) {
      console.error("Error sharing property:", error);
      setShowShareOptions(true);
    } finally {
      setIsSharing(false);
    }
  };

  const copyToClipboard = async (text: string, successMessage: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert(successMessage);
      setShowShareOptions(false);
    } catch (error) {
      console.error("Error copying to clipboard:", error);
      alert("Unable to copy to clipboard. Please copy manually.");
    }
  };

  const shareOnSocialMedia = (platform: string) => {
    if (!property) return;

    const url = encodeURIComponent(window.location.href);
    // const title = encodeURIComponent(property.title);
    const text = encodeURIComponent(
      `Check out this amazing ${property.type} in ${property.location}!`
    );
    // const image = encodeURIComponent(property.images[0]);

    let shareUrl = "";

    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
        break;
      case "whatsapp":
        shareUrl = `https://wa.me/?text=${text}%20${url}`;
        break;
      default:
        return;
    }

    window.open(shareUrl, "_blank", "width=600,height=400");
    setShowShareOptions(false);
  };

  const copyPropertyDetails = () => {
    if (!property) return;

    const shareText = `${property.title}\n\n${property.description.substring(
      0,
      200
    )}...\n\nPrice: $${property.price.toLocaleString()} ${
      property.priceType
    }\nLocation: ${property.location}\nBedrooms: ${
      property.bedrooms
    } | Bathrooms: ${property.bathrooms} | ${
      property.sqft
    } sqft\n\nView more: ${window.location.href}`;

    copyToClipboard(shareText, "Property details copied to clipboard!");
  };

  const copyPropertyUrl = () => {
    copyToClipboard(window.location.href, "Property URL copied to clipboard!");
  };

  /*  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col items-center justify-center">
        <LoadingSpinner size="lg" />
        <p className="mt-6 text-slate-600 text-lg">
          Loading your dream home...
        </p>
      </div>
    );
  } */

  if (error || !property) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <X className="w-12 h-12 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">
            {error || "Property not found"}
          </h2>
          <p className="text-slate-600 mb-8">
            The property you&apos;re looking for doesn&apos;t exist or has been
            removed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => router.back()}
              variant="outline"
              className="flex-1 sm:flex-none"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Button>
            <Button
              onClick={() => router.push("/properties")}
              className="flex-1 sm:flex-none"
            >
              Browse Properties
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const amenityIcons: { [key: string]: any } = {
    "Swimming Pool": <Coffee className="w-5 h-5" />,
    Garage: <Car className="w-5 h-5" />,
    Garden: <Home className="w-5 h-5" />,
    "Security System": <Shield className="w-5 h-5" />,
    "Air Conditioning": <Wifi className="w-5 h-5" />,
    Fireplace: <Home className="w-5 h-5" />,
    Gym: <Dumbbell className="w-5 h-5" />,
    "Fitness Center": <Dumbbell className="w-5 h-5" />,
    "Pet Friendly": <FaDog className="w-5 h-5" />,
    Pool: <FaSwimmingPool className="w-5 h-5 " />,
    Concierge: <Users className="w-5 h-5" />,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pb-12">
      {/* Hero Section with Image */}
      <motion.div
        ref={heroRef}
        className="relative h-[70vh] md:h-[80vh] lg:h-[85vh] overflow-hidden"
        initial={{ opacity: 0 }}
        animate={isHeroInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        {/* Background Image */}
        <motion.div
          initial={{ scale: 1.1 }}
          animate={isHeroInView ? { scale: 1 } : {}}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <Image
            src={property.images[currentImageIndex]}
            alt={property.title}
            fill
            className="object-cover"
            priority
          />
        </motion.div>

        {/* Gradient Overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-transparent"
          onClick={() => setExpandedImage(property.images[currentImageIndex])}
          initial={{ opacity: 0 }}
          animate={isHeroInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        />

        {/* Navigation */}
        <motion.div
          className="absolute top-0 left-0 right-0 z-20 p-4 md:p-6"
          initial={{ y: -50, opacity: 0 }}
          animate={isHeroInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-center justify-between">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                onClick={() => router.back()}
                className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-0"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            </motion.div>
            <div className="flex items-center gap-2">
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  variant="ghost"
                  size="icon"
                  className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-0"
                  onClick={() => setIsFavorite(!isFavorite)}
                >
                  <Heart
                    className={`h-5 w-5 ${
                      isFavorite ? "fill-red-500 text-red-500" : ""
                    }`}
                  />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  variant="ghost"
                  size="icon"
                  className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-0 disabled:opacity-50"
                  onClick={shareProperty}
                  disabled={isSharing}
                  title="Share Property"
                >
                  {isSharing ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Share2 className="h-5 w-5" />
                  )}
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Image Navigation */}
        {property.images.length > 1 && (
          <>
            <motion.button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-full p-3 transition-all"
              initial={{ x: -50, opacity: 0 }}
              animate={isHeroInView ? { x: 0, opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft className="h-6 w-6" />
            </motion.button>
            <motion.button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-full p-3 transition-all"
              initial={{ x: 50, opacity: 0 }}
              animate={isHeroInView ? { x: 0, opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight className="h-6 w-6" />
            </motion.button>
          </>
        )}

        {/* Expand Button */}
        <motion.button
          onClick={() => setExpandedImage(property.images[currentImageIndex])}
          className="absolute hidden md:block md:bottom-4  right-4 z-20 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-full p-3 transition-all"
          initial={{ scale: 0, opacity: 0 }}
          animate={isHeroInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Maximize2 className="h-5 w-5" />
        </motion.button>

        {/* Image Counter */}
        <motion.div
          className="absolute bottom-4 left-4 z-20 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm"
          initial={{ y: 20, opacity: 0 }}
          animate={isHeroInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {currentImageIndex + 1} / {property.images.length}
        </motion.div>

        {/* Property Info Overlay */}
        <motion.div
          className="absolute bottom-12 left-0 right-0 p-4 md:p-6 lg:p-8 "
          initial={{ y: 50, opacity: 0 }}
          animate={isHeroInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
              <motion.div
                className="text-white"
                initial={{ x: -30, opacity: 0 }}
                animate={isHeroInView ? { x: 0, opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.9 }}
              >
                <motion.div
                  className="flex items-center gap-3 mb-2"
                  initial={{ y: 20, opacity: 0 }}
                  animate={isHeroInView ? { y: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.6, delay: 1.0 }}
                >
                  {property.featured && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={isHeroInView ? { scale: 1 } : {}}
                      transition={{ duration: 0.5, delay: 1.1, type: "spring" }}
                    >
                      <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0">
                        Featured
                      </Badge>
                    </motion.div>
                  )}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isHeroInView ? { scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 1.2, type: "spring" }}
                  >
                    <Badge
                      variant="secondary"
                      className="bg-white/20 backdrop-blur-sm text-white border-0"
                    >
                      {property.type}
                    </Badge>
                  </motion.div>
                </motion.div>
                <motion.h1
                  className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2"
                  initial={{ y: 30, opacity: 0 }}
                  animate={isHeroInView ? { y: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.8, delay: 1.1 }}
                >
                  {property.title}
                </motion.h1>
                <motion.div
                  className="flex items-center text-white/90 text-lg"
                  initial={{ y: 20, opacity: 0 }}
                  animate={isHeroInView ? { y: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.6, delay: 1.3 }}
                >
                  <MapPin className="h-5 w-5 mr-2" />
                  {property.location}
                </motion.div>
              </motion.div>
              <motion.div
                className="text-white text-right"
                initial={{ x: 30, opacity: 0 }}
                animate={isHeroInView ? { x: 0, opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 1.0 }}
              >
                <motion.div
                  className="text-3xl md:text-4xl lg:text-5xl font-bold"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={isHeroInView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ duration: 0.8, delay: 1.2, type: "spring" }}
                >
                  ${property.price.toLocaleString()}
                </motion.div>
                <motion.div
                  className="text-white/80 text-lg"
                  initial={{ y: 10, opacity: 0 }}
                  animate={isHeroInView ? { y: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.6, delay: 1.4 }}
                >
                  {property.priceType}
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 -mt-12 relative z-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Stats */}
            <motion.div
              ref={statsRef}
              className="bg-white rounded-2xl shadow-xl p-6 md:p-8"
              initial={{ y: 50, opacity: 0 }}
              animate={isStatsInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <div className="grid grid-cols-3 gap-4 md:gap-6">
                <motion.div
                  className="text-center"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={isStatsInView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <motion.div
                    className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Bed className="h-8 w-8 text-blue-600" />
                  </motion.div>
                  <div className="text-2xl font-bold text-slate-900">
                    {property.bedrooms}
                  </div>
                  <div className="text-slate-600">Bedrooms</div>
                </motion.div>
                <motion.div
                  className="text-center"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={isStatsInView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <motion.div
                    className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Bath className="h-8 w-8 text-green-600" />
                  </motion.div>
                  <div className="text-2xl font-bold text-slate-900">
                    {property.bathrooms}
                  </div>
                  <div className="text-slate-600">Bathrooms</div>
                </motion.div>
                <motion.div
                  className="text-center"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={isStatsInView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <motion.div
                    className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Square className="h-8 w-8 text-purple-600" />
                  </motion.div>
                  <div className="text-2xl font-bold text-slate-900">
                    {property.sqft}
                  </div>
                  <div className="text-slate-600">sqft</div>
                </motion.div>
              </div>
            </motion.div>

            {/* Description */}
            <motion.div
              ref={descriptionRef}
              className="bg-white rounded-2xl shadow-xl p-6 md:p-8"
              initial={{ y: 50, opacity: 0 }}
              animate={isDescriptionInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <motion.h2
                className="text-2xl md:text-3xl font-bold text-slate-900 mb-6"
                initial={{ x: -30, opacity: 0 }}
                animate={isDescriptionInView ? { x: 0, opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                About This Property
              </motion.h2>
              <motion.p
                className="text-slate-700 leading-relaxed text-lg"
                initial={{ y: 20, opacity: 0 }}
                animate={isDescriptionInView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.7, delay: 0.3 }}
              >
                {property.description}
              </motion.p>
            </motion.div>

            {/* Amenities */}
            <motion.div
              ref={amenitiesRef}
              className="bg-white rounded-2xl shadow-xl p-6 md:p-8"
              initial={{ y: 50, opacity: 0 }}
              animate={isAmenitiesInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <motion.h2
                className="text-2xl md:text-3xl font-bold text-slate-900 mb-6"
                initial={{ x: -30, opacity: 0 }}
                animate={isAmenitiesInView ? { x: 0, opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Amenities & Features
              </motion.h2>
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
                initial="hidden"
                animate={isAmenitiesInView ? "visible" : "hidden"}
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: 0.1,
                    },
                  },
                }}
              >
                {property.amenities.map((amenity, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
                    initial={{ x: -20, opacity: 0 }}
                    animate={isAmenitiesInView ? { x: 0, opacity: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    whileHover={{ scale: 1.02, x: 5 }}
                  >
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4 text-blue-600">
                      {amenityIcons[amenity] || (
                        <Home className="w-5 h-5 text-blue-600" />
                      )}
                    </div>
                    <span className="font-medium text-slate-700">
                      {amenity}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Image Gallery */}
            <motion.div
              ref={galleryRef}
              className="bg-white rounded-2xl shadow-xl p-6 md:p-8"
              initial={{ y: 50, opacity: 0 }}
              animate={isGalleryInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <motion.h2
                className="text-2xl md:text-3xl font-bold text-slate-900 mb-6"
                initial={{ x: -30, opacity: 0 }}
                animate={isGalleryInView ? { x: 0, opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Photo Gallery
              </motion.h2>
              <motion.div
                className="grid grid-cols-2 md:grid-cols-3 gap-4"
                initial="hidden"
                animate={isGalleryInView ? "visible" : "hidden"}
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: 0.1,
                    },
                  },
                }}
              >
                {property.images.map((image, index) => (
                  <motion.div
                    key={index}
                    className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group"
                    onClick={() => setExpandedImage(image)}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={isGalleryInView ? { scale: 1, opacity: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <Image
                      src={image}
                      alt={`${property.title} - Image ${index + 1}`}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Contact Card */}
            <motion.div
              ref={contactRef}
              className="bg-white rounded-2xl shadow-xl p-6 md:p-8 sticky top-6 z-50"
              initial={{ x: 50, opacity: 0 }}
              animate={isContactInView ? { x: 0, opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <motion.div
                className="text-center mb-6"
                initial={{ y: 20, opacity: 0 }}
                animate={isContactInView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <motion.div
                  className="text-3xl md:text-4xl font-bold text-slate-900 mb-2"
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  ₦{property.price.toLocaleString()}
                </motion.div>
                <div className="text-slate-600 text-lg">
                  {property.priceType}
                </div>
              </motion.div>

              <motion.div
                className="space-y-4"
                initial="hidden"
                animate={isContactInView ? "visible" : "hidden"}
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: 0.15,
                    },
                  },
                }}
              >
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={isContactInView ? { y: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Button className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    <Calendar className="mr-2 h-5 w-5" />
                    Schedule Viewing
                  </Button>
                </motion.div>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={isContactInView ? { y: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Button variant="outline" className="w-full h-12 text-lg">
                    <Phone className="mr-2 h-5 w-5" />
                    Call Agent
                  </Button>
                </motion.div>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={isContactInView ? { y: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Button variant="outline" className="w-full h-12 text-lg">
                    <Mail className="mr-2 h-5 w-5" />
                    Send Message
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Agent Card */}
            <motion.div
              ref={agentRef}
              className="bg-white rounded-2xl shadow-xl p-6 md:p-8"
              initial={{ x: 50, opacity: 0 }}
              animate={isAgentInView ? { x: 0, opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <motion.h3
                className="text-xl font-bold text-slate-900 mb-4"
                initial={{ y: 20, opacity: 0 }}
                animate={isAgentInView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Listed by
              </motion.h3>
              <motion.div
                className="flex items-center mb-6"
                initial={{ y: 20, opacity: 0 }}
                animate={isAgentInView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <motion.div
                  className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4"
                  animate={{ y: [0, -5, 0] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  JD
                </motion.div>
                <div>
                  <div className="font-semibold text-slate-900 text-lg">
                    John Doe
                  </div>
                  <div className="text-slate-600">Real Estate Agent</div>
                  <div className="flex items-center text-yellow-500 mt-1">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="text-slate-600 ml-1">
                      4.9 (127 reviews)
                    </span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="space-y-3"
                initial="hidden"
                animate={isAgentInView ? "visible" : "hidden"}
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: 0.1,
                    },
                  },
                }}
              >
                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={isAgentInView ? { x: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  whileHover={{ x: 5 }}
                >
                  <Button variant="outline" className="w-full justify-start">
                    <Phone className="mr-3 h-4 w-4" />
                    (555) 123-4567
                  </Button>
                </motion.div>
                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={isAgentInView ? { x: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  whileHover={{ x: 5 }}
                >
                  <Button variant="outline" className="w-full justify-start">
                    <Mail className="mr-3 h-4 w-4" />
                    john.doe@example.com
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Share Options Modal */}
      {showShareOptions && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={() => setShowShareOptions(false)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-2xl p-6 max-w-sm w-full mx-4"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-900">
                Share Property
              </h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowShareOptions(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-3">
              {/* Social Media Options */}
              <motion.div
                className="grid grid-cols-4 gap-3"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: 0.1,
                    },
                  },
                }}
              >
                <motion.div
                  variants={{
                    hidden: { scale: 0, opacity: 0 },
                    visible: { scale: 1, opacity: 1 },
                  }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex flex-col items-center gap-1 h-auto py-3"
                    onClick={() => shareOnSocialMedia("facebook")}
                  >
                    <Facebook className="h-5 w-5 text-blue-600" />
                    <span className="text-xs">Facebook</span>
                  </Button>
                </motion.div>
                <motion.div
                  variants={{
                    hidden: { scale: 0, opacity: 0 },
                    visible: { scale: 1, opacity: 1 },
                  }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex flex-col items-center gap-1 h-auto py-3"
                    onClick={() => shareOnSocialMedia("twitter")}
                  >
                    <Twitter className="h-5 w-5 text-blue-400" />
                    <span className="text-xs">Twitter</span>
                  </Button>
                </motion.div>
                <motion.div
                  variants={{
                    hidden: { scale: 0, opacity: 0 },
                    visible: { scale: 1, opacity: 1 },
                  }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex flex-col items-center gap-1 h-auto py-3"
                    onClick={() => shareOnSocialMedia("linkedin")}
                  >
                    <Linkedin className="h-5 w-5 text-blue-700" />
                    <span className="text-xs">LinkedIn</span>
                  </Button>
                </motion.div>
                <motion.div
                  variants={{
                    hidden: { scale: 0, opacity: 0 },
                    visible: { scale: 1, opacity: 1 },
                  }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex flex-col items-center gap-1 h-auto py-3"
                    onClick={() => shareOnSocialMedia("whatsapp")}
                  >
                    <FaWhatsapp className="h-5 w-5 text-green-600" />
                    <span className="text-xs">WhatsApp</span>
                  </Button>
                </motion.div>
              </motion.div>

              <Separator />

              {/* Copy Options */}
              <motion.div
                className="space-y-2"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: 0.1,
                    },
                  },
                }}
              >
                <motion.div
                  variants={{
                    hidden: { x: -20, opacity: 0 },
                    visible: { x: 0, opacity: 1 },
                  }}
                  whileHover={{ x: 5 }}
                >
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={copyPropertyDetails}
                  >
                    <Copy className="mr-2 h-4 w-4" />
                    Copy Property Details
                  </Button>
                </motion.div>
                <motion.div
                  variants={{
                    hidden: { x: -20, opacity: 0 },
                    visible: { x: 0, opacity: 1 },
                  }}
                  whileHover={{ x: 5 }}
                >
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={copyPropertyUrl}
                  >
                    <Copy className="mr-2 h-4 w-4" />
                    Copy URL
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Expanded Image Modal */}
      {expandedImage && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={() => setExpandedImage(null)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="relative max-w-4xl w-full mx-4"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            <Image
              src={expandedImage}
              alt={property.title}
              width={1200}
              height={800}
              className="w-full h-auto rounded-2xl shadow-2xl"
            />
            <motion.button
              className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-full p-3 transition-all"
              onClick={() => setExpandedImage(null)}
              whileHover={{ scale: 1.1 }}
            >
              <X className="h-6 w-6" />
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
