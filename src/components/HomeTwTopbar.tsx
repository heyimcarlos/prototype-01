import React from "react";

import Image from "next/image";
import logoPicture from "../../public/assets/images/logo2.0.png";
import cityScape from "../../public/assets/images/cityScape.jpg";

// type Props = {};

const HomeTwTopbar = () => {
  return (
    <div className="h-full w-full ">
      <div className="">
        <Image
          className=""
          src={cityScape}
          layout="fill"
          alt="city scape"

          // height="100%"
          // width="100%"
        />
      </div>

      <div className="text-black text-lg h-10 w-50">
        Hello FROM A DIFFERRENT DIV
      </div>
    </div>
  );
};

export default HomeTwTopbar;
