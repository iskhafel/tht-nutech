import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchUser,
  fetchBanner,
  fetchServices,
  fetchBalance,
} from "../../services/api";

const initialState = {
  user: null,
  banners: [],
  services: [],
  balance: null,
  loading: false,
  error: null,
};

export const fetchDashboardData = createAsyncThunk(
  "dashboard/fetchDashboardData",
  async (_, { rejectWithValue }) => {
    try {
      const [user, banners, services, balance] = await Promise.all([
        fetchUser(),
        fetchBanner(),
        fetchServices(),
        fetchBalance(),
      ]);
      return { user, banners, services, balance };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.banners = action.payload.banners;
        state.services = action.payload.services;
        state.balance = action.payload.balance;
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default dashboardSlice.reducer;
