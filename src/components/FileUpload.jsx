"use client"
import { useState } from 'react';
import { FiUploadCloud } from 'react-icons/fi';

export default function FileUpload({ onFileUpload }) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    handleFiles(files);
  };

  const handleFiles = (files) => {
    Array.from(files).forEach(file => {
      onFileUpload({
        id: Date.now(),
        name: file.name,
        size: file.size,
        type: file.type,
        file: file
      });
    });
  };

  return (
    <div 
      className={`
        mt-6 border-2 border-dashed rounded-lg
        ${isDragging ? 'border-[#1CD3C6] bg-[#1CD3C6]/5' : 'border-gray-700'}
        transition-colors duration-200
      `}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
    >
      <div className="flex flex-col items-center justify-center p-8">
        <FiUploadCloud className="w-12 h-12 text-gray-500 mb-4" />
        <p className="text-gray-400 text-center">
          Upload your documents here
        </p>
        <input
          type="file"
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
          multiple
          id="fileInput"
        />
        <label
          htmlFor="fileInput"
          className="mt-4 px-4 py-2 bg-[#1CD3C6] text-white rounded-lg cursor-pointer hover:bg-[#1AC3B6] transition-colors"
        >
          Browse Files
        </label>
      </div>
    </div>
  );
} 