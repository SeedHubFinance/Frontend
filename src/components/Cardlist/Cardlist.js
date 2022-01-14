import React, { useContext, useState, useEffect } from "react";
import TokenSaleCard from "../TokenSaleCard/TokenSaleCard";
import "./Cardlist.scss";
import coinABI from "../../contracts/ERC20ABI";
import { Web3Context } from "../../context/web3Context";

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
        data.map(async (d) => {
          const tokenContract = new web3.eth.Contract(coinABI, d.sellToken);
          const tokenSymbol = await tokenContract.methods.symbol().call();
          finalData.push({ tokenSymbol, ...d });
        })
      );
      setPools(finalData);
    }
  };

  useEffect(() => {
    getAllPools();
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
      if (searchBy.id > -1) {
        if (parseInt(searchBy.id) !== index) {
          return false;
        }
      }
      if (searchBy.name) {
        if (searchBy.name.toUpperCase() !== pool.name.toUpperCase()) {
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

  return (
    <div className={searchBy.view ? "cardlist" : "grid-view"}>
      {filteredPools.map((pool, index) => {
        return (
          <TokenSaleCard
            key={index}
            index={index}
            name={pool.name}
            sellToken={pool.sellToken}
            swapRatio={pool.swapRatio}
            maxAmountPerWallet={pool.maxAmountPerWallet}
            endAuctionAt={pool.endAuctionAt}
            isOnlySeed={pool.onlySeedHolders}
            isOnlyWhiteList={pool.enableWhiteList}
            view={searchBy.view}
          />
        );
      })}
    </div>
  );
};
export default Cardlist;
