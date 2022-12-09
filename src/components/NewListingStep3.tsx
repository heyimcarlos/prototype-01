import { PencilSquareIcon, XCircleIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableItem from "./BuildingSortableItem";

const NewListingStep3 = ({ setStep }) => {
  const [buildingAmenities, setBuildingAmenities] = useState([
    "Año de construcción ",
    "Parqueos ",
    "Ascensor",
    "Proyecto cerrado",
    "Porton Electrico",
    "Planta Electrica",
    "Gas Comun",
    "Seguridad 24/7",
    "Camara de seguridad",
    "Sistema contra incendios",
  ]);

  // const handleDragEnd = (e) => {
  //   console.log("Drag end called");
  //   const [active, over] = e;

  //   console.log("ACTIVE: " + active.id);
  //   console.log("OVER :" + over);
  // };

  function handleDragEnd(event) {
    console.log("Drag end called");
    const { active, over } = event;
    console.log("ACTIVE: ", active);
    console.log("OVER :", over);

    if (active.id !== over.id) {
      setBuildingAmenities((amens) => {
        const activeIndex = amens.indexOf(active.id);
        const overIndex = amens.indexOf(over.id);

        return arrayMove(amens, activeIndex, overIndex);
      });
    }
  }

  return <div className="w-full h-[calc(100vh-68px)]"></div>;
};

export default NewListingStep3;
