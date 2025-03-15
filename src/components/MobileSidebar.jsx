import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiHome, FiUser, FiFileText, FiSettings, FiHelpCircle, FiPhone, FiLogOut } from 'react-icons/fi';
import logo from "@/assets/images/logomain.png";
import Image from 'next/image';

export default function MobileSidebar({ isOpen, onClose }) {
  const pathname = usePathname();

  const menuItems = [
    { 
      id: 'home', 
      icon: FiHome, 
      text: 'Home', 
      href: '/'
    },
    { 
      id: 'profile', 
      icon: FiUser, 
      text: 'Profile',
      href: '/profile'
    },
    { 
      id: 'session', 
      icon: FiFileText, 
      text: 'Session Requests',
      href: '/session-requests'
    },
    { 
      id: 'settings', 
      icon: FiSettings, 
      text: 'Settings',
      href: '/setting'
    },
    { 
      id: 'faq', 
      icon: FiHelpCircle, 
      text: 'FAQ',
      href: '/faq'
    },
    { 
      id: 'contact', 
      icon: FiPhone, 
      text: 'Contact Us',
      href: '/contactus'
    },
  ];

  const handleLogout = () => {
    // Add your logout logic here
    console.log('Logging out...');
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-50 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Mobile Sidebar */}
      <div className={`
        fixed top-0 left-0 h-screen w-[260px]  z-50
        transform transition-transform duration-300 ease-in-out
        lg:hidden
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="h-full bg-[#1CD3C6] rounded-r-[10px] flex flex-col">
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-white"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Logo */}
          <Link href="/home" className="p-6 flex justify-center" onClick={onClose}>
            <div className="w-[94px] h-[94px]">
              {logo && (
                <Image
                  src={logo}
                  alt="Logo"
                  width={94}
                  height={94}
                  className="object-cover object-center"
                  priority
                />
              )}
            </div>
          </Link>

          {/* Menu Items */}
          <div className="flex-1 pl-4">
            {menuItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                onClick={onClose}
                className={`
                  w-full flex items-center pl-4 py-4 rounded-l-lg
                  ${pathname === item.href ? 'bg-[#171717]' : 'hover:bg-[#171717]/10'}
                  transition-colors
                `}
              >
                <item.icon className="w-5 h-5 mr-3 text-white" />
                <span className="text-white text-sm">{item.text}</span>
              </Link>
            ))}
          </div>

          {/* Logout */}
          <button 
            onClick={handleLogout}
            className="w-full flex items-center px-8 py-4 hover:bg-white/10 transition-colors"
          >
            <FiLogOut className="w-5 h-5 mr-3 text-white" />
            <span className="text-white text-sm">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
} 