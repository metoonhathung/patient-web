export interface CommonState {
  isLoading: boolean
  snackbar: SnackbarState
}

export interface SnackbarState {
  open: boolean;
  severity: string;
  message: string;
}

export interface PatientQueryState {
  meta: {
    total: number;
  };
  data: PatientState[];
}

export interface PatientState {
  id: number;
  name: string;
  gender: string;
  age: number;
  email: string;
  phoneNumber: string;
  createdAt: string;
  updatedAt: string;
}

export interface FilterState {
  page: number;
  size: number;
  orderBy: string;
  direction: string;
  id: number;
  name: string;
  gender: string;
  age: number;
  email: string;
  phoneNumber: string;
}
