import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    updateSuperintendentStart: (state) => {
      state.loading = true;
    },
    updateSuperintendentSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateSuperintendentFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    deleteSuperintendentStart: (state) => {
      state.loading = true;
    },
    deleteSuperintendentSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    deleteSuperintendentFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  updateSuperintendentStart,
  updateSuperintendentSuccess,
  updateSuperintendentFailure,
  deleteSuperintendentStart,
  deleteSuperintendentSuccess,
  deleteSuperintendentFailure,
} = userSlice.actions;
export default userSlice.reducer;
