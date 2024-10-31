import axios, { all } from "axios";
import React, { useState } from "react";
import { useWeb3Context } from "../context/useWeb3Context";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function PostCompany() {
  const { Web3State } = useWeb3Context();
  const { selectedAccount } = Web3State;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: "",
    logoUrl: "",
    ctc: "",
    baseSalary: "",
    jobDescription: "",
    intake: "",
    aboutCompany: "",
    location: "",
    opportunityType: "",
    stipend: "",
    allowedBranches: [],
    schedule: "",
    process: "",
    cutOffCgpa: 0,
    cutOffXPercentage: 0,
    cutOffXiiPercentage: 0,
    role: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log("Form data submitted: ", formData);
      const url = "http://localhost:3000/api/companies/post?address=";
      const res = await axios.post(url + selectedAccount, formData);
      if (res.status === 200) {
        navigate("/home");
      }
    } catch (e) {
      toast.error("Failed to post company");
    }
    // Implement form submission logic here
  };
  console.log(formData);

  return (
    <section className="bg-gray-800 text-white py-8 px-4">
      <div className="container mx-auto max-w-3xl">
        <h2 className="text-3xl font-bold text-center text-blue-400 mb-6">
          Post a Company
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-300 mb-2">Company Name</label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md bg-gray-700 text-white"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Company Logo URL</label>
            <input
              type="url"
              name="logoUrl"
              value={formData.logoUrl}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md bg-gray-700 text-white"
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-2">Role</label>
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md bg-gray-700 text-white"
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-2">Allowed Branches</label>
            <div className="flex flex-wrap gap-4">
              {["CSE", "ISE", "MECH", "CIVIL", "IP", "AIML"].map((branch) => (
                <label key={branch} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="allowedBranches"
                    value={branch}
                    onChange={(e) => {
                      const updatedBranches = e.target.checked
                        ? [...formData.allowedBranches, e.target.value]
                        : formData.allowedBranches.filter(
                            (b) => b !== e.target.value
                          );
                      setFormData({
                        ...formData,
                        allowedBranches: updatedBranches,
                      });
                    }}
                    className="form-checkbox text-blue-500"
                  />
                  <span className="text-gray-300">{branch}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-300 mb-2">CTC (in LPA)</label>
              <input
                type="number"
                name="ctc"
                value={formData.ctc}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-md bg-gray-700 text-white"
                required
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-2">
                Base Salary (in LPA)
              </label>
              <input
                type="number"
                name="baseSalary"
                value={formData.baseSalary}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-md bg-gray-700 text-white"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-300 mb-2">
              Job Description (JD)
            </label>
            <textarea
              name="jobDescription"
              value={formData.jobDescription}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md bg-gray-700 text-white"
              rows="4"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">
              Placement Schedule
            </label>
            <textarea
              name="schedule"
              value={formData.schedule}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md bg-gray-700 text-white"
              rows="4"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">
              Placement Process
            </label>
            <textarea
              name="process"
              value={formData.process}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md bg-gray-700 text-white"
              rows="4"
              required
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-2">
              Cut Off CGPA (B.E)
            </label>
            <input
              type="number"
              name="cutOffCgpa"
              value={formData.cutOffCgpa}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md bg-gray-700 text-white"
              required
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-2">
              Cut Off X Percentage
            </label>
            <input
              type="number"
              name="cutOffXPercentage"
              value={formData.cutOffXPercentage}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md bg-gray-700 text-white"
              required
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-2">
              Cut Off XII Percentage
            </label>
            <input
              type="number"
              name="cutOffXiiPercentage"
              value={formData.cutOffXiiPercentage}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md bg-gray-700 text-white"
              required
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-2">
              Intake (Number of Positions)
            </label>
            <input
              type="number"
              name="intake"
              value={formData.intake}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md bg-gray-700 text-white"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">About Company</label>
            <textarea
              name="aboutCompany"
              value={formData.aboutCompany}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md bg-gray-700 text-white"
              rows="3"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md bg-gray-700 text-white"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Opportunity Type</label>
            <select
              name="opportunityType"
              value={formData.opportunityType}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md bg-gray-700 text-white"
              required
            >
              <option value="" disabled>
                Select Opportunity Type
              </option>
              <option value="internship">Internship</option>
              <option value="fulltime">Fulltime</option>
              <option value="internship-fulltime">Internship + Fulltime</option>
              <option value="internship-conversion">
                Internship + Performance-based Conversion to Fulltime
              </option>
            </select>
          </div>

          {/* Stipend (Visible only if Internship is selected) */}
          {formData.opportunityType.includes("internship") && (
            <div>
              <label className="block text-gray-300 mb-2">
                Stipend (for Internship)
              </label>
              <input
                type="number"
                name="stipend"
                value={formData.stipend}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-md bg-gray-700 text-white"
              />
            </div>
          )}

          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md font-semibold transition duration-300 shadow-lg"
            >
              Post Company
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default PostCompany;
