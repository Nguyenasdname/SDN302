import { useState } from 'react';
import { Users, Home as HomeIcon, MessageSquare, LayoutDashboard, Menu, X, LogOut, DollarSign, Briefcase, Calendar } from 'lucide-react';
import { Button } from './ui/button';


const AdminLayout = ({ children, currentPage, onNavigate, onLogout, currentUser }) => {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const menuItems = [
        { id: 'admin-revenue', label: 'Revenue & Analytics', icon: DollarSign },
        { id: 'admin-bookings', label: 'Booking Management', icon: Calendar },
        { id: 'admin-accounts', label: 'Account Management', icon: Users },
        { id: 'admin-resorts', label: 'Resort Management', icon: HomeIcon },
        { id: 'admin-services', label: 'Service Management', icon: Briefcase },
        { id: 'admin-contacts', label: 'Contact Management', icon: MessageSquare },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Top Header */}
            <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
                <div className="flex items-center justify-between px-6 py-4">
                    <div className="flex items-center gap-4">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="lg:hidden"
                        >
                            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </Button>

                        <button
                            onClick={() => onNavigate('home')}
                            className="flex items-center gap-2"
                        >
                            <div className="w-10 h-10 rounded-full flex items-center justify-center"
                                style={{ background: 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)' }}
                            >
                                <HomeIcon className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex flex-col items-start">
                                <span className="text-lg" style={{ fontFamily: 'var(--font-serif)' }}>
                                    MyBooking Admin
                                </span>
                                <span className="text-xs text-gray-500">Dashboard</span>
                            </div>
                        </button>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* User Info */}
                        <div className="hidden md:flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-lg">
                            <div className="w-8 h-8 rounded-full bg-[#14b8a6] flex items-center justify-center">
                                <span className="text-white text-sm">
                                    {currentUser?.name?.charAt(0) || 'A'}
                                </span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm">{currentUser?.name || 'Admin'}</span>
                                <span className="text-xs text-gray-500 capitalize">{currentUser?.role}</span>
                            </div>
                        </div>

                        {/* Back to Site Button */}
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onNavigate('home')}
                        >
                            <HomeIcon className="w-4 h-4 mr-2" />
                            Back to Site
                        </Button>

                        <Button
                            variant="outline"
                            size="sm"
                            onClick={onLogout}
                        >
                            <LogOut className="w-4 h-4 mr-2" />
                            Logout
                        </Button>
                    </div>
                </div>
            </header>

            <div className="flex">
                {/* Sidebar */}
                <aside
                    className={`fixed lg:sticky top-16 left-0 z-30 h-[calc(100vh-4rem)] bg-white border-r border-gray-200 transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
                        }`}
                    style={{ width: sidebarOpen ? '280px' : '0', minWidth: sidebarOpen ? '280px' : '0' }}
                >
                    <nav className="p-4 space-y-2">
                        {menuItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = currentPage === item.id;

                            return (
                                <button
                                    key={item.id}
                                    onClick={() => {
                                        onNavigate(item.id);
                                        if (window.innerWidth < 1024) setSidebarOpen(false);
                                    }}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
                                        ? 'bg-[#14b8a6] text-white'
                                        : 'text-gray-700 hover:bg-gray-100'
                                        }`}
                                >
                                    <Icon className="w-5 h-5" />
                                    <span className="text-sm">{item.label}</span>
                                </button>
                            );
                        })}
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="flex-1">
                    {children}
                </main>
            </div>

            {/* Mobile Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/20 z-20 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}
        </div>
    );
}

export default AdminLayout