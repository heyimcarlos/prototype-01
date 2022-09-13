import Head from "next/head";
import React, { Fragment, useEffect, useMemo, useRef, useState } from "react";
import MapboxMap, { Source, Layer, MapRef, MapLayerMouseEvent, Marker } from "react-map-gl";
import { env } from "../env/client.mjs";
import { trpc } from "@/utils/trpc";
import { FeatureCollection, Feature, Geometry, GeoJsonProperties, Position } from "geojson";
import bbox from "@turf/bbox";
import { GetPlaceOutput } from "@/server/router/example.js";
import { JSONArray } from "superjson/dist/types.js";
import * as turf from "@turf/turf";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css";
import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";
import PreferenceInput from "@/components/PreferenceInput";

// interface MapboxDirectionsResponse {
//   code: string;
//   uuid: string;
//   waypoints: {
//     distance: number;
//     name: string;
//     location: number[];
//   }[];
//   routes: {
//     distance: number;
//     duration: number;
//     geometry: {
//       coordinates: number[][];
//       type: string;
//     };
//     legs: {
//       admins: {
//         iso_3166_1: string;
//         iso_3166_1_alpha3: string;
//       }[];
//       distance: number;
//       duration: number;
//       steps: [];
//       summary: string;
//       weight: number;
//     }[];
//     weight: number;
//     weight_name: string;
//   }[];
// }

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const Divider = () => (
  <div className="relative my-2 py-2">
    <div className="absolute inset-0 flex items-center" aria-hidden="true">
      <div className="w-full border-t border-gray-300" />
    </div>
  </div>
);

// const Toggle = () => {
//   const [enabled, setEnabled] = useState(false);
//   return (
//     <Switch
//       checked={enabled}
//       onChange={setEnabled}
//       className={classNames(
//         enabled ? "bg-indigo-600" : "bg-gray-200",
//         "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
//       )}
//     >
//       <span className="sr-only">Use setting</span>
//       <span
//         aria-hidden="true"
//         className={classNames(
//           enabled ? "translate-x-5" : "translate-x-0",
//           "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
//         )}
//       />
//     </Switch>
//   );
// };

type GOOGLE_LIBRARIES = "drawing" | "geometry" | "localContext" | "places" | "visualization";
const GOOGLE_MAP_LIBRARIES = ["places"] as GOOGLE_LIBRARIES[];
const availablePreferences = ["work", "pharmacy", "market"] as const;
export type Preference = typeof availablePreferences[number];
const MapTopbar = ({ setPref, pref }: MapProps) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: GOOGLE_MAP_LIBRARIES,
  });

  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete>();
  const [activePrefs, setActivePrefs] = useState<typeof availablePreferences[number][]>([]);

  useEffect(() => {
    const currentPrefKeys = Object.keys(pref) as (keyof typeof pref)[];
    console.log(currentPrefKeys, "currentPrefKeys");
    setActivePrefs(currentPrefKeys);
  }, [pref]);

  const inactivePrefs = useMemo(() => {
    return availablePreferences.filter((pref) => !activePrefs?.includes(pref));
  }, [activePrefs]);

  if (!isLoaded) return <div>Loading...</div>;

  const onLoad = (autocomplete: google.maps.places.Autocomplete) => {
    setAutocomplete(autocomplete);
  };

  const onPlaceChanged = (name: Preference) => {
    if (autocomplete) {
      const place = autocomplete?.getPlace();
      if (place?.name) {
        setPref({
          ...pref,
          [name]: {
            address: place?.name,
            lat: place?.geometry?.location?.lat(),
            lng: place?.geometry?.location?.lng(),
          },
        });
        setAutocomplete(undefined);
      }
    }
  };

  const removePref = (name: string) => {
    setPref({
      ...pref,
      [name]: undefined,
    });
  };

  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button
            className={classNames(
              open ? "text-gray-900" : "text-gray-500",
              "group border p-1 inline-flex items-center rounded-md bg-white text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            )}
          >
            <span>Preferences</span>
            <ChevronDownIcon
              className={classNames(
                open ? "text-gray-600" : "text-gray-400",
                "ml-2 h-5 w-5 group-hover:text-gray-500"
              )}
              aria-hidden="true"
            />
          </Popover.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute left-40 z-10 mt-3 w-screen max-w-xs -translate-x-1/2 transform px-2 sm:px-0">
              {/* @INFO: Card */}
              <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                {/* FORM */}
                <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-6 sm:p-6">
                  {activePrefs.length > 0 && (
                    <>
                      {activePrefs.map((preference, idx) => (
                        <div key={`preferenceInput-${idx}`} className="mb-2 flex items-center">
                          <Autocomplete
                            className="w-full"
                            onLoad={onLoad}
                            onPlaceChanged={() => onPlaceChanged(preference)}
                          >
                            <PreferenceInput
                              name={preference}
                              value={pref[preference]?.address || ""}
                            />
                          </Autocomplete>
                          <div
                            className=""
                            onClick={() => {
                              // matrixQuery();
                              removePref(preference);
                            }}
                          >
                            <XMarkIcon className="text-gray-500 mt-6 h-8 w-8 group-hover:text-gray-500" />
                          </div>
                        </div>
                      ))}
                      {inactivePrefs.length > 0 && <Divider />}
                    </>
                  )}
                  <div className="mt-0">
                    {/* Map through non-active preferences, in this case the preferences that do not exist inside of active preferences */}
                    {inactivePrefs.map((preference, idx) => (
                      <button
                        onClick={() => {
                          setActivePrefs((prev) => [...prev, preference]);
                          setPref({
                            ...pref,
                            [preference]: "",
                          });
                        }}
                        className="rounded-full bg-green-400 cursor-pointer mx-1 py-1 px-2"
                        key={`preferenceOption-${idx}`}
                      >
                        {preference}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

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

  // @INFO: Selected listing state
  const [selectedListing, setSelectedListing] = useState("");

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

  const matrixQuery = trpc.useQuery(["example.matrix", { origin: selectedListing, dest: pref }], {
    onSuccess: (data) => {
      console.log("data", data);
      const d = turf.featureCollection(
        data.map((route) => turf.lineString(route.routes[0].geometry.coordinates))
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
  });

  const [isListingClick, setIsListingClick] = useState(false);
  const [showRoutes, setShowRoutes] = useState(false);

  const onClickMap = (event: MapLayerMouseEvent) => {
    if (!mapRef.current) return;
    const queryRenderedFeatures = mapRef.current.queryRenderedFeatures(event.point, {});
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
          <MapTopbar setPref={setPref} pref={pref} />
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
                    <span className="text-sm">{transformIntToMoney(listing.price)}</span>
                  </div>
                </Marker>
              )
          )}
        {directions && showRoutes && (
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
                "line-color": "rgba(3, 170, 238, 0.5)",
                "line-width": 5,
              }}
            />
          </Source>
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
      </MapboxMap>
    </div>
  );
};

export default Map;
