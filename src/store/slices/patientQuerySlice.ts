import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_ROOT_ENDPOINT } from 'Utils/constants';
import { FilterState, PatientQueryState } from 'Store/types';
import { setLoading, setSnackbar } from './commonSlice';

const initialState: PatientQueryState = {
  meta: {
    total: 0,
  },
  data: [],
};

export const getPatients = createAsyncThunk<PatientQueryState, FilterState>(
  'patientQuery/getPatients',
  async (filter, { dispatch }) => {
    const query: string[] = [];
    Object.keys(filter).forEach((key) => {
      const value = filter[key as keyof FilterState];
      if (![NaN, ''].includes(value)) {
        query.push(`${key}=${value}`);
      }
    });
    let data = initialState;
    dispatch(setLoading(true));
    try {
      const response = await axios.get(`${API_ROOT_ENDPOINT}/patients?${query.join('&')}`);
      data = response.data;
      // dispatch(setSnackbar({ open: true, severity: 'success', message: 'Retrieve patients successfully' }));
    } catch (error) {
      dispatch(setSnackbar({ open: true, severity: 'error', message: error.response.status }));
    }
    dispatch(setLoading(false));
    return data;
  },
);

export const patientQuerySlice = createSlice({
  name: 'patientQuery',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPatients.fulfilled, (state, action) => ({ ...state, ...action.payload }));
  },
});

export default patientQuerySlice.reducer;
