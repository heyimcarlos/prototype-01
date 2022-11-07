import { useSectors } from "@/stores/useSectors";
import MapTopbar from "../MapTopbar";
import NewTwTopbar from "../NewTwTopbar";
import SectorsSelected from "../SectorsSelected";
import TwTopbar from "../TwTopbar";

type Props = {
  children: React.ReactNode;
};

const MapLayout = ({ children }: Props) => {
  const sectors = useSectors((state) => state.sectors);
  return (
    <>
      <NewTwTopbar />
      <MapTopbar />
      {/* @INFO: Content after headers */}
      {children}
    </>
  );
};

export default MapLayout;
