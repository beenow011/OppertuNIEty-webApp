import React, { useState, useEffect } from "react";
import { useWeb3Context } from "../context/useWeb3Context";
import { useNavigate } from "react-router-dom";
import { connectWallet } from "../utils/connectWallet";
import { Loader2 } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

function ConnectWallet() {
  const { updateWeb3State, Web3State } = useWeb3Context();
  const [loading, setLoading] = useState({
    wallet: false,
    createAccount: false,
  });
  const [showCreateAccountForm, setShowCreateAccountForm] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [selectedSignature, setSelectedSignature] = useState(null);
  const navigate = useNavigate();
  const [showInstructions, setShowInstructions] = useState(false);
  const { selectedAccount, signature } = Web3State;

  const [formData, setFormData] = useState({
    name: "",
    userAddress: "",
    usn: "",
    branch: "",
    graduationYear: "",
  });

  useEffect(() => {
    if (selectedAccount) navigate("/home");
  }, [selectedAccount, navigate]);

  useEffect(() => {
    setFormData((prev) => ({ ...prev, userAddress: selectedWallet || "" }));
  }, [selectedWallet]);

  const handleConnectWallet = async () => {
    try {
      const { selectedAccount, signature } = await connectWallet();
      if (!selectedAccount) return;

      const url = `http://localhost:3000/api/coordinator-auth/login-user?address=${selectedAccount}`;
      const res = await axios.post(url, { signature });

      if (res.status === 200) {
        localStorage.setItem("token", res.data.token);
        updateWeb3State({ selectedAccount, signature });
        const redirectPath =
          selectedAccount.toLowerCase() ===
          import.meta.env.VITE_ADMIN_WALLET_ADDRESS.toLowerCase()
            ? "/admin"
            : "/home";
        navigate(redirectPath);
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to connect wallet");
    }
  };

  const connectWalletToCreateAcc = async () => {
    setLoading((prev) => ({ ...prev, wallet: true }));
    try {
      const { selectedAccount, signature } = await connectWallet();
      setSelectedWallet(selectedAccount);
      setSelectedSignature(signature);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading((prev) => ({ ...prev, wallet: false }));
    }
  };

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    setLoading((prev) => ({ ...prev, createAccount: true }));
    try {
      const url = `http://localhost:3000/api/coordinator-auth/create-account?address=${selectedWallet}`;
      const data = {
        signature: selectedSignature,
        usn: formData.usn.toLowerCase(),
        branch: formData.branch,
        graduationYear: formData.graduationYear,
        name: formData.name,
      };
      const res = await axios.post(url, data);
      if (res.status === 200) {
        localStorage.setItem("token", res.data.token);
        updateWeb3State({ selectedAccount, signature });
      }
    } catch (error) {
      toast.error("Account creation failed");
    } finally {
      setLoading((prev) => ({ ...prev, createAccount: false }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const renderInput = (name, placeholder, type = "text") => (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={formData[name]}
      onChange={handleInputChange}
      className="w-full px-4 py-2 border rounded-md bg-gray-800 text-white"
      required
    />
  );

  return (
    <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white py-16 px-8">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-extrabold text-blue-400 mb-6">
          Connect Your Wallet
        </h2>
        <p className="text-lg mb-6 max-w-2xl mx-auto text-gray-300 leading-relaxed">
          Access the exclusive features of{" "}
          <span className="text-green-400">OpportuNIEty</span> by connecting
          your MetaMask wallet.
        </p>

        <div className="flex justify-center mb-6">
          <button
            onClick={() => setShowInstructions(!showInstructions)}
            className="text-blue-500 hover:text-blue-600 font-semibold underline transition duration-300"
          >
            {showInstructions ? "Hide" : "Show"} Connection Instructions
          </button>
        </div>

        {/* Instructions List */}
        {showInstructions && (
          <ol className="text-left list-decimal list-inside mb-8 max-w-3xl mx-auto text-gray-300 space-y-4">
            <li>Ensure you have MetaMask installed in your browser.</li>
            <li>
              Click "Connect Wallet" below to link your wallet to OpportuNIEty.
            </li>
            <li>Approve the connection request in MetaMask.</li>
            <li>
              Once connected, proceed to fill out the account details form.
            </li>
          </ol>
        )}

        {/* Wallet Connect Buttons */}
        <div className="flex justify-center space-x-4 py-6">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-10 py-3 rounded-md font-semibold transition duration-300 shadow-lg"
            onClick={handleConnectWallet}
          >
            Connect Wallet
          </button>
          <button
            className="bg-green-500 hover:bg-green-600 text-white px-10 py-3 rounded-md font-semibold transition duration-300 shadow-lg"
            onClick={() => setShowCreateAccountForm(!showCreateAccountForm)}
          >
            {showCreateAccountForm ? "Hide Form" : "Create Account"}
          </button>
        </div>

        {/* Account Creation Form */}
        {showCreateAccountForm && (
          <div className="mt-10 max-w-lg mx-auto bg-gray-800 p-8 rounded-lg shadow-xl">
            <h3 className="text-2xl font-semibold mb-4 text-blue-400 text-center">
              Account Creation Form
            </h3>
            <form onSubmit={handleCreateAccount} className="space-y-4">
              <div className="w-full px-4 py-2 border rounded-md bg-gray-800 text-white flex items-center justify-center">
                {selectedWallet ? (
                  <p className="text-sm text-gray-400">
                    Connected Wallet Address: {selectedWallet}
                  </p>
                ) : loading.wallet ? (
                  <div className="flex gap-2 items-center justify-center">
                    <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
                    Connecting wallet...
                  </div>
                ) : (
                  <button
                    onClick={connectWalletToCreateAcc}
                    className="text-blue-400 underline hover:text-blue-500"
                  >
                    Connect Wallet
                  </button>
                )}
              </div>

              {renderInput("name", "Name")}
              {renderInput("usn", "USN")}
              <select
                name="branch"
                value={formData.branch}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-md bg-gray-800 text-white"
                required
              >
                <option value="" disabled>
                  Select Branch
                </option>
                <option value="CSE">CSE</option>
                <option value="ISE">ISE</option>
                <option value="MECH">MECH</option>
                <option value="CIVIL">CIVIL</option>
                <option value="IP">IP</option>
                <option value="AIML">AIML</option>
              </select>
              <select
                name="graduationYear"
                value={formData.graduationYear}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-md bg-gray-800 text-white"
                required
              >
                <option value="" disabled>
                  Select Graduation Year
                </option>
                {[2024, 2025, 2026, 2027, 2028, 2029, 2030].map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>

              {loading.createAccount ? (
                <div className="flex gap-4 items-center justify-center">
                  <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
                  Creating account...
                </div>
              ) : (
                <button
                  type="submit"
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md font-semibold transition duration-300 shadow-lg"
                  disabled={!selectedWallet}
                >
                  Submit
                </button>
              )}
            </form>
          </div>
        )}
      </div>
    </section>
  );
}

export default ConnectWallet;
