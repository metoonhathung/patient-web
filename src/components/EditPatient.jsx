import React, { useState, useEffect } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import PatientService from "../services/PatientService";

export default function EditPatient({ action }) {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const history = useHistory();
  const params = useParams();
  useEffect(() => {
    if (action === "update") {
      PatientService.getPatientById(params.id)
        .then((res) => {
          let patient = res.data;
          setId(patient.id);
          setName(patient.name);
          setGender(patient.gender);
          setAge(patient.age);
          setEmail(patient.email);
          setPhone(patient.phone);
        })
        .catch((err) => alert(err));
    }
  }, []);

  let validate = (input) => {
    let info = "";
    if (!input.name || input.name.length > 255)
      info += "Name is empty or too long!\n";
    if (!input.gender) info += "Gender is not selected!\n";
    if (isNaN(input.age)) info += "Age is not a number!\n";
    if (input.email) {
      if (input.email.length > 50 || !/\S+@\S+\.\S+/.test(input.email))
        info += "Email is too long or in wrong format!\n";
    }
    if (
      !input.phone ||
      input.phone.length > 50 ||
      !/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/.test(input.phone)
    )
      info += "Phone is empty, too long, or in wrong format!\n";
    return info;
  };

  let savePatient = () => {
    let patient = {
      id: parseInt(id),
      name,
      gender,
      age: parseInt(age),
      email,
      phone,
    };
    let info = validate(patient);
    if (info) {
      alert(info);
      return;
    }
    if (action === "create") {
      PatientService.createPatient(patient)
        .then((res) => {
          history.push("/");
        })
        .catch((err) => alert(err));
    }
    if (action === "update") {
      PatientService.updatePatient(id, patient)
        .then((res) => {
          history.push("/");
        })
        .catch((err) => alert(err));
    }
  };

  return (
    <Card className="col-md-6 offset-md-3 mt-3 text-center">
      <Card.Header as="h3" className="text-center">
        Edit Patient
      </Card.Header>
      <Card.Body>
        <Form>
          <Form.Control
            disabled
            type="text"
            placeholder="ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <Form.Control
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Form.Control
            as="select"
            custom
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">-Gender-</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </Form.Control>
          <Form.Control
            type="text"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          <Form.Control
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Control
            type="text"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <Button href="/" className="mt-3" variant="secondary">
            Cancel
          </Button>
          <Button className="ml-3 mt-3" onClick={savePatient}>
            Submit
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}
