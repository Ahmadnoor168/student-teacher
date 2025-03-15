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
    <div className="p-8">
      {/* Student Request Cards Grid */}
      <div className="grid grid-cols-3 gap-6">
        {studentRequests.map((student) => (
          <div key={student.id} className="bg-[#1A1A1A] rounded-xl p-6">
            {/* Profile Section */}
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-[#1CD3C6] flex items-center justify-center">
                <span className="text-black text-lg font-medium">
                  {getInitials(student.name)}
                </span>
              </div>
              <div className="flex-1">
                <h3 className="text-white text-lg font-medium mb-1">{student.name}</h3>
                <div className="flex items-center gap-1 text-gray-400 text-sm">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{student.location}</span>
                </div>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[#1CD3C6] text-xl font-semibold">{student.price}</span>
              <svg className="w-5 h-5 text-[#1CD3C6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>

            {/* Details */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2 text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>Date: {student.date}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Time: {student.time}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <span>Subject: {student.subject}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>Class: {student.class}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button className="flex-1 py-2 px-4 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors">
                Decline
              </button>
              <button className="flex-1 py-2 px-4 bg-[#1CD3C6] text-black rounded-lg hover:opacity-90 transition-colors flex items-center justify-center gap-2">
                Accept
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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