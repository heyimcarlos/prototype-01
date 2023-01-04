import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { type ListingType } from "@prisma/client";

const listingTypes = [
  { id: 0, name: "Rent" },
  { id: 1, name: "Sale" },
  { id: 2, name: "For Sale & Rent" },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

type Props = {
  listingType: ListingType;
  setListingType: (param: ListingType) => void;
};

export default function ListingTypeSelect({
  listingType,
  setListingType,
}: Props) {
  const [selected, setSelected] = useState(() => {
    return listingType === listingTypes[0]?.name
      ? listingType[0]
      : listingType === listingTypes[1]?.name
      ? listingTypes[1]
      : listingType === listingTypes[2]?.name
      ? listingTypes[2]
      : null;
  });

  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          <div className="relative w-full">
            <Listbox.Label className="text-sm font-medium text-gray-700 md:text-xl">
              Type
            </Listbox.Label>
            <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-1 pl-3 pr-10 text-left text-sm shadow-md focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 md:py-3 md:text-xl lg:py-2">
              {listingType === ("Type of listing" as unknown) && (
                <span className="block truncate text-gray-500">
                  Type of listing
                </span>
              )}
              {listingType !== ("Type of listing" as unknown) && (
                <span className="block truncate">
                  {listingType === "SALEANDRENT"
                    ? "For Sale & Rent"
                    : listingType === "RENT"
                    ? "Rent"
                    : "Sale"}
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
              <Listbox.Options className="text-md absolute z-10 mt-1 max-h-[9.9rem] w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none md:text-xl">
                {listingTypes.map((type) => (
                  <Listbox.Option
                    key={type.id}
                    className={({ active }) =>
                      classNames(
                        active ? "bg-indigo-600 text-white" : "text-gray-900",
                        "relative cursor-default select-none py-2 pl-8 pr-4"
                      )
                    }
                    value={type}
                    onClick={() => {
                      setListingType(
                        type.name === "For Sale & Rent"
                          ? "SALEANDRENT"
                          : type.name === "Rent"
                          ? "RENT"
                          : "SALE"
                      );
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
