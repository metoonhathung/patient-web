import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilterState } from 'Store/types';

const initialState: FilterState = {
  page: 1,
  size: 10,
  orderBy: 'id',
  direction: 'ASC',
  id: NaN,
  name: '',
  gender: '',
  age: NaN,
  email: '',
  phoneNumber: '',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    editFilter: (state, action: PayloadAction<{ [key: string]: any }>) => {
      const newState: { [key: string]: any } = {};
      Object.keys(action.payload).forEach((key) => {
        if (key in state) {
          newState[key] = action.payload[key];
        }
      });
      return { ...state, ...newState };
    },
    resetFilter: (state) => ({ ...state, ...initialState }),
  },
});

export const { editFilter, resetFilter } = filterSlice.actions;

export default filterSlice.reducer;
