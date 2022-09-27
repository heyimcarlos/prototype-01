import React, { RefObject, useState } from "react";
import MapboxMap, { Source, Layer, MapRef, MapLayerMouseEvent, Marker } from "react-map-gl";
import { env } from "../env/client.mjs";
import { trpc } from "@/utils/trpc";
import { Feature, Geometry, GeoJsonProperties, Position } from "geojson";
import bbox from "@turf/bbox";
import * as turf from "@turf/turf";
import { BriefcaseIcon, ShoppingCartIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";
import { Coordinate, Listing, Place } from "@prisma/client";
import { transformPlaceToFeature } from "@/lib/transformPlace";
import slugify from "@/lib/slugify";
import { transformIntToMoney } from "@/lib/transformInt";

import "mapbox-gl/dist/mapbox-gl.css";
import { useMapPreferences } from "@/stores/useMapPreferences";

type MapProps = {
  mapRef: RefObject<MapRef>;
  places: (Place & {
    center: Coordinate;
    listing: (Listing & {
      location: Coordinate;
    })[];
  })[];
};

const Map = ({ places, mapRef }: MapProps) => {
  const [show, setShow] = useState(true);
  const [selectedListing, setSelectedListing] = useState("");
  const [showRoutes, setShowRoutes] = useState(false);
  const [curListingId, setCurListingId] = useState("");

  const placeMutation = trpc.useMutation(["map.place"], {
    onSuccess: (data) => {
      const placeAsFeature = transformPlaceToFeature(data);
      if (placeAsFeature) fitBounds(placeAsFeature);
    },
  });
  const active = useMapPreferences((state) => state.active);
  const update = useMapPreferences((state) => state.update);
  const nearbyMutation = trpc.useMutation(["map.nearby"], {
    onSuccess: (data) => {
      let farthest = data?.[0];
      data?.forEach((feature) => {
        update(feature.properties.preference);
        if (feature.properties.distance && farthest?.properties.distance) {
          if (feature.properties.distance > farthest.properties.distance) {
            farthest = feature;
          }
        }
      });

      fitBounds(farthest as GeoJSON.Feature<GeoJSON.LineString>);
    },
    onError: (e) => {
      console.log(e, "wtf?");
    },
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
        padding: 150,
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
      placeMutation.mutate({ slug });
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

  const handleListingClick = (listing: MapProps["places"][number]["listing"][number]) => {
    setShowRoutes(true);

    setSelectedListing(`${listing.location.longitude},${listing.location.latitude}`);

    setCurListingId(listing.id);

    nearbyMutation.mutate({
      origin: {
        lng: listing.location.longitude,
        lat: listing.location.latitude,
      },
      rankBy: "distance",
      preferences: active,
    });
  };

  const routeColor = (idx: number) => {
    const colors = ["royalblue", "red", "green"];
    return colors[idx];
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
        {places?.map(
          (place) =>
            // @INFO: This show toggler should be inside the marker component or the child component. That way each marker can be toggled individually.
            show && (
              <Marker
                onClick={() => {
                  placeMutation.mutate({ slug: place.slug });
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
        {placeMutation.data?.listing.map(
          (listing) =>
            !show && (
              <Marker
                onClick={(e) => {
                  e.originalEvent.stopPropagation();
                  handleListingClick(listing);
                  // fitPrefBounds(e);
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

        {/* @INFO: Bounds being rendered here */}
        {placeMutation.data?.bounds && (
          <Source
            id="polygons-source"
            type="geojson"
            data={turf.polygon([placeMutation.data.bounds] as Position[][])}
          >
            <Layer
              minzoom={14.1}
              id="polygons"
              type="fill"
              source="polygons-source"
              paint={{ "fill-color": "gray", "fill-opacity": 0.25 }}
            />
          </Source>
        )}

        {placeMutation.data?.bounds && (
          <Source
            type="geojson"
            data={turf.mask(turf.polygon([placeMutation.data.bounds] as Position[][]))}
          >
            <Layer
              maxzoom={14.1}
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

        {/* @INFO: Destination lineStrings being rendered here */}
        {showRoutes &&
          nearbyMutation.data?.map((dest, idx) => {
            return (
              <Marker
                key={idx}
                longitude={dest.properties.preference.longitude}
                latitude={dest.properties.preference.latitude}
              >
                <div className="h-10 w-10 flex items-center justify-center rounded-full bg-white">
                  {dest.properties.preference.key === "work" && (
                    <BriefcaseIcon className=" h-8 w-8" aria-hidden="true" />
                  )}

                  {dest.properties.preference.key === "pharmacy" && (
                    <ShoppingBagIcon className=" h-8 w-8" aria-hidden="true" />
                  )}

                  {dest.properties.preference.key === "supermarket" && (
                    <ShoppingCartIcon className=" h-8 w-8" aria-hidden="true" />
                  )}
                </div>
              </Marker>
            );
          })}

        {/* @INFO: Routes being rendered here */}
        {showRoutes &&
          nearbyMutation.data?.map((feature, idx) => {
            return (
              <Source
                key={idx}
                type="geojson"
                data={feature as GeoJSON.Feature<GeoJSON.LineString>}
              >
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
