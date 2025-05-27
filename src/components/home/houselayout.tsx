import Image from "next/image";

const HouseLayout = () => {
  const amenities = [
    { icon: "🏠", label: "3 Bedrooms" },
    { icon: "🛁", label: "2 Bathrooms" },
    { icon: "🚗", label: "2 Car Garage" },
    { icon: "🏊", label: "Swimming Pool" },
  ];

  return (
    <section id="layout" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Content */}
          <div className="space-y-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-16">
              House Layout
            </h2>

            {/* Amenities grid */}
            <div className="grid grid-cols-2 gap-4">
              {amenities.map((amenity, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <span className="text-2xl">{amenity.icon}</span>
                  <span className="font-medium text-gray-900">
                    {amenity.label}
                  </span>
                </div>
              ))}
            </div>

            <p className="text-lg text-gray-600 leading-relaxed">
              After browsing the pages of the house you can definitely know your
              approximate options. Access to the entire schedule, swimming pool,
              with recreation furniture, and close proximity to walk to the
              kitchen and other amenities.
            </p>

            {/* Interior image */}
            <div className="mt-8">
              <img
                src="/diner_room.jpg"
                alt="Modern interior"
                className="w-full h-full object-cover rounded-2xl shadow-lg"
              />
            </div>
          </div>

          {/* Right side - Floor plan */}
          <div className="">
            <div>
              <img
                src="/housing_plan.jpg"
                alt="House floor plan"
                className="w-full h-auto rounded-lg"
              />
            </div>

            {/* Floor plan labels - simplified representation */}
            {/* <div className="absolute top-12 left-12 bg-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
              Living Room
            </div>
            <div className="absolute top-32 right-16 bg-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
              Kitchen
            </div>
            <div className="absolute bottom-32 left-16 bg-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
              Master Bedroom
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HouseLayout;
