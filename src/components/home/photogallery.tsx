"use client";

import Image from "next/image";
import ImageSwiper from "../gallery/image-swiper";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { getRecentProperties } from "@/firebase/properties";
import { Property } from "@/common/types";
import { getPhotoGalleryCache, setPhotoGalleryCache } from "@/lib/utils";

const PhotoGallery = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [images, setImages] = useState<{ src: string; alt: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [featuredImage, setFeaturedImage] = useState<{
    src: string;
    alt: string;
  } | null>(null);

  // Function to extract images from properties
  const extractImagesFromProperties = (properties: Property[]) => {
    const allImages: { src: string; alt: string }[] = [];

    properties.forEach((property) => {
      if (property.images && property.images.length > 0) {
        // Add first image from each property
        allImages.push({
          src: property.images[0],
          alt: `${property.title} - ${property.location}`,
        });
      }
    });

    return allImages;
  };

  // Function to fetch and cache images
  const fetchRecentPropertyImages = async () => {
    // Check if cache is still valid
    const cachedImages = getPhotoGalleryCache();
    if (cachedImages && cachedImages.length > 0) {
      setImages(cachedImages.slice(0, 5)); // Use first 5 images for swiper
      setFeaturedImage(cachedImages[5] || cachedImages[0]); // Use 6th image or first as featured
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const recentProperties = await getRecentProperties(10); // Get more properties to have enough images
      const extractedImages = extractImagesFromProperties(recentProperties);

      // Update cache
      setPhotoGalleryCache(extractedImages);

      // Set images for display
      setImages(extractedImages.slice(0, 5)); // First 5 for swiper
      setFeaturedImage(extractedImages[5] || extractedImages[0]); // 6th or first as featured
    } catch (error) {
      console.error("Error fetching recent property images:", error);
      // Fallback to default images if fetch fails
      const fallbackImages = [
        { src: "/wh_img1.jpg", alt: "Modern kitchen interior" },
        { src: "/wh_img2.jpg", alt: "Elegant living room" },
        { src: "/wh_img4.jpg", alt: "Luxurious bedroom" },
        { src: "/wh_img5.jpg", alt: "Luxurious bedroom" },
        { src: "/wh_img6.jpg", alt: "Luxurious bedroom" },
      ];
      setImages(fallbackImages);
      setFeaturedImage({ src: "/wh_img3.jpg", alt: "House exterior view" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecentPropertyImages();
  }, []);

  return (
    <section
      id="gallery"
      className="mx-5 py-10  md:p-10 bg-primary-gray rounded-2xl"
      ref={ref}
    >
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Recent photos
          </h2>
          <p className="text-lg text-gray-600">
            Beautiful collection of the latest properties in all their final
            appearances
          </p>
        </motion.div>

        {/* Main gallery */}
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            </div>
          ) : (
            <>
              <ImageSwiper slides={images} />

              {/* Featured video/image */}
              {featuredImage && (
                <motion.div
                  className="m-2 md:m-18"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.7, delay: 0.3 }}
                >
                  <div className="rounded-2xl overflow-hidden shadow-2xl">
                    <Image
                      width={200}
                      height={200}
                      src="/wh_img3.jpg"
                      alt={featuredImage.alt}
                      className="w-full h-96 object-cover object-top"
                    />
                  </div>
                </motion.div>
              )}
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default PhotoGallery;
