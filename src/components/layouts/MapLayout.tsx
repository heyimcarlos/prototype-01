import MapTopbar from "../MapTopbar";
import TwTopbar from "../TwTopbar";

type Props = {
  children: React.ReactNode;
};

const MapLayout = ({ children }: Props) => {
  return (
    <>
      <TwTopbar />
      <MapTopbar />
      {/* @INFO: Content after headers */}
      {children}
    </>
  );
};

export default MapLayout;
