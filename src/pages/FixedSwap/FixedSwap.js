import React, { Fragment } from "react";
import { Row, Col, Button } from "react-bootstrap";
import Header from "../../components/Header/Header";
import Select from "react-select";
import Footer from "../../components/Footer/Footer";
import { ReactComponent as MaxIcon } from "../../Assets/Images/max.svg";
import "./FixedSwap.scss";

const poolOptions = [
  { value: "swap", label: "ETH" },
  { value: "sealed", label: "Sealed-Bid Auction" },
  { value: "dutch", label: "Dutch Auction" },
];

const Fixedswap = () => {
  return (
    <Fragment>
      <Header />
      <div className="fixed-swap-pool">
        <div className="fixed-swap-form-container">
          <form>
            <Row className="g-0">
              <Col>
                <div className="form-header">
                  Initial Token Offering
                  <div className="title">
                    Create a Fixed-swap Pool
                    <Button href="">How to Create a pool</Button>
                  </div>
                </div>
              </Col>
            </Row>
            <Row className="my-5 g-0">
              <Col md={7}>
                <div className="form-heading">Contract information</div>
              </Col>
              <Col md={5}>
                <span className="label">Token Contract address</span>
                <input
                  className="custom-input"
                  required
                  name="address"
                  value=""
                />
              </Col>
            </Row>
            <div className="divder"></div>
            <Row>
              <Col md={7}>
                <div className="form-heading">Pool settings</div>
              </Col>
              <Col md={5}>
                <div className="d-flex align-items-center justify-content-between">
                  <div className="">
                    <span className="label">From</span>
                    <input
                      className="custom-input"
                      required
                      name="from"
                      value=""
                    />
                  </div>
                  <div className="to-select">
                    <span className="label">To</span>
                    <Select
                      options={poolOptions}
                      defaultValue={poolOptions[0]}
                    />
                  </div>
                </div>
                <div className="d-flex align-items-end my-5">
                  <div className="me-2">
                    <span className="label mb-2">Swap Ratio</span>
                    <h5>1 ETH =</h5>
                  </div>

                  <input
                    className="custom-input"
                    required
                    name="swapratio"
                    value=""
                  />
                </div>
                <div className="d-flex justify-content-between">
                  <span className="label">Amount</span>
                  <span className="label">Balance --</span>
                </div>
                <div className="position-relative">
                  <input
                    className="custom-input"
                    required
                    name="amount"
                    value=""
                  />
                  <MaxIcon className="max-icon" />
                </div>
                <div className="d-flex align-items-end my-4">
                  <div className="wka me-2">
                    <span className="label">Bounce Level</span>
                    <input
                      className="custom-input"
                      required
                      name="bouncelevel"
                      value=""
                    />
                  </div>
                  <h5>ETH</h5>
                </div>
                <div className="d-flex align-items-end my-4">
                  <div className="me-2">
                    <span className="label mb-3">
                      Maximum Allocation per Wallet
                    </span>
                    <div className="d-flex">
                      <label className="me-5">
                        <input
                          className="me-2"
                          required
                          name="nolimit"
                          type="radio"
                          value="No limits"
                        />
                        No limits
                      </label>
                      <label>
                        <input
                          className="me-2"
                          required
                          name="eth"
                          type="radio"
                          value="No limits"
                        />
                        ETH
                      </label>
                    </div>
                  </div>
                </div>

                <div className="d-flex align-items-end my-4">
                  <div className="wka me-2">
                    <span className="label">Allocation</span>
                    <input
                      className="custom-input"
                      required
                      name="allocation"
                      value=""
                    />
                  </div>
                  <h5>ETH</h5>
                </div>
                <div className="divder"></div>
                <div className="d-flex align-items-end my-4">
                  <div className="me-2">
                    <span className="label mb-3">Participant</span>
                    <div className="d-flex">
                      <label className="me-5">
                        <input
                          className="me-2"
                          required
                          name="botholder"
                          type="radio"
                          value="No limits"
                        />
                        BOT holders
                      </label>
                      <label className="me-5">
                        <input
                          className="me-2"
                          required
                          name="public"
                          type="radio"
                          value="No limits"
                        />
                        Public
                      </label>
                      <label>
                        <input
                          className="me-2"
                          required
                          name="private"
                          type="radio"
                          value="No limits"
                        />
                        Private
                      </label>
                    </div>
                  </div>
                </div>
                <div className="d-flex align-items-end my-4">
                  <div className="wka me-2">
                    <span className="label">Password</span>
                    <input
                      className="custom-input"
                      type="password"
                      required
                      name="password"
                      value=""
                    />
                  </div>
                </div>
                <div className="divder"></div>
                <span className="label">Pool Name</span>
                <input
                  className="custom-input"
                  required
                  name="poolname"
                  value=""
                />
                <span className="label my-4">Pool running time</span>
                <div className="d-flex align-items-center justify-content-between">
                  <div className="">
                    <span className="label">Days</span>
                    <input
                      className="custom-input"
                      required
                      name="days"
                      value=""
                    />
                  </div>
                  <div className="mx-4">
                    <span className="label">Hours</span>
                    <input
                      className="custom-input"
                      required
                      name="hours"
                      value=""
                    />
                  </div>
                  <div className="">
                    <span className="label">Minutes</span>
                    <input
                      className="custom-input"
                      required
                      name="minutes"
                      value=""
                    />
                  </div>
                </div>
                <span className="label my-4">Transaction Fee</span>
                <Button className="sub-btn disable">Launch</Button>
                <p
                  style={{
                    color: "red",
                    marginTop: "5px",
                    textAlign: "center",
                  }}
                >
                  warning: Bounce does not support deflationary tokens
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
