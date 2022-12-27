import React from "react";
import useWindowSize from "@/hooks/useWindowSize";
import { useDrawControls } from "@/stores/useDrawControls";
import { useDrawShow } from "@/stores/useDrawShow";
import { useGlobalHide } from "@/stores/useGlobalHide";
import { useGlobalShow } from "@/stores/useGlobalShow";
import { useNeighborhoods } from "@/stores/useNeighborhoods";
import { useShowCustomSearch } from "@/stores/useShowCustomSearch";
import { XCircleIcon } from "@heroicons/react/20/solid";
import SectorsFlyoutMenu from "@/components/SectorsFlyoutMenu";

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

  const width = useWindowSize();
  let isMobile;
  let fitOne;
  let fitTwo;
  let fitThree;
  let fitFour;
  if (width) {
    isMobile = width < 668;
    fitOne = width < 605;
    fitTwo = width >= 605 && width < 855;
    fitThree = width >= 855 && width < 1165;
    fitFour = width >= 1165;
  }

  const lastTwo = neighborhoods.slice(-2);
  const lastThree = neighborhoods.slice(-3);
  const lastFour = neighborhoods.slice(-4);

  // console.log("lastThree", lastThree);

  return (
    <>
      {fitOne && (
        <div className=" pt-[0.16rem] fixed z-[51]">
          {neighborhoods.length > 0 && (
            <div className={`flex`}>
              <SectorsFlyoutMenu />
              <div
                className="pr-3 border-2 rounded-xl bg-white flex justify-center items-center"
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
                  <XCircleIcon className="h-5 w-5 ml-1 text-black" />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      {fitTwo && (
        <div className=" pt-[0.16rem] fixed z-[51]">
          {neighborhoods.length > 0 && (
            <div className={`flex`}>
              <SectorsFlyoutMenu />
              {lastTwo.map((sector) => {
                return (
                  <div
                    key={sector.name}
                    className="pr-3 border-2 rounded-xl bg-white flex justify-center items-center mr-1"
                  >
                    <span className="pl-3 text-gray-500">{sector.name}</span>
                    <div
                      onClick={() => {
                        if (neighborhoods.length < 1) return;
                        if (sector.name === "Custom Boundary") {
                          setDrawShowTrue();
                          setGlobalHideFalse();
                          setShowCustomSearchFalse();
                          setSearchFalse();
                          setDrawShowFalse();
                        }
                        deleteThisNeighborhood(sector);
                        setGlobalShowTrue();
                      }}
                    >
                      <XCircleIcon className="h-5 w-5 ml-1 text-black" />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
      {fitThree && (
        <div className=" pt-[0.16rem] fixed z-[51]">
          {neighborhoods.length > 0 && (
            <div className={`flex`}>
              <SectorsFlyoutMenu />
              {lastThree.map((sector) => {
                return (
                  <div
                    key={sector.name}
                    className="pr-3 border-2 rounded-xl bg-white flex justify-center items-center mr-1"
                  >
                    <span className="pl-3 text-gray-500">{sector.name}</span>
                    <div
                      onClick={() => {
                        if (neighborhoods.length < 1) return;
                        if (sector.name === "Custom Boundary") {
                          setDrawShowTrue();
                          setGlobalHideFalse();
                          setShowCustomSearchFalse();
                          setSearchFalse();
                          setDrawShowFalse();
                        }
                        deleteThisNeighborhood(sector);
                        setGlobalShowTrue();
                      }}
                    >
                      <XCircleIcon className="h-5 w-5 ml-1 text-black" />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
      {fitFour && (
        <div className=" pt-[0.16rem] fixed z-[60]">
          {neighborhoods.length > 0 && (
            <div className={`flex`}>
              <SectorsFlyoutMenu />
              {lastFour.map((sector) => {
                return (
                  <div
                    key={sector.name}
                    className="pr-3 border-2 rounded-xl bg-white flex justify-center items-center mr-1"
                  >
                    <span className="pl-3 text-gray-500">{sector.name}</span>
                    <div
                      onClick={() => {
                        if (neighborhoods.length < 1) return;
                        if (sector.name === "Custom Boundary") {
                          setDrawShowTrue();
                          setGlobalHideFalse();
                          setShowCustomSearchFalse();
                          setSearchFalse();
                          setDrawShowFalse();
                        }
                        deleteThisNeighborhood(sector);
                        setGlobalShowTrue();
                      }}
                    >
                      <XCircleIcon className="h-5 w-5 ml-1 text-black" />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default SectorsSelected;
