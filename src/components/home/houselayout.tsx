"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const HouseLayout = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const amenities = [
    { icon: "🏠", label: "3 Bedrooms" },
    { icon: "🛁", label: "2 Bathrooms" },
    { icon: "🚗", label: "2 Car Garage" },
    { icon: "🏊", label: "Swimming Pool" },
  ];

  return (
    <section id="layout" className="py-20 bg-white" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Content */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <motion.h2
              className="text-4xl font-bold text-gray-900 mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              House Layout
            </motion.h2>

            {/* Amenities grid */}
            <motion.div
              className="grid grid-cols-2 gap-4"
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.15,
                  },
                },
              }}
            >
              {amenities.map((amenity, index) => (
                <motion.div
                  key={index}
                  className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                >
                  <span className="text-2xl">{amenity.icon}</span>
                  <span className="font-medium text-gray-900">
                    {amenity.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            <motion.p
              className="text-lg text-gray-600 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              After browsing the pages of the house you can definitely know your
              approximate options. Access to the entire schedule, swimming pool,
              with recreation furniture, and close proximity to walk to the
              kitchen and other amenities.
            </motion.p>

            {/* Interior image */}
            <motion.div
              className="mt-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              <Image
                priority
                width={100}
                height={100}
                src="/diner_room.jpg"
                alt="Modern interior"
                className="w-full h-full object-cover rounded-2xl shadow-lg"
              />
            </motion.div>
          </motion.div>

          {/* Right side - Floor plan */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div>
              <Image
                priority
                width={200}
                height={200}
                src="/housing_plan.jpg"
                alt="House floor plan"
                className="w-full h-auto rounded-lg"
              />
            </div>

            {/* Floor plan labels - simplified representation */}
            {/* <div className="absolute top-12 left-12 bg-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
              Living Room
            </div>
            <div className="absolute top-32 right-16 bg-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
              Kitchen
            </div>
            <div className="absolute bottom-32 left-16 bg-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
              Master Bedroom
            </div> */}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HouseLayout;
