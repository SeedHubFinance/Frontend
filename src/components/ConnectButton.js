import { useEffect, useState } from "react";
import Web3 from "web3";

const ConnectedButton = () => {
  const [account, setAccount] = useState("");
  let [web3, setWeb3] = useState(null);

  useEffect(() => {
    checkAccount();
  }, []);

  // invoke to connect to wallet account
  async function activate() {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        checkAccount();
      } catch (err) {
        console.log("user did not add account...", err);
      }
    }
  }

  // invoke to check if account is already connected
  async function checkAccount() {
    let web3 = new Web3(window.ethereum);
    setWeb3(web3);
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);
  }

  function handleConnectWallet() {
    activate();
  }

  return account ? (
    <div className="container">
      <div className="row">
        <div className="col">
          <p>
            {account &&
              `${account.slice(0, 6)}...${account.slice(
                account.length - 4,
                account.length
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
