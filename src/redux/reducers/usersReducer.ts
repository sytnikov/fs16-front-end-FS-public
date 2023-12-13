import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { Axios, AxiosError } from "axios";

import { UsersReducerState } from "../../types/InitialState";
import User from "../../types/User";
import CreateUserInput from "../../types/CreateUserInput";
import { baseURL } from "../../common/common";
import useAppDispatch from "../../hooks/useAppDispatch";
import { ErrorMessage } from "../../types/ErrorMessage";

const userUrl = `${baseURL}/users`

const initialState: UsersReducerState = {
  users: [],
  isLoading: false,
  isError: false,
  message: ""
};

export const fetchAllUsersAsync = createAsyncThunk(
  "fetchAllUsersAsync",
  async (_, {rejectWithValue}) => {
    try {
      const response = await axios.get<User[]>(userUrl)
      const users = response.data
      return users
    } catch (e) {
      const error = e as AxiosError
      return rejectWithValue(error.message)
    }
  }
);

export const createUserAsync = createAsyncThunk(
  "createUserAsync",
  async (newUserInfo: CreateUserInput, { rejectWithValue }) => {
    try {
      const response = await axios.post<User>(
        `${userUrl}/register`,
        newUserInfo
      );
      const user = response.data
      return user;
    } catch (e) {
      const error = e as AxiosError;
      console.log('error:', error)
      return rejectWithValue(error);
    }
  }
);

const usersSlice = createSlice({
  name: "usersSlice",
  initialState,
  reducers: {
    reset: (state) => initialState
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllUsersAsync.pending, (state) => {
      return {
        ...state,
        isLoading: true
      }
    })
    builder.addCase(fetchAllUsersAsync.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        users: action.payload,
      }
    })
    builder.addCase(fetchAllUsersAsync.rejected, (state, action) => {
      if (action.payload instanceof AxiosError) {
        return {
          ...state,
          isLoading: false,
          isError: true,
          error: action.payload.message,
        };
      }
    })
    builder.addCase(createUserAsync.pending, (state) => {
      return {
        ...state,
        isLoading: true
      }
    })
    builder.addCase(createUserAsync.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
      };
    });
    builder.addCase(createUserAsync.rejected, (state, action) => {
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

const usersReducer = usersSlice.reducer;
export const {reset} = usersSlice.actions
export default usersReducer;
