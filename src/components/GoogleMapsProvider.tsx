import { env } from "@/env/client.mjs";
import { LoadScriptNext } from "@react-google-maps/api";
import React from "react";
import Map from "@/components/Map";

const GoogleMapsProvider = ({ children }) => {
  return (
    <></>
    // <LoadScriptNext
    //   googleMapsApiKey={env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
    //   id="script-loader"
    //   language="en"
    //   region="EN"
    //   version="weekly"
    //   libraries={["places"]}
    // >
    //   {children}
    // </LoadScriptNext>
  );
};
export default GoogleMapsProvider;
