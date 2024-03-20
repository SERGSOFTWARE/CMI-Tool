import * as React from "react";
import Plot from "react-plotly.js";
import {
  SANKEY_BUTTON_TO_REMOVE,
  FONT_FAMILY,
  BG_COLOR,
} from "../../../Utils/helpers";

export default function SankeyGraph({
  nodeLabel = [],
  nodePad = 10,
  nodeThickness = 10,
  linkSource = [],
  linkTarget = [],
  linkValue = [],
  linkColor = [],
  nodeColor = [],
  margin = { r: 100, l: 10, b: 60, t: 0, pad: 2 },
  id,
  width,
  height,
}) {
  return (
    <>
      <Plot
        id={id}
        config={{
          displaylogo: false,
          displayModeBar: "hover",
          modeBarButtonsToRemove: SANKEY_BUTTON_TO_REMOVE,
        }}
        data={[
          {
            type: "sankey",
            orientation: "h",
            legendwidth: 20,
            node: {
              pad: 12,
              thickness: nodeThickness,
              line: {
                width: 1,
              },
              color: nodeColor,
              label: nodeLabel,
            },
            valuesuffix: " tonne",
            link: {
              source: linkSource,
              target: linkTarget,
              value: linkValue,
              color: linkColor,
              line: {
                width: 0,
              },
            },
          },
        ]}
        layout={{
          autosize: true,
          font: {
            family: FONT_FAMILY,
            size: 18,
            color: "black",
          },
          paper_bgcolor: BG_COLOR,
          width: width,
          height: height,
        }}
      />
    </>
  );
}
