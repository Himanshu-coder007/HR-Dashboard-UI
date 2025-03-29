import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: null, // Will store user data {email, role, etc.}
  token: null, // Will store JWT token
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.userInfo = null;
      state.token = null;
    },
  },
});

export const { setCredentials, logout } = userSlice.actions;

export default userSlice.reducer;

// Selectors
export const selectCurrentUser = (state) => state.user.userInfo;
export const selectCurrentToken = (state) => state.user.token;
