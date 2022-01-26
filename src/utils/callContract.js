import { fixedSwapABI, fixedSwapContractAddress } from "../contracts/FixedSwap";
import coinABI from "../contracts/ERC20ABI";
import { useContext } from "react";

export async function getPoolById(index, web3) {
  let fixedSwapContract = new web3.eth.Contract(
    fixedSwapABI,
    fixedSwapContractAddress
  );
  const data = await fixedSwapContract.methods.getPoolByIndex(index).call();
  return data;
}

export const approveTokenTransafer = async (
  tokenAllocation,
  address,
  web3,
  toFixed
) => {
  let coinContract = new web3.eth.Contract(
    coinABI,
    "0x3b00ef435fa4fcff5c209a37d1f3dcff37c705ad"
  );

  return await coinContract.methods
    .approve(fixedSwapContractAddress, toFixed(tokenAllocation).toString())
    .send({ from: address });
};
