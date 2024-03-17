import { createSlice } from "@reduxjs/toolkit";
import { CHEMICAL_ITEMS } from "../../../Utils/constants";

const chemicalObjectsInitialState = CHEMICAL_ITEMS.map((item) => ({
  label: item.label,
  value: item.value,
  key: item.key,
}));

const chemicalState = {
  value: chemicalObjectsInitialState,
};

export const chemicalsSlice = createSlice({
  name: "chemicals",
  initialState: chemicalState,
  reducers: {
    updateChemicalValue: (state, action) => {
      console.log("Action", action);
    },
    resetState: () => {
      return {
        value: chemicalObjectsInitialState,
      };
    },
  },
});

export const { updateChemicalValue, resetState } = chemicalsSlice.actions;

export default chemicalsSlice.reducer;
