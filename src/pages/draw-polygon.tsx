import { useState, useCallback } from "react";
import Map from "react-map-gl";

import DrawControl from "@/components/DrawControl";
import ControlPanel from "@/components/ControlPanel";
import { env } from "@/env/client.mjs";

export default function App() {
  const [features, setFeatures] = useState({});
  console.log(features);

  const onUpdate = useCallback((e: { features: { id: number | string }[] }) => {
    setFeatures((currFeatures) => {
      const newFeatures: { [key: string]: { id: number | string } } = {
        ...currFeatures,
      };
      for (const f of e.features) {
        newFeatures[f.id] = f;
      }
      return newFeatures;
    });
  }, []);

  const onDelete = useCallback((e: { features: { id: number | string }[] }) => {
    setFeatures((currFeatures) => {
      const newFeatures: { [key: string]: { id: number | string } } = {
        ...currFeatures,
      };
      for (const f of e.features) {
        delete newFeatures[f.id];
      }
      return newFeatures;
    });
  }, []);

  return (
    <>
      <Map
        initialViewState={{
          longitude: -69.94115,
          latitude: 18.45707,
          zoom: 15,
        }}
        style={{ width: "100%", height: "100vh" }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxAccessToken={env.NEXT_PUBLIC_MAPBOX_TOKEN}
      >
        <DrawControl
          position="top-right"
          displayControlsDefault={false}
          controls={{
            polygon: true,
            trash: true,
          }}
          // defaultMode="draw_polygon"
          onCreate={onUpdate}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      </Map>
      <ControlPanel polygons={Object.values(features)} />
    </>
  );
}
