
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, BookOpen, Settings, LogOut, Briefcase, X } from 'lucide-react';

const Sidebar = ({ isOpen, onClose }) => {
    const location = useLocation();

    const navigation = [
        { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
        { name: 'Users', href: 'users', icon: Users },
        // { name: 'Courses', href: 'courses', icon: BookOpen },
        { name: 'Careers', href: 'careers', icon: Briefcase },
        { name: 'Applications', href: 'applications', icon: Briefcase }, // Reuse Briefcase or use FileText if imported
    ];

    return (
        <>
            {/* Mobile backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <div className={`${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 h-full flex flex-col transition-transform duration-300 ease-in-out`}>
                <div className="flex items-center justify-between h-16 border-b border-gray-200 px-4">
                    <h1 className="text-2xl font-bold text-blue-600">AdminPanel</h1>
                    {/* Close button for mobile */}
                    <button
                        onClick={onClose}
                        className="lg:hidden text-gray-500 hover:text-gray-700"
                    >
                        <X className="h-6 w-6" />
                    </button>
                </div>
                <div className="flex-1 flex flex-col overflow-y-auto py-4">
                    <nav className="flex-1 px-2 space-y-1">
                        {navigation.map((item) => {
                            const isActive = location.pathname === item.href;
                            return (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    onClick={() => onClose()} // Close sidebar on mobile when clicking a link
                                    className={`group flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors duration-150 ease-in-out
                      ${isActive
                                            ? 'bg-blue-50 text-blue-600'
                                            : 'text-gray-600 hover:bg-gray-50 hover:text-blue-600'
                                        }`}
                                >
                                    <item.icon
                                        className={`mr-3 h-5 w-5 shrink-0
                        ${isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-blue-500'}
                      `}
                                    />
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>
                </div>
                <div className="p-4 border-t border-gray-200">
                    <Link to={'/'} className="flex items-center w-full px-4 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-red-50 hover:text-red-600 transition-colors duration-150">
                        <LogOut className="mr-3 h-5 w-5" />
                        Back to Home
                    </Link>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
