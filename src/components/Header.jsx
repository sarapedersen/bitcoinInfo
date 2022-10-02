import React from 'react'
import { Navbar, Container, NavbarBrand } from 'react-bootstrap'

function Header() {
  return (
    <div>
        <Navbar bg="dark" variant="dark">
        <Container>
          <NavbarBrand d-flex>
            <img src="/logo.svg" width="80" height="80" className="d-inline-block align-top" alt="bitcoin logo"/>
            <h1>Bitcoin information</h1>
          </NavbarBrand>
        </Container>
        </Navbar>
    </div>
  )
}

export default Header