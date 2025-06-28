"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import Pill from "@/components/general/pill";
import { Button } from "@/components/ui/button";
import { TreePine, HousePlug, HandPlatter, Cctv } from "lucide-react";

const services = [
  {
    id: 1,
    title: "Smart Home Design",
    icon: <HousePlug className={"text-primary-gold"} size={20} />,
  },
  {
    id: 2,
    title: "Beautiful Scene Around",
    icon: <TreePine className={"text-primary-gold"} size={20} />,
  },
  {
    id: 3,
    title: "Exceptional Lifestyle",
    icon: <HandPlatter className={"text-primary-gold"} size={20} />,
  },
  {
    id: 4,
    title: "Complete 24/7 security",
    icon: <Cctv className={"text-primary-gold"} size={20} />,
  },
];

const focus = [
  {
    id: 1,
    title: "Buy a Home",
    description:
      "We can match you with a place you will be proud to call home.",
    icon: "",
  },
  {
    id: 2,
    title: "Rent a Home",
    description:
      "Making a temporary space filled with warmth and love is what we specialize in.",
    icon: "",
  },
  {
    id: 3,
    title: "Sell a Home",
    description:
      "Do not break a sweat trying to sell your house, leave it to us.",
    icon: "",
  },
];

const achievement = [
  {
    value: "150+",
    label: "Apartments Sold",
  },
  {
    value: "300+",
    label: "Satisfied Clients",
  },
  {
    value: "1500+",
    label: "Listed Properties",
  },
];

export default function Page() {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-24 py-15">
      <div className={"px-10 flex flex-col md:flex-row gap-12"}>
        {/* <div className=""></div> */}
        <Image
          src={"/angie.jpg"}
          alt={"House image"}
          width={350}
          height={400}
          className="rounded-lg w-full md:w-5xl object-cover object-center"
        />
        <div className="flex flex-col gap-5">
          <div className={"flex flex-col gap-3"}>
            <Pill
              text={"About Us"}
              style={"bg-primary-gold/10"}
              textColor="text-primary-gold"
            />
            <p className="font-bold text-2xl md:text-4xl lg:text-5xl">
              Resounding Presence<span className={"text-primary-gold"}>.</span>
            </p>
            <p>
              At WhiteWall Realty Co., we are dedicated to providing exceptional
              real estate services in Abuja, Nigeria. With a commitment to
              excellence and a passion for helping our clients find their
              perfect property, we have established ourselves as a trusted name
              in the real estate industry.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 border border-primary-brown/30 rounded-lg p-5">
            {services.map(({ id, icon, title }) => (
              <div key={id} className="flex flex-row gap-2 items-center">
                <div
                  className={
                    "flex items-center justify-center bg-primary-gold/20 rounded-full w-13 h-13"
                  }
                >
                  {icon}
                </div>
                <p>{title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-lg mx-8 grid md:grid-cols-3 space-y-8 items-center justify-center bg-primary-black py-20 px-8">
        {achievement.map(({ label, value }, index) => (
          <div key={index} className={"flex flex-col items-center gap-3"}>
            <p className="text-5xl md:text-6xl font-bold text-white">{value}</p>
            <p className={"text-gray-500 text-white/50"}>{label}</p>
          </div>
        ))}
      </div>

      <div
        className={
          "bg-primary-gray flex flex-col items-center justify-center gap-12 py-15 px-8"
        }
      >
        <p className="font-bold text-xl md:text-3xl lg:text-4xl">
          Our Main Focus
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 ">
          {focus.map(({ id, title, description }) => (
            <div
              className={
                "space-y-4 border border-primary-gold/30 rounded-lg p-5"
              }
              key={id}
            >
              <p className="text-xl md:text-2xl font-bold">{title}</p>
              <p className="text-sm">{description}</p>
              <Button onClick={() => router.push("/properties")}>
                Find a home
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div className={"px-8 grid md:grid-cols-2"}>
        <div className="flex flex-col gap-4 bg-primary-gold/10 rounded-lg p-8">
          <p className="font-bold text-xl md:text-3xl">Our Vision</p>
          <p className={""}>
            We envision a future where every client finds their dream property
            effortlessly. By leveraging innovative technology, market expertise,
            and a client-centric approach, we aim to become the leading real
            estate agency in Abuja, known for our integrity, professionalism,
            and outstanding results.
          </p>
        </div>
        <div className="flex flex-col gap-4 rounded-lg p-8">
          <p className="font-bold text-xl md:text-3xl">Our Mission</p>
          <p>
            Our mission is to connect buyers, sellers, and renters with the best
            properties that meet their needs and exceed their expectations. We
            strive to provide unparalleled service through our comprehensive
            knowledge of the Abuja real estate market, our dedication to
            transparency, and our unwavering commitment to client satisfaction.
          </p>
        </div>
      </div>
    </div>
  );
}
