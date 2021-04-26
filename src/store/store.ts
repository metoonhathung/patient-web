import { configureStore } from '@reduxjs/toolkit';
import commonReducer from './slices/commonSlice';
import patientReducer from './slices/patientSlice';
import patientQueryReducer from './slices/patientQuerySlice';
import filterReducer from './slices/filterSlice';

export const store = configureStore({
  reducer: {
    common: commonReducer,
    patient: patientReducer,
    patientQuery: patientQueryReducer,
    filter: filterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
