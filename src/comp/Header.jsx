import React from "react";
import { useWeb3Context } from "../context/useWeb3Context";

function Header() {
  const { updateWeb3State, Web3State } = useWeb3Context();
  const { selectedAccount } = Web3State;
  // const navigate = useNavigate();
  const handlelogout = () => {
    updateWeb3State({
      selectedAccount: null,
      signature: null,
    });
    // navigate("/connect-wallet");
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
        {/* <nav className="hidden md:flex space-x-6">
          <a
            href="#dashboard"
            className="hover:text-blue-400 transition duration-300"
          >
            Dashboard
          </a>
          <a
            href="#companies"
            className="hover:text-green-400 transition duration-300"
          >
            Companies
          </a>
          <a
            href="#settings"
            className="hover:text-blue-400 transition duration-300"
          >
            Settings
          </a>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold transition duration-300">
            Logout
          </button>
        </nav> */}
        <div>
          {selectedAccount && <button onClick={handlelogout}>logout</button>}
        </div>
      </div>
    </header>
  );
}

export default Header;
