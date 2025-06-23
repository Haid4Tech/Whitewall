import { Button } from "@/components/ui/button";
import Image from "next/image";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden"
    >
      <div className="container mx-auto px-6 py-15">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-7xl font-bold text-primary-gold leading-tight">
                Luxury houses
                <br />
                <span className="text-gray-700">find yours today</span>
              </h1>
              <p className="text-lg text-gray-600 max-w-md leading-relaxed">
                Explore a curated selection of premium properties that offer the
                perfect blend of luxury, comfort, and convenience. Our listings
                include a diverse range of options to suit every lifestyle and
                budget.
              </p>
            </div>

            <Button className="py-3">Book Now</Button>

            {/* Property stats */}
            <div className="flex items-center space-x-8 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">280m²</div>
                <div className="text-sm text-gray-600">Total Area</div>
              </div>
            </div>
          </div>

          {/* Right content - House image and agent */}
          <div className="relative">
            {/* House image */}
            <div className="relative z-10">
              <Image
                width={200}
                height={200}
                src="/wh_img3.jpg"
                alt="Luxury house near forest"
                className="w-full h-[500px] object-cover rounded-2xl shadow-2xl"
              />

              {/* Property size overlay */}
              <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 2L3 7v11h4v-6h6v6h4V7l-7-5z" />
                    </svg>
                  </div>
                  <span className="font-semibold text-gray-900">280m²</span>
                </div>
              </div>
            </div>

            {/* Agent card */}
            <div className="absolute bottom-6 right-6 bg-white rounded-2xl p-4 shadow-xl z-20 max-w-xs">
              <div className="flex items-center space-x-3">
                <Image
                  width={100}
                  height={100}
                  src={"/wh_img2.jpg"}
                  alt="Agent Tom Wilson"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold text-gray-900">Angela</div>
                  <div className="text-sm text-gray-600">Property Agent</div>
                </div>
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center ml-auto">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-amber-200 rounded-full opacity-20 blur-3xl"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-green-200 rounded-full opacity-20 blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
