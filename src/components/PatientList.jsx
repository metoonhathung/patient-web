import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Table,
  Button,
  Pagination,
} from "react-bootstrap";
import PatientService from "../services/PatientService";
import Filter from "./Filter";

export default function PatientList(props) {
  const [patients, setPatients] = useState([]);
  const [patientsOutput, setPatientsOutput] = useState([]);
  const [loading, setLoading] = useState(<h1>Loading...</h1>);
  const [filters, setFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;
  const indexEndPage = currentPage * postsPerPage;
  const indexStartPage = indexEndPage - postsPerPage;
  const currentPosts = patientsOutput.slice(indexStartPage, indexEndPage);
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(patientsOutput.length / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  useEffect(() => {
    PatientService.getAllPatients()
      .then((res) => {
        let sorted = [...res.data].sort((a, b) => a.id - b.id);
        setPatients(sorted);
        setPatientsOutput(sorted);
        setLoading(null);
      })
      .catch((err) => setLoading(<h1>Error loading database!</h1>));
  }, []);

  useEffect(() => {
    if (Object.keys(filters).length > 0) {
      setCurrentPage(1);
      setPatientsOutput(
        patients.filter((elm) => {
          if (filters.id) {
            if (elm.id !== parseInt(filters.id)) return false;
          }
          if (filters.name) {
            if (!elm.name.toLowerCase().includes(filters.name.toLowerCase()))
              return false;
          }
          if (filters.gender) {
            if (elm.gender.toLowerCase() !== filters.gender.toLowerCase())
              return false;
          }
          if (filters.age) {
            if (elm.age !== parseInt(filters.age)) return false;
          }
          if (filters.email) {
            if (!elm.email.toLowerCase().includes(filters.email.toLowerCase()))
              return false;
          }
          if (filters.phone) {
            if (!elm.phone.toLowerCase().includes(filters.phone.toLowerCase()))
              return false;
          }
          return true;
        })
      );
    }
  }, [filters]);

  return (
    <Container>
      <Row>
        <Filter setFilters={setFilters} />
      </Row>
      <Row>
        <Table className="mt-3" striped bordered hover>
          <thead className="thead-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Gender</th>
              <th>Age</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentPosts.map((patient) => (
              <tr key={patient.id}>
                <td>{patient.id}</td>
                <td>{patient.name}</td>
                <td>{patient.gender}</td>
                <td>{patient.age}</td>
                <td>{patient.email}</td>
                <td>{patient.phone}</td>
                <td>
                  <Button variant="success" href={`/update/${patient.id}`}>
                    Update
                  </Button>
                  <Button
                    variant="danger"
                    className="ml-3"
                    onClick={() => {
                      PatientService.deletePatient(patient.id)
                        .then((res) => {
                          setPatients(
                            patients.filter((elm) => elm.id !== patient.id)
                          );
                          setPatientsOutput(
                            patientsOutput.filter(
                              (elm) => elm.id !== patient.id
                            )
                          );
                        })
                        .catch((err) => alert(err));
                    }}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        {loading}
      </Row>
      <Row>
        <Col>
          <Button href="/add" variant="warning">
            Create Patient
          </Button>
        </Col>
        <Col>
          <Pagination className="justify-content-end">
            <Pagination.Prev
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            />
            {pageNumbers.map((number) => (
              <Pagination.Item
                key={number}
                active={number === currentPage}
                onClick={() => setCurrentPage(number)}
              >
                {number}
              </Pagination.Item>
            ))}
            <Pagination.Next
              disabled={currentPage === pageNumbers.length}
              onClick={() => setCurrentPage(currentPage + 1)}
            />
          </Pagination>
        </Col>
      </Row>
    </Container>
  );
}
