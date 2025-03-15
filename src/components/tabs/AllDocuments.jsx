import { FiUpload, FiTrash2, FiChevronLeft, FiChevronRight, FiChevronDown } from "react-icons/fi";
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function AllDocuments() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Static list of documents (predefined)
  const documents = [
    {
      id: 1,
      name: "HSSC Matric Degree",
      size: "9 MB",
      pages: 5,
      uploadDate: "03-12-2024",
      status: "Approved",
    },
    {
      id: 2,
      name: "HSSC Matric Degree",
      size: "9 MB",
      pages: 2,
      uploadDate: "12-12-2024",
      status: "Rejected",
    },
    {
      id: 3,
      name: "Bachelor's Degree",
      size: "9 MB",
      pages: 1,
      uploadDate: "10-12-2024",
      status: "Pending",
    },
    {
      id: 4,
      name: "Bachelor's Degree",
      size: "9 MB",
      pages: 1,
      uploadDate: "10-12-2024",
      status: "Pending",
    },
  ];

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : documents.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < documents.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="p-4">
      {/* Upload Area */}
      <div className="border-2 border-dashed border-gray-700 rounded-lg mb-6">
        <label className="w-full cursor-pointer">
          <input type="file" className="hidden" />
          <div className="flex flex-col items-center justify-center p-8">
            <FiUpload className="w-12 h-12 text-gray-600 mb-2" />
            <p className="text-gray-400 text-sm mb-2">Upload your documents here</p>
            <span
              className="bg-[#1CD3C6] text-white px-6 py-2 rounded-md hover:bg-[#1AC3B6] transition-colors text-sm"
            >
              Browse Files
            </span>
          </div>
        </label>
      </div>

      {/* Document List - Desktop View */}
      <div className="hidden md:block">
        <h3 className="text-white text-sm font-medium mb-4">All Uploaded Documents</h3>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] border border-gray-700 rounded-lg">
            <thead className="bg-[#252525] text-gray-400 text-left text-sm">
              <tr>
                <th className="p-3">#</th>
                <th className="p-3">Document</th>
                <th className="p-3">Size</th>
                <th className="p-3">Pages</th>
                <th className="p-3">Upload Date</th>
                <th className="p-3">Status</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((doc, index) => (
                <tr key={doc.id} className="border-b border-gray-700 text-white text-sm">
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3">{doc.name}</td>
                  <td className="p-3">{doc.size}</td>
                  <td className="p-3">{doc.pages} Pages</td>
                  <td className="p-3">{doc.uploadDate}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded-md text-xs font-medium ${
                        doc.status === "Approved"
                          ? "bg-green-600"
                          : doc.status === "Rejected"
                          ? "bg-red-600"
                          : "bg-yellow-600"
                      }`}
                    >
                      {doc.status}
                    </span>
                  </td>
                  <td className="p-3">
                    <button className="text-red-500 hover:text-red-700">
                      <FiTrash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden">
        <h3 className="text-white text-sm font-medium mb-6">All Uploaded Documents</h3>
        <div className="relative px-4">
          <div className="overflow-hidden">
            <motion.div 
              className="flex transition-all duration-300 ease-in-out"
              animate={{ x: `${-100 * currentIndex}%` }}
            >
              {documents.map((doc, index) => (
                <div 
                  key={doc.id} 
                  className="w-full flex-shrink-0 bg-gradient-to-br from-[#2A2A2A] to-[#1A1A1A] rounded-2xl p-6 space-y-4 border border-gray-700/50 shadow-xl"
                >
                  {/* Card Header */}
                  <div className="flex justify-between items-center pb-2 border-b border-gray-700/30">
                    <h4 className="text-[#1CD3C6] font-semibold">Document Details</h4>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      doc.status === "Approved" ? "bg-green-600/20 text-green-400" :
                      doc.status === "Rejected" ? "bg-red-600/20 text-red-400" : 
                      "bg-yellow-600/20 text-yellow-400"
                    }`}>
                      {doc.status}
                    </span>
                  </div>

                  {/* Document Info */}
                  <div className="space-y-4">
                    <div className="bg-[#252525]/50 p-4 rounded-xl">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm">Document:</span>
                        <span className="text-white font-medium">{doc.name}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-[#252525]/50 p-4 rounded-xl">
                        <p className="text-gray-400 text-xs mb-1">Size</p>
                        <p className="text-white font-medium">{doc.size}</p>
                      </div>
                      <div className="bg-[#252525]/50 p-4 rounded-xl">
                        <p className="text-gray-400 text-xs mb-1">Pages</p>
                        <p className="text-white font-medium">{doc.pages} Pages</p>
                      </div>
                    </div>

                    <div className="bg-[#252525]/50 p-4 rounded-xl">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm">Upload Date:</span>
                        <span className="text-white font-medium">{doc.uploadDate}</span>
                      </div>
                    </div>
                  </div>

                  {/* Delete Button */}
                  <div className="flex justify-end pt-2">
                    <button className="bg-red-500/10 hover:bg-red-500/20 text-red-500 p-2.5 rounded-lg transition-colors">
                      <FiTrash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Navigation Controls */}
          <div className="mt-8 mb-4 flex items-center justify-center gap-6">
            <button 
              onClick={handlePrevious}
              className={`p-3.5 bg-[#252525] rounded-xl text-[#1CD3C6] transition-all transform hover:scale-105 active:scale-95 hover:bg-[#2A2A2A] shadow-lg ${
                currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-[#1CD3C6]/10'
              }`}
              disabled={currentIndex === 0}
            >
              <FiChevronLeft className="w-6 h-6" />
            </button>

            {/* Pagination Dots */}
            <div className="flex items-center gap-3">
              {documents.map((_, index) => (
                <div 
                  key={index}
                  className={`rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'bg-[#1CD3C6] w-6 h-2' 
                      : 'bg-gray-600 w-2 h-2'
                  }`}
                />
              ))}
            </div>

            <button 
              onClick={handleNext}
              className={`p-3.5 bg-[#252525] rounded-xl text-[#1CD3C6] transition-all transform hover:scale-105 active:scale-95 hover:bg-[#2A2A2A] shadow-lg ${
                currentIndex === documents.length - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-[#1CD3C6]/10'
              }`}
              disabled={currentIndex === documents.length - 1}
            >
              <FiChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
