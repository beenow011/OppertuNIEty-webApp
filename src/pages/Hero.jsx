import React from "react";
import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();
  return (
    <section className="bg-gray-900 text-white py-20">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-5xl font-extrabold mb-4 text-blue-400">
          Welcome to <span className="text-green-400">OpportuNIEty</span>
        </h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-300">
          The ultimate platform for placement coordinators to streamline the
          placement process and keep students updated with new company
          opportunities. Help students shape their careers with seamless updates
          and real-time access to placement news.
        </p>
        <p className="text-lg mb-10 max-w-xl mx-auto text-blue-300 italic">
          Exclusively for Placement Coordinators - Proceed to make a difference
          in student careers.
        </p>
        <button
          className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white px-10 py-3 rounded-full font-semibold text-lg transition duration-300 shadow-lg transform hover:scale-105"
          onClick={() => navigate("/connect-wallet")}
        >
          Connect Wallet
        </button>
      </div>
      <div className="mt-10 flex justify-center">
        <img
          src="clg.jpg"
          alt="Placement Opportunities"
          className="w-2/3 rounded-lg shadow-2xl opacity-90 hover:opacity-100 transition-opacity duration-300"
        />
      </div>
    </section>
  );
}

export default Hero;
