export const fixedSwapABI = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "trasnctionFee",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "seedTransactionFee",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "seedTokenMinHolding",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "seedTokenAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "seedHubWallet",
        type: "address",
      },
      {
        internalType: "address",
        name: "usdt",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "FeeCalculated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        components: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "address",
            name: "poolCreator",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "startAuctionAt",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "endAuctionAt",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "claimAuctionFundsAt",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "enableWhiteList",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "maxAmountPerWallet",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "onlySeedHolders",
            type: "bool",
          },
          {
            internalType: "address",
            name: "sellToken",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amountOfSellToken",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "swapRatio",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "isUSDT",
            type: "bool",
          },
        ],
        indexed: false,
        internalType: "struct LP_ICO.Pool",
        name: "pool",
        type: "tuple",
      },
    ],
    name: "FundsAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        components: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "address",
            name: "poolCreator",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "startAuctionAt",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "endAuctionAt",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "claimAuctionFundsAt",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "enableWhiteList",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "maxAmountPerWallet",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "onlySeedHolders",
            type: "bool",
          },
          {
            internalType: "address",
            name: "sellToken",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amountOfSellToken",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "swapRatio",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "isUSDT",
            type: "bool",
          },
        ],
        indexed: false,
        internalType: "struct LP_ICO.Pool",
        name: "pool",
        type: "tuple",
      },
    ],
    name: "FundsRemoved",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "FundsWithdrawn",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        components: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "address",
            name: "poolCreator",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "startAuctionAt",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "endAuctionAt",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "claimAuctionFundsAt",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "enableWhiteList",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "maxAmountPerWallet",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "onlySeedHolders",
            type: "bool",
          },
          {
            internalType: "address",
            name: "sellToken",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amountOfSellToken",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "swapRatio",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "isUSDT",
            type: "bool",
          },
        ],
        indexed: false,
        internalType: "struct LP_ICO.Pool",
        name: "pool",
        type: "tuple",
      },
    ],
    name: "LiqiudityPoolCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        components: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "address",
            name: "poolCreator",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "startAuctionAt",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "endAuctionAt",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "claimAuctionFundsAt",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "enableWhiteList",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "maxAmountPerWallet",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "onlySeedHolders",
            type: "bool",
          },
          {
            internalType: "address",
            name: "sellToken",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amountOfSellToken",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "swapRatio",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "isUSDT",
            type: "bool",
          },
        ],
        indexed: false,
        internalType: "struct LP_ICO.Pool",
        name: "pool",
        type: "tuple",
      },
    ],
    name: "LiqiudityPoolEnded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
    ],
    name: "TokensSwaped",
    type: "event",
  },
  {
    inputs: [],
    name: "_config",
    outputs: [
      {
        internalType: "uint256",
        name: "trasnctionFee",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "seedTransactionFee",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "seedTokenMinHolding",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "seedTokenAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "seedHubWallet",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "addBid",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
    ],
    name: "addBidInUSDT",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "swapRatio",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "decimals",
        type: "uint256",
      },
    ],
    name: "calculateAmount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "funds",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "txFee",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "div",
        type: "uint256",
      },
    ],
    name: "calculateFee",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "address",
            name: "poolCreator",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "startAuctionAt",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "endAuctionAt",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "claimAuctionFundsAt",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "enableWhiteList",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "maxAmountPerWallet",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "onlySeedHolders",
            type: "bool",
          },
          {
            internalType: "address",
            name: "sellToken",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amountOfSellToken",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "swapRatio",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "isUSDT",
            type: "bool",
          },
        ],
        internalType: "struct LP_ICO.Pool",
        name: "pool",
        type: "tuple",
      },
      {
        internalType: "address[]",
        name: "whiteList",
        type: "address[]",
      },
    ],
    name: "create",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "address",
            name: "poolCreator",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "startAuctionAt",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "endAuctionAt",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "claimAuctionFundsAt",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "enableWhiteList",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "maxAmountPerWallet",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "onlySeedHolders",
            type: "bool",
          },
          {
            internalType: "address",
            name: "sellToken",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amountOfSellToken",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "swapRatio",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "isUSDT",
            type: "bool",
          },
        ],
        internalType: "struct LP_ICO.Pool",
        name: "pool",
        type: "tuple",
      },
      {
        internalType: "address[]",
        name: "whiteList",
        type: "address[]",
      },
    ],
    name: "createLiquidityPool",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "ehterStakedByUsers",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "ethCollectedForPoolOwner",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getAllPools",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "address",
            name: "poolCreator",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "startAuctionAt",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "endAuctionAt",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "claimAuctionFundsAt",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "enableWhiteList",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "maxAmountPerWallet",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "onlySeedHolders",
            type: "bool",
          },
          {
            internalType: "address",
            name: "sellToken",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amountOfSellToken",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "swapRatio",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "isUSDT",
            type: "bool",
          },
        ],
        internalType: "struct LP_ICO.Pool[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "getPoolByIndex",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "address",
            name: "poolCreator",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "startAuctionAt",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "endAuctionAt",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "claimAuctionFundsAt",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "enableWhiteList",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "maxAmountPerWallet",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "onlySeedHolders",
            type: "bool",
          },
          {
            internalType: "address",
            name: "sellToken",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amountOfSellToken",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "swapRatio",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "isUSDT",
            type: "bool",
          },
        ],
        internalType: "struct LP_ICO.Pool",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getSeedAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getTransactionFee",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "poolBalances",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "poolOwners",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "sellTokenCollected",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "sendFundsToPoolCreator",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "Seed",
        type: "address",
      },
    ],
    name: "updateSeedAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "txFee",
        type: "uint256",
      },
    ],
    name: "updateSeedTransactionFee",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "txFee",
        type: "uint256",
      },
    ],
    name: "updateTransactionFee",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "whitelist",
        type: "address[]",
      },
    ],
    name: "updateWhiteList",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "userWithDrawFunction",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "whiteLists",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "withdrawUnSoldTokens",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
export const fixedSwapContractAddress =
  "0xea1886bB1DEC9E6A01CBD11CFcc609d9837fCf4c";
export const fujiSwapAddress = "0xe3dB9006979492350006133c9A0bbCf7f3307296";
