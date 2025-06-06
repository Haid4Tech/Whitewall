import { Search, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface HeroProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const PropertiesHero = ({ searchQuery, setSearchQuery }: HeroProps) => {
  return (
    <div className="relative py-20 md:h-[60vh] flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=1920&h=1080&fit=crop')`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />

      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
          Find Your Dream
          <span className="block bg-gradient-to-r from-primary-lightgold to-primary-brown bg-clip-text text-transparent">
            Property
          </span>
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-gray-200 animate-fade-in">
          Discover exceptional homes in premium locations worldwide
        </p>

        <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto animate-scale-in">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Search by location or property name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 bg-white/10 backdrop-blur-md border-white/20 text-white placeholder:text-gray-300"
            />
          </div>
          <Button className="h-12">
            <MapPin className="text-white" size={15} />
            Explore
          </Button>
        </div>
      </div>
    </div>
  );
};
