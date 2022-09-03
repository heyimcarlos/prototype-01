import Head from "next/head";
import React, { useCallback, useRef, useState } from "react";
import Map, {
  Marker,
  Source,
  Layer,
  LayerProps,
  Popup,
  MapRef,
  MapLayerMouseEvent,
  FillLayer,
  GeoJSONSource,
  MapboxStyle,
  LineLayer,
  GeoJSONSourceRaw,
  BackgroundLayer,
  MapSourceDataEvent,
} from "react-map-gl";
import bbox from "@turf/bbox";
import { env } from "../env/client.mjs";
import MAP_STYLE from "@/lib/map-style";
import "mapbox-gl/dist/mapbox-gl.css";
import DrawControl from "@/components/DrawControl";
import ControlPanel from "@/components/ControlPanel";
// import * as turf from 'turf'
// const GEOFENCE = turf.circle([-74.0122106, 40.7467898], 5, {units: 'miles'});

const geojson: GeoJSON.FeatureCollection = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-69.95266804905022, 18.451431325285455],
            [-69.94626947132103, 18.453979057134134],
            [-69.9477703722697, 18.457725652940653],
            [-69.94231973198217, 18.45933666399783],
            [-69.93603964643263, 18.462671034196546],
            [-69.932208399274, 18.458549893045372],
            [-69.93102347747184, 18.45641435370922],
            [-69.9316554357662, 18.455927297157757],
            [-69.93232689145358, 18.454241321501726],
            [-69.93497321681073, 18.452030795003665],
            [-69.93544718553188, 18.452929995657044],
            [-69.93761954216859, 18.451918394590848],
            [-69.94946876018597, 18.44536157653792],
            [-69.95266804905022, 18.451431325285455],
          ],
        ],
      },
      id: "94105",
      properties: {
        id: 94105,
        neighborhood: "Bella Vista",
      },
    },
  ],
};

export const clusterLayer: LayerProps = {
  id: "clusters",
  type: "circle",
  source: "earthquakes",
  filter: ["has", "point_count"],
  paint: {
    "circle-color": ["step", ["get", "point_count"], "#51bbd6", 100, "#f1f075", 750, "#f28cb1"],
    "circle-radius": ["step", ["get", "point_count"], 20, 100, 30, 750, 40],
  },
};

export const clusterCountLayer: LayerProps = {
  id: "cluster-count",
  type: "symbol",
  source: "earthquakes",
  filter: ["has", "point_count"],
  layout: {
    "text-field": "{point_count_abbreviated}",
    "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
    "text-size": 12,
  },
};

export const unclusteredPointLayer: LayerProps = {
  id: "unclustered-point",
  type: "circle",
  source: "earthquakes",
  filter: ["!", ["has", "point_count"]],
  paint: {
    "circle-color": "#11b4da",
    "circle-radius": 4,
    "circle-stroke-width": 1,
    "circle-stroke-color": "#fff",
  },
};

const fillLayer: FillLayer = {
  id: "sdq-neighbourhoods-fill",
  type: "fill",
  source: "xyc",
  paint: {
    "fill-outline-color": "#0040c8",
    "fill-color": "grey",
    "fill-opacity": 0,
    // "fill-color": "transparent",
    // "fill-outline-color": "transparent",
  },
};

const lineLayer: LineLayer = {
  id: "sdq-neighbourhoods-outline",
  type: "line",
  paint: {
    "line-opacity": 0,
    "line-width": 0.25,
    "line-color": "blue",
  },
};

const MapPage = () => {
  const [fillLay, setFillLay] = useState<FillLayer>(() => fillLayer);
  const [lineLay, setLineLay] = useState<LineLayer>(() => lineLayer);
  //   const [features, setFeatures] = useState({});

  //   const onUpdate = useCallback((e) => {
  //     setFeatures((currFeatures) => {
  //       const newFeatures = { ...currFeatures };
  //       for (const f of e.features) {
  //         newFeatures[f.id] = f;
  //       }
  //       return newFeatures;
  //     });
  //   }, []);

  //   const onDelete = useCallback((e) => {
  //     setFeatures((currFeatures) => {
  //       const newFeatures = { ...currFeatures };
  //       for (const f of e.features) {
  //         delete newFeatures[f.id];
  //       }
  //       return newFeatures;
  //     });
  //   }, []);

  //   const [viewState, setViewState] = useState({
  //     longitude: -69.94115,
  //     latitude: 18.45707,
  //     zoom: 20,
  //   });
  const [showPopup, setShowPopup] = useState(true);
  const [show, setShow] = useState(false);
  const togglePopup = () => setShowPopup(!showPopup);
  const mapRef = useRef<MapRef>(null);

  const toggleSector = () => {
    const opacity = show ? 0.5 : 0;
    setLineLay((prev) => {
      return {
        ...prev,
        paint: {
          ...prev.paint,
          "line-opacity": opacity,
        },
      };
    });
    setFillLay((prev) => {
      return {
        ...prev,
        paint: {
          ...prev.paint,
          "fill-opacity": opacity,
        },
      };
    });
  };

  const onClick = (event: MapLayerMouseEvent) => {
    togglePopup();
    if (!event.features) return;
    const feature = event.features[0];
    if (feature && mapRef.current) {
      setShow(!show);
      toggleSector();

      // calculate the bounding box of the feature
      const [minLng, minLat, maxLng, maxLat] = bbox(feature);
      mapRef.current.easeTo({
        center: { lng: (minLng + maxLng) / 2, lat: (minLat + maxLat) / 2 },
        zoom: 14,
      });
      //   mapRef.current.fitBounds(
      //     [
      //       [minLng, minLat],
      //       [maxLng, maxLat],
      //     ],
      //     { padding: 40, duration: 1000 }
      //   );
      if (feature.properties) {
        const clusterId = feature.properties.cluster_id;
        const mapboxSource = mapRef.current.getSource("earthquakes") as GeoJSONSource;

        mapboxSource.getClusterExpansionZoom(clusterId, (err, zoom) => {
          if (err || !mapRef.current) {
            return;
          }

          mapRef.current.easeTo({
            center: feature.geometry.coordinates,
            zoom,
            duration: 500,
          });
        });
      }
    }
  };

  return (
    <div>
      <Head>
        <title>ntornos map</title>
      </Head>
      <Map
        ref={mapRef}
        // {...viewState}
        // onMove={(evt) => setViewState(evt.viewState)}
        initialViewState={{
          longitude: -69.94115,
          latitude: 18.45707,
          zoom: 15,
        }}
        // interactive
        onClick={onClick}
        // touchPitch
        interactiveLayerIds={[fillLay.id, clusterLayer.id]}
        style={{ width: "100%", height: "100vh" }}
        mapStyle="mapbox://styles/mapbox/dark-v9"
        // onSourceData={(e) => console.log("e", e)}
        mapboxAccessToken={env.NEXT_PUBLIC_MAPBOX_TOKEN}
      >
        {/* <Marker draggable longitude={-69.94115} latitude={18.45707} anchor="center" color="red" /> */}
        <Source id="xyc" type="geojson" data={geojson}>
          <Layer {...fillLay} />
          <Layer {...lineLay} />
        </Source>
        <Source
          id="earthquakes"
          type="geojson"
          data="https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson"
          cluster={true}
          clusterMaxZoom={14}
          clusterRadius={50}
        >
          <Layer {...clusterLayer} />
          <Layer {...clusterCountLayer} />
          <Layer {...unclusteredPointLayer} />
        </Source>
        {showPopup && (
          <Popup
            anchor="bottom"
            // onOpen={onClick}
            onClose={togglePopup}
            longitude={-69.94115}
            latitude={18.45707}
          >
            Bella Vista
          </Popup>
        )}
        {/* <DrawControl
          position="top-left"
          displayControlsDefault={false}
          controls={{
            polygon: true,
            trash: true,
          }}
          defaultMode="draw_polygon"
          onClick={handleClick}
          //   onCreate={onUpdate}
          //   onUpdate={onUpdate}
          //   onDelete={onDelete}
        /> */}
      </Map>
      <ControlPanel />
    </div>
  );
};

export default MapPage;
