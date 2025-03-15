import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiHome, FiUser, FiFileText, FiSettings, FiHelpCircle, FiPhone, FiLogOut } from 'react-icons/fi';
import logo from "@/assets/images/logomain.png"
import Image from 'next/image';


export default function Sidebar() {
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
  };

  return (
    <div className='bg-[#171717]'>
    <div className="h-screen border-10 rounded-[30px] bg-[#1CD3C6] border-[#171717] flo flex flex-col ">
      {/* Logo */}
      <Link href="/home" className="p-6 flex justify-center">
        <div className="w-[94px] h-[94px]">
          {/* <svg className="w-full h-full text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
          </svg> */}
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
      <div className="flex-1 pl-4 ">
        {menuItems.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className={`
              w-full flex items-center pl-4  py-4 rounded-l-lg
              ${pathname === item.href ? 'bg-[#171717] ' : 'hover:bg-[#171717]/10'}
              transition-colors
            `}
          >
            <item.icon className="w-5 h-5 mr-3  text-white" />
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
  );
} 