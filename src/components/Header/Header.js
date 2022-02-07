import React, { Fragment } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import Logo from "../../Assets/Images/logo.png";
import ConnectedButton from "../ConnectButton/ConnectButton";
import { ToastContainer } from "react-toastify";
import "./Header.scss";

const Header = () => {
  return (
    <Fragment>
      <ToastContainer />

      <div className="header">
        <div className="header-wrapper mx-auto">
          <Navbar collapseOnSelect expand="lg">
            <Navbar.Brand className="logo fs-3 me-auto">
              <Link to="/">
                <img src={Logo} className="logoimg" width="150px" />
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle
              aria-controls="responsive-navbar-nav"
              className="order-lg-1 order-2 ms-0 ms-sm-3"
            />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="ms-md-auto">
                <Nav.Link href="https://seedhub.network/">HOME PAGE</Nav.Link>
                <Nav.Link href="https://github.com/SeedHubNetwork/Documents">
                  LIGHTPAPER
                </Nav.Link>
                <Nav.Link href="https://seedhub.network/#products">
                  PRODUCTS
                </Nav.Link>
                <Nav.Link href="https://seedhub.network/#contact">
                  CONTACT
                </Nav.Link>
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
