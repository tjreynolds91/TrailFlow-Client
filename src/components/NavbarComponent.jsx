import React, { useState } from "react";
import LoginModal from "./LoginModal";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  Button,
} from "reactstrap";

const NavbarComponent = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  return (
    <Navbar light expand="md" className="nav-fill w-100 navbar">
      <NavbarBrand href="/" className="ml-auto" style={{ zIndex: "2" }}>
        TrailFlow
      </NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="ml-auto" navbar>
          {props.token ? (
            <Button onClick={props.clearToken}>Logout</Button>
          ) : (
            <LoginModal updateToken={props.updateToken} />
          )}
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default NavbarComponent;
