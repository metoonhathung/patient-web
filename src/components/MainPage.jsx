import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Filter from "./Filter";
import QueryTable from "./QueryTable";
import PaginationBar from "./PaginationBar";

export default function MainPage() {
  const [patients, setPatients] = useState([]);
  const [condition, setCondition] = useState("");
  const [deleted, setDeleted] = useState(0);
  return (
    <Container>
      <Row>
        <Filter setCondition={setCondition} />
      </Row>
      <Row>
        <QueryTable patients={patients} setDeleted={setDeleted} />
      </Row>
      <Row>
        <Col>
          <Button href="/add">Create Patient</Button>
        </Col>
        <Col>
          <PaginationBar
            condition={condition}
            setPatients={setPatients}
            deleted={deleted}
          />
        </Col>
      </Row>
    </Container>
  );
}
