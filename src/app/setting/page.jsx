"use client"
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import MobileSidebar from '@/components/MobileSidebar';
import TopBar from '@/components/TopBar';

export default function Setting() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const router = useRouter();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [settings, setSettings] = useState({
    notifications: false,
    location: false,
    workingStatus: false
  });

  // Auth check
  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/auth/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return <div>Loading...</div>;
  }

  const handleToggle = (setting) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

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
          <main className="relative p-6">
            {/* Header */}
            <div className="flex items-center gap-3 mb-8 bg-[#1A1A1A] p-4 rounded-lg">
              <button 
                onClick={() => router.back()}
                className="text-gray-400 hover:text-white"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h1 className="text-white text-xl">Settings</h1>
            </div>

            {/* Settings Content */}
            <div className="space-y-6">
              {/* General Settings Section */}
              <div>
                <h2 className="text-white text-lg mb-4">General Settings</h2>
                <div className="space-y-2">
                  {/* Notification Toggle */}
                  <div className="flex items-center justify-between bg-[#1A1A1A] p-4 rounded-lg">
                    <span className="text-gray-300">Enable Notification</span>
                    <button 
                      onClick={() => handleToggle('notifications')}
                      className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 ease-in-out ${settings.notifications ? 'bg-[#1CD3C6]' : 'bg-gray-600'}`}
                    >
                      <div className={`w-4 h-4 bg-white rounded-full transition-transform duration-200 ease-in-out ${settings.notifications ? 'translate-x-6' : 'translate-x-0'}`} />
                    </button>
                  </div>

                  {/* Location Toggle */}
                  <div className="flex items-center justify-between bg-[#1A1A1A] p-4 rounded-lg">
                    <span className="text-gray-300">Enable Location</span>
                    <button 
                      onClick={() => handleToggle('location')}
                      className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 ease-in-out ${settings.location ? 'bg-[#1CD3C6]' : 'bg-gray-600'}`}
                    >
                      <div className={`w-4 h-4 bg-white rounded-full transition-transform duration-200 ease-in-out ${settings.location ? 'translate-x-6' : 'translate-x-0'}`} />
                    </button>
                  </div>

                  {/* Working Status Toggle */}
                  <div className="flex items-center justify-between bg-[#1A1A1A] p-4 rounded-lg">
                    <span className="text-gray-300">Enable Working Status</span>
                    <button 
                      onClick={() => handleToggle('workingStatus')}
                      className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 ease-in-out ${settings.workingStatus ? 'bg-[#1CD3C6]' : 'bg-gray-600'}`}
                    >
                      <div className={`w-4 h-4 bg-white rounded-full transition-transform duration-200 ease-in-out ${settings.workingStatus ? 'translate-x-6' : 'translate-x-0'}`} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Privacy Settings Section */}
              <div>
                <h2 className="text-white text-lg mb-4">Privacy Settings</h2>
                <div className="space-y-2">
                  {/* Change Password */}
                  <button className="w-full flex items-center justify-between bg-[#1A1A1A] p-4 rounded-lg text-gray-300 hover:bg-[#2A2A2A] transition-colors">
                    <span>Change Password</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>

                  {/* Change Email Address */}
                  <button className="w-full flex items-center justify-between bg-[#1A1A1A] p-4 rounded-lg text-gray-300 hover:bg-[#2A2A2A] transition-colors">
                    <span>Change Email Address</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Feedback Section */}
              <div>
                <h2 className="text-white text-lg mb-4">FeedBack</h2>
                <button className="w-full flex items-center justify-between bg-[#1A1A1A] p-4 rounded-lg text-gray-300 hover:bg-[#2A2A2A] transition-colors">
                  <span>Student Feedback</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
