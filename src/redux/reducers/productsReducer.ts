import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { Product } from "../../types/Product";
import PaginationQuery from "../../types/PaginationQuery";

const initialState: Product[] = []

export const fetchAllProductsAsync = createAsyncThunk(
  "fetchAllProductAsync",
  async ({offset, limit}: PaginationQuery) => {
    const jsonData = await fetch(`https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${limit}`)
    const data: Product[] = await jsonData.json()
    return data
  } 
)

const productSlice = createSlice({
  name: "productsSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
      return action.payload
    })
  }
})

const productsReducer = productSlice.reducer
export default productsReducer