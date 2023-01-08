import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { useNewListing } from "@/stores/useNewListing";

const sectors = [
  { id: 1, name: "24 de Abril" },
  { id: 2, name: "30 de Mayo" },
  { id: 3, name: "Altos De Arroyo Hondo" },
  { id: 4, name: "Arroyo Manzano" },
  { id: 5, name: "Atala" },
  { id: 6, name: "Bella Vista" },
  { id: 7, name: "Buenos Aires" },
  { id: 8, name: "Cacique" },
  { id: 9, name: "Zona Universitaria" },
  { id: 10, name: "Centro de los Heroes" },
  { id: 11, name: "Cerros De Arroyo Hondo" },
  { id: 12, name: "Ciudad Moderna" },
  { id: 13, name: "Ciudad Nueva" },
  { id: 14, name: "Cristo Rey" },
  { id: 15, name: "Dominicanos Ausentes" },
  { id: 16, name: "El Manguito" },
  { id: 17, name: "El Millon" },
  { id: 18, name: "Ensanche Capotillo" },
  { id: 19, name: "Ensanche Espaillat" },
  { id: 20, name: "Ensanche Kennedy" },
  { id: 21, name: "Ensanche La Fé" },
  { id: 22, name: "Ensanche La Paz" },
  { id: 23, name: "Ensanche Luperon" },
  { id: 24, name: "Ensanche Miraflores" },
  { id: 25, name: "Ensanche Naco" },
  { id: 26, name: "Ensanche Paraiso" },
  { id: 27, name: "Ensanche Quisqueya" },
  { id: 28, name: "Ensanche Simon Bolivar" },
  { id: 29, name: "Evaristo Morales" },
  { id: 30, name: "Gala" },
  { id: 31, name: "Gazcue" },
  { id: 32, name: "Gral Antonio Duverge" },
  { id: 33, name: "Guachupita" },
  { id: 34, name: "Gualey" },
  { id: 35, name: "Honduras" },
  { id: 36, name: "Honduras Del Nte" },
  { id: 37, name: "Jardines del Caribe" },
  { id: 38, name: "Jardines del Norte" },
  { id: 67, name: "Julieta Morales" },
  { id: 39, name: "La Agustina" },
  { id: 40, name: "La Esperilla" },
  { id: 41, name: "La Hondonada" },
  { id: 42, name: "La Isabela" },
  { id: 43, name: "La Julia" },
  { id: 44, name: "La Zurza" },
  { id: 45, name: "Las Praderas" },
  { id: 46, name: "Las Villas" },
  { id: 47, name: "Los Cacicazgos" },
  { id: 48, name: "Los Jardines del Sur" },
  { id: 49, name: "Los Peralejos" },
  { id: 50, name: "Los Prados" },
  { id: 51, name: "Los Proceres" },
  { id: 52, name: "Los Restauradores" },
  { id: 53, name: "Los Rios" },
  { id: 54, name: "Maria Auxiliadora" },
  { id: 55, name: "Mata Hambre" },
  { id: 56, name: "Mejoramiento Social" },
  { id: 57, name: "Mirador Norte" },
  { id: 58, name: "Mirador Sur" },
  { id: 59, name: "Miramar" },
  { id: 60, name: "Nuevo Arroyo Hondo" },
  { id: 61, name: "Palma Real" },
  { id: 62, name: "Piantini" },
  { id: 63, name: "Renacimiento" },
  { id: 64, name: "San Carlos" },
  { id: 65, name: "San Geronimo" },
  { id: 66, name: "San Juan Bosco" },
  { id: 68, name: "Viejo Arroyo Hondo" },
  { id: 69, name: "Villa Agricolas" },
  { id: 70, name: "Villa Consuelo" },
  { id: 71, name: "Villa Francisca" },
  { id: 72, name: "Villa Juana" },
  { id: 73, name: "Zona Colonial" },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function SectorSelect() {
  const [selected, setSelected] = useState();
  const setSector = useNewListing((state) => state.setSector);
  const sector = useNewListing((state) => state.sector);

  // console.log("sector from newListing", sector);

  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          <Listbox.Label className="block text-sm font-medium text-gray-700 md:text-xl">
            Sector
          </Listbox.Label>
          <div className="relative ">
            <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-1 pl-3 pr-10 text-left text-sm shadow-md focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 md:py-2 md:text-xl lg:py-2">
              {sector === "" && (
                <span className="block truncate text-gray-500">
                  Select a sector
                </span>
              )}
              {sector !== "" && (
                <span className="block truncate">{sector}</span>
              )}
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options
                // defaultValue={people[1]?.name}
                className="absolute z-10 mt-1 max-h-[9.9rem] w-full overflow-auto rounded-md bg-white py-1 text-base text-sm ring-1 ring-black ring-opacity-5 focus:outline-none md:text-xl"
              >
                {sectors.map((sector) => (
                  <Listbox.Option
                    key={sector.id}
                    className={({ active }) =>
                      classNames(
                        active ? "bg-indigo-600 text-white" : "text-gray-900",
                        "relative cursor-default select-none py-2 pl-8 pr-4"
                      )
                    }
                    value={sector}
                    onClick={() => {
                      setSector(sector.name);
                    }}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={classNames(
                            selected ? "font-semibold" : "font-normal",
                            "block truncate"
                          )}
                        >
                          {sector.name}
                        </span>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? "text-white" : "text-indigo-600",
                              "absolute inset-y-0 left-0 flex items-center pl-1.5"
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
}
