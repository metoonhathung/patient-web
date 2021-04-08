import React from "react";
import { Table, Button } from "react-bootstrap";
import PatientService from "../services/PatientService";

export default function Confirm({ state, action, setStep }) {
  let save = () => {
    if (action === "Create") {
      PatientService.create(state)
        .then((res) => setStep((step) => step + 1))
        .catch((err) => alert(err));
    }
    if (action === "Update") {
      PatientService.update(state.id, state)
        .then((res) => setStep((step) => step + 1))
        .catch((err) => alert(err));
    }
  };
  return (
    <>
      <h1>{action} Patient Confirmation</h1>
      <Table striped bordered hover responsive>
        <thead className="thead-dark">
          <tr>
            <th>Key</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>ID</td>
            <td>{state.id}</td>
          </tr>
          <tr>
            <td>Name</td>
            <td>{state.name}</td>
          </tr>
          <tr>
            <td>Gender</td>
            <td>{state.gender}</td>
          </tr>
          <tr>
            <td>Age</td>
            <td>{state.age}</td>
          </tr>
          <tr>
            <td>Email</td>
            <td>{state.email}</td>
          </tr>
          <tr>
            <td>Phone</td>
            <td>{state.phone}</td>
          </tr>
        </tbody>
      </Table>
      <Button
        onClick={() => setStep((step) => step - 1)}
        className="mt-3 mr-3"
        variant="secondary"
      >
        Back
      </Button>
      <Button onClick={save} className="mt-3">
        Next
      </Button>
    </>
  );
}
