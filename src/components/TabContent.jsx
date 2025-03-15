import { FiFile, FiDownload, FiTrash2 } from 'react-icons/fi';

export default function TabContent({ activeTab, documents }) {
  if (documents[activeTab]?.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="border-2 border-dashed border-gray-700 rounded-lg p-8">
          <div className="flex flex-col items-center">
            <FiFile className="w-12 h-12 text-gray-500 mb-4" />
            <p className="text-gray-400">No documents uploaded yet</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {documents[activeTab].map((doc) => (
        <div
          key={doc.id}
          className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-colors"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-gray-700 rounded">
                <FiFile className="w-6 h-6 text-[#1CD3C6]" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-white truncate max-w-[150px]">
                  {doc.name}
                </h3>
                <p className="text-xs text-gray-400">
                  {(doc.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="p-1 hover:bg-gray-600 rounded">
                <FiDownload className="w-4 h-4 text-gray-400 hover:text-white" />
              </button>
              <button className="p-1 hover:bg-gray-600 rounded">
                <FiTrash2 className="w-4 h-4 text-gray-400 hover:text-red-500" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 