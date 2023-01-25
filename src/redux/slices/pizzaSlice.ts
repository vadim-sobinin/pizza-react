import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

type PizzaItem = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
};

enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

interface PizzaSliceState {
  items: PizzaItem[];
  status: Status;
}

export type FilterParams = {
  categoryId: number;
  currentPage: string;
  search: string;
  sortType: string;
};

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING,
};

export const fetchPizzas = createAsyncThunk<PizzaItem[], FilterParams>(
  'pizza/fetchPizza',
  async ({ categoryId, currentPage, search, sortType }) => {
    const { data } = await axios.get<PizzaItem[]>(
      `https://63b1fc0a5e490925c511e59c.mockapi.io/items?limit=4&page=${currentPage}&${
        categoryId > 0 ? 'category=' + categoryId : ''
      }${search}&sortBy=${sortType}&order=desc`,
    );
    return data as PizzaItem[];
  },
);

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<PizzaItem[]>) {
      state.items = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  },
});

export const { setItems } = pizzaSlice.actions;
export const selectPizza = (state: RootState) => state.pizzaSlice;
export default pizzaSlice.reducer;
