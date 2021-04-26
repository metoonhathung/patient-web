import React, { FC } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useAppSelector } from 'Store/hooks';
import { PatientState } from 'Store/types';

const DetailTable: FC = () => {
  const patient = useAppSelector((state) => state.patient);

  const fields = [
    { id: 'id', label: 'ID'},
    { id: 'name', label: 'Name'},
    { id: 'gender', label: 'Gender'},
    { id: 'age', label: 'Age'},
    { id: 'email', label: 'Email'},
    { id: 'phoneNumber', label: 'Phone number'},
  ];

  return (
    <TableContainer component={Paper}>
      <Table aria-label="detail table">
        <TableHead>
          <TableRow>
            <TableCell>Key</TableCell>
            <TableCell>Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {fields.map((field) => (
            <TableRow key={field.id} hover>
              <TableCell component="th" scope="row">
                {field.label}
              </TableCell>
              <TableCell>
                {Number.isNaN(patient[field.id as keyof PatientState]) ? '' : patient[field.id as keyof PatientState]}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default DetailTable;
