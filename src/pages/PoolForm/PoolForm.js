import React, {
  Fragment,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";
import { Row, Col, Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { ProgressBar } from "react-bootstrap";
import {
  fixedSwapABI,
  fixedSwapContractAddress,
} from "../../contracts/FixedSwap";
import coinABI from "../../contracts/ERC20ABI";
import { Web3Context } from "../../context/web3Context";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Countdown from "react-countdown";
import { ReactComponent as MaxIcon } from "../../Assets/Images/max.svg";
import "./PoolForm.scss";

// Countdown Timer
// const Completionist = () => <span>0 d : 0 h : 0 m : 0 s</span>;
const renderer = ({ days, hours, minutes, seconds, completed }) => {
  if (completed) {
    return <></>;
  }
  // Render a countdown
  return (
    <span>
      <span className="mx-2">{days} d</span>:
      <span className="mx-2">{hours} h</span>:
      <span className="mx-2">{minutes} m</span>:
      <span className="mx-2">{seconds} s</span>
    </span>
  );
};

// const renderer2 = ({ days, hours, minutes, seconds }) => {
//   console.lo
//   // Render a countdown
//   return (
//     <span>
//       <span className="mx-2">{days} d</span>:
//       <span className="mx-2">{hours} h</span>:
//       <span className="mx-2">{minutes} m</span>:
//       <span className="mx-2">{seconds} s</span>
//     </span>
//   );
// };

const Fixedswap = (props) => {
  const [web3, setWeb3] = useContext(Web3Context);
  const [address, setAddress] = useState("");
  const [error, setError] = useState(null);
  const [tokenSymbol, setTokenSymbol] = useState(null);
  const [tokenDecimals, setTokenDecimals] = useState(0);
  const [isClosed, setIsClosed] = useState(false);
  const [isExpired, setIsExpired] = useState(false);
  const [amount, setAmount] = useState();
  const [bidPrice, setPriceAmount] = useState(0);
  const [isWeb3Connected, setWeb3Status] = useState(false);
  const location = useLocation();

  // const statusRef = useRef("");
  // useEffect(() => {
  //   const date = new Date(location.state.endAuctionAt * 1000);
  //   date < new Date()
  //     ? (statusRef.current.innerText = "Closed")
  //     : (statusRef.current.innerText = "Live");
  // }, []);
  // const date = new Date(location.state.endAuctionAt * 1000);
  // const statusObj =
  //   date < new Date()
  //     ? { status: "Closed", isClosed: true }
  //     : { status: "Live", isClosed: false };
  const getSymbol = async () => {
    if (web3?.eth) {
      const tokenContract = new web3.eth.Contract(
        coinABI,
        location.state.sellToken
      );
      await tokenContract.methods
        .symbol()
        .call()
        .then((e) => setTokenSymbol(e))
        .catch((e) => setError(e.message));
    }
  };

  const getDecimals = async () => {
    if (web3?.eth) {
      const tokenContract = new web3.eth.Contract(
        coinABI,
        location.state.sellToken
      );
      await tokenContract.methods
        .decimals()
        .call()
        .then((e) => setTokenDecimals(e))
        .catch((e) => setError(e.message));
    }
  };

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

  // useEffect(() => {
  //   setIsClosed(false);
  // }, [isClosed]);

  useEffect(() => {
    getUserWalletAddress();
    getSymbol();
    getDecimals();
    const date = new Date(location.state.endAuctionAt * 1000);
    if (date < new Date()) {
      setIsClosed(true);
    }
    const claimDate = new Date(location.state.claimAuctionFundsAt * 1000);
    if (claimDate < new Date()) {
      setIsExpired(true);
    }
  }, [web3, address]);

  function toFixed(x) {
    if (Math.abs(x) < 1.0) {
      var e = parseInt(x.toString().split("e-")[1]);
      if (e) {
        x *= Math.pow(10, e - 1);
        x = "0." + new Array(e).join("0") + x.toString().substring(2);
      }
    } else {
      var e = parseInt(x.toString().split("+")[1]);
      if (e > 20) {
        e -= 20;
        x /= Math.pow(10, e);
        x += new Array(e + 1).join("0");
      }
    }
    return x;
  }

  const handleClick = async (e) => {
    e.preventDefault();
    const contract = new web3.eth.Contract(
      fixedSwapABI,
      fixedSwapContractAddress
    );
    console.log(amount * 10 ** tokenDecimals + "");

    let amountString = toFixed(amount * 10 ** tokenDecimals).toString();

    if (amountString.indexOf(".") !== -1) {
      let index = amountString.indexOf(".");
      amountString = Math.ceil(
        toFixed(amount * 10 ** tokenDecimals)
      ).toString();
    }

    await contract.methods
      .addBid(location.state.index, amountString)
      .send({
        from: address,
        value: web3.utils.toWei(bidPrice),
      })
      .then(() => alert("Bid added Successfully!!"))
      .catch(() => alert("Something went wrong"));
  };

  const calculatePrice = async (amount) => {
    const contract = new web3.eth.Contract(
      fixedSwapABI,
      fixedSwapContractAddress
    );

    if (amount !== "") {
      console.log(amount, location.state.swapRatio);
      setAmount(amount);
      const price = await contract.methods
        .calculatePrice(amount, location.state.swapRatio)
        .call();
      setPriceAmount(web3.utils.fromWei(price));
    }
  };

  const calculateAmountFromPrice = (price) => {
    setAmount(location.state.swapRatio * price);
    setPriceAmount(price);
  };

  const handleClaim = async (e) => {
    e.preventDefault();
    const contract = new web3.eth.Contract(
      fixedSwapABI,
      fixedSwapContractAddress
    );
    await contract.methods();
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
                  SeedHub
                  <div className="title">{location.state.name}</div>
                  <div className="token-code text-break">
                    {location?.state?.sellToken}
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col md={6} lg={5}>
                <div className="leftcol">
                  <div className="card-head mb-4 d-flex flex-column">
                    <span>
                      <div
                        className={`${isClosed ? "dotClose" : "dotLive"} me-2`}
                      />
                      <div className={isClosed && "closed"}>
                        {isClosed ? "Closed" : "Live"}
                      </div>
                    </span>
                    <p>
                      <span>Participants</span>
                      <p>
                        {location.state.isOnlyWhiteList
                          ? "WhiteList "
                          : "Public "}
                        {location.state.isOnlySeed
                          ? "and for seed Holders"
                          : "Only"}
                      </p>
                    </p>
                  </div>
                  <p>Fixed Swap Ratio</p>
                  <h3>
                    1 ETH = {location.state.swapRatio} {tokenSymbol}
                  </h3>
                  <div className="divder"></div>
                  <div className="row">
                    <div className="col">
                      <p className="mb-3">Maximum Allocation per wallet</p>
                      <h3>
                        {web3.utils.fromWei(location.state.maxAmountPerWallet)}{" "}
                        ETH
                      </h3>
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
              {!isClosed ? (
                <Col
                  md={6}
                  lg={5}
                  className="offset-lg-2 mt-4 mt-md-0 p-4 p-md-5 bg-off"
                >
                  <div className="form-heading text-center mb-4">
                    Join The Pool
                  </div>
                  <div className="text-center fs-6">
                    <Countdown
                      key={0}
                      date={new Date(location.state.endAuctionAt * 1000)}
                      renderer={renderer}
                      onComplete={() => {
                        setIsClosed(true);
                      }}
                    />
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
                      onChange={(e) => calculateAmountFromPrice(e.target.value)}
                    />
                    <input
                      className="custom-input ms-3"
                      disabled
                      type="number"
                      required
                      type="number"
                      name="amount"
                      placeholder="Bid Amount"
                      value={amount}
                    />
                  </div>
                  <Button
                    onClick={handleClick}
                    disabled={amount > 0 && isWeb3Connected ? false : true}
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
              ) : (
                <Col
                  md={6}
                  lg={5}
                  className="offset-lg-2 mt-4 mt-md-0 p-4 p-md-5 bg-off"
                >
                  <>
                    <div className="form-heading text-center mb-4">
                      Claim For Pool
                    </div>
                    <div className="text-center fs-6">
                      <Countdown
                        key={1}
                        date={
                          new Date(location.state.claimAuctionFundsAt * 1000)
                        }
                        renderer={renderer}
                        onComplete={() => {
                          setIsExpired(true);
                        }}
                      />
                      <Button
                        disabled={!isExpired}
                        className="sub-btn mt-3"
                        onClick={handleClaim}
                      >
                        Claim Funds
                      </Button>
                    </div>
                  </>
                </Col>
              )}
            </Row>
          </form>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default Fixedswap;
