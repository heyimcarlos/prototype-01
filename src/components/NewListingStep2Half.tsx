import { PencilSquareIcon, XCircleIcon } from "@heroicons/react/20/solid";
import { useState } from "react";

// const tabs = [
//   { name: "My Account", href: "#", current: true },
//   { name: "Company", href: "#", current: false },
//   { name: "Team Members", href: "#", current: false },
//   { name: "Billing", href: "#", current: false },
// ];

const NewListingStep2Half = ({ setStep }) => {
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
    "Escaleras de emergencia",
    "Lobby",
    "Intercom",
    "Terraza",
    "Casa club",
    "Gazebo",
    "Area Social",
    "Salon de eventos",
    "Area infantil",
    "Patio",
    "Piscina",
    "Jacuzzi",
    "Gimnasio",
    "Sauna",
    "BBQ",
    "Cisterna",
    "Tinaco",
    "Airbnb friendly",
  ]);

  const interiorAmenities = [
    "Linea blanca",
    "Calentador",
    "Balcon",
    "Area de lavado",
    "Cuarto de servicio con baño",
    "A/C",
    "Desayunador",
    "Vestidor",
    "Sala",
    "Comedor",
  ];

  const [buildingSelectedAmen, setBuildingSelectedAmen] = useState<string[]>(
    []
  );

  const [customInput, setCustomInput] = useState("");

  console.log("customInput", customInput);

  console.log("buildingSelectedAmen", buildingSelectedAmen);
  return (
    <div className="w-full h-[calc(100vh-68px)]">
      <div className="w-full h-9 flex justify-around items-center pt-[3rem]">
        <span className="isolate inline-flex rounded-md shadow-sm">
          <button
            type="button"
            autoFocus={true}
            className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-600"
          >
            Building
          </button>
          <button
            type="button"
            className="relative -ml-px inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-600"
          >
            Interior
          </button>
          <button
            type="button"
            className="relative -ml-px inline-flex items-center rounded-r-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-600"
          >
            Exterior
          </button>
        </span>
      </div>

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

      <div className="mt-1 mx-1 bg-indigo-600 flex">
        <div className="w-[40%] h-[calc(100vh-250px)] bg-gray-400 flex flex-col overflow-auto space-y-1 p-1">
          {buildingAmenities.map((amen) => (
            <div
              key={amen}
              className="p-1 border-[3px] bg-white rounded-md text-sm"
              onClick={() => {
                setBuildingAmenities(
                  buildingAmenities.filter((buildAmen) => amen !== buildAmen)
                );
                setBuildingSelectedAmen(() => [...buildingSelectedAmen, amen]);
              }}
            >
              {amen}
            </div>
          ))}
        </div>
        <div className="w-[60%] h-[calc(100vh-250px)] bg-indigo-600 flex flex-col overflow-auto space-y-1 p-1">
          {buildingSelectedAmen.map((amen) => (
            <div key={amen} className="w-full flex items-center">
              <input
                type="text"
                autoFocus={true}
                className="p-1 border-[3px] bg-white rounded-md text-sm w-full"
                defaultValue={amen}
                onBlur={(e) => {
                  console.log(e.target.value, "updated value");
                  setBuildingSelectedAmen(
                    buildingSelectedAmen.map((selectedAmen) => {
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
                      (selectedAmen) => selectedAmen !== amen
                    )
                  );
                  setBuildingAmenities([amen, ...buildingAmenities]);
                }}
                className="h-5 w-5 text-black ml-1"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="w-full flex justify-center space-x-6 py-3">
        <div className="rounded-lg py-1 px-2 bg-indigo-600 text-white shadow-xl">
          Save & Exit
        </div>
        <div
          className="rounded-lg py-1 px-2 bg-indigo-600 text-white shadow-xl"
          onClick={() => setStep("step 1")}
        >
          Back
        </div>
        <div
          className="rounded-lg py-1 px-2 bg-indigo-600 text-white shadow-xl"
          onClick={() => setStep("step 2.5")}
        >
          Continue
        </div>
      </div>
    </div>
  );
};

export default NewListingStep2Half;
