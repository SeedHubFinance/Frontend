import { useEffect, useState } from "react";
import Web3 from "web3";
import { initialiseMetamask } from "../utils/connectionHelpers";

const ConnectedButton = () => {
  const [address, setAddress] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  // const [provider, setProvider] = useState(null);
  const handleConnectWallet = async (e) => {
    e.preventDefault();
    console.log("Hello 2");
    const { isConnected, address, provider } = await initialiseMetamask();
    setAddress(address);
    setIsConnected(isConnected);
    if (!isConnected || !address || !provider) {
      return console.log("Connection error");
    }
    window.web3 = new Web3(provider);
  };

  return isConnected ? (
    <div className="container">
      <div className="row">
        <div className="col">
          <p>
            {address &&
              `${address.slice(0, 6)}...${address.slice(
                address.length - 4,
                address.length
              )}`}
          </p>
        </div>
      </div>
    </div>
  ) : (
    <button className="btn btn-primary" onClick={handleConnectWallet}>
      Connect to a wallet
    </button>
  );
};

export default ConnectedButton;
