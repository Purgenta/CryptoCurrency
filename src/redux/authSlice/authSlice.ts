import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
const auth = localStorage.getItem("auth");
const initialState = { isAuthenticated: auth ? true : false };
export const authenticateUser = createAsyncThunk(
  "authenicateUser",
  async () => {
    localStorage.setItem("auth", "true");
    Promise.resolve(true);
  }
);
const authSlice = createSlice({
  initialState,
  name: "auth",
  reducers: {
    authenticate: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(authenticateUser.fulfilled, (state) => {
      state.isAuthenticated = true;
    });
  },
});
export default authSlice.reducer;
export const { authenticate } = authSlice.actions;
export const authenticationSelector = (state: RootState) => state.auth;
