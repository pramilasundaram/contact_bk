
import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
export default function Headers() {
  return (
    <div>
    <Navbar bg="dark" data-bs-theme="dark">
    <Container>
      <Navbar.Brand href="#">CRUD OPERATIONS</Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link href="/">home</Nav.Link>        
      </Nav>
    </Container>
  </Navbar>
    </div>
  )
}
