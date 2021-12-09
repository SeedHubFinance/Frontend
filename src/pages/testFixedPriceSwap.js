import Footer from "../components/footer";
import Header from "../components/header";
import Jumbotron from "../components/jumbotron";
import Card from "../components/card";
import Pagination from "../components/pagination";
import { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";

import lpABI from "../contracts/LiqudityPoolABI";
import coinABI from "../contracts/ERC20ABI";

import {fixedSwapABI,fixedSwapContractAddress} from "../contracts/FixedSwap"


import InputField from "../components/inputField.js";


const FixedPriceSalePage = () => {
  const [address, setAddress] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  const [LPContract, setLPContract] = useState(null);
  const [FakeCoin, setFakeCoin] = useState(null);

  const [amount,setAmount] = useState(0);
  


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


  const [contractERC20Balance,setContractERC20Balance] = useState(0);
  const [contractEthBalance,setContractEthBalance] = useState(0);

  const approveTransfer = async()=>{
     
    let contract2 = new window.web3.eth.Contract(coinABI,"0x9BeB4651743A3d78047021858FD6Be88102E7c34");
    await contract2.methods.approve(fixedSwapContractAddress,amountOfToken).send({from:"0x64165472c57771287B957B5399d91AD707c70D72"}).then(data=>console.log(data)).catch(e=>console.log(e));

  }


  const addBid= async()=>{
    
    let contract = new window.web3.eth.Contract(fixedSwapABI,fixedSwapContractAddress);

    let price = await contract.methods.calculatePrice(amount,20).call({from:"0x64165472c57771287B957B5399d91AD707c70D72"});

    console.log(price);

    await contract.methods.addBid(0,amount).send({from:"0x64165472c57771287B957B5399d91AD707c70D72",value:price});

  }


  const createPool = async()=>{ 

    let contract = new window.web3.eth.Contract(fixedSwapABI,fixedSwapContractAddress);

    const poolReq = [
        poolName,
        tokenAddress,
        20,
        200,
        amountOfToken,
        startAuctionAt,
        endAuctionAt,
        claimAuctionFundsAt, 
        false,
        false
    ]

    await contract.methods.createLiquidityPool(poolReq).send({from:"0x64165472c57771287B957B5399d91AD707c70D72"}).then(data=>console.log(data));

  }


  const contractBalanceERC20 = async()=>{


    let contract2 = new window.web3.eth.Contract(coinABI,"0x9BeB4651743A3d78047021858FD6Be88102E7c34");

    await contract2.methods.balanceOf(fixedSwapContractAddress).call({from:"0x64165472c57771287B957B5399d91AD707c70D72"}).then(data=>setContractERC20Balance(data)).catch(e=>console.log(e));

  }

  const contractBalanceEth = async()=>{

    let balance = await window.web3.eth.getBalance(fixedSwapContractAddress);
    console.log(balance);
    setContractEthBalance(window.web3.utils.fromWei(balance));

  }


  const balanceERC20 = async()=>{


    let contract2 = new window.web3.eth.Contract(coinABI,"0x9BeB4651743A3d78047021858FD6Be88102E7c34");

    await contract2.methods.balanceOf("0x64165472c57771287B957B5399d91AD707c70D72").call({from:"0x64165472c57771287B957B5399d91AD707c70D72"}).then(data=>setERC20Balance(data)).catch(e=>console.log(e));

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
      
      <Grid style={{margin:"2em"}}>
      <div>

            <label>
                Contract ERC-20 Balance:{contractERC20Balance}
                        <button style={{margin:"2em"}} onClick={()=>contractBalanceERC20()}>Reload</button>
                </label>
                <br/>
                <label>
                Contract Eth Balance:{contractEthBalance}
                        <button  style={{margin:"2em"}} onClick={()=>contractBalanceEth()}>Reload</button>
                </label>
                <br/>
                <label>
                Current ERC-20 Balance:{erc20Balance}
                        <button style={{margin:"2em"}} onClick={()=>balanceERC20()}>Reload</button>
                </label>
                <br/>
                <label>
                Current Eth Balance:{currentEthBalance}
                        <button  style={{margin:"2em"}} onClick={()=>balanceEth()}>Reload</button>
                </label>
                
            </div>

        <div>
            <h3 >Add token</h3>
            <InputField label={"Enter Token Address: "}  type="text" callBackFnInput = {setTokenAddress}  />
            <InputField label={"Amount: "}  type="number" callBackFnInput = {setAmountOfToken}  />
            <button onClick= {()=>{approveTransfer()}}>Approve Transfer</button>

        </div>
      
        <Grid style={{display:"grid"}}>
             <h3>Create Pool</h3>
             <div>
                <InputField label={"Enter pool name:"} type="text" callBackFnInput = {setPoolName} />     
             </div>
        
            <label>
              Maximum Amount per wallet:
              <input
                type="Number"
                //   value={name}
                  onChange={(e) => setmaxAmountPerWallet(e.target.value)}
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
                  onChange={(e) => setOnlySeedHolders()}
              />
            </label>
            <label>
               Enable white list:
              <input
                type="checkbox"
                  onChange={(e) => {}}
              />
            </label>
            <br/>
            <button
                onClick={() =>createPool()}>
                   Create pool </button>
                   <br/>
            <div>

        </div>

        </Grid>

        <div>
            <h3 >Add Bid</h3>
            <InputField label={"Amount to bid: "} type="number"  buttonName={"Add Bid"} callBackFnInput = {setAmount} callBackFnButton={addBid} />
        </div>

      </Grid>
    </div>
  );
};

export default FixedPriceSalePage;
