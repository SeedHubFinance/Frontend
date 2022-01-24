import React, { useState } from "react";
import { Link } from "react-router-dom";
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

// Token Option images
import { ReactComponent as AllToken } from "../../Assets/Images/alltoken.svg";
import { ReactComponent as CoinMark } from "../../Assets/Images/coinmark.svg";
import { ReactComponent as CoinGecko } from "../../Assets/Images/coingecko-1.svg";

// Sass file
import "./Filters.scss";
import { useEffect } from "react/cjs/react.development";

const poolOptions = [
  { value: "swap", label: "Fixed Price Sale" },
  // { value: "sealed", label: "Sealed-Bid Auction" },
  // { value: "dutch", label: "Dutch Auction" },
];

// const tokenOptions = [
//   {
//     value: "all",
//     label: <AllToken />,
//   },
//   { value: "coinmark", label: <CoinMark /> },
//   { value: "coingecko", label: <CoinGecko /> },
// ];

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    color: "#706f6f",
    backgroundColor: "white",
  }),

  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = "opacity 300ms";

    return { ...provided, opacity, transition };
  },
};

const Filters = ({
  showResult,
  setShowResult,
  filter,
  setFilter,
  searchBy,
  setSearchBy,
  statusOptions,
}) => {
  const [searchbtn, searchBtnClick] = useState(false);
  const [poolid_checkbox, setcheckbox_poolid] = useState(false);
  const [pn_checkbox, setcheckbox_pn] = useState(false);
  const [tca_checkbox, setcheckbox_tca] = useState(false);
  const [ts_checkbox, setcheckbox_ts] = useState(false);
  // const [acwa_checkbox, setcheckbox_acwa] = useState(false);

  const handleClick = () => {
    !(poolid_checkbox || pn_checkbox || tca_checkbox || ts_checkbox)
      ? setShowResult(false)
      : setShowResult(true);
  };

  useEffect(() => {
    let data = searchBy;
    if (!poolid_checkbox) {
      data.id = "";
    }
    if (!pn_checkbox) {
      data.name = "";
    }
    if (!tca_checkbox) {
      data.sellToken = "";
    }
    if (!ts_checkbox) {
      data.tokenSymbol = "";
    }
    setShowResult(false);
    setSearchBy({ ...searchBy, ...data });
  }, [poolid_checkbox, pn_checkbox, tca_checkbox, ts_checkbox]);

  return (
    <div className="filters-container">
      <div className="d-none d-lg-flex filter-tabs flex-lg-row flex-column align-items-lg-center align-items-start">
        <div className="d-none filter-btns flex-lg-row flex-column align-items-lg-center align-items-start">
          <Button>
            <TokenSale className="f-icon me-2" />
            Token Sale
          </Button>
          <Button>
            <LiquidityLockAuction className="f-icon me-2" />
            Liquidity Lock Auction
          </Button>
          <Button>
            <NFTAuctionHouse className="f-icon me-2" />
            NFT Auction House
          </Button>
          <Button>
            <SocialVerifiedPools className="f-icon me-2" />
            Social Verified Pools
          </Button>
          <Button>
            <Lotteries className="f-icon me-2" />
            Lotteries
          </Button>
          <Button>
            <Predictions className="f-icon me-2" />
            Predictions
          </Button>
        </div>
        <div className="action-btn my-lg-0 my-3">
          <Link to="/fixed-swap">
            <Button>Create Sell</Button>
          </Link>
        </div>
      </div>
      <div className="search-filter">
        <div className="d-flex align-items-center f-div my-lg-0 my-3">
          <p>Pool Type:</p>
          <Select
            options={poolOptions}
            defaultValue={poolOptions[0]}
            styles={customStyles}
            isSearchable={false}
          />
        </div>
        {/* <span className="vr me-3 ms-3" />
        <div className="d-flex align-items-center f-div my-lg-0 my-3">
          <p>Token Filter:</p>
          <Select
            options={tokenOptions}
            defaultValue={tokenOptions[0]}
            styles={customStyles}
            isSearchable={false}
          />
        </div> */}
        <span className="vr me-3 ms-3" />
        <div className="d-flex align-items-center f-div my-lg-0 my-3">
          <p>Status:</p>
          <Select
            options={statusOptions}
            defaultValue={statusOptions[0].value}
            styles={customStyles}
            isSearchable={false}
            onChange={(e) => setFilter({ ...filter, status: e.value })}
          />
        </div>
        <span className="vr me-3 ms-3" />
        <div className="search-filter-search position-relative f-div my-lg-0 my-3">
          <Button onClick={() => searchBtnClick(!searchbtn)}>
            <span>
              <Search className="me-2" />
              Search by
            </span>
            <ArrowDown />
          </Button>
          {searchbtn ? (
            <div className="search-box">
              <div className="search-option">
                <label
                  onClick={() => setcheckbox_poolid(!poolid_checkbox)}
                  for="Pool ID"
                  className={`${poolid_checkbox ? "checked" : null}`}
                ></label>
                <p>Pool ID</p>
                <div className={`implicit ${poolid_checkbox ? "" : "hidden"}`}>
                  <input
                    type="number"
                    placeholder="Enter Pool ID "
                    onKeyPress={(e) => {
                      if (
                        e.code === "Minus" ||
                        e.code === "NumpadSubtract" ||
                        e.code === "Comma" ||
                        e.code === "NumpadAdd"
                      ) {
                        e.preventDefault();
                      }
                    }}
                    value={searchBy.id}
                    min={0}
                    onChange={(e) => {
                      setSearchBy({ ...searchBy, id: e.target.value });
                      setShowResult(false);
                    }}
                  />
                </div>
              </div>
              <div className="search-option">
                <label
                  onClick={() => setcheckbox_pn(!pn_checkbox)}
                  for="Pool Name"
                  className={`${pn_checkbox ? "checked" : null}`}
                ></label>
                <p>Pool Name</p>
                <div className={`implicit ${pn_checkbox ? "" : "hidden"}`}>
                  <input
                    type="text"
                    placeholder="Enter Pool Name "
                    value={searchBy.name}
                    onChange={(e) => {
                      setSearchBy({ ...searchBy, name: e.target.value });
                      setShowResult(false);
                    }}
                  />
                </div>
              </div>
              <div className="search-option">
                <label
                  onClick={() => setcheckbox_tca(!tca_checkbox)}
                  for="Token Contract Address"
                  className={`${tca_checkbox ? "checked" : null}`}
                ></label>
                <p>Token Contract Address</p>
                <div className={`implicit ${tca_checkbox ? "" : "hidden"}`}>
                  <input
                    type="text"
                    placeholder="Enter Token Contract Address"
                    value={searchBy.address}
                    onChange={(e) => {
                      setSearchBy({ ...searchBy, sellToken: e.target.value });
                      setShowResult(false);
                    }}
                  />
                </div>
              </div>
              <div className="search-option">
                <label
                  onClick={() => setcheckbox_ts(!ts_checkbox)}
                  for="Token Symbol"
                  className={`${ts_checkbox ? "checked" : null}`}
                ></label>
                <p>Token Symbol</p>
                <div className={`implicit ${ts_checkbox ? "" : "hidden"}`}>
                  <input
                    type="text"
                    placeholder="Token Symbol"
                    value={searchBy.tokenSymbol}
                    onChange={(e) => {
                      setSearchBy({ ...searchBy, tokenSymbol: e.target.value });
                      setShowResult(false);
                    }}
                  />
                </div>
              </div>
              {/* <div className="search-option">
                <label
                  onClick={() => setcheckbox_acwa(!acwa_checkbox)}
                  for="Auction creator wallet address"
                  className={`${acwa_checkbox ? "checked" : null}`}
                ></label>
                <p>Auction creator wallet address</p>
                <div className={`implicit ${acwa_checkbox ? "" : "hidden"}`}>
                  <input
                    type="text"
                    placeholder="Enter Auction creator wallet address"
                    value=""
                  />
                </div>
              </div> */}
              <div className="search-box-btn">
                <button
                  className="white"
                  onClick={() => {
                    setcheckbox_poolid(false);
                    setcheckbox_pn(false);
                    setcheckbox_tca(false);
                    setcheckbox_ts(false);
                    setSearchBy({
                      ...searchBy,
                      name: "",
                      address: "",
                      id: -1,
                      tokenSymbol: "",
                    });
                    setShowResult(false);
                  }}
                >
                  Сlear all
                </button>
                <button className="black" onClick={handleClick}>
                  Show Results
                </button>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
        <span className="vr me-3 ms-3" />
        <div className="search-filter-view d-md-flex d-none f-div my-lg-0 my-3">
          <Button
            onClick={() => {
              setSearchBy({ ...searchBy, view: false });
            }}
          >
            <GridView />
          </Button>
          <Button
            onClick={() => {
              setSearchBy({ ...searchBy, view: true });
            }}
          >
            <ListView />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Filters;
