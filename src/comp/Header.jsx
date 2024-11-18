import React from "react";
import { useWeb3Context } from "../context/useWeb3Context";
import { useNavigate } from "react-router-dom";
import { User, Home, Briefcase, LogOut, CheckSquare } from "lucide-react";

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
        {/* Logo and Title */}
        <h1 className="text-3xl font-extrabold flex items-center">
          <span className="text-slate-400">Opportu</span>
          <span className="text-blue-500">NIE</span>
          <span className="text-slate-400">ty</span>
          <span className="text-gray-500 text-xl font-semibold ml-2">
            - Admin Platform
          </span>
        </h1>

        {/* Navigation */}
        {selectedAccount && (
          <nav className="hidden md:flex items-center space-x-6 p-4 bg-gray-800 shadow-lg rounded-md">
            {/* Profile */}
            <div
              className="group relative"
              onClick={() => navigate("/profile")}
            >
              <User className="text-white hover:text-blue-400 transition duration-300 cursor-pointer" />
              <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm bg-gray-700 text-white py-1 px-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Profile
              </span>
            </div>

            {/* Approve Status (visible only to admin) */}
            {import.meta.env.VITE_ADMIN_WALLET_ADDRESS.toLowerCase() ===
              selectedAccount.toLowerCase() && (
              <div
                className="group relative"
                onClick={() => navigate("/admin")}
              >
                <CheckSquare className="text-white hover:text-green-400 transition duration-300 cursor-pointer" />
                <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm bg-gray-700 text-white py-1 px-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Approve Status
                </span>
              </div>
            )}

            {/* Post Company */}
            <div
              className="group relative"
              onClick={() => navigate("/post-company")}
            >
              <Briefcase className="text-white hover:text-blue-400 transition duration-300 cursor-pointer" />
              <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm bg-gray-700 text-white py-1 px-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Post Company
              </span>
            </div>

            {/* Home */}
            <div className="group relative" onClick={() => navigate("/home")}>
              <Home className="text-white hover:text-blue-400 transition duration-300 cursor-pointer" />
              <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm bg-gray-700 text-white py-1 px-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Home
              </span>
            </div>

            {/* Logout */}
            <div className="group relative">
              <LogOut
                className="text-white hover:text-red-400 transition duration-300 cursor-pointer"
                onClick={handlelogout}
              />
              <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm bg-gray-700 text-white py-1 px-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Logout
              </span>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}

export default Header;
