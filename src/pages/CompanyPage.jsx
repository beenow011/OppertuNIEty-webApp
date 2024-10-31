import React, { useEffect, useState } from "react";
import { useWeb3Context } from "../context/useWeb3Context";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function CompanyPage() {
  const { Web3State } = useWeb3Context();
  const { selectedAccount } = Web3State;
  const [company, setCompany] = useState();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const { id } = useParams();
  const getCompany = async () => {
    try {
      console.log(selectedAccount);
      const res = await axios.get(
        `http://localhost:3000/api/companies/get-company-by-id/${id}?address=` +
          selectedAccount
      );
      console.log(res.data);
      setCompany(res.data.company);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getCompany();
  }, []);
  if (!company) {
    return (
      <div className="text-white text-center">Loading company details...</div>
    );
  }
  return (
    <section className="bg-[#1A1A2E] text-white py-8 px-4 min-h-screen flex justify-center items-center">
      <div className="container  bg-[#16213E] rounded-3xl shadow-lg p-8 text-center">
        <div className="flex gap-6  items-center">
          <img
            src={company.logoUrl}
            alt={`${company.companyName} logo`}
            className="w-28 h-28 object-cover rounded-full shadow-lg border-2 border-[#E94560] " // Added pulse animation
          />
          <div className="flex flex-col items-start">
            <h2 className="text-3xl font-bold text-[#E94560]">
              {company.companyName}
            </h2>
            <p className="text-xl  font-semibold">{company.role}</p>
            <p className="text-md text-gray-400 text-left">
              {company.location}
            </p>
          </div>
        </div>
        <div className="border-t border-gray-600 pt-6 mt-4">
          <h3 className="text-lg font-semibold mb-4 text-[#E94560]">
            Job Details
          </h3>
          <ul className="list-none p-0 space-y-2">
            <li className="flex gap-3">
              <span className="text-gray-300">CTC:</span>
              <span>{company.ctc} LPA</span>
            </li>
            <li className="flex gap-3">
              <span className="text-gray-300">Base Salary:</span>
              <span>{company.baseSalary} LPA</span>
            </li>
            <li className="flex gap-3">
              <span className="text-gray-300">Opportunity Type:</span>
              <span>{company.opportunityType}</span>
            </li>
            <li className="flex gap-3">
              <span className="text-gray-300">Stipend:</span>
              <span>{company.stipend}</span>
            </li>
          </ul>
        </div>

        <div className="border-t border-gray-600 pt-6 mt-4">
          <h3 className="text-lg font-semibold mb-4 text-[#E94560]">
            Job Description
          </h3>
          <p className="text-gray-300 text-justify">{company.jobDescription}</p>
        </div>

        <div className="border-t border-gray-600 pt-6 mt-4">
          <h3 className="text-lg font-semibold mb-4 text-[#E94560]">
            Eligibility Criteria
          </h3>
          <ul className="list-none p-0 space-y-2">
            <li className="flex justify-between">
              <span className="text-gray-300">Cutoff CGPA:</span>
              <span>{company.cutOffCgpa}</span>
            </li>
            <li className="flex justify-between">
              <span className="text-gray-300">10th %:</span>
              <span>{company.cutOffXPercentage}%</span>
            </li>
            <li className="flex justify-between">
              <span className="text-gray-300">12th %:</span>
              <span>{company.cutOffXiiPercentage}%</span>
            </li>
            <li className="flex justify-between">
              <span className="text-gray-300">Allowed Branches:</span>
              <span>{company.allowedBranches.join(", ")}</span>
            </li>
          </ul>
        </div>

        <div className="border-t border-gray-600 pt-6 mt-4">
          <h3 className="text-lg font-semibold mb-4 text-[#E94560]">
            Application Process
          </h3>
          <p className="text-gray-300">{company.process}</p>
          <p className="mt-2">
            <span className="text-gray-300">Schedule:</span> {company.schedule}
          </p>
        </div>

        <div className="mt-8">
          <button className="bg-[#E94560] text-white font-bold py-3 px-6 rounded-full shadow-md hover:bg-[#0F3460] transition duration-300">
            Download Excel Sheet
          </button>
        </div>
        <div>Stats</div>
      </div>
    </section>
  );
}

export default CompanyPage;
