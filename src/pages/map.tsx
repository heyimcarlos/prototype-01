import Head from "next/head";
import React, { useCallback, useState } from "react";
import Map, { Marker, Source, Layer, LayerProps, Popup } from "react-map-gl";
import { env } from "../env/client.mjs";

import "mapbox-gl/dist/mapbox-gl.css";
import DrawControl from "@/components/DrawControl";
import ControlPanel from "@/components/ControlPanel";
// import * as turf from 'turf'
// const GEOFENCE = turf.circle([-74.0122106, 40.7467898], 5, {units: 'miles'});

const geojson: GeoJSON.FeatureCollection = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [-69.94115, 18.45707] },
      properties: null,
    },
  ],
};

const layerStyle: LayerProps = {
  id: "point",
  type: "line",

  paint: {
    "line-color": "#ff0000",
    "line-width": 2,
    "line-opacity": 0.5,

    //   "fill-color": "#088",
    //   "fill-opacity": 0.8,

    //   "circle-radius": 10,
    //   "circle-color": "#007cbf",
  },
};

const MapPage = () => {
  const [features, setFeatures] = useState({});

  const onUpdate = useCallback((e) => {
    setFeatures((currFeatures) => {
      const newFeatures = { ...currFeatures };
      for (const f of e.features) {
        newFeatures[f.id] = f;
      }
      return newFeatures;
    });
  }, []);

  const onDelete = useCallback((e) => {
    setFeatures((currFeatures) => {
      const newFeatures = { ...currFeatures };
      for (const f of e.features) {
        delete newFeatures[f.id];
      }
      return newFeatures;
    });
  }, []);

  const [viewState, setViewState] = useState({
    longitude: -69.94115,
    latitude: 18.45707,
    zoom: 12,
  });
  const [showPopup, setShowPopup] = useState(false);
  //   12.550343, 55.665957
  console.log(features);
  return (
    <div>
      <Head>
        <title>ntornos map</title>
      </Head>
      <Map
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        // initialViewState={}
        // interactive
        onClick={(e) => setShowPopup(!showPopup)}
        // touchPitch
        style={{ width: "100%", height: 800 }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={env.NEXT_PUBLIC_MAPBOX_TOKEN}
      >
        {/* <Marker draggable longitude={-69.94115} latitude={18.45707} anchor="center" color="red" /> */}
        {/* <Source id="my-data" type="geojson" data={geojson}>
          <Layer {...layerStyle} />
        </Source> */}
        {/* {showPopup && (
          <Popup
            anchor="bottom"
            onClose={() => setShowPopup(false)}
            longitude={-69.94115}
            latitude={18.45707}
          >
            You are here!
          </Popup>
        )} */}
        <DrawControl
          position="top-left"
          displayControlsDefault={false}
          controls={{
            polygon: true,
            trash: true,
          }}
          defaultMode="draw_polygon"
          onCreate={onUpdate}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      </Map>
      <ControlPanel polygons={Object.values(features)} />
    </div>
  );
};

export default MapPage;
