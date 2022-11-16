import React from "react";
import TwHomeSearchbar from "../TwHomeSearchbar";
import cityScape from "../../../public/assets/images/2nd.jpg";
import Image from "next/image";
import { useJsApiLoader } from "@react-google-maps/api";
import { GOOGLE_MAP_LIBRARIES } from "@/lib/google";
import { env } from "@/env/client.mjs";

export default function Section1() {
  // const { isLoaded } = useJsApiLoader({
  //   id: "google-map-script",
  //   googleMapsApiKey: env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  //   libraries: GOOGLE_MAP_LIBRARIES,
  // });

  return (
    <section className="flex flex-col items-center relative grow w-full">
      <div className="absolute inset-0 overflow-hidden opacity-100 visible bg-cover bg-no-repeat bg-[50%] bg-custom-white">
        <Image
          src={cityScape}
          alt="cityScape"
          fill
          className="object-cover brightness-[0.65]"
        />
      </div>
      <TwHomeSearchbar />
    </section>
  );
}
