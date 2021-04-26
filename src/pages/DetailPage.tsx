import React, { FC, useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { makeStyles } from '@material-ui/core/styles';
import { useAppDispatch, useAppSelector } from 'Store/hooks';
import {
  getPatient, postPatient, putPatient, resetPatient,
} from 'Store/slices/patientSlice';
import DetailForm from 'Components/DetailForm';
import DetailTable from 'Components/DetailTable';

const useStyles = makeStyles((theme) => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
    width: '100%',
  },
}));

const DetailPage: FC = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const patient = useAppSelector((state) => state.patient);
  const history = useHistory();
  const { id } = useParams<{ id: string | undefined }>();
  const [errors, setErrors] = useState<any>({});
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (id) {
      dispatch(getPatient(+id));
    }
  }, [id]);

  useEffect(() => () => {
    dispatch(resetPatient());
  }, []);

  const validateSubmit = (e: React.FormEvent<HTMLFormElement>, setErrors: React.Dispatch<any>) => {
    const newErrors: any = {};
    Object.keys(e.target).forEach((formKey) => {
      const { name, type, validity } = (e.target as any)[formKey];
      if (['text', 'number', 'select'].includes(type)) {
        newErrors[name] = !validity.valid;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).every((errorsKey) => newErrors[errorsKey] !== true);
  };

  const handleBack = () => {
    if (activeStep === 0) {
      history.push('/');
    } else {
      setActiveStep(activeStep - 1);
    }
  };

  const handleNext = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.persist();
    if (validateSubmit(e, setErrors)) {
      if (activeStep === 1) {
        if (id) {
          dispatch(putPatient(patient));
        } else {
          dispatch(postPatient(patient));
        }
      }
      setActiveStep(activeStep + 1);
    }
  };

  const steps = [(id ? 'Update' : 'Create'), 'Confirmation'];

  const getStepContent = (step: number) => {
    switch (step) {
      case 0: {
        return <DetailForm errors={errors} setErrors={setErrors} size={12} />;
      }
      case 1: {
        return <DetailTable />;
      }
      default: {
        return <></>;
      }
    }
  };

  return (
    <main className={classes.layout}>
      <Paper className={classes.paper}>
        <Typography variant="h4" align="center" color="primary">
          {activeStep !== 2
            ? `${id ? 'Update' : 'Create'} patient${activeStep === 1 ? ' confirmation' : ''}`
            : `Congrats! Patient was ${id ? 'updated' : 'created'}`}
        </Typography>
        <Stepper activeStep={activeStep} className={classes.stepper} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>
                <Typography variant="body1">
                  {label}
                </Typography>
              </StepLabel>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length ? (
          <Box display="flex" justifyContent="center" alignItems="center">
            <Button
              variant="contained"
              color="primary"
              onClick={() => history.push('/')}
            >
              Go home
            </Button>
          </Box>
        ) : (
          <form onSubmit={handleNext} noValidate>
            {getStepContent(activeStep)}
            <Box className={classes.buttons}>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleBack}
                className={classes.button}
              >
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                className={classes.button}
              >
                Next
              </Button>
            </Box>
          </form>
        )}
      </Paper>
    </main>
  );
};

export default DetailPage;
