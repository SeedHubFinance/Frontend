import React, { useContext, useState, useEffect } from "react";
import TokenSaleCard from "../TokenSaleCard/TokenSaleCard";
import "./Cardlist.scss";
import { Web3Context } from "../../context/web3Context";

import ReactPaginate from "react-paginate";

import {
  fixedSwapABI,
  fixedSwapContractAddress,
} from "../../contracts/FixedSwap";

const Cardlist = (props) => {
  const [web3, setWeb3] = useContext(Web3Context);
  const [pools, setPools] = useState([]);

  // ----pagination----
  // We start with an empty list of items.
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  const itemsPerPage = 8;
  let cards = [];
  // console.log(currentItems);

  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    console.log(pools);
    setCurrentItems(pools.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(pools.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, pools]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % pools.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  // ---------------------------------------

  const getAllPools = async () => {
    if (web3) {
      let fixedSwapContract = new web3.eth.Contract(
        fixedSwapABI,
        fixedSwapContractAddress
      );

      let addresses = await web3?.eth.getAccounts();

      await fixedSwapContract.methods
        .getAllPools()
        .call({ from: addresses[0] })
        .then((data) => setPools(data));
    }
  };

  useEffect(() => {
    getAllPools();
    if (pools.length > 0) {
      setCurrentItems([]);
      setPageCount(0);
      setItemOffset(0);
    }
    console.log("Web3");
  }, [web3]);

  return (
    <>
      <div className={props.filter.view ? "cardlist" : "grid-view"}>
        {currentItems.map((pool, index) => {
          return (
            <TokenSaleCard
              key={index + itemOffset}
              index={index + itemOffset}
              name={pool.name}
              sellToken={pool.sellToken}
              swapRatio={pool.swapRatio}
              maxAmountPerWallet={pool.maxAmountPerWallet}
              endAuctionAt={pool.endAuctionAt}
              isOnlySeed={pool.onlySeedHolders}
              isOnlyWhiteList={pool.enableWhiteList}
              view={props.filter.view}
            />
          );

          // if filter for e.g filter.name == pool.name return TokenSaleCard
        })}
      </div>
      <ReactPaginate
        breakLabel="..."
        nextLabel="Next"
        containerClassName="paginate"
        nextLinkClassName="next-btn"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLinkClassName="prev-btn"
        previousLabel="Prev"
        renderOnZeroPageCount={null}
      />
    </>
  );
};
export default Cardlist;
