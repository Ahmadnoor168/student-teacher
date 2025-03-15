import SessionTable from './SessionTable';

const OngoingSessions = () => {
  const sessions = [
    { 
      id: "#234681", 
      student: "Muhammad Ali", 
      date: "11-Feb-2024", 
      total: "Rs.10,000", 
      payment: "complete", 
      subjects: "1 Subject", 
      status: "Active" 
    },
    // Add more ongoing sessions...
  ];

  return (
    <div className="p-6">
      <SessionTable sessions={sessions} />
    </div>
  );
};

export default OngoingSessions; 