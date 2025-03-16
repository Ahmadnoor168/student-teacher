"use client";
import { useRouter } from 'next/navigation';

const ActiveOrders = () => {
  const router = useRouter();

  const activeOrders = [
    {
      id: "#GA555A",
      location: "Professor Road, Committee Chowk, Rawalpindi",
      studentName: "Maryam Javed",
      subject: "Maths, Computer",
      startDate: "23/10/2024 2:11 AM",
      endDate: "23/10/2024 2:11 AM",
      status: "Active"
    },
    {
      id: "#BA555A",
      location: "Saddar International Trade Center, Sialkot",
      studentName: "Mahnoor Tanveer",
      subject: "Maths, Computer",
      startDate: "23/10/2024 2:11 AM",
      endDate: "23/10/2024 2:11 AM",
      status: "Active"
    },
    {
      id: "#CA223A",
      location: "Mandibari Hillside Retreat, Rawalpindi",
      studentName: "Rabia Afzal",
      subject: "Maths, Computer",
      startDate: "23/10/2024 2:11 AM",
      endDate: "23/10/2024 2:11 AM",
      status: "Active"
    },
    // Add 3 more similar orders with different data
  ];

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  };

  const handleViewDetails = (orderId) => {
    // Remove the # from the ID when navigating
    const cleanId = orderId.replace('#', '');
    router.push(`/home/orders/${cleanId}`);  // Updated path
  };

  return (
    <div className="p-3 sm:p-4 lg:p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
        {activeOrders.map((order) => (
          <div key={order.id} className="bg-[#1A1A1A] rounded-xl p-3 sm:p-4 lg:p-6 hover:border-[#1CD3C6]/20 border border-gray-800/10 transition-all duration-300">
            {/* Order ID and Status */}
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <span className="text-gray-400 text-xs sm:text-sm">{order.id}</span>
              </div>
              <span className="px-2 py-0.5 bg-gray-800 text-gray-400 rounded text-xs">
                {order.status}
              </span>
            </div>

            {/* Location with Map */}
            <div className="mb-3 sm:mb-4">
              <div className="flex items-start gap-1.5 sm:gap-2 mb-2">
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-xs text-gray-400 leading-tight">{order.location}</span>
              </div>
              {/* Map placeholder */}
              <div className="w-full h-16 sm:h-20 bg-gray-800 rounded overflow-hidden relative">
                <div className="absolute right-2 top-2">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#1CD3C6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Student Info Row */}
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gray-700 flex items-center justify-center">
                  <span className="text-gray-300 text-xs">
                    {getInitials(order.studentName)}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs sm:text-sm text-gray-300">Student Name</span>
                  <span className="text-xs text-gray-400">{order.studentName}</span>
                </div>
              </div>
              {/* Blue dot */}
              <div className="ml-auto w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-400 rounded-full"></div>
            </div>

            {/* Subject Row */}
            <div className="flex items-center gap-1.5 sm:gap-2 mb-3 sm:mb-4">
              <span className="text-xs text-gray-300">Subject:</span>
              <span className="text-xs text-gray-400">{order.subject}</span>
            </div>

            {/* Time Slots */}
            <div className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-xs text-gray-400">Start Date</span>
                <span className="text-xs text-gray-400 ml-auto">{order.startDate}</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-xs text-gray-400">End Date</span>
                <span className="text-xs text-gray-400 ml-auto">{order.endDate}</span>
              </div>
            </div>

            {/* View Details Button */}
            <button
              onClick={() => handleViewDetails(order.id)}
              className="w-full py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white bg-[#1CD3C6] rounded hover:bg-[#19BFB3] transition-colors"
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActiveOrders;