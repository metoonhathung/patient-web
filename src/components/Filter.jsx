import React, { useState } from "react";
import { Form, Col, Button } from "react-bootstrap";

export default function Filter({ setCondition }) {
  const [filter, setFilter] = useState({
    id: "",
    name: "",
    gender: "",
    age: "",
    email: "",
    phone: "",
  });
  let handleChange = (e) => {
    let { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };
  let query = (e) => {
    e.preventDefault();
    let arr = [];
    if (filter.id) arr.push(`id='${filter.id}'`);
    if (filter.name) arr.push(`name='${filter.name}'`);
    if (filter.gender) arr.push(`gender='${filter.gender}'`);
    if (filter.age) arr.push(`age='${filter.age}'`);
    if (filter.email) arr.push(`email='${filter.email}'`);
    if (filter.phone) arr.push(`phone='${filter.phone}'`);
    let condition = "";
    for (let i = 0; i < arr.length; i++) {
      if (i === 0) condition += "WHERE " + arr[i];
      else condition += " AND " + arr[i];
    }
    setCondition(condition);
  };

  return (
    <Form className="mt-3" onSubmit={query}>
      <Form.Row>
        <Col>
          <Form.Control
            type="text"
            placeholder="ID"
            name="id"
            value={filter.id}
            onChange={handleChange}
          />
        </Col>
        <Col>
          <Form.Control
            type="text"
            placeholder="Name"
            name="name"
            value={filter.name}
            onChange={handleChange}
          />
        </Col>
        <Col>
          <Form.Control
            as="select"
            custom
            name="gender"
            value={filter.gender}
            onChange={handleChange}
          >
            <option value="">-Gender-</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </Form.Control>
        </Col>
        <Col>
          <Form.Control
            type="text"
            placeholder="Age"
            name="age"
            value={filter.age}
            onChange={handleChange}
          />
        </Col>
        <Col>
          <Form.Control
            type="text"
            placeholder="Email"
            name="email"
            value={filter.email}
            onChange={handleChange}
          />
        </Col>
        <Col>
          <Form.Control
            type="text"
            placeholder="Phone"
            name="phone"
            value={filter.phone}
            onChange={handleChange}
          />
        </Col>
        <Col>
          <Button type="submit">Filter</Button>
        </Col>
      </Form.Row>
    </Form>
  );
}
