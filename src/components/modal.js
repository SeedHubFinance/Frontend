import { useContext } from "react";
import Web3 from "web3";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { Web3Context } from "../context/web3Context";

const Modal = () => {
  const [web3, setWeb3] = useContext(Web3Context);
  const provider = new WalletConnectProvider({
    infuraId: "759fef0c863e4e29b9183e3438f90b1d",
  });

  const handleWalletConnect = async (e) => {
    e.preventDefault();
    if (!provider.connected) {
      try {
        await provider.enable();
        await setWeb3(new Web3(provider));
      } catch (e) {
        await provider.disconnect();
        window.location.reload();
        window.alert(e.message);
      }
    }
    // setWeb3(new Web3(provider));
  };
  const handleMetamask = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.enable();
        setWeb3(new Web3(window.ethereum));
      } catch (e) {
        console.log(e);
        window.alert(e.message);
      }
    }
  };
  // metamask events
  window.ethereum.on("accountsChanged", (accounts) => {
    if (accounts.length < 1) {
      setWeb3(null);
      window.location.reload();
      return;
    }
    setWeb3(new Web3(window.ethereum));
  });

  return (
    <div
      class="modal fade"
      id="exampleModalCenter"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-body">
            <div className="row">
              <div className="col">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                  onClick={handleMetamask}
                >
                  Metamask
                </button>
              </div>
              <div className="col">
                <button
                  type="button"
                  onClick={handleWalletConnect}
                  data-dismiss="modal"
                  class="btn btn-primary"
                >
                  Wallet Connect
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
