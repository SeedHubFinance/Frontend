import React from "react";
import { Button } from "react-bootstrap";
import { ReactComponent as RightArrow } from "../../Assets/Images/rightarrow.svg";
import Exclame from "../../Assets/Images/exclame.svg";
import { ReactComponent as LiquidityLockAuction } from "../../Assets/Images/lls.svg";
import { ReactComponent as NFTAuctionHouse } from "../../Assets/Images/nah.svg";
import { ReactComponent as SocialVerifiedPools } from "../../Assets/Images/svp.svg";
import { ReactComponent as TokenSale } from "../../Assets/Images/ts.svg";
import { ReactComponent as Predictions } from "../../Assets/Images/predict.svg";
import { ReactComponent as Lotteries } from "../../Assets/Images/lott.svg";
import "./Filters.scss";

const Filters = () => {
  return (
    <div className="filters-container">
      <div className="filter-btns">
        <Button>
          <TokenSale className="me-2" />
          Token Sale
        </Button>
        <Button>
          <LiquidityLockAuction className="me-2" />
          Liquidity Lock Auction
        </Button>
        <Button>
          <NFTAuctionHouse className="me-2" />
          NFT Auction House
        </Button>
        <Button>
          <SocialVerifiedPools className="me-2" />
          Social Verified Pools
        </Button>
        <Button>
          <Lotteries className="me-2" />
          Lotteries
        </Button>
        <Button>
          <Predictions className="me-2" />
          Predictions
        </Button>
      </div>
      <div className="action-btn">
        <Button>Create auction</Button>
      </div>
    </div>
  );
};

export default Filters;
