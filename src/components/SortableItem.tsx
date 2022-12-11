import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ChevronUpDownIcon, XCircleIcon } from "@heroicons/react/20/solid";
import React from "react";

const SortableItem = ({
  id,
  amen,
  amenities,
  setAmenities,
  selectedAmenities,
  setSelectedAmenities,
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
    >
      <XCircleIcon
        onClick={() => {
          setSelectedAmenities(
            selectedAmenities.filter(
              (selectedAmen: string) => selectedAmen !== amen
            )
          );
          setAmenities([amen, ...amenities]);
        }}
        className="h-6 w-6 text-black mx-1"
      />
      <input
        type="text"
        // autoFocus={true}
        className="p-1 border-[1px] bg-white rounded-md text-sm w-full focus:border-indigo-600 mr-1 "
        defaultValue={amen}
        onBlur={(e) => {
          console.log(e.target.value, "updated value");
          setSelectedAmenities(
            selectedAmenities.map((selectedAmen: string) => {
              if (selectedAmen === amen) return e.target.value;
              else return selectedAmen;
            })
          );
        }}
      />
      <div
        className="h-6 w-6 bg-gray-100 rounded-md mx-0.5"
        {...attributes}
        {...listeners}
      >
        <ChevronUpDownIcon className="h-6 w-6 text-black" />
      </div>
    </div>
  );
};

export default SortableItem;
