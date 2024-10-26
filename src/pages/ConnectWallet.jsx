import React, { useState, useEffect } from "react";
import { useWeb3Context } from "../context/useWeb3Context";
import { useNavigate } from "react-router-dom";
import { connectWallet } from "../utils/connectWallet";
import { Loader2 } from "lucide-react";
import axios from "axios";

function ConnectWallet() {
  const { updateWeb3State, Web3State } = useWeb3Context();
  const [walletAddressLoading, setWalletAddressLoading] = useState(false);
  const [createAccountLoading, setCreateAccountLoading] = useState(false);
  const { selectedAccount, signature } = Web3State;
  const navigate = useNavigate();
  const [showCreateAccountForm, setShowCreateAccountForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    userAddress: "",
    usn: "",
    branch: "",
    graduationYear: "",
  });
  useEffect(() => {
    if (selectedAccount) {
      setFormData({ ...formData, userAddress: selectedAccount });
    }
  }, [selectedAccount]);

  const handleConnectWallet = async () => {
    try {
      const { selectedAccount, signature } = await connectWallet();
      updateWeb3State({ selectedAccount, signature });
      if (
        selectedAccount &&
        import.meta.env.VITE_ADMIN_WALLET_ADDRESS.toLowerCase() ===
          selectedAccount.toLowerCase()
      ) {
        navigate("/admin");
      } else if (selectedAccount) {
        navigate("/home");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const connectWalletToCreateAcc = async () => {
    try {
      setWalletAddressLoading(true);
      const { selectedAccount, signature } = await connectWallet();

      updateWeb3State({ selectedAccount, signature });
      setFormData({ ...formData, userAddress: selectedAccount });
    } catch (error) {
      console.error(error);
    } finally {
      setWalletAddressLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCreateAccount = async (e) => {
    try {
      setCreateAccountLoading(true);
      e.preventDefault();
      console.log("Creating account with data:", formData);
      const url =
        "http://localhost:3000/api/coordinator-auth/create-account?address=" +
        selectedAccount;
      const dataSignature = {
        signature,
        usn: formData.usn.toLowerCase(),
        branch: formData.branch,
        graduationYear: formData.graduationYear,
        name: formData.name,
      };
      const res = await axios.post(url, dataSignature);
      if (res.status === 200) {
        navigate("/home");
      }
      console.log("res", res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setCreateAccountLoading(false);
    }
    // Implement API call or backend logic here to create the account
  };
  console.log("selectedAccount", formData);

  return (
    <section className="bg-gray-800 text-white py-16 px-8">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold text-blue-400 mb-6">
          Connect Your Wallet
        </h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto text-gray-300">
          To access the full features of{" "}
          <span className="text-green-400">OpportuNIEty</span>, connect your
          MetaMask wallet to our platform. This will allow secure access to
          blockchain-powered features and ensure your data is safely stored on
          the decentralized network.
        </p>
        <ol className="text-left list-decimal list-inside mb-10 max-w-3xl mx-auto text-gray-300 space-y-4">
          <li>
            Install the MetaMask extension in your browser or the MetaMask app
            on your mobile device.
          </li>
          <li>
            Open MetaMask and set up or import an existing wallet if you haven’t
            done so already.
          </li>
          <li>
            Click the "Connect Wallet" button below to initiate the connection
            process.
          </li>
          <li>
            MetaMask will prompt you to authorize the connection; click
            "Approve" to connect.
          </li>
        </ol>
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
          <div className="mt-10 max-w-lg mx-auto bg-gray-700 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-400">
              Account Creation Form
            </h3>
            <form onSubmit={handleCreateAccount} className="space-y-4">
              <div className="w-full px-4 py-2 border rounded-md bg-gray-800 text-white">
                {selectedAccount ? (
                  <p className="text-sm text-gray-400">
                    Connected Wallet Address: {selectedAccount}
                  </p>
                ) : walletAddressLoading ? (
                  <div className="flex gap-2 justify-center items-center">
                    <Loader2 className="h-4 w-4 animate-spin text-blue-600" />{" "}
                    Connecting wallet...
                  </div>
                ) : (
                  <button onClick={connectWalletToCreateAcc}>
                    Connect Wallet
                  </button>
                )}
              </div>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-md bg-gray-800 text-white"
                required
              />
              <input
                type="text"
                name="usn"
                placeholder="USN"
                value={formData.usn}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-md bg-gray-800 text-white"
                required
              />
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
                <option value="2024">2024</option>
                <option value="2025">2025</option>
                <option value="2026">2026</option>
                <option value="2027">2027</option>
                <option value="2028">2028</option>
                <option value="2029">2029</option>
                <option value="2030">2030</option>
              </select>
              {createAccountLoading ? (
                <div>
                  <Loader2 className="h-4 w-4 animate-spin text-blue-600" />{" "}
                  Creating account...
                </div>
              ) : (
                <button
                  type="submit"
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md font-semibold transition duration-300 shadow-lg"
                  disabled={selectedAccount ? false : true}
                  onClick={handleCreateAccount}
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
