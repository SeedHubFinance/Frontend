import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Card, ProgressBar, Button } from "react-bootstrap";
import "./TokenSaleCard.scss";

const Tokensalecard = () => {
  return (
    <Fragment>
      <Card className="mb-3">
        <Card.Body className="d-flex flex-column flex-md-row">
          <div className="card-head d-flex flex-column justify-content-md-between">
            <div className="d-flex justify-content-between">
              <span>
                <div className="dot me-2"></div> Live
              </span>
              <p className="d-md-none"># 6189</p>
            </div>
            <div className="card-title text-break">ETH/SHIB</div>
          </div>
          <div className="content-wapper d-flex flex-column pe-md-4">
            <div className="card-content pt-md-0 pt-4">
              <div>
                <span>Address</span>
                <p>0xA447...C354</p>
              </div>
              <div>
                <span>Pair</span>
                <p>LINK /ETH</p>
              </div>
              <div>
                <span>Swap Ratio</span>
                <p>200 : 1</p>
              </div>
              <div>
                <span>Price</span>
                <p>$ 22.8378</p>
              </div>
              <div>
                <span>Participants</span>
                <p>public</p>
              </div>
            </div>
            <ProgressBar now={60} />
          </div>
          <Link to="/poolform">
            <Button>Join Now</Button>
          </Link>
        </Card.Body>
      </Card>
    </Fragment>
  );
};

export default Tokensalecard;
