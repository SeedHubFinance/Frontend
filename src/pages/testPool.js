import Footer from "../components/footer";
import Header from "../components/header";
import Jumbotron from "../components/jumbotron";
import Card from "../components/card";
import Pagination from "../components/pagination";
import { useEffect, useState } from "react";

import lpABI from "../contracts/LiqudityPoolABI";
import coinABI from "../contracts/ERC20ABI";

const TestPage = () => {
  const [address, setAddress] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  const [LPContract, setLPContract] = useState(null);
  const [FakeCoin, setFakeCoin] = useState(null);

  const [poolName,setPoolName] = useState(null);
  const [tokenAddress,setTokenAddress] = useState(null);
  const [swapRatio,setSwapRatio] = useState(null);
  const [maxAmountPerWallet,setmaxAmountPerWallet] = useState(null);
  const [amountOfToken,setAmountOfToken] = useState(null);
  const [startAuctionAt,setStartAuctionAt] = useState(null);
  const [endAuctionAt,setEndAuctionAt] = useState(null);
  const [claimAuctionFundsAt,setClaimAuctionFundsAt] = useState(null);
  const [onlySeedHolders,setOnlySeedHolders] = useState(false);
  const [enableWhiteList, setEnableWhiteList] = useState(false);


  const [erc20Balance,setERC20Balance] = useState(0);
  const [currentEthBalance,setCurrentEthBalance] = useState(0);

  const createPool = async()=>{ 

    let contract = new window.web3.eth.Contract(lpABI,"0xbf8d02c017E5552aC6dbE81ef47d99B058e80b88");

    let contract2 = new window.web3.eth.Contract(coinABI,"0x7c29B49658101aF465c1cCB291b670bA9a094533");

    await contract2.methods.approve("0xbf8d02c017E5552aC6dbE81ef47d99B058e80b88",5000);

    const poolReq = [
        poolName,
        tokenAddress,
        swapRatio,
        maxAmountPerWallet,
        amountOfToken,
        startAuctionAt,
        endAuctionAt,
        claimAuctionFundsAt, 
        false,
        false
    ]

    await contract.methods.create(poolReq).send({from:"0x64165472c57771287B957B5399d91AD707c70D72"}).then(data=>console.log(data));

  }



  const balanceERC20 = async()=>{


    let contract2 = new window.web3.eth.Contract(coinABI,"0xaD6D458402F60fD3Bd25163575031ACDce07538D");

    await contract2.methods.name().call().then(data=>console.log("data",data)).catch(e=>console.log(e));

    // let balance = await contract2.methods.balanceOf("0x764898C3149F884656216637218B40aD9b885Dec").call()

    // console.log(balance)

    // setERC20Balance(window.web3.utils.fromWei(balance))

  }

  const balanceEth = async()=>{

    let balance = await window.web3.eth.getBalance("0x64165472c57771287B957B5399d91AD707c70D72");
    setCurrentEthBalance(window.web3.utils.fromWei(balance));

  }


  const swapToken = async()=>{

    let contract = new window.web3.eth.Contract(lpABI,"0xbf8d02c017E5552aC6dbE81ef47d99B058e80b88");

    let contract2 = new window.web3.eth.Contract(coinABI,"0xcB102DCc31ED34CB12DF0c4CE108B87553e0895b");

    contract2.methods.approve("0xbf8d02c017E5552aC6dbE81ef47d99B058e80b88",20)

    await contract.methods.swapToken(0,20).send({from:"0x64165472c57771287B957B5399d91AD707c70D72",value:1000000000000000000}).then(data=>console.log(data));


  }

  return (
    <div>
      <Header />

      <div class="container">
        <div class="row row-cols-1 row-cols-md-3">
            <label>
              Enter pool name:
              <input
                type="text"
                //   value={name}
                  onChange={(e) => setPoolName(e.target.value)}
              />
            </label>
            <label>
              Enter Token Address:
              <input
                type="text"
                //   value={name}
                  onChange={(e) => setTokenAddress(e.target.value)}
              />
            </label>
            <label>
               Amount of tokens to add:
              <input
                type="number"
                //   value={name}
                  onChange={(e) => setAmountOfToken(e.target.value)}
              />
            </label>
            <label>
              Start Auction At:
              <input
                type="number"
                //   value={name}
                  onChange={(e) => setStartAuctionAt(e.target.value)}
              />
            </label>
            <label>
              End Auction At:
              <input
                type="number"
                //   value={name}
                  onChange={(e) => setEndAuctionAt(e.target.value)}
              />
            </label>
            <label>
              Claim Funds At:
              <input
                type="number"
                //   value={name}
                  onChange={(e) => setClaimAuctionFundsAt(e.target.value)}
              />
            </label>
            <label>
                Swap Ratio:
              <input
                type="number"
                //   value={name}
                  onChange={(e) => setSwapRatio(e.target.value)}
              />
            </label>
            <label>
                Only Seed token holders:
              <input
                type="checkbox"
                //   value={name}
                //   onChange={(e) => setSeedHolders()}
              />
            </label>
            <label>
               Enable white list:
              <input
                type="checkbox"
                //   value={name}
                //   onChange={(e) => ()}
              />
            </label>
            <br/>
            <button
                onClick={() =>createPool()}>
                   Create pool </button>
                   <br/>
                  <button
                onClick={() =>swapToken()}>
                  Swap test tokens 
                  </button>
                  <br/>
            <div>

            <label>
               Current ERC-20 Balance:{erc20Balance}
                    <button onClick={()=>balanceERC20()}>Reload</button>
           
            </label>
            <br/>
            <label>
               Current Eth Balance:{currentEthBalance}
                    <button onClick={()=>balanceEth()}>Reload</button>
            </label>

            </div>

        </div>
      </div>
    </div>
  );
};

export default TestPage;
