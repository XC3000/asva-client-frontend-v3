import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  account: undefined,
  networkId: undefined,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state.account = action.payload.account;
      state.networkId = action.payload.networkId;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUserDetails, decrement, incrementByAmount } =
  userSlice.actions;

export default userSlice.reducer;
