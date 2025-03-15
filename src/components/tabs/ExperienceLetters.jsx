import { useState } from 'react';
import { FiUpload } from 'react-icons/fi';

export default function ExperienceLetters() {
  const [documents, setDocuments] = useState([]);

  const handleFileUpload = (e) => {
    const files = e.target.files;
    if (files) {
      // Handle experience letters upload logic
    }
  };

  return (
    <div>
      {/* Upload Area */}
      <div className="border-2 border-dashed border-gray-700 rounded-lg mb-6">
        <div className="flex flex-col items-center justify-center p-8">
          <FiUpload className="w-12 h-12 text-gray-600 mb-2" />
          <p className="text-gray-400 text-sm mb-2">Upload your experience letters here</p>
          <input
            type="file"
            id="file-upload-experience"
            className="hidden"
            onChange={handleFileUpload}
            accept=".pdf,.jpg,.jpeg,.png"
            multiple
          />
          <label
            htmlFor="file-upload-experience"
            className="bg-[#1CD3C6] text-white px-6 py-2 rounded-md hover:bg-[#1AC3B6] transition-colors cursor-pointer text-sm"
          >
            Browse Files
          </label>
        </div>
      </div>

      {/* Documents List */}
      <div>
        <h3 className="text-white text-sm font-medium mb-4">Experience Letters</h3>
        {documents.length === 0 ? (
          <p className="text-gray-400 text-center">No documents uploaded yet</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Document cards will go here */}
          </div>
        )}
      </div>
    </div>
  );
} 