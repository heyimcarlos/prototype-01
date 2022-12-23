import { useNeighborhoods } from "@/stores/useNeighborhoods";
import MapTopbar from "../MapTopbar";
import NewTwTopbar from "../NewTwTopbar";
import SectorsSelected from "../SectorsSelected";
import TwTopbar from "../TwTopbar";

type Props = {
  children: React.ReactNode;
};

const MapLayout = ({ children }: Props) => {
  const neighborhoods = useNeighborhoods((state) => state.neighborhoods);
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
