import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import UserCredentials from "../../types/UserCredentials";
import CurrentUser from "../../types/CurrentUser";
import { AuthReducerState } from "../../types/InitialState";
import { baseURL } from "../../common/common";
import { getConfig } from "../../common/config";

const userUrl = `${baseURL}/users`;

const initialState: AuthReducerState = {
  accessToken: "",
  currentUser: undefined,
  isLoading: false,
  isValidUser: false,
  isError: false,
  message: "",
};

export const loginUserAsync = createAsyncThunk(
  "loginUserAsync",
  async (cred: UserCredentials, { rejectWithValue }) => {
    try {
      const response = await axios.post<CurrentUser>(`${userUrl}/login`, cred);
      const loggedInUser = response.data;
      const accessToken = loggedInUser.accessToken;
      localStorage.setItem("token", accessToken);
      const user = loggedInUser;
      return user;
    } catch (e) {
      const error = e as any;
      return rejectWithValue(error);
    }
  }
);

export const validateUserAsync = createAsyncThunk(
  "validateUserAsync",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${userUrl}/validate-user`,
        getConfig()
      );
      const data: boolean = response.data;
      return data;
    } catch (e) {
      const error = e as AxiosError;
      return rejectWithValue(error);
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
    reset: (state) => initialState
  },
  extraReducers: (builder) => {
    builder.addCase(loginUserAsync.pending, (state) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(loginUserAsync.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        currentUser: action.payload,
        isValidUser: true,
      };
    });
    builder.addCase(loginUserAsync.rejected, (state, action) => {
      if (action.payload instanceof AxiosError) {
        return {
          ...state,
          isLoading: false,
          isError: true,
          message: action.payload.response?.data.message
        }
      }
      
    });

    builder.addCase(validateUserAsync.pending, (state) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(validateUserAsync.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        isValidUser: action.payload,
      };
    });
    builder.addCase(validateUserAsync.rejected, (state, action) => {
      if (action.payload instanceof AxiosError) {
        return {
          ...state,
          isLoading: false,
          isError: true,
          message: action.payload.response?.data.message,
        };
      }
    });
  },
});

const authReducer = authSlice.reducer;
export const { logoutUser, reset } = authSlice.actions;
export default authReducer;
