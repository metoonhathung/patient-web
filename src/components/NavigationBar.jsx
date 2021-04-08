import React from "react";
import { Navbar, Nav } from "react-bootstrap";

export default function NavigationBar() {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="/">Home</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link
          href="https://github.com/metoonhathung/patients-frontend"
          target="_blank"
        >
          Frontend
        </Nav.Link>
        <Nav.Link
          href="https://github.com/metoonhathung/patients-backend"
          target="_blank"
        >
          Backend
        </Nav.Link>
      </Nav>
    </Navbar>
  );
}
