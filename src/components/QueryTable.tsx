import React, { FC, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { useHistory } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'Store/hooks';
import { getPatients } from 'Store/slices/patientQuerySlice';
import { editFilter } from 'Store/slices/filterSlice';
import { editPatient } from 'Store/slices/patientSlice';
import DeleteDialog from './DeleteDialog';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  pagination: {
    flexShrink: 0,
  },
  button: {
    width: '100%',
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
});

const QueryTable: FC = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const filter = useAppSelector((state) => state.filter);
  const { meta, data } = useAppSelector((state) => state.patientQuery);
  const history = useHistory();

  const [open, setOpen] = useState(false);
  const [id, setId] = useState(0);

  useEffect(() => {
    dispatch(editPatient(filter));
    dispatch(getPatients(filter));
  }, [filter]);

  const handleChangePage = (event: any, value: number) => {
    dispatch(editFilter({ page: value }));
  };

  const handleChangeRowsPerPage = (event: any) => {
    dispatch(editFilter({ size: +event.target.value, page: 1 }));
  };

  const handleSort = (property: string) => {
    const isAsc = filter.orderBy === property && filter.direction === 'ASC';
    dispatch(editFilter({ orderBy: property, direction: isAsc ? 'DESC' : 'ASC', page: 1 }));
  };

  const handleDeleteOpen = (deleteId: number) => {
    setOpen(true);
    setId(deleteId);
  };

  const headCells = [
    { id: 'id', label: 'ID' },
    { id: 'name', label: 'Name' },
    { id: 'gender', label: 'Gender' },
    { id: 'age', label: 'Age' },
    { id: 'email', label: 'Email' },
    { id: 'phoneNumber', label: 'Phone Number' },
    { id: 'actions', label: '' },
  ];

  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="query table">
          <TableHead>
            <TableRow>
              {headCells.map((headCell) => (
                <TableCell
                  key={headCell.id}
                  sortDirection={(filter.orderBy === headCell.id ? filter.direction.toLowerCase() : false) as any}
                >
                  {headCell.id === 'actions' ? headCell.label : (
                    <TableSortLabel
                      active={filter.orderBy === headCell.id}
                      direction={(filter.orderBy === headCell.id ? filter.direction.toLowerCase() : 'asc') as any}
                      onClick={() => handleSort(headCell.id)}
                    >
                      {headCell.label}
                      {filter.orderBy === headCell.id ? (
                        <span className={classes.visuallyHidden}>
                          {filter.direction === 'DESC' ? 'sorted descending' : 'sorted ascending'}
                        </span>
                      ) : null}
                    </TableSortLabel>
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((patient) => (
              <TableRow key={patient.id} hover>
                <TableCell component="th" scope="row">
                  {patient.id}
                </TableCell>
                <TableCell>{patient.name}</TableCell>
                <TableCell>{patient.gender}</TableCell>
                <TableCell>{patient.age}</TableCell>
                <TableCell>{patient.email}</TableCell>
                <TableCell>{patient.phoneNumber}</TableCell>
                <TableCell>
                  <Box display="flex" flexDirection="row">
                    <Button
                      className={classes.button}
                      color="primary"
                      onClick={() => history.push(`/update/${patient.id}`)}
                    >
                      Edit
                    </Button>
                    <Button
                      className={classes.button}
                      color="secondary"
                      onClick={() => handleDeleteOpen(patient.id)}
                    >
                      Delete
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid container spacing={2} justifyContent="space-between" alignItems="center">
        <Grid item xs={12} md={2}>
          <Button
            className={classes.button}
            color="primary"
            variant="contained"
            onClick={() => history.push('/create')}
          >
            Create Patient
          </Button>
        </Grid>
        <Grid item xs={12} md={10}>
          <TablePagination
            rowsPerPageOptions={[10, 25, 50, 100]}
            colSpan={3}
            component="div"
            count={meta.total}
            rowsPerPage={filter.size}
            page={filter.page - 1}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            ActionsComponent={() => (
              <Box className={classes.pagination}>
                <Pagination
                  page={filter.page}
                  count={Math.ceil(meta.total / filter.size)}
                  onChange={handleChangePage}
                  color="primary"
                />
              </Box>
            )}
          />
        </Grid>
      </Grid>
      <DeleteDialog open={open} setOpen={setOpen} id={id} />
    </>
  );
};

export default QueryTable;
