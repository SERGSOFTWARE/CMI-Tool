import { createSlice } from "@reduxjs/toolkit";
import { CHEMICAL_ITEMS, CHEMICAL_PARTS } from "../../../Utils/constants";

const chemicalObjectsInitialState = CHEMICAL_ITEMS.map((item) => ({
  label: item.label,
  value: item.value,
  key: item.key,
}));

const chemicalState = {
  value: chemicalObjectsInitialState,
  chemicalPart: CHEMICAL_PARTS[0],
  chemicalPartsOptions: CHEMICAL_PARTS,
};

export const chemicalsSlice = createSlice({
  name: "chemicals",
  initialState: chemicalState,
  reducers: {
    updateChemicalValue: (state, action) => {
      const updateElementKey = action.payload.element.key;
      const index = state.value.findIndex(
        (ele) => ele.key === updateElementKey
      );
      if (index !== -1) {
        state.value[index].value = action.payload.value;
      }
    },
    updateChemicalPartValue: (state, action) => {
      state.chemicalPart = action.payload.element;
    },
    resetState: () => {
      return chemicalState;
    },
  },
});

export const { updateChemicalValue, resetState, updateChemicalPartValue } =
  chemicalsSlice.actions;

export default chemicalsSlice.reducer;
