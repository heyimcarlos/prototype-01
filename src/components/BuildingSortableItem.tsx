import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ChevronUpDownIcon, XCircleIcon } from "@heroicons/react/20/solid";
import React from "react";

const BuildingSortableItem = ({
  id,
  amen,
  setBuildingSelectedAmen,
  buildingSelectedAmen,
  setBuildingAmenities,
  buildingAmenities,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      className="w-full flex items-center touch-none"
      style={style}
      //   {...attributes}
      //   {...listeners}
    >
      <div
        className="h-6 w-6 bg-gray-100 rounded-md mr-1"
        {...attributes}
        {...listeners}
      >
        <ChevronUpDownIcon className="h-6 w-6 text-black" />
      </div>
      <input
        type="text"
        autoFocus={true}
        className="p-1 border-[3px] bg-white rounded-md text-sm w-full"
        defaultValue={amen}
        onBlur={(e) => {
          console.log(e.target.value, "updated value");
          setBuildingSelectedAmen(
            buildingSelectedAmen.map((selectedAmen: string) => {
              if (selectedAmen === amen) return e.target.value;
              else return selectedAmen;
            })
          );
        }}
      />

      <XCircleIcon
        onClick={() => {
          setBuildingSelectedAmen(
            buildingSelectedAmen.filter(
              (selectedAmen: string) => selectedAmen !== amen
            )
          );
          setBuildingAmenities([amen, ...buildingAmenities]);
        }}
        className="h-5 w-5 text-black ml-1"
      />
    </div>
  );
};

export default BuildingSortableItem;
