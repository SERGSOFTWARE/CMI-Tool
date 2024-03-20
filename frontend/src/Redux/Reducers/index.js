import { combineReducers } from "redux";

import chemicalsSlice from "./Slice/chemicalsSlice";
import resultSlice from "./Slice/resultSlice";

const rootReducer = combineReducers({
  chemicalData: chemicalsSlice,
  resultData: resultSlice,
});

export default rootReducer;
