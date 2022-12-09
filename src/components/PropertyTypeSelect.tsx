import { Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { useNewListing } from "@/stores/useNewListing";

const people = [
  { id: 0, name: "Type of Property" },
  { id: 1, name: "Apartment" },
  { id: 3, name: "House" },
  { id: 2, name: "Townhome" },
  { id: 4, name: "Land Lot" },
  { id: 5, name: "Commercial" },
  //   { id: 6, name: "Hellen Schmidt" },
  //   { id: 7, name: "Caroline Schultz" },
  //   { id: 8, name: "Mason Heaney" },
  //   { id: 9, name: "Claudie Smitham" },
  //   { id: 10, name: "Emil Schaefer" },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function PropertyTypeSelect() {
  const [selected, setSelected] = useState(people[0]);
  const setSector = useNewListing((state) => state.setSector);

  useEffect(() => {
    if (selected) {
      setSector(selected?.name);
    }
  }, [setSector, selected]);

  console.log(selected?.name);
  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          <div className="relative mt-1 w-[80%]">
            <Listbox.Label className="block text-sm font-medium text-gray-700">
              Type
            </Listbox.Label>
            <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
              {selected && selected.id !== 0 && (
                <span className="block truncate">{selected.name}</span>
              )}
              {selected && selected.id === 0 && (
                <span className="block truncate text-gray-500">
                  {selected.name}
                </span>
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
              <Listbox.Options className="absolute z-10 mt-1 max-h-[9.9rem] w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {people.map((person) => (
                  <Listbox.Option
                    key={person.id}
                    className={({ active }) =>
                      classNames(
                        active ? "text-white bg-indigo-600" : "text-gray-900",
                        "relative cursor-default select-none py-2 pl-8 pr-4"
                      )
                    }
                    value={person}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={classNames(
                            selected ? "font-semibold" : "font-normal",
                            "block truncate"
                          )}
                        >
                          {person.name}
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