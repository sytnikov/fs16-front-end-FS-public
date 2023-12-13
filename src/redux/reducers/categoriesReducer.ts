import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import { CategoriesReducerState } from "../../types/InitialState";
import Category from "../../types/Category";
import { baseURL } from "../../common/common";

const categoryUrl = `${baseURL}/categories`;

const initialState: CategoriesReducerState = {
  categories: [],
  isLoading: false,
  isError: false,
  message: "",
};

export const fetchAllCategoriesAsync = createAsyncThunk(
  "fetchAllCategoriesAsync",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<Category[]>(categoryUrl);
      const categories = response.data;
      return categories;
    } catch (e) {
      const error = e as AxiosError;
      return rejectWithValue(error.message);
    }
  }
);

const categoriesSlice = createSlice({
  name: "categoriesSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllCategoriesAsync.pending, (state) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(fetchAllCategoriesAsync.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        categories: action.payload,
      };
    });
    
    builder.addCase(fetchAllCategoriesAsync.rejected, (state, action) => {
      if (action.payload instanceof AxiosError) {
        return {
          ...state,
          isLoading: false,
          isError: true,
          error: action.payload.message,
        };
      }
    });
  },
});

const categoriesReducer = categoriesSlice.reducer;
export default categoriesReducer;
