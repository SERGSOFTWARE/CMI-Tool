import * as React from "react";
import SankeyGraph from "../../Molecules/Graphs/SankeyGraph";
import { useSelector } from "react-redux";

export default function SankeyDiagram({ data }) {
  const gWidth = 58;
  const gHeight = 32;
  const [barGraphWidth, setbarGraphWidth] = React.useState(
    (gWidth / 100) * (window.innerWidth + window.innerHeight)
  );
  const [barGraphHeight, setbarGraphHeight] = React.useState(
    (gHeight / 100) * (window.innerWidth + window.innerHeight)
  );

  const handleResize = () => {
    setbarGraphWidth((gWidth / 100) * (window.innerWidth + window.innerHeight));
    setbarGraphHeight(
      (gHeight / 100) * (window.innerWidth + window.innerHeight)
    );
  };

  React.useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {data?.linkValue.length > 0 ? (
        <SankeyGraph
          id={"sankey-plot"}
          nodeLabel={data?.nodeLabel}
          nodePad={data?.nodePad}
          nodeThickness={data?.nodeThickness}
          linkSource={data?.linkSource}
          linkTarget={data?.linkTarget}
          linkValue={data?.linkValue}
          linkColour={data?.linkColour}
          nodeColor={data?.nodeColor}
          width={barGraphWidth}
          height={barGraphHeight}
        />
      ) : (
        <div className="sankey-no-results">
          <h3>No results to display</h3>
          <h4>
            Open settings on the right corner and adjust the chemical values and
            chemical part.
          </h4>
        </div>
      )}
    </>
  );
}
