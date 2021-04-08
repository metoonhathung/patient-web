import React, { useState } from "react";
import { Table, Button } from "react-bootstrap";
import DeleteModal from "./DeleteModal";

export default function QueryTable({ patients, setDeleted }) {
  const [show, setShow] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  return (
    <>
      <Table className="mt-3" striped bordered hover responsive>
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
          {patients.map((patient) => (
            <tr key={patient.id}>
              <td>{patient.id}</td>
              <td>{patient.name}</td>
              <td>{patient.gender}</td>
              <td>{patient.age}</td>
              <td>{patient.email}</td>
              <td>{patient.phone}</td>
              <td>
                <Button
                  className="mr-3"
                  variant="success"
                  href={`/update/${patient.id}`}
                >
                  Update
                </Button>
                <Button
                  variant="danger"
                  onClick={() => {
                    setShow(true);
                    setDeleteId(patient.id);
                  }}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <DeleteModal
        show={show}
        setShow={setShow}
        deleteId={deleteId}
        setDeleted={setDeleted}
      />
    </>
  );
}
