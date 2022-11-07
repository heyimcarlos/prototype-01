// import PreferenceForm from "./PreferenceForm";
import { useSectors } from "@/stores/useSectors";
import SectorsFlyoutMenu from "./SectorsFlyoutMenu";
import SectorsSelected from "./SectorsSelected";

const MapTopbar = () => {
  const sectors = useSectors((state) => state.sectors);
  return (
    <div className="bg-indigo-600 h-[2.1rem] w-full">
      <div className="w-full flex justify-start ml-2">
        {sectors.length > 0 && <SectorsSelected />}
      </div>
      <button className="pt-[0.25rem] fixed right-0 mr-2">Filters</button>
    </div>
  );
};

export default MapTopbar;
