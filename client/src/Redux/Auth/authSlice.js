import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";



const authSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    loading: false,
    error: false,
  },
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = false;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    signupStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    signupSuccess: (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = false;
    },
    signupFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logoutUser: (state) => {
      state.user = null;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  signupStart,
  signupSuccess,
  signupFailure,
  logoutUser,
} = authSlice.actions;
export default authSlice.reducer;








// export const signupUser = createAsyncThunk(
//   "user/register",
//   async (userdata) => {
//     try {
//       const response = await axios.post(
//         `http://localhost:8000/user/register`,
//         userdata
//       );

//       console.log("request", response.data);
//       return response.data;
//     } catch (error) {
//       console.log(error);
//     }
//   }
// );
// // Login Thunk
// export const loginUser = createAsyncThunk(
//   "user/login",
//   async (credentials, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(
//         `http://localhost:8000/user/login`,
//         credentials
//       );
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );