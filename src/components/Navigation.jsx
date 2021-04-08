import React from "react";
import { Navbar, Nav } from "react-bootstrap";

export default function Navigation() {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="/">Home</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="/add">Add</Nav.Link>
      </Nav>
    </Navbar>
  );
}
