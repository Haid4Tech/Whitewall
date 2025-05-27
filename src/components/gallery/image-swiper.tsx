import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function ImageSwiper() {
  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={3}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
    >
      <SwiperSlide>1</SwiperSlide>
      <SwiperSlide>2</SwiperSlide>
      <SwiperSlide>3</SwiperSlide>
      <SwiperSlide>4</SwiperSlide>
    </Swiper>
  );
}
