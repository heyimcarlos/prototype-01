// import type { FillLayer, LineLayer } from "react-map-gl";

import MAP_STYLE from "@/lib/map-style-basic-v8.json";

// const fillLayer: FillLayer = {
//   id: "sf-neighborhoods-fill",
//   // source: "sf-neighborhoods",
//   type: "fill",
//   paint: {
//     "fill-outline-color": "#0040c8",
//     "fill-color": "#fff",
//     "fill-opacity": 0.25,
//   },
// };

// const lineLayer: LineLayer = {
//   id: "sf-neighborhoods-outline",
//   // source: "sf-neighborhoods",
//   type: "line",
//   paint: {
//     "line-width": 1,
//     "line-color": "#0080ef",
//   },
// };

// Make a copy of the map style
const mapStyle = {
  ...MAP_STYLE,
  sources: {
    ...MAP_STYLE.sources,
  },
  layers: [...MAP_STYLE.layers],
};

export default mapStyle;
