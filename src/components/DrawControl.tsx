import MapboxDraw from "@mapbox/mapbox-gl-draw";
import { useControl } from "react-map-gl";

import type { MapRef, ControlPosition } from "react-map-gl";
import type { Feature, Polygon } from "geojson";

export type DrawControlCallbackEvent = {
  features: Feature<Polygon>[];
  target: MapRef;
  type: string;
};

type DrawControlProps = ConstructorParameters<typeof MapboxDraw>[0] & {
  position?: ControlPosition;
  onCreate: (evt: DrawControlCallbackEvent) => void;
  onUpdate: (evt: DrawControlCallbackEvent & { action: string }) => void;
  onDelete: (evt: DrawControlCallbackEvent) => void;
};

export default function DrawControl(props: DrawControlProps) {
  useControl<MapboxDraw>(
    () => {
      const newMap = new MapboxDraw(props);
      return newMap;
    },

    ({ map }: { map: MapRef }) => {
      map.on("draw.create", props.onCreate);
      map.on("draw.update", props.onUpdate);
      map.on("draw.delete", props.onDelete);
    },
    ({ map }: { map: MapRef }) => {
      map.off("draw.create", props.onCreate);
      map.off("draw.update", props.onUpdate);
      map.off("draw.delete", props.onDelete);
    },
    {
      position: props.position,
    }
  );

  return null;
}
