import SessionTable from './SessionTable';

const AllSessions = () => {
  const sessions = [
    { 
      id: "#234679", 
      student: "Syedda Mahnoor", 
      date: "11-Feb-2024", 
      total: "Rs.10,000", 
      payment: "complete", 
      subjects: "2 Subjects", 
      status: "Fulfilled" 
    },
    { 
      id: "#234680", 
      student: "Rabia Ali", 
      date: "11-Feb-2024", 
      total: "Rs.30,000", 
      payment: "pending", 
      subjects: "3 Subjects", 
      status: "Pending" 
    },
    { 
      id: "#234681", 
      student: "Muhammad Ali", 
      date: "11-Feb-2024", 
      total: "Rs.10,000", 
      payment: "complete", 
      subjects: "1 Subject", 
      status: "Active" 
    },
    { 
      id: "#234682", 
      student: "Awais Ahmed", 
      date: "11-Feb-2024", 
      total: "Rs.5,000", 
      payment: "N/A", 
      subjects: "1 Subject", 
      status: "Cancelled" 
    },
  ];

  return (
    <div className="p-6">
      <SessionTable sessions={sessions} />
    </div>
  );
};

export default AllSessions; 