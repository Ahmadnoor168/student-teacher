"use client"
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import MobileSidebar from '@/components/MobileSidebar';
import TopBar from '@/components/TopBar';

export default function ContactUs() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const router = useRouter();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
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
            <div className="flex items-center gap-3 mb-8 bg-[#2a2a2a] p-4 rounded-lg">
              <button onClick={() => router.back()} className="text-gray-400 hover:text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h1 className="text-white text-xl">Contact Us</h1>
            </div>

            {/* Contact Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column - Get In Touch */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-white text-2xl font-semibold mb-3">Get In Touch</h2>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Have questions, need assistance, or just want to learn more about our Reach us today - we're here to help and look forward to connecting with you!
                  </p>
                </div>

                {/* Contact Options */}
                <div className="space-y-6">
                  {/* Phone */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#1CD3C6] rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-white text-sm">+1 (900) 123-4567</p>
                      <p className="text-gray-400 text-xs">Mon to Fri 9am to 6pm</p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#1CD3C6] rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-white text-sm">contact@yourcompany.com</p>
                      <p className="text-gray-400 text-xs">Online support</p>
                    </div>
                  </div>

                  {/* WhatsApp */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#1CD3C6] rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-white text-sm">Chat with Us Now!</p>
                      <p className="text-gray-400 text-xs">Live chat support</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Contact Form */}
              <div className="bg-[#1A1A1A] rounded-lg p-6">
                <h3 className="text-white text-lg mb-6">Your Details</h3>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-[#2A2A2A] text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#1CD3C6] text-sm"
                      placeholder="Your Name"
                      required
                    />
                  </div>

                  <div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-[#2A2A2A] text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#1CD3C6] text-sm"
                      placeholder="Your Email"
                      required
                    />
                  </div>

                  <div>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full bg-[#2A2A2A] text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#1CD3C6] text-sm"
                      placeholder="Message Subject"
                      required
                    />
                  </div>

                  <div>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full bg-[#2A2A2A] text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#1CD3C6] text-sm min-h-[120px] resize-none"
                      placeholder="Your Message"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#1CD3C6] text-white py-3 rounded-lg hover:bg-[#19BFB3] transition-colors text-sm font-medium"
                  >
                    Submit Details
                  </button>
                </form>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
