import React from "react";
import { useWeb3Context } from "../context/useWeb3Context";
import { useNavigate } from "react-router-dom";

function Header() {
  const { updateWeb3State, Web3State } = useWeb3Context();
  const { selectedAccount } = Web3State;
  const navigate = useNavigate();
  const handlelogout = () => {
    updateWeb3State({
      selectedAccount: null,
      signature: null,
    });
    localStorage.removeItem("token");

    navigate("/connect-wallet");
  };
  return (
    <header className="bg-gray-900 text-white shadow-lg py-5">
      <div className="container mx-auto flex justify-between items-center px-8">
        <h1 className="text-3xl font-extrabold">
          <span className="text-slate-400">Opportu</span>
          <span className="text-blue-500">NIE</span>
          <span className="text-slate-400">ty</span>
          <span className="text-gray-500 text-xl font-semibold ml-2">
            - Admin Platform
          </span>
        </h1>
        {selectedAccount && ( // Render only if selectedAccount exists
          <nav className="hidden md:flex items-center space-x-6 p-4 bg-gray-800 shadow-lg rounded-md">
            <a
              href="#dashboard"
              className="text-white hover:text-blue-400 transition duration-300 font-medium"
            >
              Profile
            </a>
            {import.meta.env.VITE_ADMIN_WALLET_ADDRESS.toLowerCase() ===
              selectedAccount.toLowerCase() && (
              <a
                href="/admin"
                className="text-white hover:text-green-400 transition duration-300 font-medium"
              >
                Approve Status
              </a>
            )}

            <a
              href="/post-company"
              className="text-white hover:text-blue-400 transition duration-300 font-medium"
            >
              Post Company
            </a>
            <a
              href="/home"
              className="text-white hover:text-blue-400 transition duration-300 font-medium"
            >
              Home
            </a>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold transition duration-300"
              onClick={handlelogout}
            >
              Logout
            </button>
          </nav>
        )}
      </div>
    </header>
  );
}

export default Header;
