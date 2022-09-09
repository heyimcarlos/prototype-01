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
  Marker,
} from "react-map-gl";
import { env } from "../env/client.mjs";
import { trpc } from "@/utils/trpc";
import { FeatureCollection, Feature, Geometry, GeoJsonProperties, Position } from "geojson";
import "mapbox-gl/dist/mapbox-gl.css";
import bbox from "@turf/bbox";
import { GetPlaceOutput } from "@/server/router/example.js";
import { JSONArray } from "superjson/dist/types.js";
import * as turf from "@turf/turf";

export const transformPlaceToFeatureCollection = (place: GetPlaceOutput) => {
  const bounds = place.bounds as JSONArray;
  const coordsArr = bounds.map((bound) => bound as Position);

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

  // featureCollection.features.push(turf.mask(featureCollection.features[0]));

  // featureCollection.features.push(...transformListingsToFeatureCollection(place.listing));

  return featureCollection;
};

const transformPlaceToFeature = (place: GetPlaceOutput) => {
  const feature: Feature = {
    type: "Feature",
    geometry: {
      type: "Polygon",
      coordinates: [place.bounds] as Position[][],
    },
    id: place.id,
    properties: {
      id: place.id,
      neighborhood: place.name,
    },
  };
  return feature;
};

const transformListingsToFeatureCollection = (listings: GetPlaceOutput["listing"]) => {
  const features = listings.map((listing): Feature => {
    return {
      type: "Feature",
      geometry: {
        type: "Point",
        //@TODO: I think the order is incorrect here
        coordinates: [listing.location.longitude, listing.location.latitude, 0],
      },
      id: listing.id,
      properties: {
        id: listing.id,
        name: listing.name,
      },
    };
  });

  return features;
};

const slugify = (str: string) => {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};

const transformIntToMoney = (int: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    maximumFractionDigits: 0,
    currency: "USD",
  }).format(int);
};

const MapPage = () => {
  const [show, setShow] = useState(true);
  const mapRef = useRef<MapRef>(null);
  const mutation = trpc.useMutation(["example.getPlace"], {
    onSuccess: (data) => {
      const placeAsFeature = transformPlaceToFeature(data);
      if (placeAsFeature) fitBounds(placeAsFeature);
    },
  });
  const { data } = trpc.useQuery(["example.initial"], {});

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
    setShow(!show);
  };

  const onClick = (event: MapLayerMouseEvent) => {
    if (!mapRef.current) return;
    const queryRenderedFeatures = mapRef.current.queryRenderedFeatures(event.point, {});
    const feature = queryRenderedFeatures[0];
    // @TODO: we should be getting the cluster_id from the feature

    // @INFO: Below is the fetch db for the clicked place.
    if (feature?.sourceLayer === "place_label" && feature.properties?.name) {
      const slug = slugify(feature.properties.name);
      mutation.mutate({ slug });
    } else {
      // @INFO: @mtjosue This code breaks the map fitBounds setup.
      //   const test = mapRef.current.getCenter();
      //   mapRef.current.flyTo({
      //     center: [test.lng, test.lat],
      //     zoom: 14,
      //     duration: 1000,
      //   });
    }

    // @INFO: Below goes the following code, when a feature source layer is not a place and the feature does not have a name.
  };

  return (
    <div className="h-full w-full">
      <Head>
        <title>ntornos map</title>
      </Head>
      <Map
        id="mapa"
        ref={mapRef}
        initialViewState={{
          longitude: -69.94115,
          latitude: 18.45707,
          zoom: 14,
        }}
        onZoomEnd={(event) => {
          // @INFO: temporary implementation, this is sketchy
          if (15 > event.viewState.zoom && !show) setShow(true);
          if (15 < event.viewState.zoom && show) setShow(false);
        }}
        onClick={onClick}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxAccessToken={env.NEXT_PUBLIC_MAPBOX_TOKEN}
      >
        {data?.map(
          (place) =>
            // @INFO: This show toggler should be inside the marker component or the child component. That way each marker can be toggled individually.
            show && (
              <Marker
                onClick={() => {
                  mutation.mutate({ slug: place.slug });
                }}
                anchor="bottom"
                key={`marker-${place.id}`}
                longitude={place.center.longitude}
                latitude={place.center.latitude}
                offset={[0, -10]}
              >
                <div className="bg-cyan-500 cursor-pointer w-10 h-10 rounded-full flex justify-center items-center">
                  <span className="text-sm">{place.listing.length}</span>
                </div>
              </Marker>
            )
        )}

        {mutation.data?.listing.length &&
          mutation.data.listing.map(
            (listing) =>
              !show && (
                <Marker
                  latitude={listing.location.latitude}
                  longitude={listing.location.longitude}
                  key={`listing-${listing.id}`}
                >
                  <div className="bg-green-400 cursor-pointer py-1 px-2 rounded-full flex justify-center items-center">
                    <span className="text-sm">{transformIntToMoney(listing.price)}</span>
                  </div>
                </Marker>
              )
          )}

        {mutation.data?.bounds && (
          <Source
            id="polygons-source"
            type="geojson"
            data={turf.mask(turf.polygon([mutation.data.bounds] as Position[][]))}
          >
            <Layer
              minzoom={15}
              id="polygons"
              type="fill"
              source="polygons-source"
              paint={{ "fill-color": "gray", "fill-opacity": 0.5 }}
            />
          </Source>
        )}
      </Map>
    </div>
  );
};

// {featureCollection && (
//   <Source
//     type="geojson"
//     data={featureCollection}
//     cluster
//     clusterMaxZoom={14}
//     clusterRadius={500}
//   >
//     {/* <Layer {...clusterLayer} /> */}
//     {/* <Layer {...clusterCountLayer} /> */}
//     <Layer {...unclusteredPointLayer} />
//   </Source>
// )}

export default MapPage;
