"use client";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import AllSessions from "./AllSessions";
import OngoingSessions from "./OngoingSessions";
import PendingSessions from "./PendingSessions";
import CompletedSessions from "./CompletedSessions";
import CancelledSessions from "./CancelledSessions";

const SessionTabs = () => {
  const [activeTab, setActiveTab] = useState("All Sessions");
  const tabs = [
    "All Sessions",
    "Ongoing Sessions",
    "Pending Sessions",
    "Completed Sessions",
    "Cancelled Sessions",
  ];
  const tabsRef = useRef({}); // Store button refs
  const [indicatorStyle, setIndicatorStyle] = useState({
    width: 0,
    left: 0,
  });

  // 🔹 Update indicator position when activeTab or tabsRef changes
  useEffect(() => {
    const activeButton = tabsRef.current[activeTab];
    if (activeButton) {
      setIndicatorStyle({
        width: activeButton.offsetWidth,
        left: activeButton.offsetLeft,
      });
    }
  }, [activeTab]); // Runs when activeTab changes

  return (
    <div className="flex flex-col">
      {/* Tabs Section */}
      <div className="relative border-b border-gray-600 ">
        <div className="flex gap-6 px-4 relative">
          {tabs.map((tab) => (
            <button
              key={tab}
              ref={(el) => {
                if (el) tabsRef.current[tab] = el;
              }}
              onClick={() => setActiveTab(tab)}
              className={`relative py-3 px-4 text-sm font-medium transition-all duration-300 cursor-pointer
                ${activeTab === tab ? "text-white" : "text-gray-400"}
                hover:text-[#1CD3C6]
              `}
            >
              {tab}
            </button>
          ))}

          {/* Floating Bottom Line (Motion) */}
          <motion.div
            className="absolute bottom-0 h-[3px] bg-[#1CD3C6] rounded-full"
            layoutId="underline"
            initial={false}
            animate={indicatorStyle}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        </div>
      </div>

      {/* Content Section */}
      <div className="mt-4">
        {activeTab === "All Sessions" && <AllSessions />}
        {activeTab === "Ongoing Sessions" && <OngoingSessions />}
        {activeTab === "Pending Sessions" && <PendingSessions />}
        {activeTab === "Completed Sessions" && <CompletedSessions />}
        {activeTab === "Cancelled Sessions" && <CancelledSessions />}
      </div>
    </div>
  );
};

export default SessionTabs;
