import SessionTable from './SessionTable';

const PendingSessions = () => {
  const sessions = [
    { 
      id: "#112156", 
      student: "Syedda Mahnoor", 
      date: "11-Feb-2024", 
      total: "Rs.10,000", 
      payment: "Pening", 
      subjects: "1 Subjects", 
      status: "Pending" 
    },
    { 
      id: "#458864", 
      student: "Rabia Ali", 
      date: "20-April-2024", 
      total: "Rs.20,000", 
      payment: "Pening", 
      subjects: "3 Subjects", 
      status: "Pending" 
    }
  ];

  return (
    <div className="p-6">
      <div className="bg-[#1A1A1A] rounded-xl overflow-hidden">
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
                  <span className="px-2 py-1 rounded-full text-xs bg-yellow-400/10 text-yellow-400">
                    {session.payment}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-300">{session.subjects}</td>
                <td className="px-4 py-3 text-sm">
                  <span className="px-2 py-1 rounded-full text-xs bg-yellow-400/10 text-yellow-400">
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

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4 text-gray-400">
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
    </div>
  );
};

export default PendingSessions; 