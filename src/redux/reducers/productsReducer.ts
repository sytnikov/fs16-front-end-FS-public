import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import Product from "../../types/Product";
import PaginationQuery from "../../types/PaginationQuery";
import InitialState from "../../types/InitialState";
import CreateProductInput from "../../types/CreateProductInput";

const initialState: InitialState = {
  products: [],
  loading: false,
};

export const fetchAllProductsAsync = createAsyncThunk(
  "fetchAllProductsAsync",
  async ({ offset, limit }: PaginationQuery) => {
    try {
      const response = await axios.get(
        `https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${limit}`
      );
      const data: Product[] = response.data;
      return data;
    } catch (e) {
      const error = e as AxiosError;
      return error.message;
    }
  }
);

export const createProductAsync = createAsyncThunk(
  "createProductAsync",
  async (newProduct: CreateProductInput, { rejectWithValue }) => {
    try {
      const response = await axios.post<Product>("https://api.escuelajs.co/api/v1/products/", newProduct)
      return response.data
    } catch (e) {
      const error = e as AxiosError
      return rejectWithValue(error.message)
    }
  }
);

const productSlice = createSlice({
  name: "productsSlice",
  initialState,
  reducers: {
    sortByPrice: (state, action: PayloadAction<string>) => {
      if (action.payload === "asc") {
        state.products.sort((a, b) => a.price - b.price);
      } else {
        state.products.sort((a, b) => b.price - a.price);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
      if (Array.isArray(action.payload)) {
        return {
          ...state,
          products: action.payload,
          loading: false,
        };
      }
    });
    builder.addCase(fetchAllProductsAsync.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    });
    builder.addCase(fetchAllProductsAsync.rejected, (state, action) => {
      if (action.payload instanceof AxiosError) {
        return {
          ...state,
          error: action.payload.message,
        };
      }
    });
    builder.addCase(createProductAsync.fulfilled, (state, action) => {
      state.products.push(action.payload)
    });
    builder.addCase(createProductAsync.rejected, (state, action) => {
      state.error = action.payload as string
    })
  },
});

const productsReducer = productSlice.reducer;
export const { sortByPrice } = productSlice.actions;
export default productsReducer;
