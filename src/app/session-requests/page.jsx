"use client"
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import MobileSidebar from '@/components/MobileSidebar';
import TopBar from '@/components/TopBar';
import { SessionTabs } from '@/components/session';
import Image from 'next/image';
import line from "@/assets/images/line.png"
// add my comment
export default function SessionRequest() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const router = useRouter();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [dateRange, setDateRange] = useState("Jan 1 - April 30, 2024");
  const [activeTab, setActiveTab] = useState("All Sessions");

  const stats = [
    { title: "Total Sessions", value: "150", change: "25% Last Month", chart: "up" },
    { title: "Sessions Completed On Time", value: "60", change: "5% Last 6 months", chart: "up" },
    { title: "Overdue Sessions", value: "50", change: "3% Last Month", chart: "down" },
    { title: "Sessions Completed", value: "50", change: "20% Last Month", chart: "up" },
  ];

  const sessions = [
    { id: "#234679", student: "Syedda Mahnoor", date: "11-Feb-2024", total: "Rs.10,000", payment: "complete", subjects: "2 Subjects", status: "Fulfilled" },
    { id: "#234679", student: "Rabia Ali", date: "11-Feb-2024", total: "Rs.30,000", payment: "pending", subjects: "3 Subjects", status: "Pending" },
    { id: "#234679", student: "Muhammad Ali", date: "11-Feb-2024", total: "Rs.10,000", payment: "complete", subjects: "1 Subject", status: "Active" },
    { id: "#234679", student: "Awais Ahmed", date: "11-Feb-2024", total: "Rs.5,000", payment: "N/A", subjects: "1 Subject", status: "Cancelled" },
  ];

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

          {/* Main Content */}
          <main className="px-8 py-6">
            {/* Date Range Selector */}
            <div className="bg-[#326b61] px-4 py-2 rounded-lg inline-flex items-center gap-2 mb-6">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-gray-300">{dateRange}</span>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="bg-[#2a2a2a] rounded-xl p-4">
                  <h3 className="text-gray-400 text-sm mb-2">{stat.title}</h3>
                  <span className="text-white text-2xl font-semibold">{stat.value}-</span>
                  <div className="flex items-end justify-between">
                    <div className="flex items-center w-full justify-between text-xs text-gray-400"> 
                      <span>{stat.change}</span>
                      <div className="w-16 h-8 ml-2 opacity-50">
                        <div className="w-full h-full rounded">
                          {line && (
                            <Image
                              src={line}
                              alt="Logo"
                              width={94}
                              height={94}
                              className="object-cover object-center"
                              priority
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <SessionTabs />

            {/* Sessions Table */}
          </main>
        </div>
      </div>
    </div>
  );
}