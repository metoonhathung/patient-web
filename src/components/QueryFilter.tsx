import React, { FC, useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import DetailForm from './DetailForm';
import { useAppDispatch, useAppSelector } from 'Store/hooks';
import { resetPatient } from 'Store/slices/patientSlice';
import { editFilter, resetFilter } from 'Store/slices/filterSlice';

const useStyles = makeStyles({
  button: {
    width: '100%',
  },
});

const QueryFilter: FC = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const patient = useAppSelector((state) => state.patient);

  const [errors, setErrors] = useState<any>({});

  useEffect(() => () => {
    dispatch(resetPatient());
  }, []);

  const handleFilter = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.persist();
    if (Object.keys(errors).every((key) => errors[key] !== true)) {
      dispatch(editFilter({ ...patient, page: 1 }));
    }
  };

  const handleReset = () => {
    dispatch(resetFilter());
    dispatch(resetPatient());
  };

  return (
    <Grid container spacing={2} justifyContent="space-between" alignItems="center">
      <Grid item xs={12} md={10}>
        <form id="filter-form" noValidate onSubmit={handleFilter}>
          <DetailForm errors={errors} setErrors={setErrors} size={2} />
        </form>
      </Grid>
      <Grid item xs={6} md={1}>
        <Button
          className={classes.button}
          color="primary"
          variant="contained"
          type="submit"
          form="filter-form"
        >
          Filter
        </Button>
      </Grid>
      <Grid item xs={6} md={1}>
        <Button
          className={classes.button}
          color="secondary"
          variant="contained"
          onClick={handleReset}
        >
          Reset
        </Button>
      </Grid>
    </Grid>
  );
};

export default QueryFilter;
