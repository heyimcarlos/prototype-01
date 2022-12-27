import MapTopbar from "../mapPageComponents/topNavbars/MapTopbar";
import NewTwTopbar from "../mapPageComponents/topNavbars/NewTwTopbar";

type Props = {
  children: React.ReactNode;
};

const MapLayout = ({ children }: Props) => {
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
