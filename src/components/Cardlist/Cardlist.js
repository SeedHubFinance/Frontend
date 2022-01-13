import React, { useContext, useState, useEffect } from "react";
import TokenSaleCard from "../TokenSaleCard/TokenSaleCard";
import "./Cardlist.scss";
import { Web3Context } from "../../context/web3Context";

import {
  fixedSwapABI,
  fixedSwapContractAddress,
} from "../../contracts/FixedSwap";

const Cardlist = (props) => {
  const [web3, setWeb3] = useContext(Web3Context);
  const [pools, setPools] = useState([]);
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
  }, [web3]);

  return (
    <div className={props.filter.view ? "cardlist" : "grid-view"}>
      {pools.map((pool, index) => {
        console.log(pool);
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
            view={props.filter.view}
          />
        );
      })}
    </div>
  );
};
export default Cardlist;
