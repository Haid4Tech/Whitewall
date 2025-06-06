import Image from "next/image";
import { Cctv, HousePlug } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <HousePlug size={30} />,
      title: "Smart House",
      description:
        "Fully automated smart home system with cutting-edge technology and premium integrations.",
    },
    {
      icon: <Cctv size={30} />,
      title: "High Security",
      description:
        "State-of-the-art security system with 24/7 monitoring and premium safeguards.",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
        </svg>
      ),
      title: "Best Price ratio",
      description:
        "Exceptional value proposition with luxury amenities at competitive market rates.",
    },
  ];

  return (
    <section className="mx-5 rounded-2xl py-10 md:p-5 md:p-10 bg-primary-black">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-5 gap-20 items-center">
          {/* Left side - Image */}
          <div className="md:col-span-2 flex flex-col gap-5 relative">
            <div>
              <h2 className="text-4xl font-bold text-gray-200 mb-4">
                Features
              </h2>
              <p className="text-gray-400 text-base leading-relaxed ">
                Luxury house near the forest with all the amenities, refined
                design, forest views and quiet charm.
              </p>
            </div>
            <Image
              width={200}
              height={200}
              src={"/stairs.jpg"}
              alt={"Dinning room"}
              className={"w-full h-50 object-cover rounded-2xl"}
            />
          </div>

          {/* Right side - Features */}
          <div className="md:col-span-3 space-y-8 w-full">
            <div className="flex flex-row flex-wrap items-start justify-center w-full space-y-10 md:space-y-6 md:space-x-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="h-full w-full md:w-48 flex flex-col gap-4"
                >
                  <div className="w-full h-full md:w-48 md:h-48 bg-primary-darkgray p-8 rounded-lg flex flex-col gap-5 items-center justify-center text-white">
                    <div>{feature.icon}</div>
                    <h3 className="text-lg font-semibold text-gray-300 mb-2">
                      {feature.title}
                    </h3>
                  </div>
                  <div className="w-fit">
                    <p className="text-base md:text-sm text-gray-400 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
