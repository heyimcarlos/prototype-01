import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { useNeighborhoods } from "@/stores/useNeighborhoods";
import { useGlobalShow } from "@/stores/useGlobalShow";
import { useDrawShow } from "@/stores/useDrawShow";
import { useGlobalHide } from "@/stores/useGlobalHide";
import { useShowCustomSearch } from "@/stores/useShowCustomSearch";
import { useDrawControls } from "@/stores/useDrawControls";
import useWindowSize from "@/hooks/useWindowSize";

import { XCircleIcon, XMarkIcon } from "@heroicons/react/20/solid";

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
  let fitOne;
  let fitTwo;
  let fitThree;
  let fitFour;
  if (width) {
    isMobile = width < 425;
    fitOne = width < 605;
    fitTwo = width >= 605 && width < 855;
    fitThree = width >= 855 && width < 1165;
    fitFour = width >= 1165;
  }
  // 23

  return (
    <>
      {neighborhoods.length > 1 && (
        <Popover className={`${isMobile ? "inline" : "-ml-[0.5px]"} sm:ml-1`}>
          <>
            {fitOne && (
              <Popover.Button
                className={`text-gray-500 px-2.5 mr-[0.2rem] border-2 rounded-xl bg-white text-base font-medium hover:text-gray-900`}
              >
                <span>{`${neighborhoods.length - 1} More`}</span>
              </Popover.Button>
            )}
            {fitTwo && neighborhoods.length > 2 && (
              <Popover.Button
                className={`text-gray-500 px-2.5 mr-[0.2rem] border-2 rounded-xl bg-white text-base font-medium hover:text-gray-900`}
              >
                <span>{`${neighborhoods.length - 2} More`}</span>
              </Popover.Button>
            )}
            {fitThree && neighborhoods.length > 3 && (
              <Popover.Button
                className={`text-gray-500 px-2.5 mr-[0.2rem] border-2 rounded-xl bg-white text-base font-medium hover:text-gray-900`}
              >
                <span>{`${neighborhoods.length - 3} More`}</span>
              </Popover.Button>
            )}
            {fitFour && neighborhoods.length > 4 && (
              <Popover.Button
                className={`text-gray-500 px-2.5 mr-[0.2rem] border-2 rounded-xl bg-white text-base font-medium hover:text-gray-900`}
              >
                <span>{`${neighborhoods.length - 4} More`}</span>
              </Popover.Button>
            )}

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
                className={`fixed z-[51] -mt-7 w-full transform px-0.5 sm:px-0 lg:max-w-3xl -ml-2 sm:w-[99%]`}
              >
                {/* <Popover.Button className=" absolute z-[51] right-0 mr-2 mt-1 justify-end rounded-full border-2 border-black">
                  <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                </Popover.Button> */}

                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="relative flex flex-wrap bg-white pl-2 gap-1 py-3 sm:p-1 ">
                    {neighborhoods.map((neighborhood) => (
                      <div
                        className="pr-3 border-2 rounded-xl bg-white flex justify-center items-center py-[0.03rem]"
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
                          <XCircleIcon className="h-5 w-5 text-black ml-1" />
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
