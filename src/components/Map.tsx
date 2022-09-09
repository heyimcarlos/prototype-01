import Head from "next/head";
import React, { Fragment, useEffect, useRef, useState } from "react";
import Map, { Source, Layer, MapRef, MapLayerMouseEvent, Marker } from "react-map-gl";
import { env } from "../env/client.mjs";
import { trpc } from "@/utils/trpc";
import { FeatureCollection, Feature, Geometry, GeoJsonProperties, Position } from "geojson";
import bbox from "@turf/bbox";
import { GetPlaceOutput } from "@/server/router/example.js";
import { JSONArray } from "superjson/dist/types.js";
import * as turf from "@turf/turf";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css";
import { Popover, Switch, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

interface MapboxDirectionsResponse {
  code: string;
  uuid: string;
  waypoints: {
    distance: number;
    name: string;
    location: number[];
  }[];
  routes: {
    distance: number;
    duration: number;
    geometry: {
      coordinates: number[][];
      type: string;
    };
    legs: {
      admins: {
        iso_3166_1: string;
        iso_3166_1_alpha3: string;
      }[];
      distance: number;
      duration: number;
      steps: [];
      summary: string;
      weight: number;
    }[];
    weight: number;
    weight_name: string;
  }[];
}

const inputArray = [
  {
    name: "work",
    placeholder: "Enter your work name",
    label: "Work",
  },
  {
    name: "bank",
    placeholder: "Enter your bank name",
    label: "Bank",
  },
  {
    name: "market",
    placeholder: "Enter your market name",
    label: "Market",
  },
  {
    name: "park",
    placeholder: "Enter your park name",
    label: "Park",
  },
  {
    name: "gas station",
    placeholder: "Enter your gas station name",
    label: "Gas station",
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const Toggle = () => {
  const [enabled, setEnabled] = useState(false);
  return (
    <Switch
      checked={enabled}
      onChange={setEnabled}
      className={classNames(
        enabled ? "bg-indigo-600" : "bg-gray-200",
        "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      )}
    >
      <span className="sr-only">Use setting</span>
      <span
        aria-hidden="true"
        className={classNames(
          enabled ? "translate-x-5" : "translate-x-0",
          "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
        )}
      />
    </Switch>
  );
};

const MapTopbar = () => {
  // const [value, setValue] = useState("");
  // const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete>();
  // const [destination, setDestination] = useState<google.maps.Place>();

  // const onLoad = (autocomplete: google.maps.places.Autocomplete) => {
  //   console.log("autocomplete: ", autocomplete);
  //   setAutocomplete(autocomplete);
  // };

  // const onPlaceChanged = () => {
  //   console.log("onPlaceChanged: ");
  //   const b = autocomplete?.getPlace();
  //   console.log("b: ", b);
  //   setDestination({ placeId: b?.place_id, location: b?.geometry?.location });
  // };
  // console.log(destination && destination);
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
            <Popover.Panel className="absolute left-1/2 z-10 mt-3 w-screen max-w-xs -translate-x-1/2 transform px-2 sm:px-0">
              {/* @INFO: Card */}
              <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-6 sm:p-6">
                  {inputArray.map((item) => (
                    <div key={item.name}>
                      <label
                        htmlFor={item.name}
                        className="block text-sm font-medium text-gray-700"
                      >
                        {item.label}
                      </label>
                      {/* <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}> */}
                      <div className="mt-1 flex items-center justify-between">
                        <input
                          // value={value}
                          // onChange={(e) => setValue(e.target.value)}
                          type="text"
                          name={item.name}
                          id="email"
                          className="block w-full w-8/12 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          placeholder={item.placeholder}
                        />
                        <Toggle />
                      </div>
                      {/* </Autocomplete> */}
                    </div>
                  ))}
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
  const [directions, setDirections] = useState<Feature>();
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

  // @INFO: this is a hacky way to get directions from mapbox directions api
  useEffect(() => {
    if (typeof window !== "undefined") {
      const fetchDirections = async () => {
        // https://api.mapbox.com/directions/v5/mapbox/cycling/-84.518641,39.134270;-84.512023,39.102779?geometries=geojson&access_token=pk.eyJ1IjoicmVuemlrc2hhdyIsImEiOiJjbDdtMXJ1enAxbmtsM3Vwb3R6MmdpbWR0In0.XRzLldbwy7Zcw2qYnwoy3w
        const apiUrl = "https://api.mapbox.com/directions/v5/mapbox/driving";
        const pointOne = "-69.93860006737556,18.45774256874768";
        const pointTwo = "-69.94397336219362,18.45452665089533";
        const accessToken = env.NEXT_PUBLIC_MAPBOX_TOKEN;
        const res = await fetch(
          `${apiUrl}/${pointOne};${pointTwo}?geometries=geojson&access_token=${accessToken}`
        );
        const data: MapboxDirectionsResponse = await res.json();
        console.log("data", data);
        if (!data.routes[0]) return;
        const lineFeature = turf.lineString(data.routes[0].geometry.coordinates);
        console.log("lineFeature", lineFeature);
        setDirections(lineFeature);
      };
      fetchDirections();
      // mapRef.current.addControl(directions, "top-left");
    }
  }, []);

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
      <MapTopbar />
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
        {directions && (
          <Source id="line-source" type="geojson" data={directions}>
            <Layer
              // minzoom={15}
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
      </Map>
    </div>
  );
};

export default MapPage;
