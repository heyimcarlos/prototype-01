import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

const listingTypes = [
  { id: 0, name: "For Sale & Rent" },
  { id: 1, name: "Sale" },
  { id: 3, name: "Rent" },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function ListingTypeSelect({ listingType, setListingType }) {
  const [selected, setSelected] = useState(
    listingType === listingTypes[0]?.name
      ? listingType[0]
      : listingType === listingTypes[1]?.name
      ? listingTypes[1]
      : listingType === listingTypes[2]?.name
      ? listingTypes[2]
      : null
  );

  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          <div className="relative w-full">
            <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 md:py-3 pl-3 pr-10 text-left shadow-md focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-md md:text-xl">
              {listingType === "" && (
                <span className="block truncate text-gray-500">
                  {selected?.name}
                </span>
              )}
              {listingType !== "" && (
                <span className="block truncate">{listingType}</span>
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
              <Listbox.Options className="absolute z-10 mt-1 max-h-[9.9rem] w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none text-md md:text-xl">
                {listingTypes.map((type) => (
                  <Listbox.Option
                    key={type.id}
                    className={({ active }) =>
                      classNames(
                        active ? "text-white bg-indigo-600" : "text-gray-900",
                        "relative cursor-default select-none py-2 pl-8 pr-4"
                      )
                    }
                    value={type}
                    onClick={() => {
                      setListingType(type.name);
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
                          {type.name}
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
