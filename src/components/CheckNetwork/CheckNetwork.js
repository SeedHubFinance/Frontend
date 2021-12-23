import React, { Fragment, useContext } from "react";
import Web3 from "web3";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { Web3Context } from "../../context/web3Context";
import { Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import { ETHicon } from "../../Assets/Images/Images";
import { Images } from "../../Assets/Images/Images";
import "./CheckNetwork.scss";

const CheckNetwork = (props) => {
  const [web3, setWeb3] = useContext(Web3Context);
  const provider = new WalletConnectProvider({
    infuraId: "759fef0c863e4e29b9183e3438f90b1d",
  });

  window.ethereum.on("accountsChanged", (accounts) => {
    if (accounts.length < 1) {
      setWeb3(null);
      window.location.reload();
      return;
    }
    setWeb3(new Web3(window.ethereum));
  });

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
            <h4>You have selected wrong network</h4>
            <Button className="closebtn" onClick={props.onHide}>
              Cancel
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </Fragment>
  );
};

export default CheckNetwork;
