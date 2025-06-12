"use client";

import Image from "next/image";
import ImageSwiper from "../gallery/image-swiper";

const PhotoGallery = () => {
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
          <ImageSwiper slides={images} />

          {/* Featured video/image */}
          <div className="m-2 md:m-18">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <Image
                width={200}
                height={200}
                src="/wh_img3.jpg"
                alt="House exterior view"
                className="w-full h-96 object-cover object-top"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhotoGallery;
