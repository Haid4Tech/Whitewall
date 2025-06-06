"use client";

import { Phone, MapPin, Mail } from "lucide-react";
import Contact from "@/components/contact/contact";

import { OSM } from "ol/source";
import { Map, View, TileLayer } from "react-openlayers";
import "react-openlayers/dist/index.css";

export default function Page() {
  return (
    <div className="flex flex-col gap-10 py-15 px-5">
      <div className="grid md:grid-cols-2 gap-2">
        <p
          className={
            "text-primary-black text-lg md:text-2xl lg:text-4xl font-bold uppercase"
          }
        >
          Contact US
        </p>
        <p className={"text-primary-black"}>
          If you have any questions feel free to get in touch with us via phone,
          text, email, the form below or even on social media!
        </p>
      </div>

      <div className={"grid md:grid-cols-2 gap-3"}>
        <div className={"bg-primary-gray rounded-lg p-5"}>
          <Contact display="main" />
        </div>
        <div className={"grid grid-row-2 gap-4"}>
          <div className={"bg-primary-gray rounded-lg md:p-8 p-5"}>
            <div className="border-b-1 border-gray-300 pb-2">
              <p className="font-semibold text-lg md:text-xl text-primary-brown">
                Contact Information
              </p>
            </div>
            <div className={"grid md:grid-cols-2 gap-5 p-3"}>
              <div className="flex flex-row gap-3 items-center">
                <Phone className={"text-primary-brown"} />
                <div>
                  <p
                    className={
                      "text-xs font-semibold  text-primary-brown uppercase"
                    }
                  >
                    Phone
                  </p>
                  <p className={"text-sm font-light"}>08084523543</p>
                </div>
              </div>
              <div className="flex flex-row gap-3 items-center">
                <MapPin className={"text-primary-brown"} />
                <div>
                  <p
                    className={
                      "text-xs font-semibold text-primary-brown uppercase"
                    }
                  >
                    Address
                  </p>
                  <p className={"text-sm font-light"}>
                    No 1 Zambezi Crescent off Aguiyi Ironsi Street, Maitama FCT
                    Abuja.
                  </p>
                </div>
              </div>
              <div className="flex flex-row gap-3 items-center">
                <Mail className={"text-primary-brown"} />
                <div>
                  <p
                    className={
                      "text-xs font-semibold text-primary-brown  uppercase"
                    }
                  >
                    Email
                  </p>
                  <p className={"text-sm font-light"}>
                    info@whitewallrealtyco.com.ng
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            className={
              "flex flex-col gap-5 md:gap-15 bg-primary-gray rounded-lg md:p-8 p-5"
            }
          >
            <div className="border-b-1 border-gray-300 pb-2">
              <p className="font-semibold text-lg md:text-xl text-primary-brown">
                Business Hours
              </p>
            </div>
            <div className={"grid md:grid-cols-3 gap-5 p-3"}>
              <div>
                <p className="text-sm font-semibold uppercase text-primary-brown">
                  MONDAY - FRIDAY
                </p>
                <p className="text-sm font-light">9:00AM - 8:00PM</p>
              </div>
              <div>
                <p className="text-sm font-semibold uppercase text-primary-brown">
                  saturday
                </p>
                <p className="text-sm font-light">9:00AM - 8:00PM</p>
              </div>
              <div>
                <p className="text-sm font-semibold uppercase text-primary-brown">
                  sunday
                </p>
                <p className="text-sm font-light">9:00AM - 8:00PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded bg-primary-gray p-1">
        <Map controls={[]} interactions={[]}>
          <TileLayer source={new OSM()} />
          <View center={[9.07999, 7.48995]} zoom={8} />
        </Map>
      </div>
    </div>
  );
}
