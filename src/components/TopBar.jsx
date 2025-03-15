"use client"
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { logout } from '@/app/redux/features/authSlice';
import Image from 'next/image';

export default function TopBar({ toggleMobileSidebar }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();
  const dispatch = useDispatch();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    router.push('/auth/login');
  };

  return (
    <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-[#2a2a2a] to-[#1A1A1A] border-b border-gray-800 mx-[12px] rounded-[10px] mt-10">
      {/* Left side - Menu Button and Home text */}
      <div className="flex items-center gap-4">
        {/* Menu Button - Only visible on mobile/tablet */}
        <button 
          onClick={toggleMobileSidebar}
          className="lg:hidden flex items-center justify-center w-10 h-10 rounded-xl bg-[#2A2A2A] hover:bg-[#3A3A3A] transition-colors"
        >
          <svg 
            className="w-6 h-6 text-teal-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M4 6h16M4 12h16M4 18h16" 
            />
          </svg>
        </button>

        {/* Home Text */}
        <h1 className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-cyan-300 bg-clip-text text-transparent">
          Home
        </h1>

              {/* <div className="relative">
                <input
                  type="text"
                  placeholder="Search Documents Here"
                  className="w-[300px] bg-[#1A1A1A] text-white px-4 py-2 rounded-md pl-10"
                />
                <svg 
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                  />
                </svg>
              </div> */}
      </div>

      {/* Right side - Avatar and dropdown */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center space-x-3 focus:outline-none"
        >
          <div className="relative group flex items-center gap-2 text-[18px] text-white font-[500]">
            <p>Ahmad Noor</p>
            <div className="w-11 h-11 rounded-full bg-gradient-to-r from-teal-400 via-cyan-300 to-teal-500 p-[2px] cursor-pointer transition-all duration-300 transform hover:scale-105">
              <div className="flex items-center justify-center w-full h-full rounded-full bg-[#0A0A0A] text-white">
                {/* Replace src with your avatar image */}
                {/* <Image
                  src="/avatar-placeholder.png" // Add your image path here
                  alt="User Avatar"
                  width={40}
                  height={40}
                  className="rounded-full"
                  onError={(e) => {
                    // Fallback to initial if image fails to load
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = 'U';
                  }}
                /> */}
              </div>
            </div>
          </div>
        </button>

        {/* Dropdown Menu with animation */}
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-56 rounded-xl bg-gradient-to-b from-[#1A1A1A] to-[#0A0A0A] border border-gray-800 shadow-lg py-1 z-50 transform transition-all duration-200 ease-out">
            <div className="p-3 border-b border-gray-800">
              <p className="text-sm font-medium text-white">User Name</p>
              <p className="text-xs text-gray-400">user@example.com</p>
            </div>
            
            <button
              onClick={() => {
                router.push('/settings');
                setIsDropdownOpen(false);
              }}
              className="w-full px-4 py-3 text-left text-gray-200 hover:bg-teal-400/10 flex items-center space-x-3 group transition-all duration-200"
            >
              <svg 
                className="w-5 h-5 text-teal-400 group-hover:text-teal-300 transition-colors duration-200" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span className="group-hover:text-teal-300 transition-colors duration-200">Settings</span>
            </button>
            
            <button
              onClick={handleLogout}
              className="w-full px-4 py-3 text-left text-gray-200 hover:bg-red-500/10 flex items-center space-x-3 group transition-all duration-200"
            >
              <svg 
                className="w-5 h-5 text-red-400 group-hover:text-red-300 transition-colors duration-200" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" 
                />
              </svg>
              <span className="group-hover:text-red-300 transition-colors duration-200">Logout</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 