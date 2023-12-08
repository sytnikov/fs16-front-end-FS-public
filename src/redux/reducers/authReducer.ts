import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import UserCredentials from "../../types/UserCredentials";
import CurrentUser from "../../types/CurrentUser";
import { AuthReducerState } from "../../types/InitialState";
import { baseURL } from "../../common/common";

const userUrl = `${baseURL}/users`

const initialState: AuthReducerState = {};

export const loginUserAsync = createAsyncThunk<
  CurrentUser,
  UserCredentials,
  { rejectValue: string }
>("loginUserAsync", async (cred, { rejectWithValue }) => {
  try {
    const response = await axios.post(
      `${userUrl}/login`,
      cred
    );
    const loggedInUser = response.data
    const accessToken = loggedInUser.accessToken
    localStorage.setItem("token", accessToken)
    const user = loggedInUser.payload
    console.log('loggedInUser:', loggedInUser)
    return user
  } catch (e) {
    const error = e as AxiosError;
    return rejectWithValue(error.message);
  }
});

// export const loginUserAsync = createAsyncThunk<
//   User,
//   UserCredentials,
//   { rejectValue: string }
// >("loginUserAsync", async (cred, { rejectWithValue, dispatch }) => {
//   try {
//     const response = await axios.post(
//       "https://api.escuelajs.co/api/v1/auth/login",
//       cred
//     );
//     const { access_token } = response.data;
//     const authResponse = await dispatch(authUserAsync(access_token));
//     if (authResponse.payload === "string" || !authResponse.payload) {
//       throw new Error(authResponse.payload || "Cannot authenticate the user");
//     } else {
//       return authResponse.payload as User;
//     }
//   } catch (e) {
//     const error = e as AxiosError;
//     return rejectWithValue(error.message);
//   }
// });

// export const authUserAsync = createAsyncThunk<
//   User,
//   string,
//   { rejectValue: string }
// >("authUserAsync", async (access_token, { rejectWithValue }) => {
//   try {
//     const getProfile = await axios.get(
//       "https://api.escuelajs.co/api/v1/auth/profile",
//       {
//         headers: {
//           Authorization: `Bearer ${access_token}`,
//         },
//       }
//     );
//     return getProfile.data;
//   } catch (e) {
//     const error = e as AxiosError;
//     return rejectWithValue(error.message);
//   }
// });

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.currentUser = undefined;
      localStorage.removeItem("token")
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUserAsync.fulfilled, (state, action) => {
      state.currentUser = action.payload;
    });
    // builder.addCase(loginUserAsync.rejected, (state, action) => {
    //   state.error = action.payload;
    // });
  },
});

const authReducer = authSlice.reducer;
export const { logoutUser } = authSlice.actions;
export default authReducer;
