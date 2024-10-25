import React, { useEffect, useState } from "react";
import { useWeb3Context } from "../context/useWeb3Context";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Admin() {
  const { updateWeb3State, Web3State } = useWeb3Context();
  const { selectedAccount } = Web3State;
  const navigate = useNavigate();
  const [unapprovedUsers, setUnapprovedUsers] = useState([]);

  useEffect(() => {
    if (!selectedAccount) {
      navigate("/connect-wallet");
    }
    if (
      import.meta.env.VITE_ADMIN_WALLET_ADDRESS.toString().toLowerCase() !==
      selectedAccount.toLowerCase()
    ) {
      navigate("/home");
    }
  }, [selectedAccount, navigate]);
  useEffect(() => {
    axios
      .get(
        "http://localhost:3000/api/coordinator-auth/unapproved?address=" +
          selectedAccount
      )
      .then((res) => {
        console.log("res", res.data);
        setUnapprovedUsers(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  return <div>Admin</div>;
}

export default Admin;
