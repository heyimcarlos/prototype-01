import { useState, type Dispatch, type SetStateAction } from "react";
import { DndContext, closestCenter, type DragOverEvent } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { useNewListing } from "@/stores/useNewListing";
import SortableItem from "./formComponents/SortableItem";

type StepType = {
  setStep: Dispatch<SetStateAction<string>>;
};

const NewListingStep2Half = ({ setStep }: StepType) => {
  const [selectedDetail, setSelectedDetail] = useState("Property");
  const [customInput, setCustomInput] = useState("");

  const buildingAmenities = useNewListing((state) => state.buildingAmenities);
  const setBuildingAmenities = useNewListing(
    (state) => state.setBuildingAmenities
  );
  const selectedBuildingAmenities = useNewListing(
    (state) => state.selectedBuildingAmenities
  );
  const setSelectedBuildingAmenities = useNewListing(
    (state) => state.setSelectedBuildingAmenities
  );

  // console.log("selectedBuildingAmenities: ", selectedBuildingAmenities);

  const interiorAmenities = useNewListing((state) => state.interiorAmenities);
  const setInteriorAmenities = useNewListing(
    (state) => state.setInteriorAmenities
  );
  const selectedInteriorAmenities = useNewListing(
    (state) => state.selectedInteriorAmenities
  );
  const setSelectedInteriorAmenities = useNewListing(
    (state) => state.setSelectedInteriorAmenities
  );

  // console.log("selectedInteriorAmenities: ", selectedInteriorAmenities);

  const exteriorAmenities = useNewListing((state) => state.exteriorAmenities);
  const setExteriorAmenities = useNewListing(
    (state) => state.setExteriorAmenities
  );
  const selectedExteriorAmenities = useNewListing(
    (state) => state.selectedExteriorAmenities
  );
  const setSelectedExteriorAmenities = useNewListing(
    (state) => state.setSelectedExteriorAmenities
  );

  // console.log("selectedExteriorAmenities: ", selectedBuildingAmenities);

  function handleDragEnd(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;
    if (active.id !== over.id) {
      if (selectedDetail === "Property") {
        const activeIndex = selectedBuildingAmenities.indexOf(
          active.id as string
        );
        const overIndex = selectedBuildingAmenities.indexOf(over.id as string);

        const newArr = arrayMove(
          selectedBuildingAmenities,
          activeIndex,
          overIndex
        );

        setSelectedBuildingAmenities(newArr);
      } else if (selectedDetail === "Interior") {
        const activeIndex = selectedInteriorAmenities.indexOf(
          active.id as string
        );
        const overIndex = selectedInteriorAmenities.indexOf(over.id as string);

        const newArr = arrayMove(
          selectedInteriorAmenities,
          activeIndex,
          overIndex
        );
        setSelectedInteriorAmenities(newArr);
      } else if (selectedDetail === "Exterior") {
        const activeIndex = selectedExteriorAmenities.indexOf(
          active.id as string
        );
        const overIndex = selectedExteriorAmenities.indexOf(over.id as string);

        const newArr = arrayMove(
          selectedExteriorAmenities,
          activeIndex,
          overIndex
        );
        setSelectedExteriorAmenities(newArr);
      }
    }
  }

  return (
    <div
      className="w-full h-[calc(100vh-68px)] md:h-[calc(100vh-80.59px)] xl:px-[18rem]"
      draggable={false}
    >
      <div className="w-full h-9 flex justify-around items-center pt-[3rem]">
        <span className="isolate inline-flex rounded-md shadow-sm">
          <button
            type="button"
            className={`shadow-md relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-4 py-2 text-sm md:text-xl font-medium text-gray-700 hover:bg-gray-50 ${
              selectedDetail === "Property"
                ? "z-10 border-indigo-500 outline-none ring-1 ring-indigo-600"
                : ""
            }`}
            onClick={() => {
              setSelectedDetail("Property");
            }}
          >
            Property
          </button>
          <button
            type="button"
            className={`shadow-md relative -ml-px inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm md:text-xl font-medium text-gray-700 hover:bg-gray-50 ${
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
            className={`shadow-md relative -ml-px inline-flex items-center rounded-r-md border border-gray-300 bg-white px-4 py-2 text-sm md:text-xl font-medium text-gray-700 hover:bg-gray-50 ${
              selectedDetail === "Exterior"
                ? "z-10 border-indigo-500 outline-none ring-1 ring-indigo-600"
                : ""
            } `}
            onClick={() => {
              setSelectedDetail("Exterior");
            }}
          >
            Exterior
          </button>
        </span>
      </div>

      {/* <div>Building Custom ADD</div> */}

      {selectedDetail === "Property" && (
        <div className="w-full flex mt-9">
          <input
            className="w-full mx-2 rounded-md border-black border-[1px] shadow-md md:p-3 md:text-xl"
            type="text"
            placeholder="Amenidad personalizada"
            onChange={(e) => setCustomInput(e.target.value)}
            value={customInput}
            onKeyDown={(e) => {
              // console.log(e.code, "Hello");
              if (e.code === "Enter") {
                setSelectedBuildingAmenities([
                  ...selectedBuildingAmenities,
                  customInput,
                ]);
                setCustomInput("");
              }
            }}
          />
          <button
            className="border-[1px] mr-2 border-black p-2 rounded-md shadow-md md:p-3 md:px-6 md:text-xl"
            onClick={() => {
              setSelectedBuildingAmenities([
                ...selectedBuildingAmenities,
                customInput,
              ]);
              setCustomInput("");
            }}
          >
            Add
          </button>
        </div>
      )}

      {/* <div>Interior Custom ADD</div> */}

      {selectedDetail === "Interior" && (
        <div className="w-full flex mt-9">
          <input
            className="w-full mx-2 rounded-md border-black border-[1px] md:p-3 md:text-xl shadow-md"
            type="text"
            placeholder="Amenidad personalizada"
            onChange={(e) => setCustomInput(e.target.value)}
            value={customInput}
            onKeyDown={(e) => {
              // console.log(e.code, "Hello");
              if (e.code === "Enter") {
                setSelectedInteriorAmenities([
                  ...selectedInteriorAmenities,
                  customInput,
                ]);
                setCustomInput("");
              }
            }}
          />
          <button
            className="border-[1px] mr-2 border-black p-2 rounded-md shadow-md md:p-3 md:px-6 md:text-xl"
            onClick={() => {
              setSelectedInteriorAmenities([
                ...selectedInteriorAmenities,
                customInput,
              ]);
              setCustomInput("");
            }}
          >
            Add
          </button>
        </div>
      )}

      {/* <div>Exterior Custom ADD</div> */}

      {selectedDetail === "Exterior" && (
        <div className="w-full flex mt-9">
          <input
            className="w-full mx-2 rounded-md border-black border-[1px] md:p-3 md:text-xl shadow-md"
            type="text"
            placeholder="Amenidad personalizada"
            onChange={(e) => setCustomInput(e.target.value)}
            value={customInput}
            onKeyDown={(e) => {
              // console.log(e.code, "Hello");
              if (e.code === "Enter") {
                setSelectedExteriorAmenities([
                  ...selectedExteriorAmenities,
                  customInput,
                ]);
                setCustomInput("");
              }
            }}
          />
          <button
            className="border-[1px] mr-2 border-black p-2 rounded-md shadow-md md:p-3 md:px-6 md:text-xl"
            onClick={() => {
              setSelectedExteriorAmenities([
                ...selectedExteriorAmenities,
                customInput,
              ]);
              setCustomInput("");
            }}
          >
            Add
          </button>
        </div>
      )}

      {/* <div>Building Selected Amenities</div> */}

      {selectedDetail === "Property" && (
        <div
          className="mt-2 mx-1 flex rounded-md overflow-hidden shadow-lg xl:border-2 xl:border-black/20 xl:shadow-none xl:drop-shadow-xl"
          draggable={false}
        >
          <div className="w-[40%] h-[calc(100vh-275px)] md:h-[calc(100vh-345px)] bg-gray-200 flex flex-col overflow-auto space-y-1 p-1 ">
            {buildingAmenities.map((amen) => (
              <div
                key={amen}
                className="p-1 md:p-2 border-[1px] border-black bg-white rounded-md text-sm md:text-xl"
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
            className="w-[60%] max-w-[60%] h-[calc(100vh-275px)] md:h-[calc(100vh-345px)] bg-indigo-400 flex flex-col overflow-auto space-y-1 p-1"
          >
            <DndContext
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
              autoScroll={false}
            >
              <SortableContext
                items={selectedBuildingAmenities}
                strategy={verticalListSortingStrategy}
              >
                {selectedBuildingAmenities.map((amen) => (
                  <SortableItem
                    key={amen}
                    id={amen}
                    amen={amen}
                    amenities={buildingAmenities}
                    setAmenities={setBuildingAmenities}
                    selectedAmenities={selectedBuildingAmenities}
                    setSelectedAmenities={setSelectedBuildingAmenities}
                  />
                ))}
              </SortableContext>
            </DndContext>
          </div>
        </div>
      )}

      {/* <div>Interior Selected Amenities</div> */}

      {selectedDetail === "Interior" && (
        <div
          className="mt-2 mx-1 flex rounded-md overflow-hidden shadow-lg xl:border-2 xl:border-black/20 xl:shadow-none xl:drop-shadow-xl"
          draggable={false}
        >
          <div className="w-[40%] h-[calc(100vh-300px)] md:h-[calc(100vh-345px)] bg-gray-200 flex flex-col overflow-auto space-y-1 p-1 ">
            {interiorAmenities.map((amen) => (
              <div
                key={amen}
                className="p-1 md:p-2 border-[1px] border-black bg-white rounded-md text-sm md:text-xl"
                onClick={() => {
                  setInteriorAmenities(
                    interiorAmenities.filter((inteAmen) => amen !== inteAmen)
                  );
                  setSelectedInteriorAmenities([
                    ...selectedInteriorAmenities,
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
            className="w-[60%] h-[calc(100vh-300px)] md:h-[calc(100vh-345px)] bg-indigo-400 flex flex-col overflow-auto space-y-1 p-1"
          >
            <DndContext
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={selectedInteriorAmenities}
                strategy={verticalListSortingStrategy}
              >
                {selectedInteriorAmenities.map((amen) => (
                  <SortableItem
                    key={amen}
                    id={amen}
                    amen={amen}
                    amenities={interiorAmenities}
                    setAmenities={setInteriorAmenities}
                    selectedAmenities={selectedInteriorAmenities}
                    setSelectedAmenities={setSelectedInteriorAmenities}
                  />
                ))}
              </SortableContext>
            </DndContext>
          </div>
        </div>
      )}

      {/* <div>Exterior Selected Amenities</div> */}

      {selectedDetail === "Exterior" && (
        <div
          className="mt-2 mx-1 flex rounded-md overflow-hidden shadow-lg xl:border-2 xl:border-black/20 xl:shadow-none xl:drop-shadow-xl"
          draggable={false}
        >
          <div className="w-[40%] h-[calc(100vh-300px)] md:h-[calc(100vh-345px)] bg-gray-200 flex flex-col overflow-auto space-y-1 p-1 ">
            {exteriorAmenities.map((amen) => (
              <div
                key={amen}
                className="p-1 md:p-2 border-[1px] border-black bg-white rounded-md text-sm md:text-xl"
                onClick={() => {
                  setExteriorAmenities(
                    exteriorAmenities.filter((inteAmen) => amen !== inteAmen)
                  );
                  setSelectedExteriorAmenities([
                    ...selectedExteriorAmenities,
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
            className="w-[60%] h-[calc(100vh-300px)] md:h-[calc(100vh-345px)] bg-indigo-400 flex flex-col overflow-auto space-y-1 p-1"
          >
            <DndContext
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={selectedExteriorAmenities}
                strategy={verticalListSortingStrategy}
              >
                {selectedExteriorAmenities.map((amen) => (
                  <SortableItem
                    key={amen}
                    id={amen}
                    amen={amen}
                    amenities={exteriorAmenities}
                    setAmenities={setExteriorAmenities}
                    selectedAmenities={selectedExteriorAmenities}
                    setSelectedAmenities={setSelectedExteriorAmenities}
                  />
                ))}
              </SortableContext>
            </DndContext>
          </div>
        </div>
      )}
      <div className="w-full h-3 flex justify-center text-sm md:text-xl pr-2">
        *Contenido selecionado es editable.
      </div>
      <div className="w-full flex justify-center space-x-6 bottom-0 absolute xl:relative mb-3 xl:mb-0 xl:mt-[1.9rem] md:mb-6 md:text-2xl">
        {/* <div className="rounded-lg py-1 px-2 bg-indigo-600 text-white shadow-xl">
          Save & Exit
        </div> */}
        <button
          className="rounded-lg py-1 md:py-2 px-2 md:px-4 bg-indigo-600 text-white shadow-xl"
          onClick={() => setStep("step 2")}
        >
          Back
        </button>
        <button
          className="rounded-lg py-1 md:py-2 px-2 md:px-4 bg-indigo-600 text-white shadow-xl"
          onClick={() => setStep("step 3")}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default NewListingStep2Half;