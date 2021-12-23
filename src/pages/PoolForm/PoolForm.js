import React, { Fragment } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { ProgressBar } from "react-bootstrap";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { ReactComponent as MaxIcon } from "../../Assets/Images/max.svg";
import "./PoolForm.scss";

const poolOptions = [
  { value: "swap", label: "ETH" },
  { value: "sealed", label: "Sealed-Bid Auction" },
  { value: "dutch", label: "Dutch Auction" },
];

const Fixedswap = () => {
  return (
    <Fragment>
      <Header />
      <div className="pool-form">
        <div className="pool-form-container">
          <form>
            <Row className="g-0 mb-5">
              <Col>
                <div className="form-header">
                  Fixed-Swap
                  <div className="title">NEF Inu</div>
                  <div className="d-flex justify-content-center align-items-center">
                    <p>Contract Address:</p>
                    <p className="ms-3">
                      0x7a31504980cfBda4A744c66113Ff9c3A15112EbB
                    </p>
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col md={5}>
                <div className="leftcol">
                  <div className="card-head mb-4 d-flex flex-column">
                    <span>
                      <div className="dot me-2"></div> Live
                    </span>
                    <p>Participant: Public</p>
                  </div>
                  <p>Fixed Swap Ratio</p>
                  <h3>1 ETH = 10000 NFTD</h3>
                  <div className="divder"></div>
                  <div className="row">
                    <div className="col-md-6 pe-md-4">
                      <p className="mb-3">Price,$</p>
                      <h3>0.395223</h3>
                      <div className="divder"></div>
                    </div>
                    <div className="col-md-6 ps-md-4">
                      <p className="mb-3">Maximum Allocation per wallet</p>
                      <h3>No limit</h3>
                      <div className="divder"></div>
                    </div>
                  </div>
                  <div className="d-flex flex-column">
                    <div className="d-flex justify-content-center">
                      <p className="me-2">Auction progress: 0 ETH</p>
                      <p> / 303 ETH</p>
                    </div>
                    <ProgressBar now={60} />
                  </div>
                </div>
              </Col>
              <Col md={5} className="offset-md-2 p-5 bg-off">
                <div className="form-heading text-center mb-4">
                  Join The Pool
                </div>
                <p className="text-center fs-6">Countdown Timer</p>
                <div className="divder"></div>
                <div className="d-flex justify-content-between">
                  <span className="label">Amount</span>
                  <span className="label">Balance: 0 ETH</span>
                </div>
                <div className="position-relative">
                  <input
                    className="custom-input"
                    required
                    name="amount"
                    placeholder="Bid Amount"
                    value=""
                  />
                  <MaxIcon className="max-icon" />
                </div>
                <Button className="sub-btn disable mt-5 mb-3">GO</Button>
                <p
                  style={{
                    color: "red",
                    marginTop: "5px",
                    textAlign: "center",
                    fontSize: "14px",
                  }}
                >
                  warning: SeedHub does not support deflationary tokens
                </p>
              </Col>
            </Row>
          </form>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default Fixedswap;
