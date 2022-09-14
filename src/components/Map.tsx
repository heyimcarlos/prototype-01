import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";
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
import {
  BellIcon,
  BriefcaseIcon,
  CakeIcon,
  CheckIcon,
} from "@heroicons/react/20/solid";

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

const Map = ({ setPref, pref }: MapProps) => {
  const [show, setShow] = useState(true);

  const [isListingClick, setIsListingClick] = useState(false);

  // @INFO: Selected listing state// @INFO: Selected listing state
  const [selectedListing, setSelectedListing] = useState("");

  const [showRoutes, setShowRoutes] = useState(false);

  const [directions, setDirections] = useState<FeatureCollection>();

  const [curListingId, setCurListingId] = useState("");

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
    );
    setShow(false);
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
    } else {
      // @INFO: @mtjosue This code breaks the map fitBounds setup.
      const test = mapRef.current.getCenter();
      mapRef.current.flyTo({
        center: [test.lng, test.lat],
        zoom: 14,
        duration: 1000,
      });
      setShowRoutes(false);
      // setListingSelected("");
    }

    // @INFO: Below goes the following code, when a feature source layer is not a place and the feature does not have a name.
  };

  const routeColor = (idx: number) => {
    const colors = ["royalblue", "red", "green"];
    return colors[idx];
  };

  // console.log("listings", mutation?.data?.listing);
  // console.log("directions", directions);
  console.log("preferences", pref);

  const getDestArr = (prefs) => {
    const destArr = [];
    for (const key in pref) {
      destArr.push(prefs[key]);
    }
    return destArr;
  };

  const destArr = getDestArr(pref);

  console.log("destArr", destArr);

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
        // onZoomEnd={(e) => onZoomEnd(e)}
        onClick={(e) => {
          setIsListingClick(false);
          console.log(isListingClick);
          setShow(true);
          setSelectedListing("");
          setCurListingId("");
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
                  onClick={(e) => {
                    e.originalEvent.stopPropagation();
                    setIsListingClick(true);
                    setShowRoutes(true);
                    setSelectedListing(
                      `${listing.location.longitude},${listing.location.latitude}`
                    );
                    setCurListingId(listing.id);
                  }}
                  // style={{
                  //   display: selectedListing === listing.id ? "none" : "block",
                  // }}
                  latitude={listing.location.latitude}
                  longitude={listing.location.longitude}
                  key={`listing-${listing.id}`}
                >
                  <div
                    className={`bg-green-500 cursor-pointer py-1 px-2 rounded-full flex justify-center items-center`}
                    style={{
                      opacity: curListingId
                        ? curListingId === listing.id
                          ? 1
                          : 0.4
                        : 1,
                      // opacity: 0.5,
                    }}
                  >
                    <span className="text-sm">
                      {transformIntToMoney(listing.price)}
                    </span>
                  </div>
                </Marker>
              )
          )}
        {/* ---------------------------------------------------------------------------- */}

        {destArr.length > 0 &&
          showRoutes &&
          destArr.map((dest, idx) => {
            console.log(dest.lng);
            return (
              <Marker key={idx} longitude={dest.lng} latitude={dest.lat}>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                  {/* <CheckIcon
                    className="h-6 w-6 text-blue-600"
                    aria-hidden="true"
                  /> */}
                  <BriefcaseIcon />
                </div>
              </Marker>
            );
          })}

        {/* <Marker
          //  key={idx}
          longitude={-69.9527804}
          latitude={18.4509765}
        >
          <div className="bg-white cursor-pointer py-1 px-2 rounded-full flex justify-center items-center">
            <BellIcon />
          </div>
        </Marker> */}

        {/* ---------------------------------------------------------------------------- */}
        {mutation.data?.bounds && (
          <Source
            id="polygons-source"
            type="geojson"
            data={turf.mask(
              turf.polygon([mutation.data.bounds] as Position[][])
            )}
          >
            <Layer
              minzoom={14.1}
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
      </MapboxMap>
    </div>
  );
};

export default Map;
