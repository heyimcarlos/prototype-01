import React from "react";
// import useWindowSize from "@/hooks/useWindowSize";
import { useDrawControls } from "@/stores/useDrawControls";
import { useDrawShow } from "@/stores/useDrawShow";
import { useGlobalHide } from "@/stores/useGlobalHide";
import { useGlobalShow } from "@/stores/useGlobalShow";
import { useNeighborhoods } from "@/stores/useNeighborhoods";
import { useShowCustomSearch } from "@/stores/useShowCustomSearch";
import { XCircleIcon } from "@heroicons/react/20/solid";
import SectorsFlyoutMenu from "@/components/mapPageComponents/topNavbars/SectorsFlyoutMenu";

const SectorsSelected = () => {
  const neighborhoods = useNeighborhoods((state) => state.neighborhoods);
  const deleteThisNeighborhood = useNeighborhoods(
    (state) => state.deleteThisNeighborhood
  );
  const setGlobalShowTrue = useGlobalShow((state) => state.setGlobalShowTrue);
  const setDrawShowTrue = useDrawShow((state) => state.setDrawShowTrue);
  const setDrawShowFalse = useDrawShow((state) => state.setDrawShowFalse);
  const setGlobalHideFalse = useGlobalHide((state) => state.setGlobalHideFalse);
  const setShowCustomSearchFalse = useShowCustomSearch(
    (state) => state.setShowCustomSearchFalse
  );
  const setSearchFalse = useDrawControls((state) => state.setSearchFalse);

  return (
    <>
      <div className=" fixed z-[51] pt-[0.16rem]">
        {neighborhoods.length > 0 && (
          <div className={`flex`}>
            <SectorsFlyoutMenu />
            <div
              className="flex items-center justify-center rounded-xl border-2 bg-white pr-3"
              key={
                neighborhoods.length > 0
                  ? neighborhoods[neighborhoods.length - 1]?.name
                  : ""
              }
            >
              <span className="pl-3 text-gray-500">
                {neighborhoods.length > 0
                  ? neighborhoods[neighborhoods.length - 1]?.name
                  : ""}
              </span>
              <div
                onClick={() => {
                  if (neighborhoods.length < 1) return;
                  if (
                    neighborhoods[neighborhoods.length - 1]?.name ===
                    "Custom Boundary"
                  ) {
                    setDrawShowTrue();
                    setGlobalHideFalse();
                    setShowCustomSearchFalse();
                    setSearchFalse();
                    setDrawShowFalse();
                  }
                  deleteThisNeighborhood(
                    neighborhoods[neighborhoods.length - 1]
                  );
                  setGlobalShowTrue();
                }}
              >
                <XCircleIcon className="ml-1 h-5 w-5 text-black" />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SectorsSelected;
