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
              <a href="https://medium.com/@seedhub/" target="_blank">
                <MediumIcon />
              </a>
              <a href="https://twitter.com/seedhubnetwork" target="_blank">
                <TwitterIcon />
              </a>
              <a href="https://t.me/seedhub" target="_blank">
                <TelegramIcon />
              </a>
              <a href="https://github.com/SeedHubnetwork" target="_blank">
                <MsgIcon />
              </a>
            </div>
          </Col>
          <Col lg={2} className="my-lg-0 my-3">
            <a href="https://docs.seedhub.network/" target="_blank">
              Fixed-Swap Docs
            </a>
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
