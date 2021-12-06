import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import "./Cardlist.scss";

const Cardlist = (props) => {
  return (
    <div className="cardlist">
      <Card>
        <Card.Body>
          <div className="card-head d-flex justify-content-between">
            <span>
              <div className="dot me-2"></div> Live
            </span>
            <p># 6189</p>
          </div>
          <div className="card-title">ETH/SHIB</div>

          <div class="card-content">
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
        </Card.Body>
      </Card>
      <Card>
        <Card.Body>
          <div className="card-head d-flex justify-content-between">
            <span>
              <div className="dot me-2"></div> Live
            </span>
            <p># 6189</p>
          </div>
          <div className="card-title">ETH/SHIB</div>

          <div class="card-content">
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
        </Card.Body>
      </Card>
    </div>
  );
};
export default Cardlist;
