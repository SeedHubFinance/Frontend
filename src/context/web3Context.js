import { useState, createContext } from "react";

export const Web3Context = createContext();

export const Web3Provider = (props) => {
  const [web3, setWeb3] = useState(null);
  const [address, setAddress] = useState(null);

  return (
    <Web3Context.Provider value={[web3, setWeb3, address, setAddress]}>
      {props.children}
    </Web3Context.Provider>
  );
};
