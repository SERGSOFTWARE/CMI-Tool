import * as React from "react";
import SankeyGraph from "../../Molecules/Graphs/SankeyGraph";

const res = {
  sankeyFig: {
    link: {
      source: [
        0, 0, 0, 0, 1, 2, 3, 3, 3, 4, 5, 5, 5, 5, 5, 5, 9, 9, 10, 10, 11, 11,
        12, 12, 13, 13, 14, 12, 9, 10, 11, 5, 5,
      ],
      target: [
        3, 1, 2, 12, 5, 5, 4, 5, 6, 11, 6, 7, 8, 9, 10, 11, 6, 12, 3, 6, 5, 6,
        6, 13, 6, 14, 6, 9, 2, 1, 4, 7, 8,
      ],
      value: [
        13.33, 0.001, 0.001, 0.85, 0.001, 0.001, 0.001, 12.0, 1.321, 0.001, 6.6,
        1.2, 1.2, 0.6, 1.2, 1.2, 0.045, 0.85, 0.0, 0.06, 0.0, 0.06, 0.085,
        1.615, 0.141, 1.474, 1.179, 0.295, 0.0, 1.14, 1.14, 0.001, 0.001,
      ],
      color: [
        "#F08080",
        "rgba(0, 0, 0, 0)",
        "rgba(0, 0, 0, 0)",
        "#F08080",
        "rgba(0, 0, 0, 0)",
        "rgba(0, 0, 0, 0)",
        "rgba(0, 0, 0, 0)",
        "#20B2AA",
        "#20B2AA",
        "rgba(0, 0, 0, 0)",
        "#FF7F50",
        "#FF7F50",
        "#FF7F50",
        "#FF7F50",
        "#FF7F50",
        "#FF7F50",
        "#FFA07A",
        "#FFA07A",
        "#4682B4",
        "#4682B4",
        "#B0C4DE",
        "#B0C4DE",
        "#FFDAB9",
        "#FFDAB9",
        "#E6E6FA",
        "#E6E6FA",
        "#00FF7F",
        "#00FF7F",
        "#FFA07A",
        "#4682B4",
        "#B0C4DE",
        "rgba(0, 0, 0, 0)",
        "rgba(0, 0, 0, 0)",
      ],
    },
    node: {
      label: [
        "Virgin Resin Input",
        "Open-loop Recycle",
        "Open-loop Downcycle",
        "Prod. of SMC Film",
        "Open-loop Reuse",
        "Cons. of SMC Film",
        "Landfill",
        "Incineration",
        "Pyrolysis",
        "Pelletizing",
        "STRAP",
        "MASC",
        "Bracket Production",
        "Bracket Consumption",
        "Bracket W Collection",
      ],
      pad: 35,
      thickness: 15,
    },
  },
};

export default function SankeyDiagram({
  nodeLabel = res.sankeyFig?.node?.label,
  nodePad = res.sankeyFig?.node?.pad,
  nodeThickness = res.sankeyFig?.node?.thickness,
  linkSource = res.sankeyFig?.link?.source,
  linkTarget = res.sankeyFig?.link?.target,
  linkValue = res.sankeyFig?.link?.value,
  linkColour = res.sankeyFig?.link?.color,
  id,
}) {
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
      <SankeyGraph
        id={id}
        nodeLabel={nodeLabel}
        nodePad={nodePad}
        nodeThickness={nodeThickness}
        linkSource={linkSource}
        linkTarget={linkTarget}
        linkValue={linkValue}
        linkColour={linkColour}
        width={barGraphWidth}
        height={barGraphHeight}
      />
    </>
  );
}
