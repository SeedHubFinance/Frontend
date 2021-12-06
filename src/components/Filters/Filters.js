import React from "react";
import { Button } from "react-bootstrap";
import Select from "react-select";

// images
import { ReactComponent as ListView } from "../../Assets/Images/listview.svg";
import { ReactComponent as GridView } from "../../Assets/Images/gridview.svg";
import { ReactComponent as LiquidityLockAuction } from "../../Assets/Images/lls.svg";
import { ReactComponent as NFTAuctionHouse } from "../../Assets/Images/nah.svg";
import { ReactComponent as SocialVerifiedPools } from "../../Assets/Images/svp.svg";
import { ReactComponent as TokenSale } from "../../Assets/Images/ts.svg";
import { ReactComponent as Predictions } from "../../Assets/Images/predict.svg";
import { ReactComponent as Lotteries } from "../../Assets/Images/lott.svg";
import { ReactComponent as Search } from "../../Assets/Images/search.svg";
import { ReactComponent as ArrowDown } from "../../Assets/Images/arrowdown.svg";

// Sass file
import "./Filters.scss";

const poolOptions = [
  { value: "chocolate", label: "Fixed Swap Action" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

const tokenOptions = [
  { value: "chocolate", label: "All Token" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

const statusOptions = [
  { value: "chocolate", label: "All" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

const Filters = () => {
  return (
    <div className="filters-container">
      <div className="filter-tabs">
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
      <div className="search-filter">
        <div className="d-flex align-items-center f-div">
          <p>Pool Type:</p>
          <Select options={poolOptions} defaultValue={poolOptions[0]} />
        </div>
        <span className="vr me-3 ms-3" />
        <div className="d-flex align-items-center f-div">
          <p>Token Filter:</p>
          <Select options={tokenOptions} defaultValue={tokenOptions[0]} />
        </div>
        <span className="vr me-3 ms-3" />
        <div className="d-flex align-items-center f-div">
          <p>Status:</p>
          <Select options={statusOptions} defaultValue={statusOptions[0]} />
        </div>
        <span className="vr me-3 ms-3" />
        <div className="search-filter-search f-div">
          <Button>
            <span>
              <Search className="me-2" />
              Search by
            </span>
            <ArrowDown />
          </Button>
        </div>
        <span className="vr me-3 ms-3" />
        <div className="search-filter-view f-div">
          <Button>
            <GridView />
          </Button>
          <Button>
            <ListView />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Filters;
