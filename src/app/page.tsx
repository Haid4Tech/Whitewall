import Header from "@/components/navigation/menubar";
import Hero from "@/components/home/hero";
import Features from "@/components/home/features";
import HouseLayout from "@/components/home/houselayout";
import PhotoGallery from "@/components/home/photogallery";
import Contact from "@/components/contact/contact";
import Footer from "@/components/navigation/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <Features />
      <HouseLayout />
      <PhotoGallery />
      <Contact />
      <Footer />
    </div>
  );
}
