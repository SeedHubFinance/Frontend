import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  Fragment,
} from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Button, Carousel } from "react-bootstrap";
import Header from "../../components/Header/Header";
import Select from "react-select";
import Footer from "../../components/Footer/Footer";
import { ReactComponent as MaxIcon } from "../../Assets/Images/max.svg";
import "react-calendar/dist/Calendar.css";

import "./FixedSwap.scss";

import DateTimePicker from "react-datetime-picker";
import Calendar from "react-calendar";
import { Web3Context } from "../../context/web3Context";

import coinABI from "../../contracts/ERC20ABI";
import {
  fixedSwapABI,
  fixedSwapContractAddress,
  fujiSwapAddress,
} from "../../contracts/FixedSwap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { determineContractAddress } from "../../utils/callContract";

const poolOptions = [
  { value: "eth", label: "ETH" },
  { value: "usdt", label: "USDT" },
  { value: "avax", label: "AVAX" },
];
const poolOptionsAvax = [
  { value: "avax", label: "AVAX" },
  { value: "usdt", label: "USDT" },
];

const Fixedswap = (props) => {
  const navigate = useNavigate();
  const [tokenAddress, setTokenAddress] = useState("");
  const [tokenName, setTokenName] = useState("");
  const [tokenAllocation, setTokenAllocation] = useState(0);
  const [swapRatio, setSwapRatio] = useState(0);
  const [maxAmountPerWallet, setMaxAmountPerWallet] = useState(
    "100000000000000000000000000"
  );
  const [network, setNetwork] = useState();
  const [isOnlySeeHolder, setIsOnlySeedHolder] = useState(false);
  const [enableWhiteList, setEnableWhitelist] = useState(false);

  const [decimal, setDecimal] = useState(0);

  const [poolName, setPoolName] = useState("");
  const dateErrorRef = useRef(null);
  const isFirstRun = useRef(true);

  let date = new Date();
  const [currentDate, setCurrentDate] = useState(date);
  const [startDate, setStartDate] = useState(date);
  const [endDate, setEndDate] = useState(date);
  const [claimDate, setClaimDate] = useState(date);

  const [currency, setSelectedCurreny] = useState({
    value: "avax",
    label: "AVAX",
  });

  const [passfield, setpassfield] = useState(false);
  const [limitfield, setlimitfield] = useState(false);

  const [currentBalance, setCurrentBalance] = useState("");
  const [web3, setWeb3] = useContext(Web3Context);
  const [address, setAddress] = useState(Web3Context);

  const [isTransferNotApproved, setTransferApproval] = useState(true);

  const [isApproved, setApproval] = useState(false);

  const [isWeb3Connected, setWeb3Status] = useState(false);

  const [whitelist, setWhitelist] = useState("");

  const [listdata, setListData] = useState([]);

  const [transactionFee, setTransactionFee] = useState(0);
  const [tokenContractAddress, setTokenContractAddress] = useState();

  const getUserWalletAddress = async () => {
    let addressArray = await web3?.eth.getAccounts();
    setAddress(addressArray[0]);
    setWeb3Status(true);
    // getTransactionFee();
  };

  // const getContractAddress = asy()

  useEffect(() => {
    if (!web3) return setWeb3Status(false);
    determineContractAddress(web3).then((e) => {
      console.log(e);
      if (!e) return toast.error("Connect to correct network");
      setTokenContractAddress(e["address"]);
      setNetwork(e["net"]);
    });
    getUserWalletAddress();
  }, [web3, address, tokenContractAddress]);

  useEffect(() => {
    console.log("network", network);
    switch (network) {
      case 4: {
        setSelectedCurreny((prev) => ({ ...prev, value: "eth", label: "ETH" }));
        break;
      }
      case 43113 || 43114: {
        setSelectedCurreny((prev) => ({
          ...prev,
          value: "avax",
          label: "AVAX",
        }));
        break;
      }
      default:
        return;
    }
  }, [network]);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    if (startDate <= currentDate) {
      dateErrorRef.current.innerText =
        "Start date should be greater than current Date";
      return;
    }
    if (endDate < startDate) {
      setTransferApproval(true);
      dateErrorRef.current.innerText =
        "End date should be greater than start Date";
      return;
    }
    if (claimDate < endDate) {
      setTransferApproval(true);
      dateErrorRef.current.innerText =
        "Claim data should be greater than end Date";
      return;
    }
    dateErrorRef.current.innerText = "";
    setTransferApproval(false);
  }, [startDate, endDate, claimDate]);

  useEffect(() => {
    if (limitfield) return;
    setMaxAmountPerWallet("100000000000000000000000000");
  }, [limitfield]);

  const getTimeStampsForDates = (date) => {
    return Math.ceil(new Date(date).getTime() / 1000);
  };

  const tokenAddressValidation = (address) => {
    if (address.length != 42) {
      return false;
    }

    if (address[0] !== "0" && address[1]) return false;

    return true;
  };

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

  const getTokenName = async (address) => {
    let coinContract = new web3.eth.Contract(coinABI, address);
    setCurrentBalance(await getTokenBalance(address));
    return await coinContract.methods.name().call();
  };

  const getTransactionFee = async () => {
    const fixedSwapContract = new web3.eth.Contract(
      fixedSwapABI,
      tokenContractAddress
    );

    let transFee = await fixedSwapContract.methods.getTransactionFee().call();

    setTransactionFee(web3.utils.fromWei(transFee));
  };

  const getTokenBalance = async (tokenAddress) => {
    let coinContract = new web3.eth.Contract(coinABI, tokenAddress);

    return await coinContract.methods.balanceOf(address).call();
  };

  const setToken = async (address) => {
    if (tokenAddressValidation(address)) {
      setTokenAddress(address);
      let name = await getTokenName(address);
      setTokenName(name);
      await getDecimal(address);
    } else {
      alert("Token Address is not valid");
    }
  };

  const getMaxBalanceForToken = async () => {
    setCurrentBalance(await getTokenBalance());
  };

  const approveTokenTransafer = async () => {
    let coinContract = new web3.eth.Contract(coinABI, tokenAddress);

    console.log(tokenAllocation);
    return await coinContract.methods
      .approve(tokenContractAddress, toFixed(tokenAllocation).toString())
      .send({ from: address })
      .then(() => setApproval(true))
      .catch((e) => setApproval(false));
  };

  const validateDate = (startDate, endDate, claimDate) => {
    if (startDate < endDate < claimDate) {
      return true;
    }
    return false;
  };

  const validationForForm = (poolReq) => {
    let erroMsg = "";

    if (tokenAddress.length == 0 || tokenAddress == undefined) {
      erroMsg = "Token Address is not defined";
      return { formState: false, erroMsg };
    }

    if (poolName.length == 0 || poolName == undefined) {
      erroMsg = "Pool Name is not defined";
      return { formState: false, erroMsg };
    }

    if (swapRatio == 0 || swapRatio == undefined) {
      erroMsg = "Swap Ratio cannot be 0 or left empty";
      return { formState: false, erroMsg };
    }

    if (maxAmountPerWallet == 0 || maxAmountPerWallet == undefined) {
      erroMsg = "Maximum Amount Per Wallet cannot be 0 or left empty";

      return { formState: false, erroMsg };
    }

    if (tokenAllocation == 0 || tokenAllocation == undefined) {
      erroMsg = "Token Allocation cannot be 0 or left empty";

      return { formState: false, erroMsg };
    }

    if (enableWhiteList && listdata.length == 0) {
      erroMsg = "List be left empty for whitelist";
      return { formState: false, erroMsg };
    }

    return { formState: true, erroMsg };
  };

  const makePool = async () => {
    let fixedSwapContract = new web3.eth.Contract(
      fixedSwapABI,
      tokenContractAddress
    );

    const poolReq = {
      poolName,
      tokenAddress,
      swapRatio: parseInt(swapRatio),
      maxAmountPerWallet: parseInt(maxAmountPerWallet),
      tokenAllocation: toFixed(tokenAllocation).toString(),
      startDate: getTimeStampsForDates(startDate),
      endDate: getTimeStampsForDates(endDate),
      claimDate: getTimeStampsForDates(claimDate),
      isOnlySeeHolder,
      enableWhiteList,
      // currency.value,
      listdata,
    };
    console.log(poolReq);

    let validation = validationForForm(poolReq);

    if (!validation.formState) {
      alert(validation.erroMsg);
      return;
    }

    // pool name
    //  address poolCreator;
    //  uint256 startAuctionAt;
    //  uint256 endAuctionAt;
    //  uint256 claimAuctionFundsAt;
    //  bool enableWhiteList;
    //  uint256 maxAmountPerWallet;
    //  bool onlySeedHolders;
    //  address sellToken;
    //  uint256 amountOfSellToken;
    //  uint256 swapRatio;
    //  bool isUSDT;

    console.log(toFixed(tokenAllocation).toString());

    let pool = [
      poolName,
      address,
      getTimeStampsForDates(startDate),
      getTimeStampsForDates(endDate),
      getTimeStampsForDates(claimDate),
      enableWhiteList,
      currency.value == "usdt"
      ? (maxAmountPerWallet === "100000000000000000000000000") ? maxAmountPerWallet: (maxAmountPerWallet * 10 ** 6).toString()
      : (maxAmountPerWallet === "100000000000000000000000000") ? maxAmountPerWallet: web3.utils.toWei(maxAmountPerWallet),
      isOnlySeeHolder,
      tokenAddress,
      toFixed(tokenAllocation).toString(),
      currency.value == "usdt" ? swapRatio * 10 ** 12 : swapRatio,
      currency.value == "usdt" ? true : false,
    ];

    console.log("pool=>>>>>>>>", pool);

    await fixedSwapContract.methods
      .createLiquidityPool(pool, listdata)
      .send({ from: address })
      .then(() => {
        toast.success("Pool successfully created");
        navigate("/");
      })
      .catch(() => alert("Something went wrong"));
  };

  const sanatizeArray = (array) => {
    let output = [];
    for (let i = 0; i < array.length; i++) {
      if (tokenAddressValidation(array[i])) {
        output.push(array[i]);
      }
    }
    setListData(output);
  };

  const getDecimal = async (address) => {
    let coinContract = new web3.eth.Contract(coinABI, address);
    let decimals = await coinContract.methods.decimals().call();
    setDecimal(decimals);
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
                    Create a Fixed Price Pool
                    <Button
                      href="https://docs.seedhub.network/products/seed-hub-decentralized/fixed-price-sales/how-to-create-a-pool"
                      target="_blank"
                    >
                      How to Create a pool
                    </Button>
                  </div>
                </div>
              </Col>
            </Row>
            <Row className="my-5 g-0">
              <Col md={7}>
                <div className="form-heading mb-4">Contract information</div>
              </Col>
              <Col md={5}>
                <span className="label">Token Contract address</span>
                <input
                  className="custom-input"
                  required
                  name="address"
                  defaultValue=""
                  onChange={(e) => setToken(e.target.value)}
                  disabled={!isWeb3Connected}
                />
              </Col>
            </Row>
            <div className="divder"></div>
            <Row>
              <Col md={6} lg={7}>
                <div className="form-heading">Pool settings</div>
              </Col>
              <Col md={6} lg={5}>
                <div className="d-flex align-items-center justify-content-between">
                  <div className="w-50 to-select me-3">
                    <span className="label">From</span>
                    {network == 4 ? (
                      <Select
                        options={poolOptions}
                        defaultValue={poolOptions[0]}
                        isSearchable={false}
                        isDisabled={!isWeb3Connected}
                        onChange={(e) => {
                          setSelectedCurreny(e);
                        }}
                      />
                    ) : (
                      <Select
                        options={poolOptionsAvax}
                        defaultValue={poolOptionsAvax[0]}
                        isSearchable={false}
                        isDisabled={!isWeb3Connected}
                        onChange={(e) => {
                          setSelectedCurreny(e);
                        }}
                      />
                    )}
                  </div>
                  <div className="w-50 ">
                    <span className="label">To</span>
                    <input
                      className="custom-input"
                      required
                      name="from"
                      defaultValue={tokenName}
                      disabled={!isWeb3Connected}
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
                    type="number"
                    min="0"
                    defaultValue=""
                    onKeyPress={(e) => {
                      if (
                        e.code === "Minus" ||
                        e.code === "NumpadSubtract" ||
                        e.code === "Comma" ||
                        e.code === "NumpadAdd" ||
                        e.code === "Period" ||
                        e.key === "e" ||
                        e.key === "E"
                      ) {
                        e.preventDefault();
                      }
                    }}
                    onChange={(e) => setSwapRatio(e.target.value)}
                    disabled={!isWeb3Connected}
                  />
                </div>
                <div className="d-flex justify-content-between">
                  <span className="label">Amount</span>
                  <span className="label">
                    Balance {currentBalance / 10 ** decimal}
                  </span>
                </div>
                <div className="position-relative">
                  <input
                    className="custom-input"
                    required
                    name="amount"
                    type="number"
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
                    defaultValue={""}
                    disabled={!isWeb3Connected}
                    max={currentBalance / 10 ** decimal}
                    min="0"
                    onChange={(e) =>
                      setTokenAllocation(
                        parseFloat(e.target.value) * 10 ** decimal
                      )
                    }
                  />
                  <Button
                    className="sub-btn mt-3"
                    disabled={tokenAddress === "" ? true : false}
                    onClick={() => {
                      approveTokenTransafer();
                    }}
                  >
                    Approve For Transfer
                  </Button>
                </div>

                <div className="d-flex align-items-end my-4">
                  <div className="me-2">
                    <span className="label mb-3">
                      Maximum Allocation per Wallet
                    </span>
                    <div className="d-flex">
                      <label
                        className="me-5"
                        style={
                          !isApproved
                            ? { cursor: "default" }
                            : { cursor: "pointer" }
                        }
                      >
                        <input
                          className="me-2"
                          required
                          onClick={(e) => setlimitfield(false)}
                          name="mapw"
                          type="radio"
                          defaultValue="No limits"
                          disabled={!isApproved}
                        />
                        No limits
                      </label>
                      <label
                        style={
                          !isApproved
                            ? { cursor: "default" }
                            : { cursor: "pointer" }
                        }
                      >
                        <input
                          className="me-2"
                          required
                          name="mapw"
                          type="radio"
                          onClick={(e) => setlimitfield(true)}
                          defaultValue="No limits"
                          disabled={!isApproved}
                        />
                        {currency.label}
                      </label>
                    </div>
                  </div>
                </div>

                <div
                  className={`d-flex align-items-end my-4 ${
                    limitfield ? "" : "d-none"
                  }`}
                >
                  <div className="wka me-2">
                    <span className="label">Allocation</span>
                    <input
                      className="custom-input"
                      required
                      name="allocation"
                      type="number"
                      min="0"
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
                      onChange={(e) => setMaxAmountPerWallet(e.target.value)}
                      disabled={!isApproved}
                    />
                  </div>
                  <h5>{currency.label}</h5>
                </div>
                <div className="divder"></div>
                <div className="d-flex align-items-end my-4">
                  <div className="me-2">
                    <span className="label mb-3">Participant</span>
                    <div className="d-flex flex-wrap">
                      <label
                        className="me-5"
                        style={
                          !isApproved
                            ? { cursor: "default" }
                            : { cursor: "pointer" }
                        }
                      >
                        <input
                          className="me-2"
                          required
                          onChange={(e) =>
                            setIsOnlySeedHolder(e.target.checked)
                          }
                          name="participant"
                          type="checkbox"
                          disabled={!isApproved}
                        />
                        Seed holders
                      </label>
                      <label
                        className="me-5"
                        style={
                          !isApproved
                            ? { cursor: "default" }
                            : { cursor: "pointer" }
                        }
                      >
                        <input
                          className="me-2"
                          required
                          onChange={(e) => {
                            setEnableWhitelist(!e.target.checked);
                            setpassfield(false);
                          }}
                          name="participant"
                          type="radio"
                          value="public"
                          disabled={!isApproved}
                        />
                        Public
                      </label>
                      <label
                        style={
                          !isApproved
                            ? { cursor: "default" }
                            : { cursor: "pointer" }
                        }
                      >
                        <input
                          className="me-2"
                          required
                          onChange={(e) => {
                            setEnableWhitelist(e.target.checked);
                            setpassfield(true);
                          }}
                          name="participant"
                          type="radio"
                          value="whitelist"
                          disabled={!isApproved}
                        />
                        Whitelist
                      </label>
                    </div>
                  </div>
                </div>
                <div
                  className={`d-flex align-items-end my-4 ${
                    passfield ? "" : "d-none"
                  }`}
                >
                  <div className="wka me-2">
                    <span className="label">
                      List (Please write each address on separate line)
                    </span>
                    <div className="position-relative">
                      <textarea
                        className="custom-input border mt-3 p-3"
                        placeholder="Enter Addresses"
                        name="whitelist"
                        style={{ height: "150px" }}
                        onChange={(e) => {
                          setWhitelist(e.target.value);
                        }}
                        value={whitelist}
                        disabled={!isApproved}
                      ></textarea>
                      <Button
                        className="sub-btn mt-4"
                        onClick={() => {
                          const array = whitelist.split("\n");
                          sanatizeArray(array);
                          toast.success("Addresses Added!", {
                            position: "top-right",
                            autoClose: 2000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                          });
                        }}
                      >
                        Confirm
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="divder"></div>
                <span className="label">Pool Name</span>
                <input
                  className="custom-input"
                  required
                  name="poolname"
                  value={poolName}
                  defaultValue=""
                  onChange={(e) => setPoolName(e.target.value.trimStart())}
                  disabled={!isApproved}
                />

                <span className="label my-4">Pool Start Time</span>
                <div>
                  <DateTimePicker
                    disabled={!isApproved}
                    onChange={setStartDate}
                    value={startDate}
                  />
                  {/* <Calendar onChange={setStartDate} value={startDate} /> */}
                </div>
                <span className="label my-4">Pool Ending Time</span>
                <div className="d-flex align-items-center justify-content-between">
                  <DateTimePicker
                    disabled={!isApproved}
                    onChange={setEndDate}
                    value={endDate}
                  />
                  {/* <Calendar onChange={setEndDate} value={endDate} /> */}
                </div>
                <span className="label my-4">Claim Funds At</span>
                <div className="d-flex align-items-center justify-content-between">
                  <DateTimePicker
                    disabled={!isApproved}
                    onChange={setClaimDate}
                    value={claimDate}
                  />
                  {/* <Calendar onChange={setClaimDate} value={claimDate} /> */}
                </div>
                <div className="d-flex align-items-center">
                  <span className="label my-4"></span>

                  <span className="label my-4 ms-2 text-break"></span>
                </div>
                <Button
                  className="sub-btn"
                  onClick={() => {
                    if (isApproved) {
                      makePool();
                    } else {
                      alert("Please approve or wait for approval of funds");
                    }
                  }}
                  disabled={!isApproved && isTransferNotApproved}
                >
                  Launch
                </Button>
                <p
                  ref={dateErrorRef}
                  style={{
                    color: "red",
                    marginTop: "5px",
                    textAlign: "center",
                  }}
                ></p>
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
