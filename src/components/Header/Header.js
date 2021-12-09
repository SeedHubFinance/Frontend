import React, { Fragment } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import ConnectedButton from "../ConnectButton/ConnectButton";
import "./Header.scss";

const Header = () => {
  return (
    <Fragment>
      <div className="header">
        <div className="header-wrapper mx-auto">
          <Navbar collapseOnSelect expand="md">
            <Navbar.Brand className="logo fs-3">
              <Link to="/">Fixed Swap</Link>
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
