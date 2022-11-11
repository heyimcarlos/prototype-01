import React from "react";
import useWindowSize from "@/hooks/useWindowSize";
import { useDrawControls } from "@/stores/useDrawControls";
import { useDrawShow } from "@/stores/useDrawShow";
import { useGlobalHide } from "@/stores/useGlobalHide";
import { useGlobalShow } from "@/stores/useGlobalShow";
import { useSectors } from "@/stores/useSectors";
import { useShowCustomSearch } from "@/stores/useShowCustomSearch";
import { XCircleIcon } from "@heroicons/react/20/solid";
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
        <div className=" pt-[0.16rem] fixed z-30">
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
                  <XCircleIcon className="h-5 w-5 ml-1 text-black" />
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
