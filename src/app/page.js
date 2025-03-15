"use client"
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import MobileSidebar from '@/components/MobileSidebar';
import TopBar from '@/components/TopBar';
import DocumentTabs from '@/components/DocumentTabs';
import AllDocuments from '@/components/tabs/AllDocuments';
import DegreeCertificates from '@/components/tabs/DegreeCertificates';
import TeachingCertificates from '@/components/tabs/TeachingCertificates';
import IdentityProof from '@/components/tabs/IdentityProof';
import ExperienceLetters from '@/components/tabs/ExperienceLetters';

export default function HomePage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const router = useRouter();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [activeTab, setActiveTab] = useState('all');

  // Auth check
  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/auth/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return <div>Loading...</div>;
  }

  // Render content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'all':
        return <AllDocuments />;
      case 'degree':
        return <DegreeCertificates />;
      case 'teaching':
        return <TeachingCertificates />;
      case 'identity':
        return <IdentityProof />;
      case 'experience':
        return <ExperienceLetters />;
      default:
        return <AllDocuments />;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#171717]">
      {/* Desktop Sidebar - Remains unchanged */}
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
        <div className="min-h-screen bg-[#171717]">
          {/* TopBar with toggle function */}
          <div className="">
            <TopBar 
              toggleMobileSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
            />
          </div>

          {/* Scrollable Content */}
          <main className="relative pl-5 pr-10 mt-6 overflow-hidden w-[100vw] lg:w-[clamp(300px,100vw-260px,100vw)]">


            

            {/* Document Tabs */}
            <DocumentTabs activeTab={activeTab} setActiveTab={setActiveTab} />

            {/* Tab Content */}
            <div className="mt-6">
              {renderTabContent()}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
