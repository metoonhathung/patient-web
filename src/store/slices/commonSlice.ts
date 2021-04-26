import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CommonState, SnackbarState } from 'Store/types';

const initialState: CommonState = {
  isLoading: false,
  snackbar: {
    open: false,
    severity: 'success',
    message: '',
  },
};

export const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setSnackbar: (state, action: PayloadAction<SnackbarState>) => {
      state.snackbar = action.payload;
    },
  },
});

export const { setLoading, setSnackbar } = commonSlice.actions;

export default commonSlice.reducer;
