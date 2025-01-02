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

  const handleActiveCompaniesClick = () => {
    navigate("/active-companies"); // Replace with the route for active companies
  };

  const handleAddContestClick = () => {
    navigate("/add-contest"); // Replace with the route for adding a contest
  };
  const handleALLContestClick = () => {
    navigate("/all-contest"); // Replace with the route for adding a contest
  };

  return (
    <div>
      {!status ? (
        <Waiting />
      ) : (
        <div className="flex flex-col md:flex-row justify-center max-w-7xl items-center gap-6 p-6">
          {/* Card for Active Companies */}
          <div
            className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md rounded-lg w-full md:w-1/3 p-6 cursor-pointer hover:shadow-lg transform hover:scale-105 transition duration-300"
            onClick={handleActiveCompaniesClick}
          >
            <h2 className="text-2xl font-bold mb-4">Active Companies</h2>
            <p>View the list of companies currently offering opportunities.</p>
          </div>

          {/* Card for Add Contest */}
          <div
            className="bg-gradient-to-r from-green-500 to-teal-500 text-white shadow-md rounded-lg w-full md:w-1/3 p-6 cursor-pointer hover:shadow-lg transform hover:scale-105 transition duration-300"
            onClick={handleAddContestClick}
          >
            <h2 className="text-2xl font-bold mb-4">Add Contest</h2>
            <p>Create a new contest and reward students with tokens.</p>
          </div>
          <div
            className="bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-md rounded-lg w-full md:w-1/3 p-6 cursor-pointer hover:shadow-lg transform hover:scale-105 transition duration-300"
            onClick={handleALLContestClick}
          >
            <h2 className="text-2xl font-bold mb-4">All Contest</h2>
            <p>View all active contest.</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
