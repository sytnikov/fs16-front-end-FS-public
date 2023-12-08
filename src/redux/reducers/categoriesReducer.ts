import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import { CategoriesReducerState } from "../../types/InitialState";
import Category from "../../types/Category";
import { baseURL } from "../../common/common";

const categoryUrl = `${baseURL}/categories`

const initialState: CategoriesReducerState = {
  categories: [],
  loading: false,
};

export const fetchAllCategoriesAsync = createAsyncThunk<
  Category[],
  void,
  { rejectValue: string }
>("fetchAllCategoriesAsync", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(categoryUrl);
    return response.data;
  } catch (e) {
    const error = e as AxiosError;
    return rejectWithValue(error.message);
  }
});

const categoriesSlice = createSlice({
  name: "categoriesSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllCategoriesAsync.fulfilled, (state, action) => {
      return {
        ...state,
        categories: action.payload,
      };
    });
    builder.addCase(fetchAllCategoriesAsync.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    });
    builder.addCase(fetchAllCategoriesAsync.rejected, (state, action) => {
      return {
        ...state,
        error: action.payload,
      };
    });
  },
});

const categoriesReducer = categoriesSlice.reducer;
export default categoriesReducer;
