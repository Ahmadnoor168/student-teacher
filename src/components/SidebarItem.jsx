import { FiGrid, FiFile, FiUsers, FiSettings } from 'react-icons/fi';

const iconComponents = {
  dashboard: FiGrid,
  documents: FiFile,
  users: FiUsers,
  settings: FiSettings,
};

export default function SidebarItem({ icon, text }) {
  const IconComponent = iconComponents[icon];

  return (
    <div className="flex items-center px-4 py-3 text-gray-300 hover:bg-[#2A2A2A] rounded-lg cursor-pointer transition-colors">
      {IconComponent && <IconComponent className="w-6 h-6 mr-3" />}
      <span className="text-sm font-medium">{text}</span>
    </div>
  );
} 