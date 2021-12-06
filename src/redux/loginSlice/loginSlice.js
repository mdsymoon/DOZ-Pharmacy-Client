import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "login",
  initialState: {
    loggedIn: {},
  },
  reducers: {
    isLogged: (state, { payload }) => {
      state.loggedIn = payload;
    },
  },
});

export const { isLogged } = loginSlice.actions;
export const getLoggedInUser = (state) => state.loginStore.loggedIn;
export default loginSlice.reducer;
