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
      className="flex h-[calc(100vh-55.59px)] w-full flex-col md:h-[calc(100vh-80.59px)] xl:px-[18rem]"
      draggable={false}
    >
      <div className="h-full">
        <div className="flex h-9 w-full items-center justify-around pt-[3rem]">
          <span className="isolate inline-flex rounded-md shadow-sm">
            <button
              type="button"
              className={`relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-md hover:bg-gray-50 md:text-xl ${
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
              className={`relative -ml-px inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-md hover:bg-gray-50 md:text-xl ${
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
              className={`relative -ml-px inline-flex items-center rounded-r-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-md hover:bg-gray-50 md:text-xl ${
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
          <div className="mt-9 flex w-full">
            <input
              className="mx-2 w-full rounded-md border-[1px] border-black shadow-md md:p-3 md:text-xl"
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
              className="mr-2 rounded-md border-[1px] border-black p-2 shadow-md md:p-3 md:px-6 md:text-xl"
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
          <div className="mt-9 flex w-full">
            <input
              className="mx-2 w-full rounded-md border-[1px] border-black shadow-md md:p-3 md:text-xl"
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
              className="mr-2 rounded-md border-[1px] border-black p-2 shadow-md md:p-3 md:px-6 md:text-xl"
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
          <div className="mt-9 flex w-full">
            <input
              className="mx-2 w-full rounded-md border-[1px] border-black shadow-md md:p-3 md:text-xl"
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
              className="mr-2 rounded-md border-[1px] border-black p-2 shadow-md md:p-3 md:px-6 md:text-xl"
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
            className="mx-1 mt-2 flex overflow-hidden rounded-md shadow-lg xl:border-2 xl:border-black/20 xl:shadow-none xl:drop-shadow-xl"
            draggable={false}
          >
            <div className="flex h-[calc(100vh-275px)] w-[40%] flex-col space-y-1 overflow-auto bg-gray-200 p-1 md:h-[calc(100vh-345px)] ">
              {buildingAmenities.map((amen) => (
                <div
                  key={amen}
                  className="rounded-md border-[1px] border-black bg-white p-1 text-sm md:p-2 md:text-xl"
                  onClick={() => {
                    setBuildingAmenities(
                      buildingAmenities.filter(
                        (buildAmen) => amen !== buildAmen
                      )
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
              className="flex h-[calc(100vh-275px)] w-[60%] max-w-[60%] flex-col space-y-1 overflow-auto bg-indigo-400 p-1 md:h-[calc(100vh-345px)]"
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
            className="mx-1 mt-2 flex overflow-hidden rounded-md shadow-lg xl:border-2 xl:border-black/20 xl:shadow-none xl:drop-shadow-xl"
            draggable={false}
          >
            <div className="flex h-[calc(100vh-300px)] w-[40%] flex-col space-y-1 overflow-auto bg-gray-200 p-1 md:h-[calc(100vh-345px)] ">
              {interiorAmenities.map((amen) => (
                <div
                  key={amen}
                  className="rounded-md border-[1px] border-black bg-white p-1 text-sm md:p-2 md:text-xl"
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
              className="flex h-[calc(100vh-300px)] w-[60%] flex-col space-y-1 overflow-auto bg-indigo-400 p-1 md:h-[calc(100vh-345px)]"
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
            className="mx-1 mt-2 flex overflow-hidden rounded-md shadow-lg xl:border-2 xl:border-black/20 xl:shadow-none xl:drop-shadow-xl"
            draggable={false}
          >
            <div className="flex h-[calc(100vh-300px)] w-[40%] flex-col space-y-1 overflow-auto bg-gray-200 p-1 md:h-[calc(100vh-345px)] ">
              {exteriorAmenities.map((amen) => (
                <div
                  key={amen}
                  className="rounded-md border-[1px] border-black bg-white p-1 text-sm md:p-2 md:text-xl"
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
              className="flex h-[calc(100vh-300px)] w-[60%] flex-col space-y-1 overflow-auto bg-indigo-400 p-1 md:h-[calc(100vh-345px)]"
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
        <div className="flex h-3 w-full justify-center pr-2 text-sm md:text-xl ">
          *Contenido selecionado es editable.
        </div>
      </div>
      {/* <div className=" bottom-0 mb-3 flex w-full justify-center space-x-6 md:mb-3 md:text-xl "> */}
      <div className=" bottom-0 mb-3 flex w-full justify-center space-x-6 md:text-xl ">
        {/* <div className="rounded-lg py-1 px-2 bg-indigo-600 text-white shadow-xl">
          Save & Exit
        </div> */}
        <button
          className="rounded-lg bg-indigo-600 py-1 px-2 text-white shadow-xl md:py-2 md:px-4"
          onClick={() => setStep("step 2")}
        >
          Back
        </button>
        <button
          className="rounded-lg bg-indigo-600 py-1 px-2 text-white shadow-xl md:py-2 md:px-4"
          onClick={() => setStep("step 3")}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default NewListingStep2Half;
