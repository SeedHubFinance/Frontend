import React, { useContext, useState, useEffect } from "react";
import TokenSaleCard from "../TokenSaleCard/TokenSaleCard";
import "./Cardlist.scss";
import coinABI from "../../contracts/ERC20ABI";
import { Web3Context } from "../../context/web3Context";

import ReactPaginate from "react-paginate";

import {
  fixedSwapABI,
  fixedSwapContractAddress,
} from "../../contracts/FixedSwap";

const Cardlist = ({
  filter,
  searchBy,
  setSearchBy,
  showResult,
  setShowResult,
}) => {
  const [web3, setWeb3] = useContext(Web3Context);
  const [pools, setPools] = useState([]);
  const [filteredPools, setFilteredPools] = useState([]);
  // const [searchByFilter, setSearchByFilter] = useState([]);

  //-------- Pagination--------

  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  const itemsPerPage = 8;

  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(filteredPools.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredPools.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, filteredPools]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredPools.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  // -------------------

  const getAllPools = async () => {
    if (web3) {
      let fixedSwapContract = new web3.eth.Contract(
        fixedSwapABI,
        fixedSwapContractAddress
      );

      let addresses = await web3?.eth.getAccounts();

      const data = await fixedSwapContract.methods
        .getAllPools()
        .call({ from: addresses[0] });
      const finalData = [];
      await Promise.all(
        data.map(async (d, index) => {
          const tokenContract = new web3.eth.Contract(coinABI, d.sellToken);
          const tokenSymbol = await tokenContract.methods.symbol().call();
          finalData.push({ tokenSymbol, index, ...d });
        })
      );
      setPools(finalData.sort((a, b) => (a["index"] > b["index"] ? -1 : 1)));
    }
  };

  useEffect(() => {
    getAllPools();
    if (currentItems.length > 0) {
      setCurrentItems([]);
      setPageCount(0);
      setItemOffset(0);
    }
    console.log("Web3");
  }, [web3]);

  const symbolFilter = async (pool) => {
    const tokenContract = new web3.eth.Contract(coinABI, pool.sellToken);
    const tokenSymbol = await tokenContract.methods.symbol().call();
    if (tokenSymbol.toUpperCase() !== searchBy.tokenSymbol.toUpperCase()) {
      return false;
    }
    return true;
  };

  const filteredData = () => {
    const filterData = filteredPools.filter((pool, index) => {
      if (searchBy.id) {
        if (parseInt(searchBy.id) !== pool.index) {
          return false;
        }
      }
      if (searchBy.name) {
        if (!pool.name.toUpperCase().includes(searchBy.name.toUpperCase())) {
          return false;
        }
      }
      if (searchBy.sellToken) {
        if (searchBy.sellToken.toUpperCase() !== pool.sellToken.toUpperCase()) {
          return false;
        }
      }
      if (searchBy.tokenSymbol) {
        if (
          searchBy.tokenSymbol.toUpperCase() !== pool.tokenSymbol.toUpperCase()
        ) {
          return false;
        }
      }
      return true;
    });
    console.log(filterData);
    // filterData.then((e) => console.log(e));
    setFilteredPools(filterData);
  };

  useEffect(() => {
    if (showResult === false) return getAllPools();
    filteredData();
  }, [showResult]);

  useEffect(() => {
    if (!pools) return;
    let data = pools.filter((item) => {
      if (filter.status === "all") {
        return true;
      }
      if (filter.status === "live") {
        return new Date(item.endAuctionAt * 1000) > new Date();
      }
      if (filter.status === "closed") {
        return new Date(item.endAuctionAt * 1000) < new Date();
      }
    });
    setFilteredPools(data);
  }, [pools, filter]);

  useEffect(() => {
    console.log(filteredPools);
  }, [filteredData]);

  return (
    <>
      <div className={searchBy.view ? "cardlist" : "grid-view"}>
        {currentItems.map((pool) => {
          console.log(pool);
          return (
            <TokenSaleCard
              key={pool.index}
              index={pool.index}
              name={pool.name}
              sellToken={pool.sellToken}
              swapRatio={pool.swapRatio}
              maxAmountPerWallet={pool.maxAmountPerWallet}
              endAuctionAt={pool.endAuctionAt}
              isOnlySeed={pool.onlySeedHolders}
              isOnlyWhiteList={pool.enableWhiteList}
              claimAuctionFundsAt={pool["claimAuctionFundsAt"]}
              view={searchBy.view}
            />
          );
        })}
      </div>
      <div className="pagination-wapper2">
        <ReactPaginate
          breakLabel="..."
          nextLabel="Next"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          containerClassName="paginate"
          previousLabel="Prev"
          previousLabel="Prev"
          renderOnZeroPageCount={null}
        />
      </div>
    </>
  );
};
export default Cardlist;
