import * as React from "react";
import { useRef } from "react";
import { render } from "react-dom";
import Map, { Marker, Source, Layer, LayerProps, Popup } from "react-map-gl";
import bbox from "@turf/bbox";
import "mapbox-gl/dist/mapbox-gl.css";

import ControlPanel from "@/components/ControlPanel";
import MAP_STYLE from "@/lib/map-style";

import type { MapboxStyle, MapRef, MapLayerMouseEvent } from "react-map-gl";
import { env } from "@/env/client.mjs";

const TOKEN = ""; // Set your mapbox token here

export default function BoundsMap() {
  const mapRef = useRef<MapRef>(null);
  const [showPopup, setShowPopup] = React.useState(false);

  const onClick = (event: MapLayerMouseEvent) => {
    const feature = event.features![0];
    console.log("feature", feature);
    setShowPopup(true);
    if (feature) {
      // calculate the bounding box of the feature
      const [minLng, minLat, maxLng, maxLat] = bbox(feature);

      mapRef.current!.fitBounds(
        [
          [minLng, minLat],
          [maxLng, maxLat],
        ],
        { padding: 40, duration: 1000 }
      );
    }
  };

  return (
    <>
      <Map
        ref={mapRef}
        initialViewState={{
          latitude: 18.4569,
          longitude: -69.94091,
          zoom: 11,
        }}
        style={{ height: 800, width: "100%" }}
        mapStyle={MAP_STYLE as MapboxStyle}
        interactiveLayerIds={["sf-neighborhoods-fill"]}
        onClick={onClick}
        mapboxAccessToken={env.NEXT_PUBLIC_MAPBOX_TOKEN}
      >
        {showPopup && (
          <Popup
            anchor="bottom"
            onClose={() => setShowPopup(false)}
            longitude={-69.94115}
            latitude={18.45707}
          >
            You are here!
          </Popup>
        )}
      </Map>
      <ControlPanel />
    </>
  );
}
