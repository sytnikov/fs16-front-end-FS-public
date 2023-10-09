import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import Product from "../../types/Product";
import PaginationQuery from "../../types/PaginationQuery";
import CreateProductInput from "../../types/CreateProductInput";
import UpdateProductInput from "../../types/UpdateProductInput";
import { ProductsReducerState } from "../../types/InitialState";

const initialState: ProductsReducerState = {
  products: [],
  loading: false,
};

export const fetchAllProductsAsync = createAsyncThunk(
  "fetchAllProductsAsync",
  async ({ offset, limit }: PaginationQuery, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${limit}`
      );
      const data: Product[] = response.data;
      return data;
    } catch (e) {
      const error = e as AxiosError;
      return rejectWithValue(error.message);
    }
  }
);

export const createProductAsync = createAsyncThunk(
  "createProductAsync",
  async (newProduct: CreateProductInput, { rejectWithValue }) => {
    try {
      const response = await axios.post<Product>(
        "https://api.escuelajs.co/api/v1/products/",
        newProduct
      );
      return response.data;
    } catch (e) {
      const error = e as AxiosError;
      return rejectWithValue(error.message);
    }
  }
);

export const updateProductAsync = createAsyncThunk(
  "updateProductAsync",
  async ({ update, id }: UpdateProductInput, { rejectWithValue }) => {
    try {
      const response = await axios.put<Product>(
        `https://api.escuelajs.co/api/v1/products/${id}`,
        update
      );
      return response.data;
    } catch (e) {
      const error = e as AxiosError;
      return rejectWithValue(error.message);
    }
  }
);

export const deleteProductAsync = createAsyncThunk(
  "deletePoductAsync",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await axios.delete<boolean>(
        `https://api.escuelajs.co/api/v1/products/${id}`
      );
      if (!response.data) {
        throw new Error("Cannot delete");
      }
      return id;
    } catch (e) {
      const error = e as AxiosError;
      return rejectWithValue(error.message);
    }
  }
);

const productsSlice = createSlice({
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
      state.products.push(action.payload);
    });
    builder.addCase(createProductAsync.rejected, (state, action) => {
      state.error = action.payload as string;
    });
    builder.addCase(updateProductAsync.fulfilled, (state, action) => {
      const foundIndex = state.products.findIndex(
        (p) => p.id === action.payload.id
      );
      if (foundIndex > -1) {
        state.products[foundIndex] = action.payload;
      }
    });
    builder.addCase(deleteProductAsync.fulfilled, (state, action) => {
      if (typeof action.payload === "number") {
        state.products = state.products.filter((p) => p.id !== action.payload);
      }
    });
  },
});

const productsReducer = productsSlice.reducer;
export const { sortByPrice } = productsSlice.actions;
export default productsReducer;
