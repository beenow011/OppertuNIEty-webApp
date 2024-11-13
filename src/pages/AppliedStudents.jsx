import React, { useEffect, useState } from "react";
import { useWeb3Context } from "../context/useWeb3Context";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { getContractInstance } from "../utils/getContractInstance";

function AppliedStudents() {
  const { updateWeb3State, Web3State } = useWeb3Context();
  const { selectedAccount } = Web3State;
  const [studentData, setStudentData] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const getAppliedStudents = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/api/companies/get-applied-students?address=" +
          selectedAccount +
          "&companyId=" +
          id
      );
      console.log(res.data);
      setStudentData(res.data.applications);
    } catch (e) {
      console.log(e);
      toast.error("Failed to fetch applied students");
    }
  };
  useEffect(() => {
    if (selectedAccount) {
      getAppliedStudents();
    }
  }, [selectedAccount, navigate]);

  const getAllStudentsFromBlockchain = async () => {
    try {
      console.log("selectedAccount", selectedAccount);
      const contract = await getContractInstance();
      studentData.forEach(async (student) => {
        const students = await contract.getUserProfileByAddress(
          student.studentId.userAddress
        );
        console.log("students", students);
      });
    } catch (e) {
      console.log(e);
      toast.error("Failed to fetch all students from blockchain");
    }
  };
  useEffect(() => {
    if (studentData.length > 0) {
      getAllStudentsFromBlockchain();
    }
  }, [studentData]);

  return <div>AppliedStudents</div>;
}

export default AppliedStudents;
