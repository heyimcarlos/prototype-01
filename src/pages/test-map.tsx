import Head from "next/head";
import React, { useRef, useState } from "react";
import Map, { Source, Layer, MapRef, MapLayerMouseEvent, FillLayer, LineLayer } from "react-map-gl";
import { env } from "../env/client.mjs";
import { trpc } from "@/utils/trpc";
import "mapbox-gl/dist/mapbox-gl.css";
import { GetPlaceOutput } from "@/server/router/example.js";

//@INFO: do we even need a feature collection, or can we just use a feature?
//@INFO: Analyze the whole feature collection thing, and see how is it used on a long feature collection.
const transformToFeatureCollection = (place: GetPlaceOutput) => {
  const coordsArr = place?.borderCoords.map((coords) => [coords.latitude, coords.longitude]);

  return {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: [coordsArr],
        },
        id: place.id,
        properties: {
          id: place.id,
          neighborhood: place.name,
        },
      },
    ],
  };
};

const fillLayer: FillLayer = {
  id: "sdq-neighbourhoods-fill",
  type: "fill",
  source: "xyc",
  paint: {
    "fill-outline-color": "#0040c8",
    "fill-color": "grey",
    "fill-opacity": 0.25,
  },
};

const lineLayer: LineLayer = {
  id: "sdq-neighbourhoods-outline",
  type: "line",
  paint: {
    "line-opacity": 0.25,
    "line-width": 0.25,
    "line-color": "blue",
  },
};

const slugify = (str: string) => {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};

const MapPage = () => {
  const [feature, setFeature] = useState<any>();
  const mapRef = useRef<MapRef>(null);

  const mutation = trpc.useMutation(["example.getPlace"], {
    onSuccess: (data) => {
      const geojson = transformToFeatureCollection(data);
      console.log("geojson", geojson);
      setFeature(geojson);
    },
  });

  const onClick = (event: MapLayerMouseEvent) => {
    if (!mapRef.current) return;
    const queryRenderedFeatures = mapRef.current.queryRenderedFeatures(event.point, {});
    const feature = queryRenderedFeatures[0];
    if (feature?.sourceLayer === "place_label" && feature.properties?.name) {
      const slug = slugify(feature.properties.name);
      mutation.mutate({ slug });
    }

    //@TODO: Implement an easeIn animation to the feature.

    // @INFO: Below is the code when a feature source layer is not a place and the feature does not have a name.
  };

  return (
    <div>
      <Head>
        <title>ntornos map</title>
      </Head>
      <Map
        ref={mapRef}
        initialViewState={{
          longitude: -69.94115,
          latitude: 18.45707,
          zoom: 15,
        }}
        onClick={onClick}
        style={{ width: "100%", height: "100vh" }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxAccessToken={env.NEXT_PUBLIC_MAPBOX_TOKEN}
      >
        {feature && (
          <Source id="xyc" type="geojson" data={feature}>
            <Layer {...fillLayer} />
            <Layer {...lineLayer} />
          </Source>
        )}
        <div className="bg-blue border-1 h-50"></div>
      </Map>
    </div>
  );
};

export default MapPage;
