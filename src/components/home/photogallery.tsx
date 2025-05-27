"use client";

import { useState } from "react";
import ImageSwiper from "../gallery/image-swiper";

const PhotoGallery = () => {
  const [activeImage, setActiveImage] = useState(0);

  const images = [
    {
      src: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&h=600&fit=crop",
      alt: "Modern kitchen interior",
    },
    {
      src: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=800&h=600&fit=crop",
      alt: "Elegant living room",
    },
    {
      src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=600&fit=crop",
      alt: "Luxurious bedroom",
    },
  ];

  return (
    <section
      id="gallery"
      className="mx-5 py-10 md:p-5 md:p-10 bg-primary-gray rounded-2xl"
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Recent photos
          </h2>
          <p className="text-lg text-gray-600">
            Beautiful collection of the house in all its final appearances
          </p>
        </div>

        {/* Main gallery */}
        <div className="space-y-8">
          <ImageSwiper />
          {/* Image grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {images.map((image, index) => (
              <div
                key={index}
                className={`relative cursor-pointer group overflow-hidden rounded-xl ${
                  index === 0 ? "md:col-span-2 md:row-span-2" : ""
                }`}
                onClick={() => setActiveImage(index)}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className={`w-full object-cover transition-transform duration-300 group-hover:scale-105 ${
                    index === 0 ? "h-80 md:h-96" : "h-40 md:h-44"
                  }`}
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Play button for main image */}
                {index === 0 && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:bg-white transition-colors">
                      <svg
                        className="w-6 h-6 text-gray-900 ml-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M8 5v10l8-5-8-5z" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Navigation dots */}
          <div className="flex justify-center space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-colors ${
                  activeImage === index ? "bg-gray-900" : "bg-gray-300"
                }`}
                onClick={() => setActiveImage(index)}
              />
            ))}
          </div>

          {/* Featured video/image */}
          <div className="m-18">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200&h=600&fit=crop"
                alt="House exterior view"
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors cursor-pointer">
                  <svg
                    className="w-8 h-8 text-gray-900 ml-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M8 5v10l8-5-8-5z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhotoGallery;
