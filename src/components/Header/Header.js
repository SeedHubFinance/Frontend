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
          <Navbar collapseOnSelect expand="lg">
            <Navbar.Brand className="logo fs-3 me-auto">
              <Link to="/">Fixed Swap</Link>
            </Navbar.Brand>
            <Navbar.Toggle
              aria-controls="responsive-navbar-nav"
              className="order-lg-1 order-2 ms-3"
            />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="ms-md-auto">
                <Nav.Link href="#application">Application</Nav.Link>
                <Nav.Link href="#store">Store</Nav.Link>
                <Nav.Link href="#earning">Earning</Nav.Link>
                <Nav.Link href="#statistics">Statistics</Nav.Link>
              </Nav>
            </Navbar.Collapse>
            <ConnectedButton className="order-lg-2 order-1" />
          </Navbar>
        </div>
      </div>
    </Fragment>
  );
};

export default Header;
