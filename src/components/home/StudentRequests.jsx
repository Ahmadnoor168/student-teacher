const StudentRequests = () => {
  const studentRequests = [
    {
      id: 1,
      name: "Maryam Javed",
      location: "Professor Road, Committee Chowk, Rawalpindi",
      price: "$300",
      date: "21/12/2024",
      time: "12:00 PM",
      subject: "Mathematics",
      class: "11"
    },
    {
      id: 2,
      name: "Rabia Masood",
      location: "Professor Road, Committee Chowk, Rawalpindi",
      price: "$200",
      date: "20/12/2024",
      time: "12:00 PM",
      subject: "Computer",
      class: "8"
    },
    {
      id: 3,
      name: "Syedda Hoosain Ali",
      location: "Professor Road, Committee Chowk, Rawalpindi",
      price: "$300",
      date: "21/12/2024",
      time: "12:00 PM",
      subject: "Math,English",
      class: "10"
    }
  ];

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="p-3 sm:p-4 lg:p-8">
      {/* Student Request Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
        {studentRequests.map((student) => (
          <div key={student.id} className="bg-[#1A1A1A] rounded-xl p-3 sm:p-4 lg:p-6 hover:border-[#1CD3C6]/20 border border-gray-800/10 transition-all duration-300">
            {/* Profile Section */}
            <div className="flex items-start gap-2 sm:gap-3 lg:gap-4 mb-3 sm:mb-4 lg:mb-6">
              <div className="w-9 h-9 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full bg-[#1CD3C6] flex items-center justify-center flex-shrink-0">
                <span className="text-black text-sm sm:text-base lg:text-lg font-medium">
                  {getInitials(student.name)}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-white text-sm sm:text-base lg:text-lg font-medium mb-0.5 sm:mb-1 truncate">
                  {student.name}
                </h3>
                <div className="flex items-center gap-1 text-gray-400 text-xs lg:text-sm">
                  <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="truncate">{student.location}</span>
                </div>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center gap-1.5 sm:gap-2 mb-3 sm:mb-4">
              <span className="text-[#1CD3C6] text-base sm:text-lg lg:text-xl font-semibold">{student.price}</span>
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-[#1CD3C6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>

            {/* Details */}
            <div className="space-y-1.5 sm:space-y-2 lg:space-y-3 mb-3 sm:mb-4 lg:mb-6">
              {/* Date */}
              <div className="flex items-center gap-1.5 sm:gap-2 text-gray-400 text-xs sm:text-sm">
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="truncate">Date: {student.date}</span>
              </div>

              {/* Time */}
              <div className="flex items-center gap-1.5 sm:gap-2 text-gray-400 text-xs sm:text-sm">
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="truncate">Time: {student.time}</span>
              </div>

              {/* Subject */}
              <div className="flex items-center gap-1.5 sm:gap-2 text-gray-400 text-xs sm:text-sm">
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <span className="truncate">Subject: {student.subject}</span>
              </div>

              {/* Class */}
              <div className="flex items-center gap-1.5 sm:gap-2 text-gray-400 text-xs sm:text-sm">
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="truncate">Class: {student.class}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 sm:gap-2 lg:gap-3">
              <button className="flex-1 py-1.5 sm:py-2 px-2 sm:px-3 lg:px-4 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors text-xs sm:text-sm">
                Decline
              </button>
              <button className="flex-1 py-1.5 sm:py-2 px-2 sm:px-3 lg:px-4 bg-[#1CD3C6] text-black rounded-lg hover:opacity-90 transition-colors flex items-center justify-center gap-1 lg:gap-2 text-xs sm:text-sm">
                Accept
                <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentRequests; 