import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "../Features/dataSlice";

const store = configureStore({
  reducer: {
    data: dataReducer,
  },
});

export default store;
