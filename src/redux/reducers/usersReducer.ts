import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import { UsersReducerState } from "../../types/InitialState";
import User from "../../types/User";
import CreateUserInput from "../../types/CreateUserInput";

const initialState: UsersReducerState = {
  users: [],
  loading: false
};

export const fetchAllUsersAsync = createAsyncThunk<User[], void, {rejectValue: string} >(
  "fetchAllUsersAsync",
  async (_, {rejectWithValue}) => {
    try {
      const response = await axios.get("https://api.escuelajs.co/api/v1/users")
      return response.data
    } catch (e) {
      const error = e as AxiosError
      return rejectWithValue(error.message)
    }
  }
);

export const createUserAsync = createAsyncThunk(
  "createUserAsync",
  async (newUser: CreateUserInput, { rejectWithValue }) => {
    try {
      const response = await axios.post<User>(
        "https://api.escuelajs.co/api/v1/users/",
        newUser
      );
      return response.data;
    } catch (e) {
      const error = e as AxiosError;
      return rejectWithValue(error.message);
    }
  }
);

const usersSlice = createSlice({
  name: "usersSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllUsersAsync.fulfilled, (state, action) => {
      return {
        ...state,
        users: action.payload,
        loading: false
      }
    })
    builder.addCase(fetchAllUsersAsync.pending, (state, action) => {
      return {
        ...state,
        loading: true
      }
    })
    builder.addCase(fetchAllUsersAsync.rejected, (state, action) => {
      return {
        ...state,
        error: action.payload,
      }
    })
    builder.addCase(createUserAsync.fulfilled, (state, action) => {
      state.users.push(action.payload);
    });
    builder.addCase(createUserAsync.rejected, (state, action) => {
      state.error = action.payload as string;
    });
  },
});

const usersReducer = usersSlice.reducer;
export default usersReducer;
