import React, { FC } from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
  center: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
});

const NotFoundPage: FC = () => {
  const classes = useStyles();
  const history = useHistory();
  return (
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" className={classes.center}>
      <Typography variant="h3" color="primary" gutterBottom>
        Not Found
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => history.push('/')}
      >
        Go home
      </Button>
    </Box>
  );
};

export default NotFoundPage;
