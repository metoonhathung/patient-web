import React, { FC } from 'react';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import { useAppDispatch, useAppSelector } from 'Store/hooks';
import { setSnackbar } from 'Store/slices/commonSlice';

const GlobalSnackbar: FC = () => {
  const dispatch = useAppDispatch();
  const { snackbar } = useAppSelector((state) => state.common);
  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(setSnackbar({ ...snackbar, open: false }));
  };
  return (
    <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }} open={snackbar.open} autoHideDuration={3000} onClose={handleClose}>
      <Alert elevation={6} variant="filled" onClose={handleClose} severity={snackbar.severity as any}>
        {snackbar.message}
      </Alert>
    </Snackbar>
  );
};

export default GlobalSnackbar;
