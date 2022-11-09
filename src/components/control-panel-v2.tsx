import Link from "next/link";
import * as React from "react";

function ControlPanel() {
  return (
    <div className="control-panel">
      <h3>Zoom to Bounding Box</h3>
      <p>Click on a San Fransisco Neighborhood to zoom in.</p>
      <div className="source-link">
        <Link
          href="https://github.com/visgl/react-map-gl/tree/7.0-release/examples/zoom-to-bounds"
          target="_new"
        >
          View Code ↗
        </Link>
      </div>
    </div>
  );
}

export default React.memo(ControlPanel);
