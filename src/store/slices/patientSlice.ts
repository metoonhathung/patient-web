import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_ROOT_ENDPOINT } from 'Utils/constants';
import { PatientState } from 'Store/types';
import { setLoading, setSnackbar } from './commonSlice';
import { getPatients } from './patientQuerySlice';

const initialState: PatientState = {
  id: NaN,
  name: '',
  gender: '',
  age: NaN,
  email: '',
  phoneNumber: '',
  createdAt: '',
  updatedAt: '',
};

const entityToDto = (patient: PatientState) => ({
  ...(patient.id && { id: patient.id }),
  name: patient.name.trim(),
  gender: patient.gender.trim(),
  age: patient.age,
  email: patient.email.trim(),
  phoneNumber: patient.phoneNumber.trim(),
});

export const getPatient = createAsyncThunk<PatientState, number>(
  'patient/getPatient',
  async (id, { dispatch }) => {
    let data = initialState;
    dispatch(setLoading(true));
    try {
      const response = await axios.get(`${API_ROOT_ENDPOINT}/patients/${id}`);
      data = response.data;
      // dispatch(setSnackbar({ open: true, severity: 'success', message: 'Retrieve patient successfully' }));
    } catch (error) {
      dispatch(setSnackbar({ open: true, severity: 'error', message: error.response.status }));
    }
    dispatch(setLoading(false));
    return data;
  },
);

export const postPatient = createAsyncThunk<void, PatientState>(
  'patient/postPatient',
  async (patient, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      await axios.post(`${API_ROOT_ENDPOINT}/patients`, entityToDto(patient));
      dispatch(setSnackbar({ open: true, severity: 'success', message: 'Create patient successfully' }));
    } catch (error) {
      dispatch(setSnackbar({ open: true, severity: 'error', message: error.response.status }));
    }
    dispatch(setLoading(false));
  },
);

export const putPatient = createAsyncThunk<void, PatientState>(
  'patient/putPatient',
  async (patient, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      await axios.put(`${API_ROOT_ENDPOINT}/patients/${patient.id}`, entityToDto(patient));
      dispatch(setSnackbar({ open: true, severity: 'success', message: 'Update patient successfully' }));
    } catch (error) {
      dispatch(setSnackbar({ open: true, severity: 'error', message: error.response.status }));
    }
    dispatch(setLoading(false));
  },
);

export const deletePatient = createAsyncThunk<void, number>(
  'patient/deletePatient',
  async (id, { dispatch, getState }) => {
    dispatch(setLoading(true));
    try {
      await axios.delete(`${API_ROOT_ENDPOINT}/patients/${id}`);
      dispatch(setSnackbar({ open: true, severity: 'success', message: 'Delete patient successfully' }));
    } catch (error) {
      dispatch(setSnackbar({ open: true, severity: 'error', message: error.response.status }));
    }
    dispatch(setLoading(false));
    const { filter }: any = getState();
    dispatch(getPatients(filter));
  },
);

export const patientSlice = createSlice({
  name: 'patient',
  initialState,
  reducers: {
    editPatient: (state, action: PayloadAction<{ [key: string]: any }>) => {
      const newState: { [key: string]: any } = {};
      Object.keys(action.payload).forEach((key) => {
        if (key in state) {
          newState[key] = action.payload[key];
        }
      });
      return { ...state, ...newState };
    },
    resetPatient: (state) => ({ ...state, ...initialState }),
  },
  extraReducers: (builder) => {
    builder.addCase(getPatient.fulfilled, (state, action) => ({ ...state, ...action.payload }));
  },
});

export const { editPatient, resetPatient } = patientSlice.actions;

export default patientSlice.reducer;
