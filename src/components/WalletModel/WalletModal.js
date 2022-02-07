import React, { Fragment, useContext } from "react";
import Web3 from "web3";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { Web3Context } from "../../context/web3Context";
import { Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import { ETHicon } from "../../Assets/Images/Images";
import { Images } from "../../Assets/Images/Images";
import "./WalletModal.scss";
import { useEffect } from "react";
import { determineContractAddress } from "../../utils/callContract";

const WalletModal = (props) => {
  const [web3, setWeb3] = useContext(Web3Context);
  const provider = new WalletConnectProvider({
    infuraId: "759fef0c863e4e29b9183e3438f90b1d",
  });

  useEffect(() => {
    if (!web3) {
      toast.warning("Please Connect Wallet");
    }
  }, [web3]);

  const handleWalletConnect = async (e) => {
    props.onHide();
    e.preventDefault();
    if (!provider.connected) {
      try {
        await provider.enable();
        await setWeb3(new Web3(provider));
      } catch (e) {
        toast.error(e.message);
      }
    }
    // setWeb3(new Web3(provider));
  };
  const handleMetamask = async () => {
    props.onHide();
    if (window.ethereum) {
      try {
        // props.connectButton.current.disabled = true;
        await window.ethereum.enable();
        const web3Response = new Web3(window.ethereum);
        const response = await determineContractAddress(web3Response);
        if (!response) return toast.error("Select correct network");
        setWeb3(web3Response);
      } catch (e) {
        if (e.message.includes("wallet_requestPermissions")) {
          e.message =
            "Request Already in Pending Please go to metamask Wallet for further procedure";
        }
        toast.error(e.message);
      }
    } else {
      toast.error("Install metamask extension");
    }
  };
  if (window.ethereum) {
    // metamask events
    window.ethereum.on("accountsChanged", (accounts) => {
      if (accounts.length < 1) {
        setWeb3(null);
        window.location.reload();
        return;
      }
      setWeb3(new Web3(window.ethereum));
    });
  }

  return (
    <Fragment>
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="wallet-modal"
      >
        <Modal.Body>
          <div className="modal-wrapper">
            <div className="d-grid">
              <Button onClick={handleMetamask}>
                <span>
                  <img
                    src={Images.MetaMaskicon}
                    className="img-fluid me-3"
                    alt="icon"
                  />
                  Metamask
                </span>
                <img src={Images.RightArrow} className="img-fluid" alt="icon" />
              </Button>
              <Button onClick={handleWalletConnect}>
                <span>
                  <img
                    src={Images.WalletConnect}
                    className="img-fluid me-3"
                    alt="icon"
                  />
                  Wallet Connect
                </span>
                <img src={Images.RightArrow} className="img-fluid" alt="icon" />
              </Button>
            </div>
            <Button className="closebtn" onClick={props.onHide}>
              Cancel
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </Fragment>
  );
};

export default WalletModal;
