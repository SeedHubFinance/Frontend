import React, { Fragment, useContext, useState, useEffect } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { ProgressBar } from "react-bootstrap";
import {
  fixedSwapABI,
  fixedSwapContractAddress,
} from "../../contracts/FixedSwap";
import { Web3Context } from "../../context/web3Context";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Countdown from "react-countdown";
import { ReactComponent as MaxIcon } from "../../Assets/Images/max.svg";
import "./PoolForm.scss";

// Countdown Timer
const Completionist = () => <span>0 d : 0 h : 0 m : 0 s</span>;
const renderer = ({ days, hours, minutes, seconds, completed }) => {
  if (completed) {
    // Render a complete state
    return <Completionist />;
  } else {
    // Render a countdown
    return (
      <span>
        <span className="mx-2">{days} d</span>:
        <span className="mx-2">{hours} h</span>:
        <span className="mx-2">{minutes} m</span>:
        <span className="mx-2">{seconds} s</span>
      </span>
    );
  }
};

const Fixedswap = (props) => {
  const [web3, setWeb3] = useContext(Web3Context);
  const [address, setAddress] = useState("");

  const [price, setPrice] = useState(null);
  const [error, setError] = useState(null);
  const [amount, setAmount] = useState();
  const location = useLocation();

  const [bidAmount, setBidAmount] = useState(null);

  const [isWeb3Connected, setWeb3Status] = useState(false);

  const getUserWalletAddress = async () => {
    if (web3) {
      let addressArray = await web3?.eth.getAccounts();
      setAddress(addressArray[0]);
      setWeb3Status(true);
    } else {
      alert("Please Connect Wallet");
      setWeb3Status(false);
    }
  };

  useEffect(() => {
    getUserWalletAddress();
  }, [web3, address]);

  const handleClick = async (e) => {
    e.preventDefault();
    const contract = new web3.eth.Contract(
      fixedSwapABI,
      fixedSwapContractAddress
    );
    await contract.methods.addBid(location.state.index, amount).send({
      from: address,
      value: await contract.methods
        .calculatePrice(amount, location.state.swapRatio)
        .call(),
    });
  };

  return (
    <Fragment>
      <Header />
      <div className="pool-form">
        <div className="pool-form-container">
          <form>
            <Row className="g-0 mb-5">
              <Col>
                <div className="form-header">
                  Seed Hub
                  <div className="title">NEF Inu</div>
                  <div className="token-code">{location?.state?.sellToken}</div>
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
                  <h3>
                    1 ETH = {location.state.swapRatio} {location.state.name}
                  </h3>
                  <div className="divder"></div>
                  <div className="row">
                    <div className="col-md-6 pe-md-4">
                      <p className="mb-3">Price,$</p>
                      <h3>{price}</h3>
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
                <div className="text-center fs-6">
                  <Countdown date={Date.now() + 150000} renderer={renderer} />
                </div>
                <div className="divder"></div>
                <div className="d-flex justify-content-between">
                  <span className="label">Amount</span>
                  <span className="label">Balance: 0 ETH</span>
                </div>
                <div className="d-flex">
                  <input
                    className="custom-input me-3"
                    type="number"
                    required
                    type="number"
                    name="amount"
                    placeholder="Bid Price"
                    onChange={(e) => setAmount(e.target.value)}
                  />
                  <input
                    className="custom-input ms-3"
                    disabled
                    type="number"
                    required
                    type="number"
                    name="amount"
                    placeholder="Bid Amount"
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
                <Button
                  onClick={handleClick}
                  disabled={amount > 0 ? false : true}
                  className="sub-btn mt-3"
                >
                  GO
                </Button>
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
