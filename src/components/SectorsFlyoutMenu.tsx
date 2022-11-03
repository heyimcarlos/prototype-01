import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { useSectors } from "@/stores/useSectors";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useGlobalShow } from "@/stores/useGlobalShow";
import { useDrawShow } from "@/stores/useDrawShow";
import { useGlobalHide } from "@/stores/useGlobalHide";
import { useShowCustomSearch } from "@/stores/useShowCustomSearch";
import { useDrawControls } from "@/stores/useDrawControls";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function SectorsFlyoutMenu() {
  const sectors = useSectors((state) => state.sectors);
  const deleteThisSector = useSectors((state) => state.deleteThisSector);
  const setGlobalShowTrue = useGlobalShow((state) => state.setGlobalShowTrue);
  const setDrawShowTrue = useDrawShow((state) => state.setDrawShowTrue);
  const setGlobalHideFalse = useGlobalHide((state) => state.setGlobalHideFalse);
  const setShowCustomSearchFalse = useShowCustomSearch(
    (state) => state.setShowCustomSearchFalse
  );

  const setRedrawFalse = useDrawControls((state) => state.setRedrawFalse);

  const setDrawDefaultSimple = useDrawControls(
    (state) => state.setDrawDefaultSimple
  );

  return (
    <>
      {sectors.length > 1 && (
        <Popover className="relative ml-3">
          {({ open }) => (
            <>
              <Popover.Button
                className={classNames(
                  open ? "text-gray-900" : "text-gray-500",
                  "px-3 mr-[0.1rem] border-2 rounded-xl bg-white text-base font-medium hover:text-gray-900 "
                )}
              >
                <span>{`${sectors.length - 1} More`}</span>
              </Popover.Button>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="fixed z-10 -mt-8 ml-[12rem] w-[25rem] max-w-md -translate-x-1/2 transform px-2 sm:px-0 lg:max-w-3xl">
                  <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                    <div className="relative flex flex-wrap bg-white px-5 py-6 sm:p-3 ">
                      {sectors.map((sector) => (
                        <div
                          className="mr-1 border-2 rounded-xl w-max pr-10 my-1 inline py-[0.1rem]"
                          key={sector.name}
                        >
                          <span className="pl-3">{sector.name}</span>
                          <div
                            style={{
                              display: "inline",
                              position: "absolute",
                              border: "0.15rem solid black",
                              marginTop: "1.5px",
                              marginLeft: "7px",
                              borderRadius: "100%",
                            }}
                            onClick={() => {
                              if (sector.name === "Custom Boundary") {
                                setDrawShowTrue();
                                setGlobalHideFalse();
                                setShowCustomSearchFalse();
                                setRedrawFalse();
                                setDrawDefaultSimple();
                              }
                              deleteThisSector(sector);
                              setGlobalShowTrue();
                            }}
                          >
                            <XMarkIcon className="h-4 w-4" aria-hidden="true" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
      )}
    </>
  );
}
