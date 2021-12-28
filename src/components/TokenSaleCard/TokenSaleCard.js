import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Card, ProgressBar, Button } from "react-bootstrap";
import "./TokenSaleCard.scss";

const Tokensalecard = ({
  index,
  name,
  sellToken,
  swapRatio,
  maxAmountPerWallet,
  endAuctionAt,
}) => {
  return (
    <Fragment>
      <Card className="mb-3">
        <Card.Body className="d-flex flex-column flex-md-row">
          <div className="card-head d-flex flex-column justify-content-md-between">
            <div className="d-flex justify-content-between pe-4">
              <span>
                <div className="dot me-2"></div> Live
              </span>
              <p className=""># {index}</p>
            </div>
            <div className="card-title text-break">{name}</div>
          </div>
          <div className="content-wapper d-flex flex-column pe-md-4">
            <div className="card-content pt-md-0 pt-4">
              <div>
                <span>Address</span>
                <p>
                  {(sellToken?.substr(0, 4) || "") +
                    "..." +
                    (sellToken?.substr(-4, 4) || "")}
                </p>
              </div>
              <div>
                <span>Pair</span>
                <p>LINK /AVAX</p>
              </div>
              <div>
                <span>Swap Ratio</span>
                <p>{swapRatio} : 1</p>
              </div>
              <div>
                <span>Participants</span>
                <p>public</p>
              </div>
            </div>
            <ProgressBar now={60} />
          </div>
          <Link
            to="/poolform"
            state={{
              index,
              name,
              sellToken,
              swapRatio,
              maxAmountPerWallet,
              endAuctionAt,
            }}
          >
            <Button>Join Now</Button>
          </Link>
        </Card.Body>
      </Card>
    </Fragment>
  );
};

export default Tokensalecard;
