// import PreferenceForm from "./PreferenceForm";
import { useSectors } from "@/stores/useSectors";

const MapTopbar = () => {
  const sectors = useSectors((state) => state.sectors);

  return (
    <div className="pl-5 py-1 bg-indigo-600 h-8">
      {/* <PreferenceForm /> */}

      <div className="flex">
        {sectors.map((sector) => (
          <div className="px-2" key={sector.name}>
            {sector.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MapTopbar;
