"use client"
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import MobileSidebar from '@/components/MobileSidebar';
import TopBar from '@/components/TopBar';
import Image from 'next/image';

export default function Profile() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
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

          {/* Profile Content */}
          <main className="px-8 py-6">
            {/* Banner and Profile Image */}
            <div className="relative mb-16">
              {/* Banner */}
              <div className="w-full h-48 rounded-xl overflow-hidden">
                <div className="w-full h-full bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600" />
              </div>

              {/* Centered Profile Image */}
              <div className="absolute left-1/2 -translate-x-1/2 -bottom-16">
                <div className="w-32 h-32 rounded-full bg-[#1CD3C6] p-1">
                  <div className="w-full h-full rounded-full bg-[#0A0A0A] flex items-center justify-center overflow-hidden">
                    <span className="text-3xl text-white">U</span>
                  </div>
                </div>
              </div>
            </div>

            {/* User Info */}
            <div className="text-center mb-8">
              <h2 className="text-white text-xl font-medium">Syedda Mahnoor Tanveer</h2>
              <p className="text-gray-400 text-sm mt-1">+91123456789 • mahnoor@gmail.com</p>
              <p className="text-gray-400 text-sm mt-1">Peshawar Road, Committee Chowk (Rawalpindi)</p>
            </div>

            {/* Profile Form */}
            <div className="max-w-xl mx-auto space-y-6">
              {/* Full Name */}
              <div>
                <label className="block text-white mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  defaultValue=""
                  className="w-full bg-[#1A1A1A] text-gray-300 px-4 py-3 rounded-lg border border-gray-800 focus:outline-none focus:border-[#1CD3C6]"
                />
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-white mb-2">
                  Phone No
                </label>
                <input
                  type="tel"
                  placeholder="Enter your phone no"
                  className="w-full bg-[#1A1A1A] text-gray-300 px-4 py-3 rounded-lg border border-gray-800 focus:outline-none focus:border-[#1CD3C6]"
                />
              </div>

              {/* Address */}
              <div>
                <label className="block text-white mb-2">
                  Address
                </label>
                <input
                  type="text"
                  placeholder="Enter your address"
                  className="w-full bg-[#1A1A1A] text-gray-300 px-4 py-3 rounded-lg border border-gray-800 focus:outline-none focus:border-[#1CD3C6]"
                />
              </div>

              {/* Update Button */}
              <button
                type="button"
                className="w-full bg-[#1CD3C6] text-white cursor-pointer font-medium py-3 rounded-lg hover:bg-[#1CD3C6]/90 transition-colors mt-4"
              >
                Update
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
