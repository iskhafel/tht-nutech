import { configureStore } from "@reduxjs/toolkit";
import dashboardReducer from "../pages/dashboard/dashboardSlice";
import { authReducer } from "../pages/auth";

const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    auth: authReducer,
  },
});

export default store;
