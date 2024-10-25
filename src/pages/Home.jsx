import React from "react";
import { useWeb3Context } from "../context/useWeb3Context";

function Home() {
  const { updateWeb3State, Web3State } = useWeb3Context();
  const { selectedAccount } = Web3State;
  console.log(
    "Home",
    import.meta.env.VITE_ADMIN_WALLET_ADDRESS.toString().toLowerCase() ===
      selectedAccount.toLowerCase()
  );
  return <div>Home</div>;
}

export default Home;
