import { FiFile } from 'react-icons/fi';

export default function DocumentViewer({ activeTab, documents }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {documents.map((doc) => (
        <div
          key={doc.id}
          className="bg-[#1A1A1A] rounded-lg p-4 hover:bg-[#2A2A2A] transition-colors"
        >
          <div className="flex items-start space-x-3">
            <div className="p-2 bg-[#2A2A2A] rounded">
              <FiFile className="w-6 h-6 text-gray-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-medium text-white truncate">
                {doc.name}
              </h3>
              <p className="text-sm text-gray-400">
                {(doc.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 