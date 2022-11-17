import React from "react";
import TwHomeSearchbar from "../TwHomeSearchbar";
import cityScape from "../../../public/assets/images/2nd.jpg";
import Image from "next/image";

export default function Section1() {
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
