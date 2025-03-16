"use client"
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import MobileSidebar from '@/components/MobileSidebar';
import TopBar from '@/components/TopBar';
import StudentRequests from '@/components/home/StudentRequests';
import ActiveOrders from '@/components/home/ActiveOrders';

export default function HomePage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Student Requests");
  const router = useRouter();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  // Auth check
  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/auth/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex min-h-screen bg-[#171717]">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-[260px] h-screen bg-[#171717] flex-shrink-0 fixed left-0 top-0">
        <Sidebar />
      </div>

      {/* Mobile Sidebar */}
      <MobileSidebar 
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
      />
      
      {/* Main content area */}
      <div className="flex-1 lg:ml-[260px] overflow-hidden">
        <div className="min-h-screen">
          {/* TopBar with toggle function */}
          <div className="">
            <TopBar 
              toggleMobileSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
            />
          </div>

          {/* Scrollable Content */}
          <main className="relative pl-5 pr-10 mt-6 overflow-hidden w-[100vw] lg:w-[clamp(300px,100vw-260px,100vw)]">
            {/* Tabs */}
            <div className="flex gap-6 border-b border-gray-800">
              <button
                onClick={() => setActiveTab("Student Requests")}
                className={`pb-4 text-sm font-medium relative ${
                  activeTab === "Student Requests"
                    ? "text-[#1CD3C6]"
                    : "text-gray-400 hover:text-gray-300"
                }`}
              >
                Student Requests
                {activeTab === "Student Requests" && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#1CD3C6]" />
                )}
              </button>
              <button
                onClick={() => setActiveTab("Active Orders")}
                className={`pb-4 text-sm font-medium relative ${
                  activeTab === "Active Orders"
                    ? "text-[#1CD3C6]"
                    : "text-gray-400 hover:text-gray-300"
                }`}
              >
                Active Orders
                {activeTab === "Active Orders" && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#1CD3C6]" />
                )}
              </button>
            </div>

            {/* Tab Content */}
            <div className="mt-6">
              {activeTab === "Student Requests" ? <StudentRequests /> : <ActiveOrders />}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
