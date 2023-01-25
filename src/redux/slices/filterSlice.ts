import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type SortType = {
  name: string;
  sortProperty: string;
};

export interface FilterSliceState {
  searchValue?: string;
  categoryId: number;
  sort: SortType;
  currentPage: number;
  searchInputValue?: string;
  sortProperty?: string;
}

const initialState: FilterSliceState = {
  searchValue: '',
  categoryId: 0,
  sort: { name: 'popularity', sortProperty: 'rating' },
  currentPage: 1,
  searchInputValue: '',
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearchInputValue(state, action: PayloadAction<string>) {
      state.searchInputValue = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSort(state, action: PayloadAction<SortType>) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setFilters(state, action: PayloadAction<FilterSliceState>) {
      state.currentPage = Number(action.payload.currentPage);
      state.sort = action.payload.sort;
      state.categoryId = Number(action.payload.categoryId);
    },
  },
});

export const {
  setCategoryId,
  setSort,
  setCurrentPage,
  setFilters,
  setSearchValue,
  setSearchInputValue,
} = filterSlice.actions;

export default filterSlice.reducer;
