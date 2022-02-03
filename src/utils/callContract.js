import {
  fixedSwapABI,
  fixedSwapContractAddress,
  fujiSwapAddress,
} from "../contracts/FixedSwap";
import coinABI from "../contracts/ERC20ABI";
import { useContext } from "react";
import { toast } from "react-toastify";

export async function getPoolById(index, web3) {
  let response = await determineContractAddress(web3);
  if (!!response) {
    const fixedSwapContract = new web3.eth.Contract(
      fixedSwapABI,
      response.address
    );
    const data = await fixedSwapContract.methods.getPoolByIndex(index).call();
    return data;
  }
}

export const approveTokenTransafer = async (
  tokenAllocation,
  address,
  web3,
  toFixed
) => {
  let response = await determineContractAddress(web3);
  if (!!response) {
    const coinContract = new web3.eth.Contract(
      coinABI,
      "0x3d1df20a1f4f147d5597c59161a34cbf9b2b5023"
    );

    return await coinContract.methods
      .approve(response.address, toFixed(tokenAllocation).toString())
      .send({ from: address });
  }
};

export const usdtAddBid = async (web3, index, amount, price, address) => {
  let response = await determineContractAddress(web3);
  console.log(response);
  if (!!response) {
    const contract = new web3.eth.Contract(fixedSwapABI, response.address);
    return await contract.methods
      .addBidInUSDT(index, amount, price)
      .send({ from: address });
  }
};

export const getUsdtBalance = async (address, web3) => {
  const contract = new web3.eth.Contract(
    coinABI,
    "0x3d1df20a1f4f147d5597c59161a34cbf9b2b5023"
  );
  return await contract.methods.balanceOf(address).call();
};

export const determineContractAddress = async (web3) => {
  const response = await web3.eth.net.getId();
  switch (response) {
    case 4:
      return { address: fixedSwapContractAddress, net: response };
    case 43114:
      return false;
    case 43113:
      return { address: fujiSwapAddress, net: response };
    default:
      return false;
  }
};

export const withDrawUnSoldTokens = async (poolId, web3, address) => {
  let response = await determineContractAddress(web3);
  const contract = new web3.eth.Contract(fixedSwapABI, response.address);
  try {
    await contract.methods.withdrawUnSoldTokens(poolId).send({ from: address });
    toast.success("Withdraw successfully");
  } catch (e) {
    toast.error(
      "You are not a pool creator or maybe you funds already Withdrew"
    );
  }
};
