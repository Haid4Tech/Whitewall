"use client";

import { FC } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface IContact {
  display?: "main" | "sub";
}

const Contact: FC<IContact> = ({ display = "sub" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <section
      id="contact"
      className={cn(display === "main" ? "bg-transparent" : "bg-white py-20")}
      ref={ref}
    >
      <div className="container mx-auto px-6">
        {display === "main" && (
          <motion.div
            className="border-b-1 border-gray-300 pb-2"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <p
              className={"font-semibold text-lg md:text-xl text-primary-brown"}
            >
              Get in Touch
            </p>
          </motion.div>
        )}

        {display === "sub" && (
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Contact Us
            </h2>
            <p className="text-lg text-gray-600">
              If you have any questions and are ready to discuss the best deal,
              just contact us
            </p>
          </motion.div>
        )}

        <div
          className={cn(
            display === "main" ? "" : "lg:grid-cols-2",
            "grid gap-16 py-3"
          )}
        >
          {/* Contact form */}
          <motion.div
            className="space-y-6"
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
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <Input placeholder="Your name" className="w-full" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <Input
                  type="email"
                  placeholder="Your email"
                  className="w-full"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone
              </label>
              <Input
                type="tel"
                placeholder="Your phone number"
                className="w-full"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>
              <Textarea
                placeholder="Tell us about your requirements..."
                className="w-full h-32 resize-none"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Button className="text-white w-full py-3 bg-primary-black">
                Send Message
              </Button>
            </motion.div>

            <motion.p
              className="text-sm text-gray-500 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              *You can also call directly. It is located in different regions.
            </motion.p>
          </motion.div>

          {/* Map placeholder */}
          <motion.div
            className={cn(display === "main" && "hidden", "relative")}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div className="w-full h-96 bg-gray-200 rounded-2xl overflow-hidden relative">
              {/* Placeholder map */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-green-200"></div>

              {/* Map overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-red-500 rounded-full mx-auto flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="bg-white px-4 py-2 rounded-lg shadow-lg">
                    <p className="font-semibold text-gray-900">
                      Luxury Forest House
                    </p>
                    <p className="text-sm text-gray-600">
                      123 Forest Drive, Woodland
                    </p>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <motion.div
                className="absolute top-4 left-4 w-2 h-2 bg-blue-400 rounded-full"
                animate={{ y: [0, -8, 0], opacity: [1, 0.7, 1] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute bottom-6 right-8 w-3 h-3 bg-green-400 rounded-full"
                animate={{ y: [0, 10, 0], opacity: [1, 0.7, 1] }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute top-12 right-12 w-2 h-2 bg-yellow-400 rounded-full"
                animate={{ y: [0, -6, 0], opacity: [1, 0.7, 1] }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
