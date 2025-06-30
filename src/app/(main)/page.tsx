import Hero from "@/components/home/hero";
import Features from "@/components/home/features";
import HouseLayout from "@/components/home/houselayout";
import PhotoGallery from "@/components/home/photogallery";
import Contact from "@/components/contact/contact";

export default function Home() {
  return (
    <div className="min-h-screen bg-white overflow-hidden">
      <Hero />
      <Features />
      <HouseLayout />
      <PhotoGallery />
      <Contact />
    </div>
  );
}
