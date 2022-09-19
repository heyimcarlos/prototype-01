import React, { RefObject, useMemo, useRef, useState } from "react";
import MapboxMap, {
  Source,
  Layer,
  MapRef,
  MapLayerMouseEvent,
  Marker,
  MapboxEvent,
} from "react-map-gl";
import { env } from "../env/client.mjs";
import { trpc } from "@/utils/trpc";
import { Feature, Geometry, GeoJsonProperties, Position } from "geojson";
import bbox from "@turf/bbox";
import * as turf from "@turf/turf";
import { BriefcaseIcon, ShoppingCartIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";
import { Coordinate, Listing, Place } from "@prisma/client";
import { transformPlaceToFeature } from "@/lib/transformPlace";
import { PreferenceKey, PreferenceObj } from "@/pages/index";
import slugify from "@/lib/slugify";
import { transformIntToMoney } from "@/lib/transformInt";

import "mapbox-gl/dist/mapbox-gl.css";

type MapProps = {
  mapRef: RefObject<MapRef>;
  pref: PreferenceObj;
  listings: (Place & {
    center: Coordinate;
    listing: (Listing & {
      location: Coordinate;
    })[];
  })[];
};

const Map = ({ pref, listings, mapRef }: MapProps) => {
  const [show, setShow] = useState(true);
  const [selectedListing, setSelectedListing] = useState("");
  const [showRoutes, setShowRoutes] = useState(false);
  const [curListingId, setCurListingId] = useState("");

  const mutation = trpc.useMutation(["map.place"], {
    onSuccess: (data) => {
      const placeAsFeature = transformPlaceToFeature(data);
      if (placeAsFeature) fitBounds(placeAsFeature);
    },
  });

  const preferencesCoordinates = useMemo(() => {
    const destArr = [];
    const keys = Object.keys(pref) as PreferenceKey[];

    for (const key of keys) {
      if (pref[key]?.address) {
        destArr.push({ ...pref[key], key });
      } else {
        // find the closest place of the preference
      }
    }
    return destArr;
  }, [pref]);

  const { data: matrix } = trpc.useQuery(
    ["map.matrix", { origin: selectedListing, destinations: preferencesCoordinates }],
    {
      refetchOnReconnect: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: !!selectedListing && preferencesCoordinates.length > 0,
    }
  );

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

  const onClickMap = (event: MapLayerMouseEvent) => {
    if (!mapRef.current) return;
    const queryRenderedFeatures = mapRef.current.queryRenderedFeatures(event.point, {});
    const feature = queryRenderedFeatures[0];

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
        animate: true,
        easing: (t) => t,
      });
      setShowRoutes(false);
    }

    // @INFO: Below goes the following code, when a feature source layer is not a place and the feature does not have a name.
  };

  const routeColor = (idx: number) => {
    const colors = ["royalblue", "red", "green"];
    return colors[idx];
  };

  const fitPrefBounds = (feature: MapboxEvent<MouseEvent>) => {
    if (!mapRef.current) return;
    const prefBounds = {
      type: "Feature",
      geometry: {
        type: "Polygon",
        coordinates: [[[feature.target._lngLat.lng, feature.target._lngLat.lat]]],
      },
    };

    for (const preference in pref) {
      const arr = [pref[preference].lng, pref[preference].lat];
      prefBounds.geometry.coordinates[0]?.push(arr);
    }

    // console.log("prefBounds", prefBounds);

    const [minLng, minLat, maxLng, maxLat] = bbox(prefBounds);
    mapRef.current.fitBounds(
      [
        [minLng, minLat],
        [maxLng, maxLat],
      ],
      {
        padding: 250,
        animate: true,
        duration: 1400,
        essential: true,
      }
    );
  };

  return (
    <div className="h-full w-full">
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
          setShow(true);
          setSelectedListing("");
          setCurListingId("");
          onClickMap(e);
        }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxAccessToken={env.NEXT_PUBLIC_MAPBOX_TOKEN}
      >
        {/* INFO: Sector main cluster */}
        {listings?.map(
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
                <div className="bg-indigo-600 cursor-pointer w-10 h-10 rounded-full flex justify-center items-center">
                  <span className="text-sm font-semibold text-white">{place.listing.length}</span>
                </div>
              </Marker>
            )
        )}

        {/* @INFO: Within bounds listings */}
        {mutation.data?.listing.length &&
          mutation.data.listing.map(
            (listing) =>
              !show && (
                <Marker
                  onClick={(e) => {
                    e.originalEvent.stopPropagation();
                    setShowRoutes(true);

                    setSelectedListing(
                      `${listing.location.longitude},${listing.location.latitude}`
                    );

                    setCurListingId(listing.id);

                    fitPrefBounds(e);
                  }}
                  latitude={listing.location.latitude}
                  longitude={listing.location.longitude}
                  key={`listing-${listing.id}`}
                >
                  <div
                    className={`bg-green-500 cursor-pointer py-1 px-2 rounded-full flex justify-center items-center`}
                    style={{
                      opacity: curListingId ? (curListingId === listing.id ? 1 : 0.4) : 1,
                    }}
                  >
                    <span className="text-sm">{transformIntToMoney(listing.price)}</span>
                  </div>
                </Marker>
              )
          )}

        {/* @INFO: Destination lineStrings being rendered here */}
        {preferencesCoordinates.length > 0 &&
          showRoutes &&
          preferencesCoordinates.map((dest, idx) => {
            return (
              <Marker key={idx} longitude={dest.lng} latitude={dest.lat}>
                <div className="h-10 w-10 flex items-center justify-center rounded-full bg-white">
                  {dest.key === "work" && <BriefcaseIcon className=" h-8 w-8" aria-hidden="true" />}

                  {dest.key === "pharmacy" && (
                    <ShoppingBagIcon className=" h-8 w-8" aria-hidden="true" />
                  )}

                  {dest.key === "supermarket" && (
                    <ShoppingCartIcon className=" h-8 w-8" aria-hidden="true" />
                  )}
                </div>
              </Marker>
            );
          })}

        {/* @INFO: Bounds being rendered here */}

        {mutation.data?.bounds && (
          <Source
            id="polygons-source"
            type="geojson"
            data={turf.mask(turf.polygon([mutation.data.bounds] as Position[][]))}
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

        {selectedListing && mutation.data?.bounds && (
          <Source
            type="geojson"
            data={turf.mask(turf.polygon([mutation.data.bounds] as Position[][]))}
          >
            <Layer
              maxzoom={14.1}
              // minzoom={14}
              id={`linelayer-zoom-out-bounds`}
              type="line"
              source="line-source"
              layout={{
                "line-join": "round",
                "line-cap": "round",
              }}
              paint={{
                "line-color": "black",
                "line-width": 2,
                "line-opacity": 1,
              }}
            />
          </Source>
        )}

        {/* @INFO: Routes being rendered here */}
        {matrix &&
          showRoutes &&
          matrix.features?.map((feat, idx) => {
            return (
              <Source key={idx} type="geojson" data={feat}>
                <Layer
                  id={`linelayer-${idx}`}
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
