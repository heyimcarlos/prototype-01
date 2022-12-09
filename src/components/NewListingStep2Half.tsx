import { PencilSquareIcon, XCircleIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import BuildingSortableItem from "./BuildingSortableItem";
import InteriorSortableItem from "./InteriorSortableItem";
import { useNewListing } from "@/stores/useNewListing";

// const tabs = [
//   { name: "My Account", href: "#", current: true },
//   { name: "Company", href: "#", current: false },
//   { name: "Team Members", href: "#", current: false },
//   { name: "Billing", href: "#", current: false },
// ];

const NewListingStep2Half = ({ setStep }) => {
  // const [buildingAmenities, setBuildingAmenities] = useState([
  //   "Año de construcción ",
  //   "Parqueos ",
  //   "Ascensor",
  //   "Proyecto cerrado",
  //   "Porton Electrico",
  //   "Planta Electrica",
  //   "Gas Comun",
  //   "Seguridad 24/7",
  //   "Camara de seguridad",
  //   "Sistema contra incendios",
  //   "Escaleras de emergencia",
  //   "Lobby",
  //   "Intercom",
  //   "Terraza",
  //   "Casa club",
  //   "Gazebo",
  //   "Area Social",
  //   "Salon de eventos",
  //   "Area infantil",
  //   "Patio",
  //   "Piscina",
  //   "Jacuzzi",
  //   "Gimnasio",
  //   "Sauna",
  //   "BBQ",
  //   "Cisterna",
  //   "Tinaco",
  //   "Airbnb friendly",
  // ]);

  // const [buildingSelectedAmen, setBuildingSelectedAmen] = useState<string[]>(
  //   []
  // );

  // const [interiorAmenities, setInteriorAmenities] = useState([
  //   "Linea blanca",
  //   "Calentador",
  //   "Balcon",
  //   "Area de lavado",
  //   "Cuarto de servicio con baño",
  //   "A/C",
  //   "Desayunador",
  //   "Vestidor",
  //   "Sala",
  //   "Comedor",
  // ]);

  // const [interiorSelectedAmen, setInteriorSelectedAmen] = useState<string[]>(
  //   []
  // );

  const [selectedDetail, setSelectedDetail] = useState("Building");
  const [customInput, setCustomInput] = useState("");

  function handleDragEnd(event) {
    // console.log("Drag end called");
    const { active, over } = event;
    // console.log("ACTIVE: ", active);
    // console.log("OVER :", over);

    if (active.id !== over.id) {
      if (selectedDetail === "Building") {
        const activeIndex = selectedBuildingAmenities.indexOf(active.id);
        const overIndex = selectedBuildingAmenities.indexOf(over.id);

        const newArr = arrayMove(
          selectedBuildingAmenities,
          activeIndex,
          overIndex
        );

        setSelectedBuildingAmenities(newArr);

        // setSelectedBuildingAmenities((amens): string[] => {
        //   const activeIndex = amens.indexOf(active.id);
        //   const overIndex = amens.indexOf(over.id);

        //   return arrayMove(amens, activeIndex, overIndex);
        // });
      } else if (selectedDetail === "Interior") {
        // setInteriorSelectedAmen((amens) => {
        //   const activeIndex = amens.indexOf(active.id);
        //   const overIndex = amens.indexOf(over.id);
        //   return arrayMove(amens, activeIndex, overIndex);
        // });
      }
    }
  }

  const setBuildingAmenities = useNewListing(
    (state) => state.setBuildingAmenities
  );

  const buildingAmenities = useNewListing((state) => state.buildingAmenities);

  const selectedBuildingAmenities = useNewListing(
    (state) => state.selectedBuildingAmenities
  );

  const setSelectedBuildingAmenities = useNewListing(
    (state) => state.setSelectedBuildingAmenities
  );

  console.log("zusBuildingAmenities", buildingAmenities);
  console.log("zusBuildingAmenities", selectedBuildingAmenities);

  // if (zusBuildingAmenities.length > 0) {
  //   setBuildingSelectedAmen(zusBuildingAmenities);
  // }

  // useEffect(() => {
  //   setZusBuildingAmenities(buildingSelectedAmen);
  // });

  return (
    <div className="w-full h-[calc(100vh-68px)]" draggable={false}>
      <div className="w-full h-9 flex justify-around items-center pt-[3rem]">
        <span className="isolate inline-flex rounded-md shadow-sm">
          <button
            type="button"
            className={`relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 ${
              selectedDetail === "Building"
                ? "z-10 border-indigo-500 outline-none ring-1 ring-indigo-600"
                : ""
            }`}
            onClick={() => {
              setSelectedDetail("Building");
            }}
          >
            Building
          </button>
          <button
            type="button"
            className={`relative -ml-px inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 ${
              selectedDetail === "Interior"
                ? "z-10 border-indigo-500 outline-none ring-1 ring-indigo-600"
                : ""
            } `}
            onClick={() => {
              setSelectedDetail("Interior");
            }}
          >
            Interior
          </button>
          <button
            type="button"
            className={`relative -ml-px inline-flex items-center rounded-r-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-600`}
            onClick={() => {
              setSelectedDetail("Exterior");
            }}
          >
            Exterior
          </button>
        </span>
      </div>

      {/* <div>Building Custom ADD</div> */}

      {selectedDetail === "Building" && (
        <div className="w-full flex mt-9">
          <input
            className="w-full mx-2 rounded-md border-black caret-gray-800"
            type="text"
            placeholder="Amenidad personalizada"
            onChange={(e) => setCustomInput(e.target.value)}
            value={customInput}
            onKeyDown={(e) => {
              console.log(e.code, "Hello");
            }}
          />
          <button
            className="border-[1px] mr-2 border-black p-2 rounded-md"
            onClick={() => {
              setBuildingSelectedAmen([...buildingSelectedAmen, customInput]);
              setCustomInput("");
            }}
          >
            Add
          </button>
        </div>
      )}

      {/* <div>Interior Custom ADD</div> */}

      {/* {selectedDetail === "Interior" && (
        <div className="w-full flex mt-9">
          <input
            className="w-full mx-2 rounded-md border-black caret-gray-800"
            type="text"
            placeholder="Amenidad personalizada"
            onChange={(e) => setCustomInput(e.target.value)}
            value={customInput}
            onKeyDown={(e) => {
              console.log(e.code, "Hello");
            }}
          />
          <button
            className="border-[1px] mr-2 border-black p-2 rounded-md"
            onClick={() => {
              setInteriorSelectedAmen([...interiorSelectedAmen, customInput]);
              setCustomInput("");
            }}
          >
            Add
          </button>
        </div>
      )} */}

      {/* <div>Building Selected Amenities</div> */}

      {selectedDetail === "Building" && (
        <div className="mt-1 mx-1 bg-indigo-600 flex" draggable={false}>
          <div className="w-[40%] h-[calc(100vh-250px)] bg-gray-400 flex flex-col overflow-auto space-y-1 p-1">
            {buildingAmenities.map((amen) => (
              <div
                key={amen}
                className="p-1 border-[3px] bg-white rounded-md text-sm"
                onClick={() => {
                  setBuildingAmenities(
                    buildingAmenities.filter((buildAmen) => amen !== buildAmen)
                  );
                  setSelectedBuildingAmenities([
                    ...selectedBuildingAmenities,
                    amen,
                  ]);
                }}
              >
                {amen}
              </div>
            ))}
          </div>
          <div
            draggable={false}
            className="w-[60%] h-[calc(100vh-250px)] bg-indigo-600 flex flex-col overflow-auto space-y-1 p-1"
          >
            <DndContext
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={selectedBuildingAmenities}
                strategy={verticalListSortingStrategy}
              >
                {selectedBuildingAmenities.map((amen) => (
                  <BuildingSortableItem
                    key={amen}
                    id={amen}
                    amen={amen}
                    setBuildingSelectedAmen={setSelectedBuildingAmenities}
                    buildingSelectedAmen={selectedBuildingAmenities}
                    setBuildingAmenities={setBuildingAmenities}
                    buildingAmenities={buildingAmenities}
                  />
                ))}
              </SortableContext>
            </DndContext>
          </div>
        </div>
      )}

      {/* <div>Interior Selected Amenities</div> */}

      {/* {selectedDetail === "Interior" && (
        <div className="mt-1 mx-1 bg-indigo-600 flex" draggable={false}>
          <div className="w-[40%] h-[calc(100vh-250px)] bg-gray-400 flex flex-col overflow-auto space-y-1 p-1">
            {interiorAmenities.map((amen) => (
              <div
                key={amen}
                className="p-1 border-[3px] bg-white rounded-md text-sm"
                onClick={() => {
                  setInteriorAmenities(
                    interiorAmenities.filter((inteAmen) => amen !== inteAmen)
                  );
                  setInteriorSelectedAmen(() => [
                    ...interiorSelectedAmen,
                    amen,
                  ]);
                }}
              >
                {amen}
              </div>
            ))}
          </div>
          <div
            draggable={false}
            className="w-[60%] h-[calc(100vh-250px)] bg-indigo-600 flex flex-col overflow-auto space-y-1 p-1"
          >
            <DndContext
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={interiorSelectedAmen}
                strategy={verticalListSortingStrategy}
              >
                {interiorSelectedAmen.map((amen) => (
                  <InteriorSortableItem
                    key={amen}
                    id={amen}
                    amen={amen}
                    setInteriorSelectedAmen={setInteriorSelectedAmen}
                    interiorSelectedAmen={interiorSelectedAmen}
                    setInteriorAmenities={setInteriorAmenities}
                    interiorAmenities={interiorAmenities}
                  />
                ))}
              </SortableContext>
            </DndContext>
          </div>
        </div>
      )} */}

      <div className="w-full flex justify-center space-x-6 py-3">
        <div className="rounded-lg py-1 px-2 bg-indigo-600 text-white shadow-xl">
          Save & Exit
        </div>
        <div
          className="rounded-lg py-1 px-2 bg-indigo-600 text-white shadow-xl"
          onClick={() => setStep("step 2")}
        >
          Back
        </div>
        <div
          className="rounded-lg py-1 px-2 bg-indigo-600 text-white shadow-xl"
          onClick={() => setStep("step 3")}
        >
          Continue
        </div>
      </div>
    </div>
  );
};

export default NewListingStep2Half;
