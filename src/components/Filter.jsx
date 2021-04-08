import React, { useState } from "react";
import { InputGroup, FormControl, Button } from "react-bootstrap";

export default function Filter({ setFilters }) {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <InputGroup className="mt-3">
      <FormControl
        type="text"
        placeholder="ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <FormControl
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <FormControl
        as="select"
        custom
        value={gender}
        onChange={(e) => setGender(e.target.value)}
      >
        <option value="">-Gender-</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </FormControl>
      <FormControl
        type="text"
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />
      <FormControl
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <FormControl
        type="text"
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <Button
        onClick={() => setFilters({ id, name, gender, age, email, phone })}
      >
        Filter
      </Button>
    </InputGroup>
  );
}
