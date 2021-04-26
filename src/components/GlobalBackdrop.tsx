import React, { FC } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { useAppSelector } from 'Store/hooks';

const useStyles = makeStyles((theme: Theme) => createStyles({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const GlobalBackdrop: FC = () => {
  const classes = useStyles();
  const { isLoading } = useAppSelector((state) => state.common);

  return (
    <Backdrop className={classes.backdrop} open={isLoading}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default GlobalBackdrop;
