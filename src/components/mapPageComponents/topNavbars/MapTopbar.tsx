// import PreferenceForm from "./PreferenceForm";
import { useNeighborhoods } from "@/stores/useNeighborhoods";
import SectorsSelected from "./SectorsSelected";
// import { AdjustmentsHorizontalIcon } from "@heroicons/react/20/solid";
import useWindowSize from "@/hooks/useWindowSize";
import FiltersFlyoutMenu from "./FiltersFlyoutMenu";

const MapTopbar = () => {
  const neighborhoods = useNeighborhoods((state) => state.neighborhoods);
  const width = useWindowSize();
  // let isMobile = width <
  return (
    <div className="bg-indigo-600 h-[2.1rem] w-full">
      <div className="w-full flex justify-start ml-2">
        {neighborhoods.length > 0 && <SectorsSelected />}
      </div>

      <div className="pt-[0.2rem] fixed z-[51] right-0 mr-1.5">
        <FiltersFlyoutMenu />
      </div>
    </div>
  );
};

export default MapTopbar;
