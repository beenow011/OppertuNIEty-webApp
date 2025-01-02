import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Trophy, AlertCircle, Ban, Gift } from "lucide-react";
import toast from "react-hot-toast";
import { useWeb3Context } from "../context/useWeb3Context";
import { getNFTContractInstance } from "../utils/getContractInstance";

function ContestManage() {
  const { id } = useParams();
  const [contest, setContest] = useState(null);
  const [standings, setStandings] = useState([]);
  const [loading, setLoading] = useState(true);

  const { Web3State } = useWeb3Context();
  const { selectedAccount } = Web3State;

  // Fetch contest details and standings
  const fetchContestData = async () => {
    try {
      const [contestRes, standingsRes] = await Promise.all([
        axios.get(
          `http://localhost:3000/api/contest/get-contest-by-id/${id}?address=${selectedAccount}`
        ),
        axios.get(
          `http://localhost:3000/api/contest/get-result/${id}?address=${selectedAccount}`
        ),
      ]);
      setContest(contestRes.data.contest);
      setStandings(standingsRes.data.results);
    } catch (error) {
      console.error(error);
      toast.error("Error fetching contest data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    selectedAccount && fetchContestData();
  }, [id, selectedAccount]);

  const handleEndContest = async () => {
    try {
      await axios.patch(
        `http://localhost:3000/api/contest/end-contest/${id}?address=${selectedAccount}`
      );
      toast.success("Contest ended successfully");
      fetchContestData(); // Refresh data
    } catch (error) {
      console.error(error);
      toast.error("Error ending contest");
    }
  };

  const [balanceNFT, setBalanceNFT] = useState(0);
  const fetchBalance = async () => {
    const contract = await getNFTContractInstance();
    const balance = await contract.balanceOfNFT(selectedAccount);
    console.log("NFT Balance", balance);
    setBalanceNFT(balance);
  };
  useEffect(() => {
    selectedAccount && fetchBalance();
  }, [selectedAccount]);

  const handleMintNFT = async () => {
    // TODO: Implement mint NFT logic here
    const contract = await getNFTContractInstance();
    const tx = await contract.mintNFT();
    fetchBalance();
    console.log("Mint NFT button clicked", tx);
  };
  //   console.log("selectedAccount", standings);
  const handleDeliverNFT = async () => {
    try {
      const toAddress = standings[0].studentId.userAddress;
      const contract = await getNFTContractInstance();

      // Get all tokens owned by the selected account
      const tokens = await contract.getTokenByOwner(selectedAccount);

      // Extract the first token ID from the result
      if (tokens.length === 0) {
        throw new Error("No tokens available for transfer");
      }
      const token = tokens[0];

      // Ensure token is converted to a BigNumberish value
      const tokenId = BigInt(token); // Use BigInt to handle large values

      const tx = await contract.transferNFT(toAddress, tokenId);
      console.log("Deliver NFT button clicked", tx);
      toast.success("NFT delivered successfully");
    } catch (e) {
      console.log(e);
      toast.error("Error delivering NFT");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <AlertCircle className="w-8 h-8 text-blue-500 animate-pulse" />
      </div>
    );
  }

  const getMedalColor = (index) => {
    switch (index) {
      case 0:
        return "text-yellow-400";
      case 1:
        return "text-gray-400";
      case 2:
        return "text-amber-600";
      default:
        return "text-white";
    }
  };

  const getBackgroundColor = (index) => {
    switch (index) {
      case 0:
        return "bg-yellow-400/10";
      case 1:
        return "bg-gray-400/10";
      case 2:
        return "bg-amber-600/10";
      default:
        return "bg-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Contest Header */}
        <div className="bg-gray-800 rounded-lg p-6 mb-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white mb-2">
                {contest?.contestName}
              </h1>
              <p className="text-gray-400">
                Total Participants: {standings.length}
              </p>
            </div>
            <div className="flex space-x-4">
              {contest?.contestStatus ? (
                <button
                  onClick={handleEndContest}
                  className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <Ban className="w-5 h-5" />
                  <span>End Contest</span>
                </button>
              ) : (
                <>
                  <p className="text-gray-400">
                    NFT Balance: {balanceNFT.toString()}
                  </p>
                  <button
                    onClick={handleMintNFT}
                    className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <Gift className="w-5 h-5" />
                    <span>Mint NFT</span>
                  </button>
                  <button
                    onClick={handleDeliverNFT}
                    className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <Gift className="w-5 h-5" />
                    <span>Deliver NFT</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Standings Table */}
        <div className="bg-gray-800 rounded-lg border border-gray-700">
          <div className="p-4 border-b border-gray-700">
            <h2 className="text-xl font-semibold text-white">Standings</h2>
          </div>

          <div className="p-4">
            {standings.length > 0 ? (
              <div className="space-y-3">
                {standings.slice(0, 10).map((result, index) => (
                  <div
                    key={result._id}
                    className={`${getBackgroundColor(
                      index
                    )} rounded-lg p-4 transition-all hover:scale-[1.01] border border-gray-700`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div
                          className={`flex items-center ${getMedalColor(
                            index
                          )}`}
                        >
                          {index < 3 ? (
                            <Trophy className="w-6 h-6" />
                          ) : (
                            <span className="text-lg font-medium w-6 text-center">
                              {index + 1}
                            </span>
                          )}
                        </div>

                        <div>
                          <h3 className="font-medium text-white">
                            {result.studentId.name}
                          </h3>
                          <p className="text-sm text-gray-400">
                            {result.studentId.usn}
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-lg font-semibold text-blue-400">
                          {result.score} points
                        </div>
                        <div className="text-sm text-gray-400">
                          Time: {result.timeTaken}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-400 py-8">
                No participants yet
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContestManage;
