import Head from "next/head";
import React, { useRef, useState } from "react";
import Map, {
  Source,
  Layer,
  MapRef,
  MapLayerMouseEvent,
  FillLayer,
  LineLayer,
  LayerProps,
} from "react-map-gl";
import { env } from "../env/client.mjs";
import { trpc } from "@/utils/trpc";
import { FeatureCollection, Feature, Geometry, GeoJsonProperties, Position } from "geojson";
import "mapbox-gl/dist/mapbox-gl.css";
import { Coordinates, Listing, Place } from "@prisma/client";
import bbox from "@turf/bbox";
import { GetPlaceOutput } from "@/server/router/example.js";
import { AnyLayer } from "mapbox-gl";

// Place & { borderCoords: Coordinates[]; listing: Listing[] }
export const transformToFeatureCollection = (place: GetPlaceOutput) => {
  const coordsArr = place?.borderCoords.map((coords) => [coords.latitude, coords.longitude]);

  const featureCollection: FeatureCollection = {
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

  return featureCollection;
};

// const transformListingsToFeatureCollection = (listings: GetPlaceOutput["listing"]) => {
//   const features = listings.map((listing): Feature => {
//     return {
//       type: "Feature",
//       geometry: {
//         type: "Point",
//         coordinates: [listing.coordinates.latitude, listing.coordinates.longitude, 0],
//       },
//       id: listing.id,
//       properties: {
//         id: listing.id,
//         name: listing.name,
//       },
//     };
//   });

//   return {
//     type: "FeatureCollection",
//     features,
//   };
//   // featureCollection.features.push(...(features as Feature<Geometry, GeoJsonProperties>[]));
// };

const fillLayer: FillLayer = {
  id: "sdq-neighbourhoods-fill",
  type: "fill",
  // source: "xyc",
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
  const [featureCollection, setFeatureCollection] = useState<FeatureCollection>();
  const mutation = trpc.useMutation(["example.getPlace"], {});

  const fitBounds = (feature: Feature<Geometry, GeoJsonProperties>) => {
    if (!mapRef.current) return;
    const [minLng, minLat, maxLng, maxLat] = bbox(feature);
    mapRef.current.fitBounds(
      [
        [minLng, minLat],
        [maxLng, maxLat],
      ],
      {
        padding: 40,
        animate: true,
        duration: 1400,
        essential: true,
        // @INFO: we utilize easing to modify the animation easing process.
        // easing: (t) => t,
      }
    );
  };

  const onClick = (event: MapLayerMouseEvent) => {
    if (!mapRef.current) return;
    const queryRenderedFeatures = mapRef.current.queryRenderedFeatures(event.point, {});
    const feature = queryRenderedFeatures[0];

    // @INFO: Below is the fetch db for the clicked place.
    if (feature?.sourceLayer === "place_label" && feature.properties?.name) {
      console.log(feature, event.lngLat);
      const slug = slugify(feature.properties.name);
      mutation.mutate(
        { slug },
        {
          onSuccess: (data) => {
            const featureCollection = transformToFeatureCollection(data);
            const feature = featureCollection.features[0];
            if (feature) fitBounds(feature);
            setFeatureCollection(featureCollection);
          },
        }
      );
    }

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
        {featureCollection && (
          <Source id={"xyc"} type="geojson" data={featureCollection}>
            <Layer {...lineLayer} />
            <Layer {...fillLayer} />
          </Source>
        )}
      </Map>
    </div>
  );
};

export default MapPage;
