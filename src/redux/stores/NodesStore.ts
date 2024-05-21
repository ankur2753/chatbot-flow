import { configureStore } from "@reduxjs/toolkit";
import NodeReducers from "../reducers/NodeReducers";

const store = configureStore({
  devTools: true,
  reducer: NodeReducers,
});

export default store;
