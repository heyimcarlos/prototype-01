import * as React from "react";
import { useRef } from "react";
import { env } from "@/env/client.mjs";
import Map from "react-map-gl";
import bbox from "@turf/bbox";
import ControlPanel from "@/components/control-panel-v2";
import MAP_STYLE from "@/lib/map-style-v2";
import type { MapboxStyle, MapRef, MapLayerMouseEvent } from "react-map-gl";

import "mapbox-gl/dist/mapbox-gl.css";

export default function App() {
  const mapRef = useRef<MapRef>(null);

  const onClick = (event: MapLayerMouseEvent) => {
    const feature = event.features[0];
    if (feature) {
      // calculate the bounding box of the feature
      const [minLng, minLat, maxLng, maxLat] = bbox(feature);

      mapRef.current.fitBounds(
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
          latitude: 37.78,
          longitude: -122.4,
          zoom: 11,
        }}
        style={{ width: "100%", height: "100vh" }}
        mapStyle={MAP_STYLE as MapboxStyle}
        interactiveLayerIds={["sf-neighborhoods-fill"]}
        onClick={onClick}
        mapboxAccessToken={env.NEXT_PUBLIC_MAPBOX_TOKEN}
      />
      <ControlPanel />
    </>
  );
}
