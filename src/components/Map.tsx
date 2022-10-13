import React, { RefObject, useEffect, useState } from "react";
import MapboxMap, {
  Source,
  Layer,
  MapRef,
  MapLayerMouseEvent,
  Marker,
} from "react-map-gl";
import { env } from "../env/client.mjs";
import { trpc } from "@/utils/trpc";
import { Feature, Geometry, GeoJsonProperties, Position } from "geojson";
import bbox from "@turf/bbox";
import * as turf from "@turf/turf";

import { Coordinate, Listing, Place } from "@prisma/client";
import { transformPlaceToFeature } from "@/lib/transformPlace";
import slugify from "@/lib/slugify";
import { transformIntToMoney } from "@/lib/transformInt";

import "mapbox-gl/dist/mapbox-gl.css";
import { useMapPreferences } from "@/stores/useMapPreferences";
import { useSidebar } from "@/stores/useSidebar";
import { useSectors } from "../stores/useSectors";
import { Coord } from "@turf/turf";

type MapProps = {
  initialViewport: {
    longitude: number;
    latitude: number;
    zoom: number;
  };
  mapRef: RefObject<MapRef>;
  places: (Place & {
    center: Coordinate;
    listing: (Listing & {
      location: Coordinate;
    })[];
  })[];
};

const Map = ({ places, mapRef, initialViewport }: MapProps) => {
  const [show, setShow] = useState(true);
  const [showOutline, setShowOutline] = useState(false);
  const [selectedListing, setSelectedListing] = useState("");
  // const [showRoutes, setShowRoutes] = useState(false);
  const [curListingId, setCurListingId] = useState("");
  // const [selectedAreas, setSelectedAreas] = useState<Array<object>>([]);
  const setListings = useSidebar((state) => state.setListings);

  const addSector = useSectors((state) => state.addSector);
  const deleteAllSectors = useSectors((state) => state.deleteAllSectors);

  const sectors = useSectors((state) => state.sectors);
  const names: string[] = [];
  sectors.forEach((sector) => names.push(sector.name));

  // ------------------------------------------------------------------------------------------------------------------------------------------------------------
  // ------------------------------------------------------------------------------------------------------------------------------------------------------------
  // ------------------------------------------------------------------------------------------------------------------------------------------------------------
  // ------------------------------------------------------------------------------------------------------------------------------------------------------------

  const fitBounds = (feature: Feature<Geometry, GeoJsonProperties>) => {
    if (!mapRef.current) return;
    // console.log("sectors", sectors);
    if (sectors.length < 1) {
      const [minLng, minLat, maxLng, maxLat] = bbox(feature);
      mapRef.current.fitBounds(
        [
          [minLng, minLat],
          [maxLng, maxLat],
        ],
        {
          padding: 10,
          animate: true,
          duration: 1400,
          essential: true,
        }
      );
      setShow(false);
    }
  };

  const placeMutation = trpc.useMutation(["map.place"], {
    onSuccess: (data) => {
      if (!names.includes(data.name)) {
        addSector({
          name: data.name,
          bounds: data.bounds,
          listings: data.listing,
        });
      }
      console.log("data", data);
      const placeAsFeature = transformPlaceToFeature(data);
      if (placeAsFeature) fitBounds(placeAsFeature);
      setListings(data.listing);
    },
  });

  useEffect(() => {
    // fitAllCurBounds();
    if (sectors.length > 1) {
      let allCurBounds = [];

      sectors.forEach((sector) => {
        allCurBounds = allCurBounds.concat(sector.bounds);
      });

      allCurBounds.push(allCurBounds[0]);

      if (!mapRef.current) return;

      const geometry = turf.geometry("Polygon", [allCurBounds]);

      console.log("geometry", geometry);

      const [minLng, minLat, maxLng, maxLat] = bbox(geometry);
      mapRef.current.fitBounds(
        [
          [minLng, minLat],
          [maxLng, maxLat],
        ],
        {
          padding: 10,
          animate: true,
          duration: 1400,
          essential: true,
        }
      );

      setShow(false);
    }
    // return;
  }, [sectors, mapRef]);

  const onClickMap = (event: MapLayerMouseEvent) => {
    if (!mapRef.current) return;
    const queryRenderedFeatures = mapRef.current.queryRenderedFeatures(
      event.point,
      {}
    );
    const feature = queryRenderedFeatures[0];

    // @INFO: Below is the fetch db for the clicked place.
    if (feature?.sourceLayer === "place_label" && feature.properties?.name) {
      const slug = slugify(feature.properties.name);
      placeMutation.mutate({ slug });

      setShowOutline(true);
    } else {
      // @INFO: @mtjosue This code breaks the map fitBounds setup.

      if (
        sectors.some((sector) => {
          const point = [event.lngLat.lng, event.lngLat.lat];
          const poly = turf.polygon([sector.bounds] as Position[][]);

          return turf.booleanPointInPolygon(point, poly);
        })
      ) {
        setShow(false);
        return;
      }

      const test = mapRef.current.getCenter();
      mapRef.current.flyTo({
        center: [test.lng, test.lat],
        zoom: 14,
        duration: 1000,
        animate: true,
        easing: (t) => t,
      });
      // setShowRoutes(false);
      setShowOutline(false);
      deleteAllSectors();
    }

    // @INFO: Below goes the following code, when a feature source layer is not a place and the feature does not have a name.
  };

  const handleListingClick = (
    listing: MapProps["places"][number]["listing"][number]
  ) => {
    setSelectedListing(
      `${listing.location.longitude},${listing.location.latitude}`
    );

    setCurListingId(listing.id);
  };

  const showVisibleMarkers = () => {
    if (!mapRef.current) return;
    const map = mapRef.current.getMap();
    const bounds = map.getBounds();
    const listings = [];
    for (const place of places) {
      if (
        bounds.contains({
          lat: place.center.latitude,
          lng: place.center.longitude,
        })
      ) {
        listings.push(place.listing);
      }
    }
    const flattened = listings.flat();
    setListings(flattened);
  };

  return (
    <div className="h-full w-full">
      <MapboxMap
        id="mapa"
        ref={mapRef}
        initialViewState={initialViewport}
        onDragEnd={() => {
          showVisibleMarkers();
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
                  <span className="text-sm font-semibold text-white">
                    {place.listing.length}
                  </span>
                </div>
              </Marker>
            )
        )}
        {/* @INFO: Within bounds listings */}

        {sectors.map((sector) =>
          sector.listings.map(
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
                      opacity: curListingId
                        ? curListingId === listing.id
                          ? 1
                          : 0.4
                        : 1,
                    }}
                  >
                    <span className="text-sm">
                      {transformIntToMoney(listing.price)}
                    </span>
                  </div>
                </Marker>
              )
          )
        )}

        {showOutline &&
          sectors.map((sector) => (
            <Source
              key={sector.name}
              type="geojson"
              data={turf.mask(turf.polygon([sector.bounds] as Position[][]))}
            >
              <Layer
                // maxzoom={14.1}
                id={`linelayer-zoom-out-bounds ${sector.name}`}
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
          ))}
      </MapboxMap>
    </div>
  );
};

export default Map;
