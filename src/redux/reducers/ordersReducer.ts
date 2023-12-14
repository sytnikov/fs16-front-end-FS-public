import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import { baseURL } from "../../common/common";
import { OrdersReducerState } from "../../types/InitialState";
import Order from "../../types/Order";
import { getConfig } from "../../common/config";
import CreateOrderInput from "../../types/CreateOrderInput";

const orderUrl = `${baseURL}/orders`;
const checkoutUrl = `${baseURL}/checkout`;

const initialState: OrdersReducerState = {
  orders: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const fetchAllUserOrdersAsync = createAsyncThunk(
  "fetchAllUserOrdersAsync",
  async (_id: string, { rejectWithValue }) => {
    try {
      const response = await axios.get<Order[]>(
        `${orderUrl}/${_id}`,
        getConfig()
      );
      const orders = response.data;
      return orders;
    } catch (e) {
      const error = e as AxiosError;
      return rejectWithValue(error);
    }
  }
);

export const createOrderAsync = createAsyncThunk(
  "createOrderAsync",
  async (newOrderData: CreateOrderInput, { rejectWithValue }) => {
    try {
      const response = await axios.post<Order>(
        checkoutUrl,
        newOrderData,
        getConfig()
      );
      const order = response.data;
      return order;
    } catch (e) {
      const error = e as AxiosError;
      return rejectWithValue(error);
    }
  }
);

const ordersSlice = createSlice({
  name: "ordersSlice",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllUserOrdersAsync.pending, (state) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(fetchAllUserOrdersAsync.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        orders: action.payload,
      };
    });
    builder.addCase(fetchAllUserOrdersAsync.rejected, (state, action) => {
      if (action.payload instanceof AxiosError) {
        return {
          ...state,
          isLoading: false,
          isError: true,
          message: action.payload.response?.data.message,
        };
      }
    });
    builder.addCase(createOrderAsync.fulfilled, (state) => {
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
      };
    });
    builder.addCase(createOrderAsync.rejected, (state, action) => {
      if (action.payload instanceof AxiosError) {
        return {
          ...state,
          isLoading: false,
          isSuccess: false,
          isError: true,
          message: action.payload.response?.data.message,
        };
      }
    });
  },
});

const ordersReducer = ordersSlice.reducer;
export const { reset } = ordersSlice.actions;
export default ordersReducer;
