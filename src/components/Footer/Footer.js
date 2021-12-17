import React from "react";
import { Row, Col } from "react-bootstrap";
import "./Footer.scss";

// Icons
import { ReactComponent as MediumIcon } from "../../Assets/Images/medium.svg";
import { ReactComponent as TelegramIcon } from "../../Assets/Images/telegram.svg";
import { ReactComponent as TwitterIcon } from "../../Assets/Images/twitter.svg";
import { ReactComponent as MsgIcon } from "../../Assets/Images/msg.svg";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-content">
        <Row className="w-100 g-0 align-items-center text-center">
          <Col lg={4}>
            <div className="footer-icons justify-content-lg-start justify-content-center">
              <MediumIcon />
              <TwitterIcon />
              <TelegramIcon />
              <MsgIcon />
            </div>
          </Col>
          <Col lg={2} className="my-lg-0 my-3">
            <p>Fixed-Swap Docs</p>
          </Col>
          <Col lg={6}>
            <p className="text-lg-end">
              Fixed-Swap is a fully decentralized protocol. Join the auction at
              your own risk.
            </p>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Footer;
