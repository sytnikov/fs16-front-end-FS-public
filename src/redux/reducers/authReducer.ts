import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import UserCredentials from "../../types/UserCredentials";
import CurrentUser from "../../types/CurrentUser";
import { AuthReducerState } from "../../types/InitialState";
import { baseURL } from "../../common/common";

const userUrl = `${baseURL}/users`;

const initialState: AuthReducerState = {};

export const loginUserAsync = createAsyncThunk<
  CurrentUser,
  UserCredentials,
  { rejectValue: string }
>("loginUserAsync", async (cred, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${userUrl}/login`, cred);
    const loggedInUser = response.data;
    const accessToken = loggedInUser.accessToken;
    localStorage.setItem("token", accessToken);
    const user = loggedInUser.payload;
    return user;
  } catch (e) {
    const error = e as any;
    return rejectWithValue(error.response.data.message);
  }
});

export const validateUserAsync = createAsyncThunk(
  "validateUserAsync",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(`${userUrl}/validate-user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data: boolean = response.data;
      return data;
    } catch (e) {
      const error = e as AxiosError;
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.currentUser = undefined;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUserAsync.fulfilled, (state, action) => {
      state.currentUser = action.payload;
    });
    // builder.addCase(loginUserAsync.rejected, (state, action) => {
    //   state.error = action.payload;
    // });
    builder.addCase(validateUserAsync.fulfilled, (state, action) => {
      state.isValidUser = action.payload;
    });
  },
});

const authReducer = authSlice.reducer;
export const { logoutUser } = authSlice.actions;
export default authReducer;
