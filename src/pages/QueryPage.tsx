import React, { FC } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import QueryTable from 'Components/QueryTable';
import QueryFilter from 'Components/QueryFilter';

const useStyles = makeStyles({
  container: {
    paddingTop: '2rem',
    paddingBottom: '2rem',
  },
});

const QueryPage: FC = () => {
  const classes = useStyles();
  return (
    <Container className={classes.container}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <QueryFilter />
        </Grid>
        <Grid item xs={12}>
          <QueryTable />
        </Grid>
      </Grid>
    </Container>
  );
};

export default QueryPage;
