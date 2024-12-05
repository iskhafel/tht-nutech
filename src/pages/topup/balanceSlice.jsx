import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { topupBalance } from "../../services/api";

// Async thunk for top-up
export const topUpBalance = createAsyncThunk(
  "balance/topUpBalance",
  async (amount, { rejectWithValue }) => {
    try {
      const response = await topupBalance.post("/topup", {
        top_up_amount: amount,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Top-up failed");
    }
  }
);

const balanceSlice = createSlice({
  name: "balance",
  initialState: {
    balance: 0,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(topUpBalance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(topUpBalance.fulfilled, (state, action) => {
        state.loading = false;
        state.balance += action.payload.top_up_amount;
      })
      .addCase(topUpBalance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default balanceSlice.reducer;
