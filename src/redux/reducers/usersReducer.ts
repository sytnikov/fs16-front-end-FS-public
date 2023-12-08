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
  loading: false
};

export const fetchAllUsersAsync = createAsyncThunk<User[], void, {rejectValue: any} >(
  "fetchAllUsersAsync",
  async (_, {rejectWithValue}) => {
    try {
      const response = await axios.get(userUrl)
      console.log('response:', response)
      return response.data.users
    } catch (e) {
      const error = e as any
      return rejectWithValue(error)
    }
  }
);

export const createUserAsync = createAsyncThunk<User, CreateUserInput, { rejectValue: ErrorMessage[]}>(
  "createUserAsync",
  async (newUserInfo: CreateUserInput, { rejectWithValue }) => {
    try {
      const response = await axios.post<User>(
        `${userUrl}/register`,
        newUserInfo
      );
      // if (response.status === 201) {
      //   alert("Account successfully created")
      // }
      return response.data;
    } catch (e) {
      const error = e as any;
      // console.log('errorReducer:', error)
      if (error.response?.data?.errors && Array.isArray(error.response.data.errors)) {
        return rejectWithValue(error.response.data.errors);
      }
      return rejectWithValue([{ field: 'general', message: 'Failed to create user' }]);
      // const error = e as AxiosError;
      // console.log('error:', error)
      // return rejectWithValue(error);
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
      state.error = action.payload
      
    });
  },
});

const usersReducer = usersSlice.reducer;
export default usersReducer;
