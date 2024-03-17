import { combineReducers } from "redux";

import chemicalsSlice from "./Slice/chemicalsSlice";

const rootReducer = combineReducers({
  chemicalData: chemicalsSlice,
});

export default rootReducer;
