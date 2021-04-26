import React, { FC } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import { useAppDispatch } from 'Store/hooks';
import { deletePatient } from 'Store/slices/patientSlice';

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: number;
}

const DeleteDialog: FC<Props> = ({ open, setOpen, id, }) => {
  const dispatch = useAppDispatch();

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    dispatch(deletePatient(id));
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Confirm</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {`Do you want to delete patient with id ${id}?`}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button
          color="primary"
          onClick={handleDelete}
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
