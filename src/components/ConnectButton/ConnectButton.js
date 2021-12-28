import { useState, useContext, useEffect, useRef } from "react";
import WalletModal from "../WalletModel/WalletModal";
import { Button } from "react-bootstrap";
import Disconnectbtn from "../../Assets/Images/disconnect.png";
import Connectbtn from "../../Assets/Images/connect.png";
import { Web3Context } from "../../context/web3Context";
import "./ConnectButton.scss";

const ConnectedButton = () => {
  const [web3, setWeb3] = useContext(Web3Context);
  const [address, setAddress] = useState(Web3Context);
  const [connected, setConnected] = useState(false);
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    if (!web3) return setAddress("");
    setConnected(window.ethereum.isConnected());
    web3?.eth.getAccounts().then((results) => setAddress(results[0]));
    setAddress(web3?.eth.getAccounts()[0]);
  }, [web3]);

  const handleDisconnect = (e) => {
    e.preventDefault();
    setConnected(false);
    setWeb3(null);
  };

  return !connected ? (
    <>
      <Button
        disabled={false}
        className="btn-connect-wallet d-sm-block d-none"
        onClick={() => setModalShow(true)}
      >
        Connect Wallet
      </Button>
      <Button
        disabled={false}
        variant="outline-light"
        className="d-block d-sm-none p-0"
        onClick={() => setModalShow(true)}
      >
        <img src={Connectbtn} alt="/" width="40px" />
      </Button>

      <WalletModal show={modalShow} onHide={() => setModalShow(false)} />
    </>
  ) : (
    <div className="d-flex align-items-center g-0">
      <div className="col me-3">
        {(address?.substr(0, 4) || "") + "..." + (address?.substr(-4, 4) || "")}
      </div>
      <div className="col">
        <Button
          variant="outline-light"
          className="d-block d-sm-none p-0"
          onClick={handleDisconnect}
        >
          <img src={Disconnectbtn} alt="/" width="40px" />
        </Button>
        <Button
          className="dis-btn d-sm-block d-none"
          onClick={handleDisconnect}
        >
          Disconnect
        </Button>
      </div>
    </div>
  );
};

export default ConnectedButton;
