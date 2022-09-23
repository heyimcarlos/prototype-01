import Image from "next/image";
import React, { useEffect, useState } from "react";
import cityScape from "../../public/assets/images/cityScape.jpg";

type Props = {};

const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
};

const LandingBG = (props: Props) => {
  const [width, setWidth] = useState<number>();
  const [height, setHeight] = useState<number>();

  useEffect(() => {
    const { width, height } = getWindowDimensions();
    setWidth(width);
    setHeight(height);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const { width, height } = getWindowDimensions();

      setWidth(width);
      setHeight(height);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });
  if (width && height) {
    return (
      <div className="fixed z-0 top-0">
        <Image src={cityScape} alt="" width={width} height={height} />
      </div>
    );
  }

  return null;
};

export default LandingBG;
