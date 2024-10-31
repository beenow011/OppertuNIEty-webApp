import React, { useEffect, useState } from "react";
import { useWeb3Context } from "../context/useWeb3Context";
import { useNavigate } from "react-router-dom";
import Waiting from "../comp/Waiting";
import axios from "axios";
import AllCompanies from "../comp/AllCompanies";

function Home() {
  const { updateWeb3State, Web3State } = useWeb3Context();
  const { selectedAccount } = Web3State;
  const [status, setStatus] = useState(false);
  const navigate = useNavigate();
  async function getStatus() {
    try {
      const res = await axios.get(
        "http://localhost:3000/api/coordinator-auth/get-status?userAddress=" +
          selectedAccount
      );
      console.log(res.data);
      setStatus(res.data.approvedStatus);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getStatus();
  }, []);
  useEffect(() => {
    if (!selectedAccount) {
      navigate("/connect-wallet");
    }
  }, [selectedAccount, navigate]);

  return <div>{!status ? <Waiting /> : <AllCompanies />}</div>;
}

export default Home;
