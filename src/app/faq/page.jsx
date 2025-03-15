"use client"
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import MobileSidebar from '@/components/MobileSidebar';
import TopBar from '@/components/TopBar';

export default function Faq() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const router = useRouter();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [expandedQuestion, setExpandedQuestion] = useState(null);

  // FAQ Data
  const faqData = [
    {
      id: 1,
      question: "How can I find a teacher for my specific subject?",
      answer: "You can search for teachers by subject, skill, or location using our search feature."
    },
    {
      id: 2,
      question: "Can I schedule classes according to my availability?",
      answer: "Yes, you can schedule classes based on your preferred time slots and teacher availability."
    },
    {
      id: 3,
      question: "Is there a trial period before paid classes?",
      answer: "Yes, we offer trial sessions to ensure compatibility with your chosen teacher."
    },
    {
      id: 4,
      question: "How do I track my progress?",
      answer: "You can track your progress through our detailed analytics and progress reports."
    },
    {
      id: 5,
      question: "What if I have technical issues during a class?",
      answer: "Our support team is available 24/7 to help resolve any technical issues."
    }
  ];

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
              <h1 className="text-white text-xl">Frequently Asked Questions</h1>
            </div>

            {/* FAQ Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Why Choose Us Section */}
              <div className="bg-[#1A1A1A] rounded-lg p-6">
                <h2 className="text-white text-2xl mb-4">Why Choose Us</h2>
                <p className="text-gray-400 mb-6">
                  At Tutors, we are committed to offering a seamless experience with innovative methodology at its core. Whether you're a student seeking guidance or a teacher aiming to impact, our platform is designed to help you succeed. With secure services, simplicity, and round-the-clock support, we're here to make a difference for you.
                </p>
                <button className="bg-[#1CD3C6] text-white px-6 py-2 rounded-lg hover:bg-[#19BFB3] transition-colors flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Customer Support
                </button>
              </div>

              {/* FAQ Questions */}
              <div className="space-y-4">
                {faqData.map((faq) => (
                  <div 
                    key={faq.id}
                    className="bg-[#1A1A1A] rounded-lg overflow-hidden"
                  >
                    <button
                      onClick={() => setExpandedQuestion(expandedQuestion === faq.id ? null : faq.id)}
                      className="w-full flex items-center justify-between p-4 text-gray-300 hover:text-white"
                    >
                      <span className="flex items-center gap-2">
                        <span className="text-white">Q{faq.id}.</span>
                        {faq.question}
                      </span>
                      <svg
                        width="100"
                        height="100"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={`w-6 h-6 text-[#1CD3C6] transition-transform ${
                          expandedQuestion === faq.id ? 'rotate-90' : ''
                        }`}
                      >
                        <circle cx="12" cy="12" r="10" fill="#1CD3C6" />
                        <path
                          d="M8 16L16 8M16 8H9M16 8V15"
                          stroke="white"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </button>
                    {expandedQuestion === faq.id && (
                      <div className="px-4 pb-4 text-gray-400">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
