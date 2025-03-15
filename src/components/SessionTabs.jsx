const SessionTabs = ({ activeTab, onTabChange }) => {
  const tabs = [
    "All Sessions",
    "Ongoing Sessions", 
    "Pending Sessions",
    "Completed Sessions",
    "Cancelled Sessions"
  ];

  return (
    <div className="flex gap-4 mb-6">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
            ${activeTab === tab ? 'bg-[#1CD3C6] text-black' : 'text-gray-400 hover:bg-[#1A1A1A]'}`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default SessionTabs; 