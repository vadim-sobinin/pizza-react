import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk(
  'pizza/fetchPizza',
  async ({ categoryId, currentPage, search, sortType }) => {
    const { data } = await axios.get(
      `https://63b1fc0a5e490925c511e59c.mockapi.io/items?limit=4&page=${currentPage}&${
        categoryId > 0 ? 'category=' + categoryId : ''
      }${search}&sortBy=${sortType}&order=desc`,
    );
    return data;
  },
);

const initialState = {
  items: [],
  status: 'loading',
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.status = 'loading';
      state.items = [];
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = 'success';
    },
    [fetchPizzas.rejected]: (state) => {
      state.status = 'error';
      state.items = [];
    },
  },
});

export const { setItems } = pizzaSlice.actions;
export const selectPizza = (state) => state.pizzaSlice;
export default pizzaSlice.reducer;
