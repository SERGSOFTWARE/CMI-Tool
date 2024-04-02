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
  return rgbString;
};

export const getChangedFields = (objectsArray, keysArray) => {
  const matchingValues = {};

  for (const obj of objectsArray) {
    if (keysArray.includes(obj.key)) {
      matchingValues[obj.label] = obj.value;
    }
  }

  return matchingValues;
};

export const isObjectEmpty = (obj) => {
  if (obj !== null && typeof obj === "object") {
    var keys = Object.keys(obj);
    return keys.length === 0;
  } else {
    return true;
  }
};
