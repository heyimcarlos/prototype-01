// import PreferenceForm from "./PreferenceForm";
import { useSectors } from "@/stores/useSectors";
import SectorsSelected from "./SectorsSelected";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/20/solid";

const MapTopbar = () => {
  const sectors = useSectors((state) => state.sectors);
  return (
    <div className="bg-indigo-600 h-[2.1rem] w-full">
      <div className="w-full flex justify-start ml-2">
        {sectors.length > 0 && <SectorsSelected />}
      </div>
      <button className="pt-[0.3rem] fixed right-0 mr-4">
        <AdjustmentsHorizontalIcon className="h-6 w-6" />
      </button>
    </div>
  );
};

export default MapTopbar;
