import { Search, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface HeroProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const PropertiesHero = ({ searchQuery, setSearchQuery }: HeroProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div 
      ref={ref}
      className="relative py-20 md:h-[60vh] flex items-center justify-center overflow-hidden"
    >
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=1920&h=1080&fit=crop')`,
        }}
        initial={{ scale: 1.1 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.3 }}
      />

      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
        <motion.h1 
          className="text-5xl md:text-6xl font-bold mb-6"
          initial={{ y: 50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Find Your Dream
          <motion.span 
            className="block bg-gradient-to-r from-primary-lightgold to-primary-brown bg-clip-text text-transparent"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.6, type: "spring" }}
          >
            Property
          </motion.span>
        </motion.h1>
        
        <motion.p 
          className="text-xl md:text-2xl mb-8 text-gray-200"
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          Discover exceptional homes in premium locations worldwide
        </motion.p>

        <motion.div 
          className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto"
          initial={{ y: 40, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <motion.div 
            className="relative flex-1"
            whileHover={{ scale: 1.02 }}
          >
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Search by location or property name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 bg-white/10 backdrop-blur-md border-white/20 text-white placeholder:text-gray-300"
            />
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button className="h-12">
              <MapPin className="text-white" size={15} />
              Explore
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
