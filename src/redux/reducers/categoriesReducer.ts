import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CategoriesReducerState } from "../../types/InitialState";
import axios, { AxiosError } from "axios";
import Category from "../../types/Category";

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
    const response = await axios.get(
      "https://api.escuelajs.co/api/v1/categories"
    );
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
      state.categories = action.payload
    })
  },
});

const categoriesReducer = categoriesSlice.reducer
export default categoriesReducer
