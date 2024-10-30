import React, { useEffect, useState } from "react";
import { useWeb3Context } from "../context/useWeb3Context";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Check, X } from "lucide-react"; // Import icons from lucide-react
import toast from "react-hot-toast";
import NoUnapproved from "../comp/NoUnapproved";

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
        setUnapprovedUsers(res.data.unapprovedCoordinators);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [selectedAccount]);
  console.log(unapprovedUsers);

  const handleApprove = (userAddress) => {
    axios
      .post(
        `http://localhost:3000/api/coordinator-auth/approve-status?address=` +
          selectedAccount,
        {
          userAddress,
        }
      )
      .then(() => {
        toast.success("Coordinator approved successfully");
        setUnapprovedUsers((prevUsers) =>
          prevUsers.filter((user) => user.userAddress !== userAddress)
        );
      })
      .catch((err) => {
        toast.error("Failed to approve coordinator");
        console.error(err);
      });
  };

  const handleDisapprove = (userAddress) => {
    axios
      .post(
        `http://localhost:3000/api/coordinator-auth/approve-status?address=` +
          selectedAccount,
        {
          userAddress,
        }
      )
      .then(() => {
        toast.success("Coordinator disapproved successfully");
        setUnapprovedUsers((prevUsers) =>
          prevUsers.filter((user) => user.userAddress !== userAddress)
        );
      })
      .catch((err) => {
        toast.error("Failed to disapprove coordinator");
        console.error(err);
      });
  };

  const maskAddress = (address) => {
    return `${address.slice(0, 2)}XXXX${address.slice(-3)}`;
  };

  return (
    <div className="admin-container p-10 bg-gradient-to-br from-gray-900 to-black text-gray-200 max-w-3xl mx-auto rounded-xl mt-7 shadow-xl border border-gray-700">
      {unapprovedUsers.length === 0 ? (
        <NoUnapproved />
      ) : (
        <div>
          <h2 className="text-3xl font-bold text-center text-white mb-8 tracking-wide">
            Unapproved Coordinators
          </h2>
          <ul className="user-list space-y-6">
            {unapprovedUsers?.map((user) => (
              <li
                key={user.userAddress}
                className="user-item  bg-gray-800/60 p-6 rounded-lg flex flex-col gap-5 md:flex-row justify-between items-center shadow-lg hover:bg-gray-800/80 transition-all duration-300 transform  border border-gray-700 hover:border-gray-600"
              >
                <div className="user-details space-y-1">
                  <p>
                    <span className="font-semibold text-gray-400">Name:</span>{" "}
                    {user.name}
                  </p>
                  <p>
                    <span className="font-semibold text-gray-400">USN:</span>{" "}
                    {user.usn}
                  </p>
                  <p>
                    <span className="font-semibold text-gray-400">Branch:</span>{" "}
                    {user.branch}
                  </p>
                  <p>
                    <span className="font-semibold text-gray-400">
                      Address:
                    </span>{" "}
                    {maskAddress(user.userAddress)}
                  </p>
                </div>
                <div className="action-buttons flex space-x-4">
                  <button
                    className="approve-button flex items-center bg-green-600/80 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-green-500/90 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200"
                    onClick={() => handleApprove(user.userAddress)}
                  >
                    <Check className="mr-1" /> Approve
                  </button>
                  <button
                    className="disapprove-button flex items-center bg-red-600/80 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-red-500/90 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200"
                    onClick={() => handleDisapprove(user.userAddress)}
                  >
                    <X className="mr-1" /> Disapprove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Admin;
