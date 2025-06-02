"use client";

import { useState } from "react";
import Image from "next/image";
import { NavItems } from "@/common/data";
import { Instagram, Twitter, Facebook } from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";

const Footer = () => {
  const [date] = useState(new Date());
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company info */}
          <div className="span-1 md:col-span-2 flex flex-col space-y-4 items-center justify-center">
            <div className="">
              <Image
                src={"/wh_logo.webp"}
                alt={"logo"}
                height={80}
                width={150}
              />
            </div>
            <p className="text-gray-400 px-10 md:px-24 lg:px-30 text-sm leading-relaxed">
              Your dream house is our top priority. We make process efficient to
              house hunting.
            </p>
            <div className="flex space-x-5">
              <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 cursor-pointer transition-colors">
                <Instagram />
              </div>
              <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 cursor-pointer transition-colors">
                <Twitter />
              </div>
              <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 cursor-pointer transition-colors">
                <Facebook />
              </div>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <div className="flex flex-col space-y-5 text-sm text-gray-400">
              {NavItems.map(({ id, url, label }) => (
                <Link
                  key={id}
                  href={url}
                  className="hover:text-white transition-colors transition-colors"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>No.1 Zambezi Crescent</li>
              <li>off Aguiyi Ironsi Street,</li>
              <li>Maitama FCT Abuja.</li>
              <li>+234 809 685 9165</li>
              <li>
                Opening hours{" "}
                <span className="text-lg font-semibold">24/7</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-sm text-gray-400">
            Copyright © {format(date, "yyyy")} HAID Technologies. All Rights
            Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
