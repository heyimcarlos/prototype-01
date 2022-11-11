import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { useSectors } from "@/stores/useSectors";
import { XCircleIcon } from "@heroicons/react/20/solid";
import { useGlobalShow } from "@/stores/useGlobalShow";
import { useDrawShow } from "@/stores/useDrawShow";
import { useGlobalHide } from "@/stores/useGlobalHide";
import { useShowCustomSearch } from "@/stores/useShowCustomSearch";
import { useDrawControls } from "@/stores/useDrawControls";
import useWindowSize from "@/hooks/useWindowSize";

export default function SectorsFlyoutMenu() {
  const sectors = useSectors((state) => state.sectors);
  const deleteThisSector = useSectors((state) => state.deleteThisSector);
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

  const isMobile = width! < 425;

  return (
    <>
      {sectors.length > 1 && (
        <Popover className={`${isMobile ? "inline" : "ml-3"}`}>
          {({ open }) => (
            <>
              <Popover.Button
                className={`text-gray-500 px-3 mr-[0.2rem] border-2 rounded-xl bg-white text-base font-medium hover:text-gray-900`}
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
                {/* <div className="w-full flex justify-start"> */}
                <Popover.Panel
                  className={`fixed z-10 -mt-7 w-full transform px-0.5 sm:px-0 lg:max-w-3xl -ml-2`}
                >
                  <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                    <div className="relative flex flex-wrap bg-white pl-2 gap-1 py-3 sm:p-1 ">
                      {sectors.map((sector) => (
                        <div
                          className="pr-3 border-2 rounded-xl bg-white flex justify-center items-center py-[0.03rem]"
                          key={sector.name}
                        >
                          <span className="pl-3">{sector.name}</span>
                          <div
                            onClick={() => {
                              if (sector.name === "Custom Boundary") {
                                setDrawShowTrue();
                                setGlobalHideFalse();
                                setShowCustomSearchFalse();
                                setSearchFalse();
                                setDrawDefaultSimple();
                              }
                              deleteThisSector(sector);
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
                {/* </div> */}
              </Transition>
            </>
          )}
        </Popover>
      )}
    </>
  );
}
