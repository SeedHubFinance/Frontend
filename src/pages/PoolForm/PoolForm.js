import React, {
  Fragment,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";
import { Row, Col, Button } from "react-bootstrap";
import { useLocation, useParams } from "react-router-dom";
import { ProgressBar } from "react-bootstrap";
import { fixedSwapABI } from "../../contracts/FixedSwap";
import coinABI from "../../contracts/ERC20ABI";
import {
  approveTokenTransafer,
  getPoolById,
  determineContractAddress,
  getUsdtBalance,
} from "../../utils/callContract";
import { Web3Context } from "../../context/web3Context";
import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Countdown from "react-countdown";
import { toast, ToastContainer } from "react-toastify";
import { usdtAddBid } from "../../utils/callContract";
import { ReactComponent as MaxIcon } from "../../Assets/Images/max.svg";
import "./PoolForm.scss";
import { poll } from "@usedapp/core/node_modules/ethers/lib/utils";



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
  const params = useParams();
  const [web3, setWeb3] = useContext(Web3Context);
  const [address, setAddress] = useState("");
  const [error, setError] = useState(null);
  const [tokenSymbol, setTokenSymbol] = useState(null);
  const [tokenDecimals, setTokenDecimals] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [isClosed, setIsClosed] = useState(false);
  const [isExpired, setIsExpired] = useState(false);
  const [currentBalance, setCurrentBalance] = useState("");
  const [amount, setAmount] = useState();
  const [bidPrice, setPriceAmount] = useState(0);
  const [isWeb3Connected, setWeb3Status] = useState(false);
  const [pool, setPool] = useState();
  const [isApproved, setIsApproved] = useState(false);
  const [network, setNetwork] = useState();

  const [fixedSwapContractAddress, setFixedSwapContractAddress] = useState("");

  // const statusRef = useRef("");
  // useEffect(() => {
  //   const date = new Date(pool.endAuctionAt * 1000);
  //   date < new Date()
  //     ? (statusRef.current.innerText = "Closed")
  //     : (statusRef.current.innerText = "Live");
  // }, []);
  // const date = new Date(pool.endAuctionAt * 1000);
  // const statusObj =
  //   date < new Date()
  //     ? { status: "Closed", isClosed: true }
  //     : { status: "Live", isClosed: false };
  const getSymbol = async () => {
    if (web3?.eth) {
      const tokenContract = new web3.eth.Contract(coinABI, pool.sellToken);
      await tokenContract.methods
        .symbol()
        .call()
        .then((e) => setTokenSymbol(e))
        .catch((e) => setError(e.message));
    }
  };

  const getDecimals = async () => {
    if (web3?.eth) {
      const tokenContract = new web3.eth.Contract(coinABI, pool.sellToken);
      await tokenContract.methods
        .decimals()
        .call()
        .then((e) => setTokenDecimals(e))
        .catch((e) => setError(e.message));
    }
  };

  const getUserWalletAddress = async () => {
    let addressArray = await web3?.eth.getAccounts();
    setAddress(addressArray[0]);
    setWeb3Status(true);
  };

  const getTokenBalance = async () => {
    if (web3) {
      if (address) {
        if (!pool.isUSDT) {
          await web3.eth
            .getBalance(address)
            .then((e) => setCurrentBalance(web3.utils.fromWei(e)));
          const response = await determineContractAddress(web3);
          setNetwork(response.net);
          return;
        }
        await getUsdtBalance(address, web3).then((e) =>
          setCurrentBalance(e / 10 ** 6)
        );
        const response = await determineContractAddress(web3);
        console.log(response.net);
        setNetwork(response.net);

        // let coinContract = new web3.eth.Contract(
        //   coinABI,
        //   pool.sellToken
        // );
        // coinContract.methods
        //   .balanceOf(address)
        //   .call()
        //   .then((e) => {
        //     console.log("Hello");
        //     setCurrentBalance(e);
        //   })
        //   .catch((e) => setError(e.message));
      }
    }
  };

  const getContractAddress = async () => {
    if (web3) {
      determineContractAddress(web3).then((e) => {
        if (!e) return toast.error("Connect to correct network");
        setFixedSwapContractAddress(e["address"]);
      });
    }
  };

  useEffect(() => {
    if (!pool) return;
    const endAuctionDate = new Date(pool.endAuctionAt * 1000);
    const claimDate = new Date(pool.claimAuctionFundsAt * 1000);
    const startDate = new Date(pool.startAuctionAt * 1000);
    if (startDate < new Date()) {
      setIsStarted(true);
    }
    if (endAuctionDate < new Date()) {
      setIsClosed(true);
    }
    if (claimDate < new Date()) {
      setIsExpired(true);
    }
    getContractAddress();
    getSymbol();
    getDecimals();
    getTokenBalance();
  }, [pool]);

  useEffect(() => {
    if (!web3) {
      toast.warning("Please Connect Wallet");
      setWeb3Status(false);
      return;
    }
    getUserWalletAddress();
    getPoolById(params.id, web3)
      .then((e) => setPool(e))
      .catch(console.log);
  }, [web3]);

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
    console.log(pool?.isUSDT);
    if (pool?.isUSDT) {
      let bidString = toFixed(bidPrice * 10 ** 6).toString();
      if (bidString.indexOf(".") !== -1) {
        let index = bidString.indexOf(".");
        bidString = Math.ceil(
          toFixed(bidPrice * 10 ** tokenDecimals)
        ).toString();
      }
      console.log("bid string", bidString);
      toast.info("Wait for approval success");
      await approveTokenTransafer(bidString, address, web3, toFixed)
        .then((e) => {
          toast.success("Approved");
          setIsApproved(true);
        })
        .catch(setIsApproved(false));
      let amountString = toFixed(amount * 10 ** 6).toString();

      if (amountString.indexOf(".") !== -1) {
        let index = amountString.indexOf(".");
        amountString = Math.ceil(
          toFixed(amount * 10 ** tokenDecimals)
        ).toString();
      }
      try {
        await usdtAddBid(web3, params.id, amountString, bidString, address);
        toast.success("Added bid");
      } catch (e) {
        console.log(e.message);
      }
      return;
    }
    console.log("Hello");
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
      .addBid(params.id, amountString)
      .send({
        from: address,
        value: web3.utils.toWei(bidPrice),
      })
      .then(() => alert("Bid added Successfully!!"))
      .catch(() => alert("Something went wrong"));
  };

  const calculateAmount = async (price) => {
    const contract_address = await determineContractAddress(web3);
    const contract = new web3.eth.Contract(
      fixedSwapABI,
      contract_address.address
    );
    if (price !== "") {
      const priceContract = pool?.isUSDT
        ? price * 10 ** 6
        : web3.utils.toWei(price);
      console.log(price);
      console.log(priceContract, pool.swapRatio, tokenDecimals);
      const Calamount = await contract.methods
        .calculateAmount(priceContract, pool.swapRatio, tokenDecimals)
        .call();
      pool?.isUSDT
        ? setAmount(Calamount / 10 ** 6)
        : setAmount(web3.utils.fromWei(Calamount));
    }
  };

  const calculateAmountFromPrice = (price) => {
    setPriceAmount(price);
    calculateAmount(price);
  };

  const handleClaim = async (e) => {
    e.preventDefault();
    const contract_address = await determineContractAddress(web3);
    const contract = new web3.eth.Contract(
      fixedSwapABI,
      contract_address.address
    );
    await contract.methods
      .userWithDrawFunction(params.id)
      .send({
        from: address,
      })
      .then(() => alert("Claim Successfully!!"))
      .catch((e) => alert("Something went wrong", e));
  };
  return (
    <Fragment>
      <Header />
      <ToastContainer />
      <div className="pool-form">
        <div className="pool-form-container">
        <Link to="/" className="me-2">
            <Button className="ca">Back</Button>
          </Link>
           <form>
            <Row className="g-0 mb-5">
              <Col>
                <div className="form-header">
                  SeedHub
                  <div className="title">{pool?.name}</div>
                  <div className="token-code text-break">
                    <span>Contract Address: </span>
                    {pool?.sellToken}
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
                        {console.log(pool)}
                        {pool?.enableWhiteList ? "WhiteList " : "Public "}
                        {pool?.onlySeedHolders ? "and for seed Holders" : ""}
                      </p>
                    </p>
                  </div>
                  <p>Fixed Swap Ratio</p>
                  <h3>
                    {console.log("nettwoeawjed", network)}1{" "}
                    {network === 4
                      ? pool?.isUSDT
                        ? "USDT"
                        : "ETH"
                      : pool?.isUSDT
                      ? "USDT"
                      : "AVAX"}{" "}
                    = {pool?.swapRatio} {tokenSymbol}
                  </h3>
                  <div className="divder"></div>
                  <div className="row">
                    <div className="col">
                      <p className="mb-3">Maximum Allocation per wallet</p>
                      <h3 className="text-break">
                        {pool?.maxAmountPerWallet ? (
                          web3?.utils.fromWei(
                            pool.maxAmountPerWallet.toString()
                          ) === "100000000000000000000000000" ? (
                            "No Limit"
                          ) : (
                            web3?.utils.fromWei(
                              pool.maxAmountPerWallet.toString()
                            )
                          )
                        ) : (
                          <></>
                        )}
                        {pool?.maxAmountPerWallet ? (
                          web3?.utils.fromWei(
                            pool.maxAmountPerWallet.toString()
                          ) === "100000000000000000000000000" ? (
                            <></>
                          ) : network === 4 ? (
                            pool?.isUSDT ? (
                              " USDT"
                            ) : (
                              " ETH"
                            )
                          ) : pool?.isUSDT ? (
                            " USDT"
                          ) : (
                            " AVAX"
                          )
                        ) : (
                          <></>
                        )}

                        {/* {console.log(pool?.maxAmountPerWallet)} */}
                        {/* {pool &&
                        web3?.utils.fromWei(
                          pool?.maxAmountPerWallet.toString()
                        ) === "100000000000000000000000000"
                          ? "No Limit"
                          : web3?.utils.toWei(
                              pool?.maxAmountPerWallet.toString()
                            )} */}
                      </h3>
                      <div className="divder"></div>
                    </div>
                  </div>
                  <div className="d-none flex-column">
                    <div className="d-flex justify-content-center">
                      <p className="me-2">Auction progress: 0 ETH</p>
                      <p> / 303 ETH</p>
                    </div>
                    <ProgressBar now={60} />
                  </div>
                </div>
              </Col>
              <Col
                md={6}
                lg={5}
                className="offset-lg-2 mt-4 mt-md-0 p-4 p-md-5 bg-off"
              >
                <div className="form-heading text-center mb-4">
                  {!isStarted
                    ? "Time Until Pool Launch"
                    : !isClosed
                    ? "Join The Pool"
                    : !isExpired
                    ? "Wait For Claim Time"
                    : "Claim Funds"}
                </div>
                <div className="text-center fs-6">
                  {!isStarted ? (
                    <Countdown
                      key={0}
                      date={new Date(pool?.startAuctionAt * 1000)}
                      renderer={renderer}
                      onComplete={() => {
                        setIsStarted(true);
                      }}
                    />
                  ) : !isClosed ? (
                    <Countdown
                      key={1}
                      renderer={renderer}
                      date={new Date(pool?.endAuctionAt * 1000)}
                      onComplete={() => {
                        setIsClosed(true);
                      }}
                    />
                  ) : !isExpired ? (
                    <Countdown
                      key={2}
                      renderer={renderer}
                      date={new Date(pool?.claimAuctionFundsAt * 1000)}
                      onComplete={() => {
                        setIsExpired(true);
                      }}
                    />
                  ) : (
                    <></>
                  )}
                  {/* <Countdown
                      key={0}
                      date={new Date(pool.endAuctionAt * 1000)}
                      renderer={renderer}
                      onComplete={() => {
                        setIsClosed(true);
                      }}
                    /> */}
                </div>
                {!isClosed ? (
                  <>
                    <div className="divder"></div>
                    <div className="d-flex justify-content-between">
                      <span className="label">Amount</span>
                      <span className="label">
                        Balance: {parseFloat(currentBalance).toFixed(4)}{" "}
                        {network === 4
                          ? pool?.isUSDT
                            ? "USDT"
                            : "ETH"
                          : pool?.isUSDT
                          ? "USDT"
                          : "AVAX"}
                      </span>
                    </div>
                    <div className="d-flex">
                      <input
                        className="custom-input me-3"
                        type="number"
                        min="0"
                        required
                        name="amount"
                        onKeyPress={(e) => {
                          if (
                            e.code === "Minus" ||
                            e.code === "NumpadSubtract" ||
                            e.code === "Comma" ||
                            e.code === "NumpadAdd" ||
                            e.key === "e" ||
                            e.key === "E"
                          ) {
                            e.preventDefault();
                          }
                        }}
                        placeholder="Bid Amount"
                        disabled={!isStarted}
                        onChange={(e) =>
                          calculateAmountFromPrice(e.target.value)
                        }
                      />
                      <input
                        className="custom-input ms-3"
                        disabled
                        type="number"
                        min="0"
                        onKeyPress={(e) => {
                          if (
                            e.code === "Minus" ||
                            e.code === "NumpadSubtract" ||
                            e.code === "Comma" ||
                            e.code === "NumpadAdd"
                          ) {
                            e.preventDefault();
                          }
                        }}
                        required
                        name="amount"
                        placeholder="Token Amount"
                        value={amount}
                      />
                    </div>
                  </>
                ) : (
                  <></>
                )}
                {!isClosed ? (
                  <>
                    <Button
                      onClick={handleClick}
                      disabled={amount > 0 && isWeb3Connected ? false : true}
                      className="sub-btn mt-3"
                    >
                      Buy
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
                  </>
                ) : (
                  <Button
                    onClick={handleClaim}
                    disabled={isExpired > 0 && isWeb3Connected ? false : true}
                    className="sub-btn mt-3"
                  >
                    Claim Funds
                  </Button>
                )}
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
