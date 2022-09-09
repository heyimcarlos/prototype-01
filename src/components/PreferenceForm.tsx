import { env } from "@/env/client.mjs";
import { useJsApiLoader } from "@react-google-maps/api";
import React, { Children, useState } from "react";
import PreferenceInput from "./PreferenceInput";
import _ from "lodash";
// type Props = {};

const PreferenceForm = ({ children }: { children?: React.ReactNode }) => {
  // const [value, setValue] = useState("");
  // const [autocomplete, setAutocomplete] =
  useState<google.maps.places.Autocomplete>();
  // const [destination, setDestination] = useState<google.maps.Place>();

  if (!children) return <div>no children...</div>;

  return (
    <div>
      {/* FORM */}
      {/* {inputs.length > 0 && ( */}
      <form>{children}</form>
      {/* )} */}
    </div>
  );
};

export default PreferenceForm;
