import MapboxDraw from "@mapbox/mapbox-gl-draw";
import { ControlPosition, MapRef, useControl } from "react-map-gl";

type DrawControlProps = ConstructorParameters<typeof MapboxDraw>[0] & {
  position?: ControlPosition;

  onCreate?: (evt: { features: object[] }) => void;
  onUpdate?: (evt: { features: object[]; action: string }) => void;
  onDelete?: (evt: { features: object[] }) => void;
  onClick: (evt: { features: object[] }) => void;
};

const DrawControl = (props: DrawControlProps) => {
  useControl<MapboxDraw>(
    () => new MapboxDraw(props),
    ({ map }) => {
      map.on("click", props.onClick);
      // map.on("draw.create", props.onCreate);
      // map.on("draw.update", props.onUpdate);
      // map.on("draw.delete", props.onDelete);
    },
    ({ map }) => {
      // map.on("draw.create", props.onCreate);
      // map.on("draw.update", props.onUpdate);
      // map.on("draw.delete", props.onDelete);
    },
    { position: props.position }
  );

  return null;
};

export default DrawControl;
