"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperClass } from "swiper";
import { EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";

interface ImagesDataProps {
  alt: string;
  src: string;
}

export default function ImageSwiper({ slides }: { slides: ImagesDataProps[] }) {
  const [activeImage, setActiveImage] = useState<number>(0);
  const [windowWidth, setWindowWidth] = useState<number>(1200);

  const handleSlideChange = (swiper: SwiperClass) => {
    setActiveImage(swiper.realIndex);
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      <Swiper
        effect={"coverflow"}
        spaceBetween={20}
        grabCursor={true}
        loop={true}
        slidesPerView={windowWidth <= 700 ? 1 : windowWidth <= 900 ? 2 : 3}
        centeredSlides={true}
        modules={[EffectCoverflow]}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
          slideShadows: true,
        }}
        onSlideChange={handleSlideChange}
        onSwiper={(swiper) => setActiveImage(swiper.realIndex)}
      >
        {slides.map(({ alt, src }, index) => (
          <SwiperSlide key={index}>
            <Image
              priority
              width={200}
              height={200}
              src={src}
              alt={alt}
              className="rounded-lg w-full h-96 object-cover object-center"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation dots */}
      <div className="flex justify-center space-x-1 mt-10">
        {slides.map((_, index) => (
          <button
            key={index}
            className={cn(
              activeImage === index ? "bg-gray-900" : "bg-gray-300",
              "w-6 h-1 rounded-full transition-colors"
            )}
            onClick={() => setActiveImage(index)}
          />
        ))}
      </div>
    </div>
  );
}
