import type { GeoJSONSourceRaw, FillLayer, LineLayer } from "react-map-gl";
// import SDQ from "./santoDomingoBounds.json";

import MAP_STYLE from "@/lib/map-style-basic-v8.json";

const sfNeighborhoods: GeoJSONSourceRaw = {
  type: "geojson",
  // data: "https://raw.githubusercontent.com/uber/react-map-gl/master/examples/.data/feature-example-sf.json",
  // data: "/sf-bounds.json",
  data: "/santo-domingo-bounds.json",
};

const fillLayer: FillLayer = {
  id: "sf-neighborhoods-fill",
  source: "sf-neighborhoods",
  type: "fill",
  paint: {
    "fill-outline-color": "#0040c8",
    "fill-color": "#fff",
    "fill-opacity": 0,
  },
};

const lineLayer: LineLayer = {
  id: "sf-neighborhoods-outline",
  source: "sf-neighborhoods",
  type: "line",
  paint: {
    "line-width": 2,
    "line-color": "#0080ef",
  },
};

// Make a copy of the map style
export default {
  ...MAP_STYLE,
  sources: {
    ...MAP_STYLE.sources,
  },
  layers: [...MAP_STYLE.layers, fillLayer, lineLayer],
};
