export const FONT_FAMILY = "Rajdhani, sans-serif";
export const BG_COLOR = "#e1eef7";
export const SANKEY_BUTTON_TO_REMOVE = [
  "sendDataToCloud",
  "zoom2d",
  "pan2d",
  "select2d",
  "lasso2d",
  "zoomIn2d",
  "zoomOut2d",
  "autoScale2d",
  "resetScale2d",
  "hoverClosestCartesian",
  "hoverCompareCartesian",
  "toggleSpikelines",
  "toggleHover",
  "resetViews", // Remove the 'Reset View' button
  "zoom3d",
  "pan3d",
  "orbitRotation",
  "tableRotation",
  "resetCameraDefault3d",
  "resetCameraLastSave3d",
  "hoverClosest3d",
  "zoomInGeo",
  "zoomOutGeo",
  "resetGeo",
  "hoverClosestGeo",
  "hoverClosestGl2d",
  "hoverClosestPie",
  "toggleHover",
  "resetViews", // Remove the 'Reset View' button
  "resetViewMapbox",
  "toImage",
];

export const rgbStringToObject = (rgbString) => {
  if (rgbString.includes("rgb(")) {
    const matches = rgbString.match(/\d+/g);
    if (matches.length !== 3) {
      throw new Error("Invalid RGB string format");
    }
    return {
      r: parseInt(matches[0]),
      g: parseInt(matches[1]),
      b: parseInt(matches[2]),
    };
  } else {
    if (rgbString === "indianred") {
      return "#ff8080";
    } else if (rgbString === "darkblue") {
      return "#668cff";
    }
    return rgbString;
  }
};
