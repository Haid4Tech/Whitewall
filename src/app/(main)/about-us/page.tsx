"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
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

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      stiffness: 100,
    },
  },
};

const imageVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.8,
      stiffness: 100,
    },
  },
};

const cardVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
  hover: {
    y: -10,
    scale: 1.02,
    transition: {
      duration: 0.3,
    },
  },
};

const numberVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.8,
      stiffness: 200,
    },
  },
};

export default function Page() {
  const router = useRouter();
  return (
    <motion.div
      className="flex flex-col gap-24 py-15"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div
        className={"px-10 flex flex-col md:flex-row gap-12"}
        variants={itemVariants}
      >
        <motion.div
          variants={imageVariants}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <Image
            src={"/angie.jpg"}
            alt={"House image"}
            width={350}
            height={400}
            className="rounded-lg w-full md:w-5xl object-cover object-center shadow-2xl"
          />
        </motion.div>
        <motion.div className="flex flex-col gap-5" variants={itemVariants}>
          <motion.div className={"flex flex-col gap-3"} variants={itemVariants}>
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Pill
                text={"About Us"}
                style={"bg-primary-gold/10"}
                textColor="text-primary-gold"
              />
            </motion.div>
            <motion.h1
              className="font-bold text-2xl md:text-4xl lg:text-5xl"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Resounding Presence<span className={"text-primary-gold"}>.</span>
            </motion.h1>
            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              At WhiteWall Realty Co., we are dedicated to providing exceptional
              real estate services in Abuja, Nigeria. With a commitment to
              excellence and a passion for helping our clients find their
              perfect property, we have established ourselves as a trusted name
              in the real estate industry.
            </motion.p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 gap-8 border border-primary-brown/30 rounded-lg p-5"
            variants={containerVariants}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            {services.map(({ id, icon, title }) => (
              <motion.div
                key={id}
                className="flex flex-row gap-2 items-center"
                variants={itemVariants}
                whileHover={{ x: 10 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className={
                    "flex items-center justify-center bg-primary-gold/20 rounded-full w-13 h-13"
                  }
                  whileHover={{
                    scale: 1.2,
                    rotate: 360,
                    backgroundColor: "rgba(255, 193, 7, 0.3)",
                  }}
                  transition={{ duration: 0.5 }}
                >
                  {icon}
                </motion.div>
                <p>{title}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        className="rounded-lg mx-8 grid md:grid-cols-3  items-center justify-center bg-primary-black py-20 px-8"
        variants={containerVariants}
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 50 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {achievement.map(({ label, value }, index) => (
          <motion.div
            key={index}
            className={"flex flex-col items-center gap-3"}
            variants={numberVariants}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          >
            <motion.p
              className="text-5xl md:text-6xl font-bold text-white"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: index * 0.2,
                type: "spring",
                stiffness: 200,
              }}
            >
              {value}
            </motion.p>
            <p className={"text-white/50"}>{label}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className={
          "bg-primary-gray flex flex-col items-center justify-center gap-12 py-15 px-8"
        }
        variants={containerVariants}
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 50 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <motion.p
          className="font-bold text-xl md:text-3xl lg:text-4xl"
          variants={itemVariants}
        >
          Our Main Focus
        </motion.p>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
          variants={containerVariants}
        >
          {focus.map(({ id, title, description }) => (
            <motion.div
              className={
                "space-y-4 border border-primary-gold/30 rounded-lg p-5 bg-white shadow-lg"
              }
              key={id}
              variants={cardVariants}
              whileHover="hover"
              whileTap={{ scale: 0.95 }}
            >
              <motion.p
                className="text-xl md:text-2xl font-bold"
                whileHover={{ color: "#B8860B" }}
                transition={{ duration: 0.3 }}
              >
                {title}
              </motion.p>
              <p className="text-sm">{description}</p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button onClick={() => router.push("/properties")}>
                  Find a home
                </Button>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        className={"px-8 grid md:grid-cols-2 gap-8"}
        variants={containerVariants}
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 50 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="flex flex-col gap-4 bg-primary-gold/10 rounded-lg p-8"
          variants={cardVariants}
          whileHover={{
            scale: 1.02,
            backgroundColor: "rgba(255, 193, 7, 0.15)",
          }}
          transition={{ duration: 0.3 }}
        >
          <motion.p
            className="font-bold text-xl md:text-3xl"
            whileHover={{ color: "#B8860B" }}
            transition={{ duration: 0.3 }}
          >
            Our Vision
          </motion.p>
          <p className={""}>
            We envision a future where every client finds their dream property
            effortlessly. By leveraging innovative technology, market expertise,
            and a client-centric approach, we aim to become the leading real
            estate agency in Abuja, known for our integrity, professionalism,
            and outstanding results.
          </p>
        </motion.div>
        <motion.div
          className="flex flex-col gap-4 rounded-lg p-8 bg-white shadow-lg"
          variants={cardVariants}
          whileHover={{
            scale: 1.02,
            boxShadow:
              "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
          }}
          transition={{ duration: 0.3 }}
        >
          <motion.p
            className="font-bold text-xl md:text-3xl"
            whileHover={{ color: "#B8860B" }}
            transition={{ duration: 0.3 }}
          >
            Our Mission
          </motion.p>
          <p>
            Our mission is to connect buyers, sellers, and renters with the best
            properties that meet their needs and exceed their expectations. We
            strive to provide unparalleled service through our comprehensive
            knowledge of the Abuja real estate market, our dedication to
            transparency, and our unwavering commitment to client satisfaction.
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
