import React, {
  type Dispatch,
  type RefObject,
  type SetStateAction,
  useEffect,
  useState,
} from "react";
import MapboxMap, {
  Source,
  Layer,
  type MapRef,
  type MapLayerMouseEvent,
  Marker,
} from "react-map-gl";
import { env } from "../env/client.mjs";
import { trpc } from "@/utils/trpc";
import type { Feature, Geometry, GeoJsonProperties, Position } from "geojson";
import bbox from "@turf/bbox";
import * as turf from "@turf/turf";

import type { Coordinate, Listing, Place } from "@prisma/client";
import { transformPlaceToFeature } from "@/lib/transformPlace";
import slugify from "@/lib/slugify";
import { transformIntToMoney } from "@/lib/transformInt";

import "mapbox-gl/dist/mapbox-gl.css";

import { useSidebar } from "@/stores/useSidebar";
import { useSectors } from "../stores/useSectors";

import { useGlobalShow } from "@/stores/useGlobalShow";
import { useGlobalHide } from "@/stores/useGlobalHide";

import DrawControl from "@/components/DrawControl";

import { NavigationControl } from "react-map-gl";
import Head from "next/head.js";
import { useDrawShow } from "@/stores/useDrawShow";
import { useShowCustomSearch } from "@/stores/useShowCustomSearch";
import { useDrawControls } from "@/stores/useDrawControls";

import Image from "next/image.js";
import toolTip from "../../public/assets/images/tooltip.png";
import polyGif from "../../public/assets/images/ezgif.com-gif-maker (1).gif";
import { useSelectedListing } from "@/stores/useSelectedListing";

type MapProps = {
  initialViewport: {
    longitude: number;
    latitude: number;
    zoom: number;
  };
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  mapRef: RefObject<MapRef>;
  places: (Place & {
    center: Coordinate;
    listing: (Listing & {
      location: Coordinate;
    })[];
  })[];
};

type CustomMarkerProps = {
  place: MapProps["places"][number];
  onClick: ({ slug }: { slug: string }) => void;
  names: string[];
};

const CustomMarker = ({ place, onClick, names }: CustomMarkerProps) => {
  const [show, setShow] = useState(true);
  const globalShow = useGlobalShow((state) => state.globalShow);
  const globalHide = useGlobalHide((state) => state.globalHide);
  const setGlobalShowFalse = useGlobalShow((state) => state.setGlobalShowFalse);

  if (globalShow === true && show === false) setShow(true);

  return (
    <>
      {!globalHide && show && !names.includes(place.name) && (
        <Marker
          onClick={(e) => {
            e.originalEvent.stopPropagation();
            onClick({ slug: place.slug });
            setShow(false);
            setGlobalShowFalse();
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
      )}
    </>
  );
};

const Map = ({ places, mapRef, initialViewport, setOpen }: MapProps) => {
  const setGlobalShowTrue = useGlobalShow((state) => state.setGlobalShowTrue);

  const [curListingId, setCurListingId] = useState("");

  const setListings = useSidebar((state) => state.setListings);

  const addSector = useSectors((state) => state.addSector);

  // const deleteAllSectors = useSectors((state) => state.deleteAllSectors);

  const names: string[] = [];

  const sectors = useSectors((state) => state.sectors);

  sectors.forEach((sector) => names.push(sector.name));

  const showCustomSearch = useShowCustomSearch(
    (state) => state.showCustomSearch
  );

  const setShowCustomSearchTrue = useShowCustomSearch(
    (state) => state.setShowCustomSearchTrue
  );

  const setShowCustomSearchFalse = useShowCustomSearch(
    (state) => state.setShowCustomSearchFalse
  );

  const setGlobalHideTrue = useGlobalHide((state) => state.setGlobalHideTrue);

  const setGlobalHideFalse = useGlobalHide((state) => state.setGlobalHideFalse);

  const [customPolyBounds, setCustomPolyBounds] = useState<Position[][]>();

  const drawShow = useDrawShow((state) => state.drawShow);

  const setDrawShowFalse = useDrawShow((state) => state.setDrawShowFalse);

  const setDrawShowTrue = useDrawShow((state) => state.setDrawShowTrue);

  const deleteThisSector = useSectors((state) => state.deleteThisSector);

  const redraw = useDrawControls((state) => state.redraw);

  const setRedrawTrue = useDrawControls((state) => state.setRedrawTrue);

  const setRedrawFalse = useDrawControls((state) => state.setRedrawFalse);

  const drawDefault = useDrawControls((state) => state.drawDefault);

  const setDrawDefaultPoly = useDrawControls(
    (state) => state.setDrawDefaultPoly
  );

  const [drawPolyToolTip, setDrawPolyToolTip] = useState(false);

  const setListing = useSelectedListing((state) => state.setListing);

  // ------------------------------------------------------------------------------------------------------------------------------------------------------------

  const fitBounds = (feature: Feature<Geometry, GeoJsonProperties>) => {
    if (!mapRef.current) return;

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

      const placeAsFeature = transformPlaceToFeature(data);
      if (placeAsFeature) fitBounds(placeAsFeature);
      setListings(data.listing);
    },
  });

  useEffect(() => {
    if (sectors.length > 1) {
      let allCurBounds: [][] = [];

      sectors.forEach((sector) => {
        allCurBounds = allCurBounds.concat(sector.bounds as [][]);
      });

      allCurBounds.push(allCurBounds[0] as []);

      if (!mapRef.current) return;

      const geometry = turf.geometry("Polygon", [allCurBounds]);

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
    }
  }, [sectors, mapRef]);

  const handleListingClick = (
    listing: MapProps["places"][number]["listing"][number]
  ) => {
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

  const onClickMap = (event: MapLayerMouseEvent) => {
    event.originalEvent.stopPropagation();
    if (!mapRef.current) return;
    const queryRenderedFeatures = mapRef.current.queryRenderedFeatures(
      event.point,
      {}
    );
    const feature = queryRenderedFeatures[0];

    // @INFO: Below is the fetch db for the clicked place.
    if (feature?.sourceLayer === "place_label" && feature.properties?.name) {
      if (!names.includes(feature.properties.name)) {
        const slug = slugify(feature.properties.name);
        placeMutation.mutate({ slug });
      }
    } else {
      // @INFO: @mtjosue This code breaks the map fitBounds setup.
      setOpen(false);
      if (
        sectors.some((sector) => {
          const point = [event.lngLat.lng, event.lngLat.lat];
          const poly = turf.polygon([sector.bounds] as Position[][]);

          return turf.booleanPointInPolygon(point, poly);
        })
      ) {
        return;
      } else {
      }

      const test = mapRef.current.getCenter();
      mapRef.current.flyTo({
        center: [test.lng, test.lat],
        zoom: 14,
        duration: 1000,
        animate: true,
        easing: (t) => t,
      });

      // deleteAllSectors();
    }
    setGlobalShowTrue();
    // @INFO: Below goes the following code, when a feature source layer is not a place and the feature does not have a name.
  };

  const showVisibleCustomPolygonMarkers = () => {
    if (!mapRef.current) return;
    const map = mapRef.current.getMap();
    const bounds = map.getBounds();
    const customListings = [] as (Listing & {
      location: Coordinate;
    })[];

    for (const place of places) {
      if (
        bounds.contains({
          lat: place.center.latitude,
          lng: place.center.longitude,
        })
      ) {
        if (customPolyBounds) {
          const poly = turf.polygon(customPolyBounds as Position[][]);

          place.listing.forEach((list) => {
            const point = [list.location.longitude, list.location.latitude];
            if (turf.booleanPointInPolygon(point, poly)) {
              customListings.push(list);
            }
          });
        }
      }
    }

    if (customPolyBounds && !names.includes("Custom Boundary")) {
      addSector({
        name: "Custom Boundary",
        bounds: customPolyBounds[0],
        listings: customListings,
      });
    }
    setDrawShowFalse();
  };

  return (
    <>
      <Head>
        <link
          href="https://api.mapbox.com/mapbox-gl-js/v2.6.1/mapbox-gl.css"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-draw/v1.3.0/mapbox-gl-draw.css"
          type="text/css"
        />
      </Head>
      <div className="h-full w-full">
        <MapboxMap
          id="mapa"
          ref={mapRef}
          initialViewState={initialViewport}
          onDragEnd={() => {
            showVisibleMarkers();
          }}
          onClick={(e) => {
            setCurListingId("");
            onClickMap(e);
          }}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          mapboxAccessToken={env.NEXT_PUBLIC_MAPBOX_TOKEN}
        >
          <div className="h-full w-full flex justify-center items-end">
            {showCustomSearch && (
              <button
                onClick={() => {
                  showVisibleCustomPolygonMarkers();
                  setRedrawTrue();
                  if (redraw) {
                    setDrawShowTrue();
                    setDrawDefaultPoly();
                    sectors.filter((sector) => {
                      if (sector.name === "Custom Boundary") {
                        deleteThisSector(sector);
                      }
                    });
                    setRedrawFalse();
                    setGlobalHideFalse();
                    setShowCustomSearchFalse();
                  }
                }}
                className={
                  "absolute z-20 p-2 px-3 bg-[#ffffff] text-black mb-10 rounded-lg border-2 border-black"
                }
              >
                {redraw ? "Draw" : "Search this area"}
              </button>
            )}
          </div>

          {drawShow && (
            <div className="h-full w-full">
              <div
                className="h-5 w-5 fixed left-0 top-0 mt-[12.50rem] ml-[0.95rem]"
                onMouseOver={() => {
                  setDrawPolyToolTip(true);
                }}
                onMouseOut={() => {
                  setDrawPolyToolTip(false);
                }}
              >
                <Image alt="" src={toolTip} width={100} height={100} />
              </div>
              {drawPolyToolTip && (
                <div className="h-[26rem] w-[39rem] fixed left-0 top-0 mt-[5.5rem] ml-[4rem] bg-white">
                  <Image alt="" width={1200} height={900} src={polyGif} />
                  <div className="bg-white -mt-[0.5rem]">
                    Edit a created boundary by clicking within its borders and
                    dragging the mid points
                  </div>
                </div>
              )}
            </div>
          )}

          <NavigationControl
            position="top-left"
            style={{ marginBottom: "2rem" }}
          />

          {drawShow && (
            <DrawControl
              position="top-left"
              displayControlsDefault={false}
              controls={{
                polygon: true,
                trash: true,
              }}
              defaultMode={drawDefault}
              styles={mapBoxDrawStyles}
              onCreate={(e) => {
                setGlobalHideTrue();

                setCustomPolyBounds(e.features[0]?.geometry.coordinates);
                setShowCustomSearchTrue();
              }}
              onUpdate={(e) => {
                setCustomPolyBounds(e.features[0]?.geometry.coordinates);
              }}
              onDelete={() => {
                setGlobalHideFalse();
              }}
            />
          )}

          {/* INFO: Sector main cluster */}
          {places?.map((place) => (
            // @INFO: This show toggler should be inside the marker component or the child component. That way each marker can be toggled individually.

            <CustomMarker
              key={`marker-${place.id}`}
              place={place}
              onClick={placeMutation.mutate}
              names={names}
            />
          ))}

          {/* @INFO: Within bounds listings */}

          {sectors.map((sector) =>
            sector.listings.map((listing) => (
              <Marker
                onClick={(e) => {
                  e.originalEvent.stopPropagation();
                  handleListingClick(listing);
                  setOpen(true);
                  setListing(listing);
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
            ))
          )}

          {sectors.map((sector) => (
            <Source
              key={sector.name}
              type="geojson"
              data={turf.mask(turf.polygon([sector.bounds] as Position[][]))}
            >
              <Layer
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
    </>
  );
};

export default Map;

const mapBoxDrawStyles = [
  // ACTIVE (being drawn)
  // line stroke
  // { display: "none" },
  {
    id: "gl-draw-line",
    type: "line",
    filter: ["all", ["==", "$type", "LineString"], ["!=", "mode", "static"]],
    layout: {
      "line-cap": "round",
      "line-join": "round",
    },
    paint: {
      "line-color": "#020202",
      // "line-dasharray": [0.2, 2],
      "line-width": 2,
    },
  },
  // polygon fill
  {
    id: "gl-draw-polygon-fill",
    type: "fill",
    filter: ["all", ["==", "$type", "Polygon"], ["!=", "mode", "static"]],
    paint: {
      // "fill-color": "#D20C0C",
      // "fill-outline-color": "#D20C0C",
      "fill-opacity": 0.01,
    },
  },
  // polygon mid points
  {
    id: "gl-draw-polygon-midpoint",
    type: "circle",
    filter: ["all", ["==", "$type", "Point"], ["==", "meta", "midpoint"]],
    paint: {
      "circle-radius": 6,
      "circle-color": "#020202",
    },
  },
  // polygon outline stroke
  // This doesn't style the first edge of the polygon, which uses the line stroke styling instead
  {
    id: "gl-draw-polygon-stroke-active",
    type: "line",
    filter: ["all", ["==", "$type", "Polygon"], ["!=", "mode", "static"]],
    layout: {
      "line-cap": "round",
      "line-join": "round",
    },
    paint: {
      "line-color": "#020202",
      // "line-dasharray": [0.2, 2],
      "line-width": 2,
    },
  },
  // vertex point halos
  {
    id: "gl-draw-polygon-and-line-vertex-halo-active",
    type: "circle",
    filter: [
      "all",
      ["==", "meta", "vertex"],
      ["==", "$type", "Point"],
      ["!=", "mode", "static"],
    ],
    paint: {
      "circle-radius": 9,
      "circle-color": "#020202",
    },
  },
  // vertex points HERE IS WHERE WE NEED TO FILTER THE POINT.
  {
    id: "gl-draw-polygon-and-line-vertex-active",
    type: "circle",
    // active: "true",
    filter: [
      "all",
      ["==", "meta", "vertex"],
      ["==", "$type", "Point"],
      ["!=", "mode", "static"],
      ["==", "active", "false"],
    ],
    paint: {
      "circle-radius": 8,
      "circle-color": "#4f46e5",
    },
  },

  // INACTIVE (static, already drawn)
  // line stroke
  {
    id: "gl-draw-line-static",
    type: "line",
    filter: ["all", ["==", "$type", "LineString"], ["==", "mode", "static"]],
    layout: {
      "line-cap": "round",
      "line-join": "round",
    },
    paint: {
      "line-color": "#000",
      "line-width": 3,
    },
  },
  // polygon fill
  {
    id: "gl-draw-polygon-fill-static",
    type: "fill",
    filter: ["all", ["==", "$type", "Polygon"], ["==", "mode", "static"]],
    paint: {
      "fill-color": "#000",
      "fill-outline-color": "#000",
      "fill-opacity": 0.1,
    },
  },
  // polygon outline
  {
    id: "gl-draw-polygon-stroke-static",
    type: "line",
    filter: ["all", ["==", "$type", "Polygon"], ["==", "mode", "static"]],
    layout: {
      "line-cap": "round",
      "line-join": "round",
    },
    paint: {
      "line-color": "#000",
      "line-width": 3,
    },
  },
];
