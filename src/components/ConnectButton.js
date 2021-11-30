import { useState, useContext, useEffect } from "react";
import Modal from "./modal";
import { Web3Context } from "../context/web3Context";
const ConnectedButton = () => {
  const [web3, setWeb3] = useContext(Web3Context);
  const [address, setAddress] = useState(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (!web3) return setAddress("");
    setConnected(window.ethereum.isConnected());
    web3?.eth.getAccounts().then((results) => setAddress(results[0]));
    // setAddress(web3?.eth.getAccounts()[0]);
  }, [web3]);

  const handleDisconnect = (e) => {
    e.preventDefault();
    setConnected(false);
    setWeb3(null);
  };

  return !connected ? (
    <>
      <button
        type="button"
        class="btn btn-primary"
        data-toggle="modal"
        data-target="#exampleModalCenter"
      >
        Connect Wallet
      </button>
      <Modal />
    </>
  ) : (
    <div className="container">
      <div className="row">
        <div className="col">{address}</div>
        <div className="col">
          <button className="btn btn-success" onClick={handleDisconnect}>
            Disconnect
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConnectedButton;
