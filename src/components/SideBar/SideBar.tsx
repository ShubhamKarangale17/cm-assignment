import { MdSettings } from 'react-icons/md';
import { HiDocumentText } from 'react-icons/hi';
import { BiEdit, BiUserCircle } from 'react-icons/bi';
import { IoDocuments } from 'react-icons/io5';
import { useNavigate, useLocation } from 'react-router-dom';

const SideBar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const navItems = [
        {
            name: 'All Contracts',
            icon: <IoDocuments className="w-5 h-5" />,
            path: '/contracts'
        },
        {
            name: 'Blueprints',
            icon: <HiDocumentText className="w-5 h-5" />,
            path: '/blueprints'
        }
    ];

    return (
        <div className="bg-gray-50 w-80 h-screen flex flex-col border-r border-gray-200">
            {/* Header */}
            <div className="p-6 flex items-center gap-3">
                <div className="bg-blue-600 rounded-lg p-2.5 flex items-center justify-center">
                    <BiEdit className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-xl font-semibold text-gray-900">Contract Manager</h1>
            </div>

            {/* Navigation Items */}
            <nav className="flex-1 px-3 pt-2">
                {navItems.map((item) => (
                    <button
                        key={item.name}
                        onClick={() => navigate(item.path)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors ${location.pathname === item.path
                            ? 'bg-blue-100 text-blue-600'
                            : 'text-gray-600 hover:bg-gray-100'
                            }`}
                    >
                        {item.icon}
                        <span className="font-medium">{item.name}</span>
                    </button>
                ))}
            </nav>

            {/* Bottom Section */}
            <div className="p-3 border-t border-gray-200">
                {/* Settings */}
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors mb-2">
                    <MdSettings className="w-5 h-5" />
                    <span className="font-medium">Settings</span>
                </button>

                {/* User Profile */}
                <div className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors">
                    <BiUserCircle className="w-10 h-10 text-blue-600" />
                    <div className="flex-1">
                        <p className="font-semibold text-gray-900 text-sm">Admin</p>
                        <p className="text-xs text-gray-500">Admin</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SideBar;