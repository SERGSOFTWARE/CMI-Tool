import { createSlice } from "@reduxjs/toolkit";
import { rgbStringToObject } from "../../../Utils/helpers";

const resultState = {
  sankeyFigure: {
    linkSource: [],
    linkTarget: [],
    linkValue: [],
    linkColour: [],
    nodeLabel: [],
    nodePad: 0,
    nodeColor: [],
    nodeThickness: 0,
  },
};

export const resultSlice = createSlice({
  name: "results",
  initialState: resultState,
  reducers: {
    updateResults: (state, action) => {
      state.sankeyFigure["linkSource"] = action.payload?.link?.source || [];
      state.sankeyFigure["linkTarget"] = action.payload?.link?.target || [];
      state.sankeyFigure["linkValue"] = action.payload?.link?.value || [];
      state.sankeyFigure["linkColour"] =
        action.payload?.link?.color.map(rgbStringToObject) || [];
      state.sankeyFigure["nodeLabel"] = action.payload?.node?.label || [];
      state.sankeyFigure["nodePad"] = action.payload?.node?.pad || [];
      state.sankeyFigure["nodeColor"] =
        action.payload?.node?.color.map(rgbStringToObject) || [];
      state.sankeyFigure["nodeThickness"] =
        action.payload?.node?.thickness || [];
    },
    resetResultState: () => {
      return resultState;
    },
  },
});

export const { updateResults, resetResultState } = resultSlice.actions;

export default resultSlice.reducer;
