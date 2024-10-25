import { useState } from "react";
import { Web3Context } from "./createWeb3Context";
const Web3Provider = ({ children }) => {
  const [Web3State, setWeb3State] = useState({
    selectedAccount: null,
    signature: null,
  });
  const updateWeb3State = (newState) => {
    setWeb3State((prevState) => ({ ...prevState, ...newState }));
  };
  return (
    <Web3Context.Provider value={{ Web3State, updateWeb3State }}>
      {children}
    </Web3Context.Provider>
  );
};

export default Web3Provider;
