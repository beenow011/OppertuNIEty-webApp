import React, { useEffect, useState } from "react";
import { useWeb3Context } from "../context/useWeb3Context";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { getContractInstance } from "../utils/getContractInstance";
import * as XLSX from "xlsx";

function AppliedStudents() {
  const { updateWeb3State, Web3State } = useWeb3Context();
  const { selectedAccount } = Web3State;
  const [studentData, setStudentData] = useState([]);
  const [studentDataFromBlockchain, setStudentDataFromBlockchain] = useState(
    []
  );
  const navigate = useNavigate();
  const { id } = useParams();

  const getAppliedStudents = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/companies/get-applied-students?address=${selectedAccount}&companyId=${id}`
      );
      setStudentData(res.data.applications);
    } catch (e) {
      console.error(e);
      toast.error("Failed to fetch applied students");
    }
  };

  useEffect(() => {
    if (selectedAccount) {
      getAppliedStudents();
    }
  }, [selectedAccount]);

  const getAllStudentsFromBlockchain = async () => {
    try {
      const contract = await getContractInstance();
      const blockchainData = await Promise.all(
        studentData.map(async (student) => {
          return await contract.getUserProfileByAddress(
            student.studentId.userAddress
          );
        })
      );
      setStudentDataFromBlockchain(blockchainData);
    } catch (e) {
      console.error(e);
      toast.error("Failed to fetch all students from blockchain");
    }
  };

  useEffect(() => {
    if (studentData.length > 0) {
      getAllStudentsFromBlockchain();
    }
  }, [studentData]);

  const handleDownload = () => {
    // Prepare data to export to Excel
    const dataToExport = studentData.map((student, index) => {
      const blockchainInfo = studentDataFromBlockchain[index] || {};
      return {
        Name: student.studentId.name,
        USN: student.studentId.usn,
        "Eligibility Score": student.eligibilityScore,
        Status: student.status,
        CGPA: blockchainInfo[3] || "N/A",
        "10th %": blockchainInfo[1] || "N/A",
        "12th %": blockchainInfo[2] || "N/A",
        Email: blockchainInfo[6] || "N/A",
        Phone: blockchainInfo[5] || "N/A",
      };
    });

    // Create a new workbook and worksheet
    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Applied Students");

    // Generate Excel file and download it
    XLSX.writeFile(workbook, "Applied_Students.xlsx");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Applied Students</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-800 text-gray-300 border border-gray-700 rounded-lg">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">USN</th>
              <th className="px-4 py-3 text-left">Eligibility Score</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">CGPA</th>
              <th className="px-4 py-3 text-left">10th %</th>
              <th className="px-4 py-3 text-left">12th %</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Phone</th>
            </tr>
          </thead>
          <tbody>
            {studentData.map((student, index) => {
              const blockchainInfo = studentDataFromBlockchain[index] || {};
              return (
                <tr
                  key={student._id}
                  className="border-b border-gray-700 hover:bg-gray-700 transition duration-200"
                >
                  <td className="px-4 py-3">{student.studentId.name}</td>
                  <td className="px-4 py-3">{student.studentId.usn}</td>
                  <td className="px-4 py-3">{student.eligibilityScore}</td>
                  <td className="px-4 py-3">{student.status}</td>
                  <td className="px-4 py-3">{blockchainInfo[3] || "N/A"}</td>
                  <td className="px-4 py-3">{blockchainInfo[1] || "N/A"}</td>
                  <td className="px-4 py-3">{blockchainInfo[2] || "N/A"}</td>
                  <td className="px-4 py-3 text-left">
                    {blockchainInfo[6] || "N/A"}
                  </td>
                  <td className="px-4 py-3 text-left">
                    {blockchainInfo[5] || "N/A"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <button
        onClick={handleDownload}
        className="mt-6 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-200"
      >
        Download as Excel
      </button>
    </div>
  );
}

export default AppliedStudents;
