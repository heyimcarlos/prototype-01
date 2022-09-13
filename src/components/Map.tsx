import Head from "next/head";
import React, { useRef, useState } from "react";
import MapboxMap, {
  Source,
  Layer,
  MapRef,
  MapLayerMouseEvent,
  Marker,
} from "react-map-gl";
import { env } from "../env/client.mjs";
import { trpc } from "@/utils/trpc";
import {
  FeatureCollection,
  Feature,
  Geometry,
  GeoJsonProperties,
  Position,
} from "geojson";
import bbox from "@turf/bbox";
import { GetPlaceOutput } from "@/server/router/example.js";
import { JSONArray } from "superjson/dist/types.js";
import * as turf from "@turf/turf";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css";
import MapTopBar from "@/components/MapTopBar";

type GOOGLE_LIBRARIES =
  | "drawing"
  | "geometry"
  | "localContext"
  | "places"
  | "visualization";

export const GOOGLE_MAP_LIBRARIES = ["places"] as GOOGLE_LIBRARIES[];

export const availablePreferences = ["work", "pharmacy", "market"] as const;

export type Preference = typeof availablePreferences[number];

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

// 1. have a useEffect that manages the sync between preferences in local storage and the active preferences in local state
// 2. set the preferences locally, and then sync them to local storage
// 3. Use a localStorage hook, that detects changes to local storage and updates the state
type SetValue<T> = React.Dispatch<React.SetStateAction<T>>;
export type PreferenceObject = { address: string; lat: number; lng: number };
export type MapProps = {
  setPref: SetValue<{
    work?: PreferenceObject;
    pharmacy?: PreferenceObject;
    market?: PreferenceObject;
  }>;
  pref: {
    work?: PreferenceObject;
    pharmacy?: PreferenceObject;
    market?: PreferenceObject;
  };
};

let i = -1;

const Map = ({ setPref, pref }: MapProps) => {
  const [show, setShow] = useState(true);

  const [isListingClick, setIsListingClick] = useState(false);

  // @INFO: Selected listing state// @INFO: Selected listing state
  const [selectedListing, setSelectedListing] = useState("");

  const [showRoutes, setShowRoutes] = useState(false);

  const [directions, setDirections] = useState<FeatureCollection>();

  const mapRef = useRef<MapRef>(null);

  const mutation = trpc.useMutation(["example.getPlace"], {
    onSuccess: (data) => {
      const placeAsFeature = transformPlaceToFeature(data);
      if (placeAsFeature) fitBounds(placeAsFeature);
    },
  });

  const { data } = trpc.useQuery(["example.initial"], {
    refetchOnReconnect: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: false,
  });

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
      }
    ),
      setShow(!show);
  };

  const matrixQuery = trpc.useQuery(
    ["example.matrix", { origin: selectedListing, dest: pref }],
    {
      onSuccess: (data) => {
        console.log("data", data);
        const d = turf.featureCollection(
          data.map((route) =>
            turf.lineString(route.routes[0].geometry.coordinates)
          )
        );

        setDirections(d);
      },
      onError: (err) => {
        if (err.message === "destination-not-provided") {
          setDirections(undefined);
        }
      },
      refetchOnReconnect: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: !!selectedListing && !!pref,
    }
  );

  const onClickMap = (event: MapLayerMouseEvent) => {
    if (!mapRef.current) return;
    const queryRenderedFeatures = mapRef.current.queryRenderedFeatures(
      event.point,
      {}
    );
    const feature = queryRenderedFeatures[0];
    // @TODO: we should be getting the cluster_id from the feature

    // @INFO: Below is the fetch db for the clicked place.
    if (feature?.sourceLayer === "place_label" && feature.properties?.name) {
      const slug = slugify(feature.properties.name);

      mutation.mutate({ slug });
    } else if (!isListingClick) {
      // @INFO: @mtjosue This code breaks the map fitBounds setup.
      const test = mapRef.current.getCenter();
      mapRef.current.flyTo({
        center: [test.lng, test.lat],
        zoom: 14,
        duration: 1000,
      });
      setShowRoutes(false);
    }

    // @INFO: Below goes the following code, when a feature source layer is not a place and the feature does not have a name.
  };

  // console.log("directions", directions);

  const routeColor = (idx: number) => {
    console.log("idx", idx);
    const colors = ["royalblue", "red", "green"];
    console.log("color", colors[idx]);
    return colors[idx];
  };

  // console.log("directions", directions?.features[0]?.geometry.coordinates);

  return (
    <div className="h-full w-full">
      <Head>
        <title>ntornos map</title>
      </Head>
      <MapboxMap
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
        onClick={(e) => {
          setIsListingClick(false);
          onClickMap(e);
        }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxAccessToken={env.NEXT_PUBLIC_MAPBOX_TOKEN}
      >
        <div className="m-2">
          <MapTopBar setPref={setPref} pref={pref} />
        </div>
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
                  onClick={() => {
                    // matrixQuery;
                    setIsListingClick(true);
                    setShowRoutes(true);
                    setSelectedListing(
                      `${listing.location.longitude},${listing.location.latitude}`
                    );
                  }}
                  latitude={listing.location.latitude}
                  longitude={listing.location.longitude}
                  key={`listing-${listing.id}`}
                >
                  <div className="bg-green-400 cursor-pointer py-1 px-2 rounded-full flex justify-center items-center">
                    <span className="text-sm">
                      {transformIntToMoney(listing.price)}
                    </span>
                  </div>
                </Marker>
              )
          )}
        {mutation.data?.bounds && (
          <Source
            id="polygons-source"
            type="geojson"
            data={turf.mask(
              turf.polygon([mutation.data.bounds] as Position[][])
            )}
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
        {directions &&
          showRoutes &&
          directions.features.map((feat, idx) => {
            return (
              <Source key={idx} type="geojson" data={feat}>
                <Layer
                  id={`linelayer${idx}`}
                  type="line"
                  source="line-source"
                  layout={{
                    "line-join": "round",
                    "line-cap": "round",
                  }}
                  paint={{
                    "line-color": routeColor(idx),
                    "line-width": 5,
                    "line-opacity": 0.6,
                  }}
                />
              </Source>
            );
          })}
        {/* ---------------------------------------------------------------------------------------- */}
        {/* <Source
          // id="line-source"
          type="geojson"
          data={directions?.features[0]}
        >
          <Layer
            id="lineLayer"
            type="line"
            source="line-source"
            layout={{
              "line-join": "round",
              "line-cap": "round",
            }}
            paint={{
              "line-color": "royalblue",
              "line-width": 5,
            }}
          />
        </Source>{" "}
        <Source
          // id="line-source"
          type="geojson"
          data={directions?.features[1]}
        >
          <Layer
            id="lineLayer1"
            type="line"
            source="line-source"
            layout={{
              "line-join": "round",
              "line-cap": "round",
            }}
            paint={{
              "line-color": "red",
              "line-width": 5,
            }}
          />
        </Source> */}
        {/* ---------------------------------------------------------------------------------------- */}
        {/* {directions && showRoutes && (
          <Source id="line-source" type="geojson" data={directions}>
            <Layer
              id="lineLayer"
              type="line"
              source="line-source"
              layout={{
                "line-join": "round",
                "line-cap": "round",
              }}
              paint={{
                "line-color": "royalblue",
                "line-width": 5,
              }}
            />
          </Source>
        )} */}
      </MapboxMap>
    </div>
  );
};

export default Map;
