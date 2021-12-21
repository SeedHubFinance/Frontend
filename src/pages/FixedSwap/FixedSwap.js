import React, { useState, useContext, Fragment } from "react";
import { Row, Col, Button } from "react-bootstrap";
import Header from "../../components/Header/Header";
import Select from "react-select";
import Footer from "../../components/Footer/Footer";
import { ReactComponent as MaxIcon } from "../../Assets/Images/max.svg";
import "react-calendar/dist/Calendar.css";

import "./FixedSwap.scss";

import Calendar from "react-calendar";
import { Web3Context } from "../../context/web3Context";

import coinABI from "../../contracts/ERC20ABI";

const poolOptions = [
  { value: "eth", label: "ETH" },
  { value: "usdt", label: "USDT" },
  { value: "avax", label: "AVAX" },
];

const Fixedswap = (props) => {
  const [tokenAddress, setTokenAddress] = useState(null);
  const [tokenName, setTokenName] = useState("");
  const [swapRation, setSwapRatio] = useState(null);
  const [walletBalance, setWalletBalance] = useState(null);
  const [maxAmountPerWallet, setMaxAmountPerWallet] = useState(null);
  const [isOnlySeeHolder, setIsOnlySeedHolder] = useState(false);
  const [isOnlyPrivate, setisOnlyPrivate] = useState(false);
  const [isPublic, setIsPublic] = useState(true);
  const [poolName, setPoolName] = useState("");
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [claimTime, setClaimTime] = useState(0);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [claimDate, setClaimDate] = useState(new Date());

  const [currency, setSelectedCurreny] = useState({
    value: "eth",
    label: "ETH",
  });

  const [isFromValid, setIsFromValid] = useState(false);

  const [web3, setWeb3] = useContext(Web3Context);
  const [address, setAddress] = useState(Web3Context);

  const getTimeStampsForDates = (date) => {
    return new Date(date).getTime() / 1000;
  };

  const tokenAddressValidation = (address) => {
    if (address.length != 42) {
      return false;
    }

    // if (address.splice(0, 1) == "0x") return false;

    return true;
  };

  const getTokenName = async (address) => {
    let coinContract = new web3.eth.Contract(coinABI, tokenAddress);

    return await coinContract.methods.name().call();
  };

  const checkIfFromIsValid = () => {};

  const setToken = async (address) => {
    console.log(address);
    if (tokenAddressValidation(address)) {
      setTokenAddress(address);
      let name = await getTokenName(address);
      console.log(name);
      setTokenName(name);
    }
  };

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
                  defaultValue=""
                  onChange={(e) => setToken(e.target.value)}
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
                      defaultValue={tokenName}
                    />
                  </div>
                  <div className="to-select">
                    <span className="label">To</span>
                    <Select
                      options={poolOptions}
                      defaultValue={poolOptions[0]}
                      onChange={(e) => {
                        setSelectedCurreny(e);
                      }}
                    />
                  </div>
                </div>
                <div className="d-flex align-items-end my-5">
                  <div className="me-2">
                    <span className="label mb-2">Swap Ratio</span>
                    <h5>1 {currency.label} =</h5>
                  </div>

                  <input
                    className="custom-input"
                    required
                    name="swapratio"
                    defaultValue=""
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
                    defaultValue=""
                  />
                  <MaxIcon className="max-icon" />
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
                          defaultValue="No limits"
                        />
                        No limits
                      </label>
                      <label>
                        <input
                          className="me-2"
                          required
                          name="eth"
                          type="radio"
                          defaultValue="No limits"
                        />
                        {currency.label}
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
                      defaultValue=""
                    />
                  </div>
                  <h5>{currency.label}</h5>
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
                          defaultValue="No limits"
                        />
                        Seed holders
                      </label>
                      <label className="me-5">
                        <input
                          className="me-2"
                          required
                          name="public"
                          type="radio"
                          defaultValue="No limits"
                        />
                        Public
                      </label>
                      <label>
                        <input
                          className="me-2"
                          required
                          name="private"
                          type="radio"
                          defaultValue="No limits"
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
                      defaultValue=""
                    />
                  </div>
                </div>
                <div className="divder"></div>
                <span className="label">Pool Name</span>
                <input
                  className="custom-input"
                  required
                  name="poolname"
                  defaultValue=""
                />

                <span className="label my-4">Pool Start Time</span>
                <div>
                  <Calendar onChange={setStartDate} value={startDate} />
                </div>
                <span className="label my-4">Pool Ending Time</span>
                <div className="d-flex align-items-center justify-content-between">
                  <Calendar onChange={setEndDate} value={endDate} />
                </div>
                <span className="label my-4">Claim Funds At</span>
                <div className="d-flex align-items-center justify-content-between">
                  <Calendar onChange={setClaimDate} value={claimDate} />
                </div>
                <span className="label my-4">Transaction Fee</span>
                <Button
                  className="sub-btn"
                  onClick={() => {
                    getTokenName();
                  }}
                >
                  Launch
                </Button>
                <p
                  style={{
                    color: "red",
                    marginTop: "5px",
                    textAlign: "center",
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
