import { useRef, useEffect, useState } from "react";
import { motion, useDragControls } from "framer-motion";

export default function DocumentTabs({ activeTab, setActiveTab }) {
  const [dragConstraints, setDragConstraints] = useState({ left: 0, right: 0 });
  const containerRef = useRef(null);
  const tabsContainerRef = useRef(null);
  const dragControls = useDragControls();

  const tabs = [
    { id: "all", label: "All" },
    { id: "degree", label: "Degree Certificates" },
    { id: "teaching", label: "Teaching Certificates" },
    { id: "identity", label: "Identity Proof" },
    { id: "experience", label: "Experience Letters" },
  ];

  useEffect(() => {
    const updateConstraints = () => {
      if (containerRef.current && tabsContainerRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        const contentWidth = tabsContainerRef.current.scrollWidth;
        const maxDrag = Math.max(0, contentWidth - containerWidth);

        setDragConstraints({
          left: -maxDrag,
          right: 0,
        });
      }
    };

    updateConstraints();
    window.addEventListener("resize", updateConstraints);
    return () => window.removeEventListener("resize", updateConstraints);
  }, []);

  return (
    <div className="relative w-full overflow-hidden">
      {/* Tabs Container */}
      <div ref={containerRef} className="w-full px-4 md:px-6 overflow-x-auto touch-pan-x scrollbar-hide">
        <motion.div
          ref={tabsContainerRef}
          drag="x"
          dragControls={dragControls}
          dragConstraints={dragConstraints}
          dragElastic={0.1}
          dragMomentum={false}
          dragTransition={{
            bounceStiffness: 600,
            bounceDamping: 30,
            power: 0.1,
          }}
          className="flex gap-2 md:gap-4 w-fit touch-pan-x cursor-grab active:cursor-grabbing"
        >
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              whileTap={{ scale: 0.97 }}
              className={`px-4 py-2 text-sm font-medium rounded-[20px] whitespace-nowrap flex-shrink-0 transition-all duration-200 ease-out 
                ${
                  activeTab === tab.id
                    ? "bg-[#1CD3C6] text-white shadow-lg shadow-teal-500/20 scale-105"
                    : "text-gray-400 bg-[#252525] hover:text-white hover:bg-[#1CD3C6]/10"
                }
              `}
            >
              {tab.label}
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* Left Gradient Fade */}
      <div className="absolute left-0 top-0 w-12 h-full bg-gradient-to-r from-[#171717] via-[#171717]/50 to-transparent pointer-events-none" />
      {/* Right Gradient Fade */}
      <div className="absolute right-0 top-0 w-12 h-full bg-gradient-to-l from-[#171717] via-[#171717]/50 to-transparent pointer-events-none" />
    </div>
  );
}
