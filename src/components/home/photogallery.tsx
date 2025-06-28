"use client";

import Image from "next/image";
import ImageSwiper from "../gallery/image-swiper";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const PhotoGallery = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const images = [
    {
      src: "/wh_img1.jpg",
      alt: "Modern kitchen interior",
    },
    {
      src: "/wh_img2.jpg",
      alt: "Elegant living room",
    },
    {
      src: "/wh_img4.jpg",
      alt: "Luxurious bedroom",
    },
    {
      src: "/wh_img5.jpg",
      alt: "Luxurious bedroom",
    },
    {
      src: "/wh_img6.jpg",
      alt: "Luxurious bedroom",
    },
  ];

  return (
    <section
      id="gallery"
      className="mx-5 py-10 md:p-5 md:p-10 bg-primary-gray rounded-2xl"
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
            Beautiful collection of the house in all its final appearances
          </p>
        </motion.div>

        {/* Main gallery */}
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <ImageSwiper slides={images} />

          {/* Featured video/image */}
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
                alt="House exterior view"
                className="w-full h-96 object-cover object-top"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default PhotoGallery;
