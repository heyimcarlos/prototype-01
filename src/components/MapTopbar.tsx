import React, { RefObject } from "react";
import { MapRef } from "react-map-gl";
import FlyoutMenu from "./FlyoutMenu";
import PreferenceForm from "./PreferenceForm";

type MapTopbarProps = {
  mapRef: RefObject<MapRef>;
};

const MapTopbar = ({}: MapTopbarProps) => {
  return (
    <FlyoutMenu>
      <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
        {/* FORM */}
        <PreferenceForm />
      </div>
    </FlyoutMenu>
  );
};

export default MapTopbar;
