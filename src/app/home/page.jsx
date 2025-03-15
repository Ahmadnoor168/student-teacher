"use client"
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import TopBar from '@/components/TopBar';
import StudentRequests from '@/components/home/StudentRequests';
import ActiveOrders from '@/components/home/ActiveOrders';

export default function HomePage() {
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
    <div className="flex min-h-screen bg-[#0A0A0A]">
      {/* Sidebar */}
      <div className="w-[280px] fixed left-0 top-0 h-screen bg-[#1CD3C6]">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-[280px]">
        {/* Top Bar */}
        <div className="sticky top-0 z-40 bg-[#1A1A1A] border-b border-gray-800">
          <div className="px-8 py-4">
            <TopBar />
          </div>
        </div>

          {/* Tabs */}
        <div className="px-8 pt-6">
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
          </div>

        {/* Content */}
        {activeTab === "Student Requests" ? <StudentRequests /> : <ActiveOrders />}
      </div>
 </div>
  );
}
