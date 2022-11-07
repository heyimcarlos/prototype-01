import React from "react";
import useWindowSize from "@/hooks/useWindowSize";
import { useDrawControls } from "@/stores/useDrawControls";
import { useDrawShow } from "@/stores/useDrawShow";
import { useGlobalHide } from "@/stores/useGlobalHide";
import { useGlobalShow } from "@/stores/useGlobalShow";
import { useSectors } from "@/stores/useSectors";
import { useShowCustomSearch } from "@/stores/useShowCustomSearch";
import { XMarkIcon } from "@heroicons/react/24/solid";
// import { XMarkIcon } from "@heroicons/react/24/solid";

import SectorsFlyoutMenu from "@/components/SectorsFlyoutMenu";

const SectorsSelected = () => {
  const sectors = useSectors((state) => state.sectors);
  const deleteThisSector = useSectors((state) => state.deleteThisSector);
  const setGlobalShowTrue = useGlobalShow((state) => state.setGlobalShowTrue);
  const setDrawShowTrue = useDrawShow((state) => state.setDrawShowTrue);
  const setDrawShowFalse = useDrawShow((state) => state.setDrawShowFalse);
  const setGlobalHideFalse = useGlobalHide((state) => state.setGlobalHideFalse);
  const setShowCustomSearchFalse = useShowCustomSearch(
    (state) => state.setShowCustomSearchFalse
  );
  const setSearchFalse = useDrawControls((state) => state.setSearchFalse);

  const width = useWindowSize();
  let isMobile;
  if (width) {
    isMobile = width < 655;
  }

  return (
    <>
      {isMobile && (
        <div className=" pt-[0.16rem] fixed z-10">
          {/* <div className="bg-white h-[2.1rem] fixed -mt-[1.7rem] z-10"> */}
          {sectors.length > 0 && (
            <div className={`flex ${isMobile ? "" : "ml-1"}`}>
              <SectorsFlyoutMenu />
              <div
                className="pr-3 border-2 rounded-xl bg-white flex justify-center items-center"
                key={
                  sectors.length > 0 ? sectors[sectors.length - 1]?.name : ""
                }
              >
                <span className="pl-3 text-gray-500">
                  {sectors.length > 0 ? sectors[sectors.length - 1]?.name : ""}
                </span>
                <div
                  className="border-[0.15rem] border-black rounded-full ml-[8px] h-[1.5rem] w-[1.5rem] flex justify-center items-center"
                  onClick={() => {
                    if (sectors.length < 1) return;
                    if (
                      sectors[sectors.length - 1]?.name === "Custom Boundary"
                    ) {
                      setDrawShowTrue();
                      setGlobalHideFalse();
                      setShowCustomSearchFalse();
                      setSearchFalse();
                      setDrawShowFalse();
                    }

                    deleteThisSector(sectors[sectors.length - 1]);
                    setGlobalShowTrue();
                  }}
                >
                  <XMarkIcon className="h-4 w-4" aria-hidden="true" />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default SectorsSelected;
