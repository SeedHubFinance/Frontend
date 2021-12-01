import React, { Fragment } from "react";
import { Navbar, Nav } from "react-bootstrap";
import ConnectedButton from "../ConnectButton/ConnectButton";
import "./Header.scss";

const Header = () => {
  return (
    <Fragment>
      <div className="header">
        <div className="header-wrapper mx-auto">
          <Navbar collapseOnSelect expand="md">
            <Navbar.Brand href="#home" className="fs-3">
              Fixed Swap
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-md-auto">
                <Nav.Link href="#application">Application</Nav.Link>
                <Nav.Link href="#store">Store</Nav.Link>
                <Nav.Link href="#earning">Earning</Nav.Link>
                <Nav.Link href="#statistics">Statistics</Nav.Link>
              </Nav>
            </Navbar.Collapse>
            <ConnectedButton />
          </Navbar>
        </div>
      </div>
    </Fragment>
  );
};

export default Header;
