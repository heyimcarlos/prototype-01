import * as React from "react";
import { useRef } from "react";
import { render } from "react-dom";
import Map, { Marker } from "react-map-gl";
import bbox from "@turf/bbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { env } from "@/env/client.mjs";

import ControlPanel from "../components/control-panel-v2";
import MAP_STYLE from "../lib/map-style-v2";

import type { MapboxStyle, MapRef, MapLayerMouseEvent } from "react-map-gl";

const TOKEN = env.NEXT_PUBLIC_MAPBOX_TOKEN; // Set your mapbox token here

export default function BoundsMapV2() {
  const mapRef = useRef<MapRef>(null);

  const handleClickMap = (event: MapLayerMouseEvent) => {
    console.log("Map Event =", event.features);

    const feature = event.features![0];

    if (feature) {
      // calculate the bounding box of the feature
      const [minLng, minLat, maxLng, maxLat] = bbox(feature);
      // console.log("bbox(feature) =", bbox(feature));
      mapRef.current!.fitBounds(
        [
          [minLng, minLat],
          [maxLng, maxLat],
        ],
        { padding: 40, duration: 1000 }
      );
    }
  };

  const handleClickMarker = (event: mapboxgl.MapboxEvent<MouseEvent>) => {
    const map = document.getElementById("mapv2");
    // map?.dispatchEvent(map.click());
    // const feature = map?.click();
    // console.log("feature =", feature);
    // handleClickMap()
    console.log("Marker Event =", event);
  };

  return (
    <>
      <Map
        id="mapv2"
        ref={mapRef}
        initialViewState={{
          latitude: 37.78,
          longitude: -122.4,
          zoom: 11,
        }}
        style={{ height: 800, width: "100%" }}
        mapStyle={MAP_STYLE as MapboxStyle}
        interactiveLayerIds={["sf-neighborhoods-fill"]}
        mapboxAccessToken={TOKEN}
        onClick={handleClickMap}
      >
        <Marker
          // onClick={(e) => console.log("Marker Event", e)}
          // onClick={handleClickMap}
          onClick={handleClickMarker}
          longitude={-122.48291244506868}
          latitude={37.721364814423865}
          anchor="bottom"
          color={"red"}
        >
          {"Hello World"}
        </Marker>
      </Map>
    </>
  );
}
