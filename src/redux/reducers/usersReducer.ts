import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { Axios, AxiosError } from "axios";

import { UsersReducerState } from "../../types/InitialState";
import User from "../../types/User";


const initialState: UsersReducerState = {
  users: [],
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

const usersSlice = createSlice({
  name: "usersSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllUsersAsync.fulfilled, (state, action) => {
      state.users = action.payload
    })
    // builder.addCase(fetchAllUsersAsync.rejected, (state, action) => {

    // })
  },
});

const usersReducer = usersSlice.reducer;
export default usersReducer;
