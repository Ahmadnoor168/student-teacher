import { FiChevronLeft, FiChevronRight, FiEye, FiEdit } from "react-icons/fi";
import { useState } from 'react';
import { motion } from 'framer-motion';

const SessionTable = ({ sessions }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : 0));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < sessions.length - 1 ? prev + 1 : prev));
  };

  return (
    <>
      {/* Desktop View */}
      <div className="hidden lg:block bg-[#1A1A1A] rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#2A2A2A]">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400">
                <input type="checkbox" className="mr-2" />
                Session ID
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400">Student</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400">Date</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400">Total</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400">Payment</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400">Subjects</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400">Status</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {sessions.map((session, index) => (
              <tr key={index} className="hover:bg-[#2A2A2A]">
                <td className="px-4 py-3 text-sm text-gray-300">
                  <input type="checkbox" className="mr-2" />
                  {session.id}
                </td>
                <td className="px-4 py-3 text-sm text-gray-300">{session.student}</td>
                <td className="px-4 py-3 text-sm text-gray-300">{session.date}</td>
                <td className="px-4 py-3 text-sm text-gray-300">{session.total}</td>
                <td className="px-4 py-3 text-sm">
                  <span className={`px-2 py-1 rounded-full text-xs
                    ${session.payment === 'complete' ? 'bg-green-400/10 text-green-400' : 
                      session.payment === 'pending' ? 'bg-yellow-400/10 text-yellow-400' : 
                      'bg-gray-400/10 text-gray-400'}`}>
                    {session.payment}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-300">{session.subjects}</td>
                <td className="px-4 py-3 text-sm">
                  <span className={`px-2 py-1 rounded-full text-xs
                    ${session.status === 'Fulfilled' ? 'bg-green-400/10 text-green-400' :
                      session.status === 'Pending' ? 'bg-yellow-400/10 text-yellow-400' :
                      session.status === 'Active' ? 'bg-blue-400/10 text-blue-400' :
                      'bg-red-400/10 text-red-400'}`}>
                    {session.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button className="p-1 hover:bg-gray-700 rounded">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                    <button className="p-1 hover:bg-gray-700 rounded">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden">
        <h3 className="text-white text-sm font-medium mb-6">All Sessions</h3>
        <div className="relative px-4">
          <div className="overflow-hidden">
            <motion.div 
              className="flex transition-all duration-300 ease-in-out"
              animate={{ x: `${-100 * currentIndex}%` }}
            >
              {sessions.map((session, index) => (
                <div 
                  key={index} 
                  className="w-full flex-shrink-0 bg-gradient-to-br from-[#2A2A2A] to-[#1A1A1A] rounded-2xl p-6 space-y-4 border border-gray-700/50 shadow-xl"
                >
                  {/* Card Header */}
                  <div className="flex justify-between items-center pb-2 border-b border-gray-700/30">
                    <h4 className="text-[#1CD3C6] font-semibold">Session Details</h4>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      session.status === 'Fulfilled' ? 'bg-green-400/20 text-green-400' :
                      session.status === 'Pending' ? 'bg-yellow-400/20 text-yellow-400' :
                      session.status === 'Active' ? 'bg-blue-400/20 text-blue-400' :
                      'bg-red-400/20 text-red-400'
                    }`}>
                      {session.status}
                    </span>
                  </div>

                  {/* Session Info */}
                  <div className="space-y-4">
                    <div className="bg-[#252525]/50 p-4 rounded-xl">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm">Session ID:</span>
                        <span className="text-white font-medium">{session.id}</span>
                      </div>
                    </div>

                    <div className="bg-[#252525]/50 p-4 rounded-xl">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm">Student:</span>
                        <span className="text-white font-medium">{session.student}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-[#252525]/50 p-4 rounded-xl">
                        <p className="text-gray-400 text-xs mb-1">Date</p>
                        <p className="text-white font-medium">{session.date}</p>
                      </div>
                      <div className="bg-[#252525]/50 p-4 rounded-xl">
                        <p className="text-gray-400 text-xs mb-1">Total</p>
                        <p className="text-white font-medium">{session.total}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-[#252525]/50 p-4 rounded-xl">
                        <p className="text-gray-400 text-xs mb-1">Payment</p>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          session.payment === 'complete' ? 'bg-green-400/10 text-green-400' : 
                          session.payment === 'pending' ? 'bg-yellow-400/10 text-yellow-400' : 
                          'bg-gray-400/10 text-gray-400'
                        }`}>
                          {session.payment}
                        </span>
                      </div>
                      <div className="bg-[#252525]/50 p-4 rounded-xl">
                        <p className="text-gray-400 text-xs mb-1">Subjects</p>
                        <p className="text-white font-medium">{session.subjects}</p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-end gap-2 pt-2">
                    <button className="p-2.5 bg-[#252525]/80 hover:bg-[#252525] text-gray-400 rounded-lg transition-colors">
                      <FiEye className="w-5 h-5" />
                    </button>
                    <button className="p-2.5 bg-[#252525]/80 hover:bg-[#252525] text-gray-400 rounded-lg transition-colors">
                      <FiEdit className="w-5 h-5" />
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
              {sessions.map((_, index) => (
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
                currentIndex === sessions.length - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-[#1CD3C6]/10'
              }`}
              disabled={currentIndex === sessions.length - 1}
            >
              <FiChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Pagination */}
      <div className="hidden md:flex items-center justify-between mt-4 text-gray-400">
        <span className="text-sm">1 of 1</span>
        <div className="flex gap-2">
          <button className="p-1 rounded hover:bg-[#1A1A1A]">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button className="p-1 rounded hover:bg-[#1A1A1A]">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default SessionTable; 