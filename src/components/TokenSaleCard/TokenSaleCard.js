import React, { Fragment, useRef } from "react";
import { Link } from "react-router-dom";
import { Card, ProgressBar, Button } from "react-bootstrap";
import "./TokenSaleCard.scss";
import { useEffect, useState } from "react/cjs/react.development";

const Tokensalecard = ({
  index,
  name,
  sellToken,
  swapRatio,
  maxAmountPerWallet,
  endAuctionAt,
  isOnlySeed,
  isOnlyWhiteList,
  claimAuctionFundsAt,
  view,
  startAuctionAt,
  tokenSymbol,
}) => {
  // const statusRef = useRef("");
  // useEffect(() => {
  //   const date = new Date(endAuctionAt * 1000);
  //   if (date < new Date()) {
  //     return (statusRef.current.innerText = "Closed");
  //   }
  //   return (statusRef.current.innerText = "Live");
  // }, []);
  const date = new Date(endAuctionAt * 1000);
  const statusObj =
    date < new Date()
      ? { status: "Closed", isClosed: true }
      : { status: "Live", isClosed: false };

  const endAuctiondate = new Date(endAuctionAt * 1000);
  const nowDate = new Date();
  // console.log(nowDate.toString());
  // console.log(endAuctiondate.toString());
  const percent = Math.floor((nowDate * 100) / endAuctiondate);
  // console.log(percent);

  return (
    <Fragment>
      <Card className="mb-3">
        <Card.Body
          className={`d-flex ${
            view ? "flex-column flex-md-row" : "flex-column"
          }`}
        >
          <div
            className={`card-head d-flex flex-column ${
              view ? "justify-content-md-between" : ""
            }`}
          >
            <div className="d-flex justify-content-between pe-4">
              <span>
                <div
                  className={`${
                    statusObj.isClosed ? "dotClose" : "dotLive"
                  } me-2`}
                ></div>
                <div className={statusObj.isClosed && "closed"}>
                  {statusObj.status}
                </div>
              </span>
              <p className=""># {index}</p>
            </div>
            <div className="card-title text-break">{name}</div>
          </div>
          <div
            className={`content-wapper d-flex flex-column ${
              view ? "pe-md-4" : "pe-0"
            }`}
          >
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
                <p>ETH / {tokenSymbol}</p>
              </div>
              <div>
                <span>Swap Ratio</span>
                <p>{swapRatio} : 1</p>
              </div>
              <div>
                <span className="me-3">Participants</span>
                <p className={view ? "text-end text-md-start" : "text-end"}>
                  {isOnlyWhiteList ? "WhiteList " : "Public "}
                  {isOnlySeed ? "and for seed Holders" : ""}
                </p>
              </div>
            </div>
            <ProgressBar now={percent < 100 ? 50 : percent} />
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
              isOnlyWhiteList,
              isOnlySeed,
              claimAuctionFundsAt,
              startAuctionAt,
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
