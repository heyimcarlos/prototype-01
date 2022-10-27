import MapboxDraw from "@mapbox/mapbox-gl-draw";
import { useControl } from "react-map-gl";

import type { MapRef, ControlPosition } from "react-map-gl";
import toDisplayFeatures from "@mapbox/mapbox-gl-draw";

type DrawControlProps = ConstructorParameters<
  typeof MapboxDraw & toDisplayFeatures
>[0] & {
  position?: ControlPosition;

  onCreate: (evt: { features: { id: number | string }[] }) => void;
  onUpdate: (evt: {
    features: { id: number | string }[];
    action: string;
  }) => void;
  onDelete: (evt: { features: { id: number | string }[] }) => void;
};

export default function DrawControl(props: DrawControlProps) {
  useControl<MapboxDraw>(
    () => {
      console.log("onCreate is Firing");
      const newMap = new MapboxDraw(props);
      return newMap;
    },

    ({ map }: { map: MapRef }) => {
      console.log("onAdd is Firing");
      map.on("draw.create", props.onCreate);
      map.on("draw.update", props.onUpdate);
      map.on("draw.delete", props.onDelete);
    },
    ({ map }: { map: MapRef }) => {
      console.log("onRemove is Firing");
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
