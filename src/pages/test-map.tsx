import Head from "next/head";
import React, { useRef } from "react";
import Map, { Source, Layer, MapRef, MapLayerMouseEvent, FillLayer, LineLayer } from "react-map-gl";
import { env } from "../env/client.mjs";
import { trpc } from "@/utils/trpc";
import { FeatureCollection } from "geojson";
import "mapbox-gl/dist/mapbox-gl.css";
import { Coordinates, Listing, Place } from "@prisma/client";

export const transformToFeatureCollection = (
  place: Place & { borderCoords: Coordinates[]; listing: Listing[] }
): FeatureCollection => {
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
  const mapRef = useRef<MapRef>(null);
  const mutation = trpc.useMutation(["example.getPlaceAsGeoJson"], {});

  const onClick = (event: MapLayerMouseEvent) => {
    if (!mapRef.current) return;
    const queryRenderedFeatures = mapRef.current.queryRenderedFeatures(event.point, {});
    const feature = queryRenderedFeatures[0];

    // @INFO: Below is the fetch db for the clicked place.
    if (feature?.sourceLayer === "place_label" && feature.properties?.name) {
      const slug = slugify(feature.properties.name);
      mutation.mutate({ slug });
    }

    // @INFO: flyTo animates! the map very well.
    // [x] - @TODO: Implement an easeIn animation to the feature.
    mapRef.current.flyTo({
      center: event.lngLat,
      animate: true,
      duration: 1400,
      essential: true,
      zoom: 15.5,
    });

    // @INFO: Below goes the following code, when a feature source layer is not a place and the feature does not have a name.
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
        {mutation.data && (
          <Source id="xyc" type="geojson" data={mutation.data}>
            <Layer {...fillLayer} />
            <Layer {...lineLayer} />
          </Source>
        )}
      </Map>
    </div>
  );
};

export default MapPage;
