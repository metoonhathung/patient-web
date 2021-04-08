import React from "react";
import { Card, Form, Button, Row, Col } from "react-bootstrap";

export default function InputForm({ state, setState, action, setStep }) {
  let handleChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  let validate = (patient) => {
    let arr = [];
    if (!patient.name || patient.name.length > 255) arr.push("Name");
    if (!patient.gender) arr.push("Gender");
    if (!patient.age || patient.age < 0) arr.push("Age");
    if (patient.email) {
      if (patient.email.length > 50) arr.push("Email");
    }
    if (!patient.phone || patient.phone.length > 50) arr.push("Phone");
    return arr.join(", ");
  };
  let forward = (e) => {
    e.preventDefault();
    let invalidation = validate(state);
    if (invalidation) {
      alert(`INVALID ${invalidation}`);
      return;
    }
    setStep((step) => step + 1);
  };
  return (
    <Card className="col-md-8 offset-md-2 mt-3 text-center">
      <Card.Header as="h3">{action} Patient</Card.Header>
      <Card.Body>
        <Form onSubmit={forward}>
          <Form.Group as={Row}>
            <Form.Label column sm="2">
              ID
            </Form.Label>
            <Col sm="10">
              <Form.Control
                disabled
                type="number"
                placeholder="ID"
                name="id"
                value={state.id}
                onChange={handleChange}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm="2">
              Name
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
                placeholder="Name"
                name="name"
                value={state.name}
                onChange={handleChange}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm="2">
              Gender
            </Form.Label>
            <Col sm="10">
              <Form.Control
                as="select"
                custom
                name="gender"
                value={state.gender}
                onChange={handleChange}
              >
                <option value="">-Gender-</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </Form.Control>
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm="2">
              Age
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="number"
                placeholder="Age"
                name="age"
                value={state.age}
                onChange={handleChange}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm="2">
              Email
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="email"
                placeholder="Email"
                name="email"
                value={state.email}
                onChange={handleChange}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm="2">
              Phone
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="tel"
                pattern="[0-9]+"
                placeholder="Phone"
                name="phone"
                value={state.phone}
                onChange={handleChange}
              />
            </Col>
          </Form.Group>
          <Button href="/" className="mt-3 mr-3" variant="secondary">
            Back
          </Button>
          <Button className="mt-3" type="submit">
            Next
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}
