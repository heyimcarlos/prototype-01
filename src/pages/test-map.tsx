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

  featureCollection.features.push(...transformListingsToFeatureCollection(place.listing));

  return featureCollection;
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

const fillLayer: FillLayer = {
  id: "sdq-neighbourhoods-fill",
  type: "fill",
  paint: {
    "fill-outline-color": "#0040c8",
    "fill-color": "grey",
    "fill-opacity": 0.25,
  },
};

const lineLayer: LineLayer = {
  id: "sdq-neighbourhoods-outline",
  type: "line",
  paint: {
    "line-opacity": 0.25,
    "line-width": 0.25,
    "line-color": "blue",
  },
};

const circleColor = "rgb(6, 182, 212)";

// export const clusterLayer: LayerProps = {
//   id: "clusters",
//   type: "circle",
//   filter: ["has", "point_count"],
//   paint: {
//     "circle-color": ["step", ["get", "point_count"], circleColor, 100, "#f1f075", 750, "#f28cb1"],
//     "circle-radius": ["step", ["get", "point_count"], 20, 100, 30, 750, 40],
//   },
// };

// export const clusterCountLayer: LayerProps = {
//   id: "cluster-count",
//   type: "symbol",
//   filter: ["has", "point_count"],
//   layout: {
//     "text-field": "{point_count_abbreviated}",
//     "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
//     "text-size": 14,
//   },
// };

export const unclusteredPointLayer: LayerProps = {
  id: "unclustered-point",
  type: "circle",
  filter: ["!", ["has", "point_count"]],
  paint: {
    "circle-color": circleColor,
    "circle-radius": 10,
    "circle-stroke-width": 1,
    "circle-stroke-color": "#fff",
  },
};

const slugify = (str: string) => {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};

const MapPage = () => {
  const [show, setShow] = useState(true);
  const mapRef = useRef<MapRef>(null);
  const [featureCollection, setFeatureCollection] = useState<FeatureCollection>();
  const mutation = trpc.useMutation(["example.getPlace"], {
    onSuccess: (data) => {
      const featureCollection = transformPlaceToFeatureCollection(data);
      const feature = featureCollection.features[0];
      if (feature) fitBounds(feature);
      setFeatureCollection(featureCollection);
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
      const test = mapRef.current.getCenter();
      mapRef.current.flyTo({
        center: [test.lng, test.lat],
        zoom: 14,
        duration: 1000,
      });
    }

    // @INFO: Below goes the following code, when a feature source layer is not a place and the feature does not have a name.
  };

  return (
    <div>
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
        style={{ width: "100%", height: "100vh" }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxAccessToken={env.NEXT_PUBLIC_MAPBOX_TOKEN}
      >
        {data?.map(
          (place) =>
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

        {featureCollection && !show && (
          <Source type="geojson" data={featureCollection}>
            <Layer {...lineLayer} />
            <Layer {...fillLayer} />
          </Source>
        )}
        {featureCollection && (
          <Source
            type="geojson"
            data={featureCollection}
            cluster
            clusterMaxZoom={14}
            clusterRadius={500}
          >
            {/* <Layer {...clusterLayer} /> */}
            {/* <Layer {...clusterCountLayer} /> */}
            <Layer {...unclusteredPointLayer} />
          </Source>
        )}
      </Map>
    </div>
  );
};

export default MapPage;
