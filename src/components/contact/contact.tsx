import { FC } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface IContact {
  display?: "main" | "sub";
}

const Contact: FC<IContact> = ({ display = "sub" }) => {
  return (
    <section
      id="contact"
      className={cn(display === "main" ? "bg-transparent" : "bg-white py-20")}
    >
      <div className="container mx-auto px-6">
        {display === "main" && (
          <div className="border-b-1 border-gray-300 pb-2">
            <p
              className={"font-semibold text-lg md:text-xl text-primary-brown"}
            >
              Get in Touch
            </p>
          </div>
        )}

        {display === "sub" && (
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Contact Us
            </h2>
            <p className="text-lg text-gray-600">
              If you have any questions and are ready to discuss the best deal,
              just contact us
            </p>
          </div>
        )}

        <div
          className={cn(
            display === "main" ? "" : "lg:grid-cols-2",
            "grid gap-16 py-3"
          )}
        >
          {/* Contact form */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <Input placeholder="Your name" className="w-full" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <Input
                  type="email"
                  placeholder="Your email"
                  className="w-full"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone
              </label>
              <Input
                type="tel"
                placeholder="Your phone number"
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>
              <Textarea
                placeholder="Tell us about your requirements..."
                className="w-full h-32 resize-none"
              />
            </div>

            <Button className="text-white w-full py-3 bg-primary-black">
              Send Message
            </Button>

            <p className="text-sm text-gray-500 text-center">
              *You can also call directly. It is located in different regions.
            </p>
          </div>

          {/* Map placeholder */}
          <div className={cn(display === "main" && "hidden", "relative")}>
            <div className="w-full h-96 bg-gray-200 rounded-2xl overflow-hidden relative">
              {/* Placeholder map */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-green-200"></div>

              {/* Map overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-red-500 rounded-full mx-auto flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="bg-white px-4 py-2 rounded-lg shadow-lg">
                    <p className="font-semibold text-gray-900">
                      Luxury Forest House
                    </p>
                    <p className="text-sm text-gray-600">
                      123 Forest Drive, Woodland
                    </p>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute top-4 left-4 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <div className="absolute bottom-6 right-8 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <div className="absolute top-12 right-12 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
