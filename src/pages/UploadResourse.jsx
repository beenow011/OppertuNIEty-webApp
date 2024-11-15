import React, { useState } from "react";

function UploadResource() {
  const [uploadType, setUploadType] = useState("file");
  const [resources, setResources] = useState([]);

  console.log("UploadResource", resources);

  const handleAddResource = (resource) => {
    setResources((prevResources) => [...prevResources, resource]);
  };

  const handleRemoveResource = (index) => {
    setResources((prevResources) =>
      prevResources.filter((_, i) => i !== index)
    );
  };

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
            className="w-full p-2 mb-4 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="file"
            className="w-full p-2 mb-4 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300"
            onClick={() =>
              handleAddResource({ type: "file", title: "File Title" })
            }
          >
            Upload File
          </button>
        </div>
      )}

      {uploadType === "link" && (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-6">
          <h2 className="text-xl font-semibold mb-4">Upload Link</h2>
          <input
            type="text"
            placeholder="Enter Title"
            className="w-full p-2 mb-4 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="url"
            placeholder="Enter URL"
            className="w-full p-2 mb-4 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300"
            onClick={() =>
              handleAddResource({ type: "link", title: "Link Title", url: "#" })
            }
          >
            Upload Link
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
                <div>
                  <p className="font-bold">{resource.title}</p>
                  {resource.type === "link" && (
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:underline"
                    >
                      {resource.url}
                    </a>
                  )}
                </div>
                <button
                  onClick={() => handleRemoveResource(index)}
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded-lg"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default UploadResource;
