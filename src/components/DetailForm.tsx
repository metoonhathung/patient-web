import React, { FC } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'Store/hooks';
import { PatientState } from 'Store/types';
import { editPatient } from 'Store/slices/patientSlice';

interface Props {
  errors: any;
  setErrors: React.Dispatch<any>;
  size: number;
}

interface Question {
  id: string;
  label: string;
  type: string;
}

const DetailForm: FC<Props> = ({ errors, setErrors, size, }) => {
  const dispatch = useAppDispatch();
  const patient = useAppSelector((state) => state.patient);
  const location = useLocation();

  const questions: Question[] = [
    { id: 'id', label: 'ID', type: 'number' },
    { id: 'name', label: 'Name', type: 'text' },
    { id: 'gender', label: 'Gender', type: 'select' },
    { id: 'age', label: 'Age', type: 'number' },
    { id: 'email', label: 'Email', type: 'text' },
    { id: 'phoneNumber', label: 'Phone number', type: 'text' },
  ];

  const patterns: any = {
    email: '^(.+)@(.+)$',
    phoneNumber: '^[0-9]{10,11}$',
  };

  const getOptions = (id: string) => {
    if (id === 'gender') {
      return ['Male', 'Female'];
    }
    return [];
  };

  const getOptionLabel = (id: string, option: any) => {
    if (id === 'gender') {
      return option;
    }
    return option;
  };

  const getTypeNumber = (id: string) => {
    const ranges: any = {
      id: { max: Number.MAX_SAFE_INTEGER, min: 1, step: 1 },
      age: { max: 100, min: 0, step: 1 },
    };
    if (ranges[id]) {
      return {
        type: 'number',
        max: ranges[id].max,
        min: ranges[id].min,
        step: ranges[id].step,
      };
    }
    return {};
  };

  const handleChange = (question: Question, value: any) => {
    setErrors({ ...errors, [question.id]: false });
    dispatch(editPatient({ [question.id]: question.type === 'number' ? (value ? +value : NaN) : (value || '') }));
  };

  const handleBlur = (e: React.FocusEvent<any>) => {
    e.persist();
    if (location.pathname !== '/') {
      setErrors({ ...errors, [e.target.name]: !e.target.validity.valid });
    }
  };

  const renderQuestion = (question: Question) => {
    if (['text', 'number'].includes(question.type)) {
      return (
        <TextField
          disabled={question.id === 'id' && location.pathname !== '/'}
          required={question.id !== 'email' ? location.pathname !== '/' : false}
          name={question.id}
          label={question.label}
          value={Number.isNaN(patient[question.id as keyof PatientState]) ? '' : patient[question.id as keyof PatientState]}
          inputProps={getTypeNumber(question.id)}
          onChange={(e) => handleChange(question, e.target.value)}
          onBlur={handleBlur}
          autoComplete="off"
          fullWidth
          variant="outlined"
          {...(patterns[question.id] && { inputProps: { pattern: patterns[question.id] } })}
          {...(errors[question.id] && { error: true, helperText: 'Please try again' })}
        />
      );
    }
    if (question.type === 'select') {
      return (
        <Autocomplete
          options={getOptions(question.id)}
          value={patient[question.id as keyof PatientState].toString() || null}
          getOptionLabel={(option) => getOptionLabel(question.id, option)}
          onChange={(e, option) => handleChange(question, option)}
          onBlur={handleBlur}
          renderInput={(params) => (
            <TextField
              {...params}
              required={location.pathname !== '/'}
              name={question.id}
              label={question.label}
              autoComplete="off"
              fullWidth
              variant="outlined"
              {...(errors[question.id] && { error: true, helperText: 'Please try again' })}
            />
          )}
        />
      );
    }
    return <></>;
  };

  return (
    <Grid container spacing={2}>
      {questions.map((question) => (
        <Grid item key={question.id} xs={12} md={size as any}>
          {renderQuestion(question)}
        </Grid>
      ))}
    </Grid>
  );
};

export default DetailForm;
