import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useWeb3Context } from "../context/useWeb3Context";
import { LinkIcon, FileTextIcon, Trash2Icon } from "lucide-react";
import { Loader2 } from "lucide-react";

function UploadResource() {
  const { updateWeb3State, Web3State } = useWeb3Context();
  const { selectedAccount } = Web3State;
  const [uploadType, setUploadType] = useState("file");
  const [resources, setResources] = useState([]);
  const { id } = useParams();
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);

  console.log("UploadResource", resources);

  const handleAddResource = async (resource) => {
    try {
      setLoading(true);
      if (resource.resourceType === "file" && file) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("title", resource.title);
        formData.append("resourceType", resource.resourceType);

        const res = await axios.post(
          `http://localhost:3000/api/companies/upload-resource/${id}?address=${selectedAccount}`,
          formData
        );
        const uploadedResource = res.data.resource;
        if (res.status === 200) {
          toast.success("Resource uploaded successfully");
          setResources((prevResources) => [...prevResources, uploadedResource]);
          setFile(null); // Clear file input
          setTitle(""); // Clear title input
        }
      } else if (resource.resourceType === "link" && resource.resourceUrl) {
        const res = await axios.post(
          `http://localhost:3000/api/companies/upload-resource/${id}?address=${selectedAccount}`,
          resource
        );
        const uploadedResource = res.data.resource;
        if (res.status === 200) {
          toast.success("Link uploaded successfully");
          setResources((prevResources) => [...prevResources, uploadedResource]);
          setLink(""); // Clear link input
          setTitle(""); // Clear title input
        }
      } else {
        toast.error("Please provide valid inputs.");
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to upload resource");
    } finally {
      setLoading(false);
    }
  };

  const getResource = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/companies/get-resources?address=${selectedAccount}&id=${id}`
      );
      console.log(res.data);
      setResources(res.data.resources);
    } catch (err) {
      console.log(err);
      toast.error("Failed to get resources");
    }
  };

  useEffect(() => {
    if (selectedAccount) {
      getResource();
    }
  }, [selectedAccount]);
  const [dltLoading, setDltLoading] = useState(false);

  const handleRemoveResource = async (index) => {
    try {
      setDltLoading(true);
      const url = `http://localhost:3000/api/companies/remove-resource/${resources[index]._id}?address=${selectedAccount}`;
      const res = await axios.delete(url);
      if (res.status === 200) {
        toast.success("Resource removed successfully");

        setResources((prevResources) =>
          prevResources.filter((_, i) => i !== index)
        );
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to remove resource");
    } finally {
      setDltLoading(false);
    }
  };

  console.log("UploadResource", resources);

  return (
    <div className="bg-gray-900 text-white min-h-screen p-6 px-48">
      <h1 className="text-3xl font-bold text-blue-400 mb-6">Upload Resource</h1>

      {/* Upload Type Selection */}
      <div className="flex items-center space-x-4 mb-6">
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            value="file"
            checked={uploadType === "file"}
            onChange={() => setUploadType("file")}
            className="text-blue-500 focus:ring-0"
          />
          <span>File</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            value="link"
            checked={uploadType === "link"}
            onChange={() => setUploadType("link")}
            className="text-blue-500 focus:ring-0"
          />
          <span>Link</span>
        </label>
      </div>

      {/* Upload Form */}
      {uploadType === "file" && (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-6">
          <h2 className="text-xl font-semibold mb-4">Upload File</h2>
          <input
            type="text"
            placeholder="Enter Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 mb-4 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="file"
            className="w-full p-2 mb-4 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300"
            onClick={() => handleAddResource({ resourceType: "file", title })}
            disabled={loading}
          >
            {loading ? (
              <div className="w-full flex justify-center items-center">
                <Loader2 className="animate-spin h-4 w-4" />
              </div>
            ) : (
              "Upload File"
            )}
          </button>
        </div>
      )}

      {uploadType === "link" && (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-6">
          <h2 className="text-xl font-semibold mb-4">Upload Link</h2>
          <input
            type="text"
            placeholder="Enter Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 mb-4 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="url"
            placeholder="Enter URL"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="w-full p-2 mb-4 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300"
            onClick={() =>
              handleAddResource({
                resourceType: "link",
                title,
                resourceUrl: link,
              })
            }
          >
            {loading ? (
              <div className="w-full flex justify-center items-center">
                <Loader2 className="animate-spin h-4 w-4" />
              </div>
            ) : (
              "Upload link"
            )}
          </button>
        </div>
      )}

      {/* Resource List */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Uploaded Resources</h2>
        {resources.length === 0 ? (
          <p className="text-gray-400">No resources uploaded yet.</p>
        ) : (
          <ul className="space-y-4">
            {resources.map((resource, index) => (
              <li
                key={index}
                className="flex items-center justify-between bg-gray-700 p-4 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  {/* Display icon based on resourceType */}
                  {resource.resourceType === "link" ? (
                    <LinkIcon className="text-blue-400 w-5 h-5" />
                  ) : (
                    <FileTextIcon className="text-blue-400 w-5 h-5" />
                  )}
                  <div>
                    <p className="font-bold">{resource.title}</p>
                    {resource.resourceType === "link" && (
                      <a
                        href={resource.resourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:underline"
                      >
                        {resource.resourceUrl}
                      </a>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {/* Button to open file */}
                  {resource.resourceType === "file" && (
                    <button
                      onClick={() =>
                        window.open(resource.resourceUrl, "_blank")
                      }
                      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-3 rounded-lg"
                    >
                      Open File
                    </button>
                  )}
                  {/* Remove button with Trash icon */}
                  <button
                    onClick={() => handleRemoveResource(index)}
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded-lg flex items-center space-x-1"
                  >
                    {dltLoading && (
                      <div className="w-full flex justify-center items-center">
                        <Loader2 className="w-4 h-4 animate-spin" />
                      </div>
                    )}
                    <Trash2Icon className="w-4 h-4" />
                    <span>Remove</span>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default UploadResource;
