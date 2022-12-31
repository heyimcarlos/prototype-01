import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { useNeighborhoods } from "@/stores/useNeighborhoods";
import { useGlobalShow } from "@/stores/useGlobalShow";
import { useDrawShow } from "@/stores/useDrawShow";
import { useGlobalHide } from "@/stores/useGlobalHide";
import { useShowCustomSearch } from "@/stores/useShowCustomSearch";
import { useDrawControls } from "@/stores/useDrawControls";
import useWindowSize from "@/hooks/useWindowSize";

import { XCircleIcon } from "@heroicons/react/20/solid";

export default function SectorsFlyoutMenu() {
  const neighborhoods = useNeighborhoods((state) => state.neighborhoods);
  const deleteThisSector = useNeighborhoods(
    (state) => state.deleteThisNeighborhood
  );
  const setGlobalShowTrue = useGlobalShow((state) => state.setGlobalShowTrue);
  const setDrawShowTrue = useDrawShow((state) => state.setDrawShowTrue);
  const setGlobalHideFalse = useGlobalHide((state) => state.setGlobalHideFalse);
  const setShowCustomSearchFalse = useShowCustomSearch(
    (state) => state.setShowCustomSearchFalse
  );

  const setSearchFalse = useDrawControls((state) => state.setSearchFalse);

  const setDrawDefaultSimple = useDrawControls(
    (state) => state.setDrawDefaultSimple
  );

  const width = useWindowSize();

  let isMobile;

  if (width) {
    isMobile = width < 425;
  }
  // 23

  return (
    <>
      {neighborhoods.length > 1 && (
        <Popover className={`${isMobile ? "inline" : "-ml-[0.5px]"} sm:ml-1`}>
          <>
            <Popover.Button
              className={`mr-[0.2rem] rounded-xl border-2 bg-white px-2.5 text-base font-medium text-gray-500 hover:text-gray-900`}
            >
              <span>{`${neighborhoods.length - 1} More`}</span>
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
              <Popover.Panel
                className={`fixed z-[51] -mt-7 -ml-2 w-full max-w-[28.5rem] transform px-0.5 sm:px-0`}
              >
                {/* <Popover.Button className=" absolute z-[51] right-0 mr-2 mt-1 justify-end rounded-full border-2 border-black">
                  <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                </Popover.Button> */}

                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="relative flex flex-wrap gap-1 bg-white py-3 pl-2 sm:p-1 ">
                    {neighborhoods.map((neighborhood) => (
                      <div
                        className="flex items-center justify-center rounded-xl border-2 bg-white py-[0.03rem] pr-3"
                        key={neighborhood.name}
                      >
                        <span className="pl-3">{neighborhood.name}</span>
                        <div
                          onClick={() => {
                            if (neighborhood.name === "Custom Boundary") {
                              setDrawShowTrue();
                              setGlobalHideFalse();
                              setShowCustomSearchFalse();
                              setSearchFalse();
                              setDrawDefaultSimple();
                            }
                            deleteThisSector(neighborhood);
                            setGlobalShowTrue();
                          }}
                        >
                          <XCircleIcon className="ml-1 h-5 w-5 text-black" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        </Popover>
      )}
    </>
  );
}
