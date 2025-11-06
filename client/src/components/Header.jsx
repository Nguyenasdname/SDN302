import { Home, MapPin, Info, User, LogOut } from 'lucide-react';
import { Button } from './ui/button';
import { useGet } from '../hooks/useGet'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Header = ({ currentPage, currentUser }) => {
    const [isLogin, setIsLogin] = useState(false)
    const {
        data: user,
    } = useGet('/user/profile')

    useEffect(() => {
        if (user) {
            setIsLogin(true)
        }
    },[user])

    const handleLogout = () => {
        localStorage.removeItem('token')
        setIsLogin(false)
        navigate('/')
    }

    const navigate = useNavigate()
    return (
        <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
            <div className="container mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center gap-2 group cursor-pointer"
                    >
                        <div
                            className="w-10 h-10 rounded-full flex items-center justify-center"
                            style={{ background: 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)' }}
                        >
                            <Home className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex flex-col items-start">
                            <span className="text-lg" style={{ fontFamily: 'var(--font-serif)' }}>
                                MyBooking
                            </span>
                            <span className="text-xs text-gray-500">Hoi An & Da Nang</span>
                        </div>
                    </button>

                    {/* Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        <button
                            onClick={() => navigate('home')}
                            className={`transition-colors ${currentPage === 'home' ? 'text-[#14b8a6]' : 'text-gray-600 hover:text-[#14b8a6]'
                                }`}
                        >
                            Home
                        </button>
                        <button
                            onClick={() => navigate('list')}
                            className={`transition-colors ${currentPage === 'list' ? 'text-[#14b8a6]' : 'text-gray-600 hover:text-[#14b8a6]'
                                }`}
                        >
                            Resorts & Rooms
                        </button>
                        <button
                            onClick={() => navigate('home')}
                            className="text-gray-600 hover:text-[#14b8a6] transition-colors"
                        >
                            Destinations
                        </button>
                        <button
                            onClick={() => navigate('home')}
                            className="text-gray-600 hover:text-[#14b8a6] transition-colors"
                        >
                            About Us
                        </button>
                    </nav>

                    {/* User Menu or Sign In Button */}
                    {isLogin ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="flex items-center gap-2 border-2 border-[#14b8a6] hover:bg-[#14b8a6]/10
                                    cursor-pointer"
                                >
                                    <div className="w-8 h-8 rounded-full bg-[#14b8a6] flex items-center justify-center">
                                        <User className="w-4 h-4 text-white" />
                                    </div>
                                    <div className="flex flex-col items-start">
                                        <span className="text-sm">{user.userName || 'User'}</span>
                                        <span className="text-xs text-gray-500 capitalize">{user.userRole}</span>
                                    </div>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48">
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className='cursor-pointer'
                                    onClick={() => navigate('profile')}>
                                    <User className="w-4 h-4 mr-2 " />
                                    Profile
                                </DropdownMenuItem>
                                {user.userRole === 'admin' && (
                                    <>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem className='cursor-pointer'
                                            onClick={() => navigate('admin-accounts')}>
                                            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                                                />
                                            </svg>
                                            Admin Dashboard
                                        </DropdownMenuItem>
                                    </>
                                )}
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className='cursor-pointer'
                                    onClick={() => handleLogout()}>
                                    <LogOut className="w-4 h-4 mr-2" />
                                    Logout
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <Button
                            onClick={() => navigate('/login')}
                            className="px-6 py-2 cursor-pointer"
                            style={{
                                backgroundColor: '#fbbf24',
                                color: '#000',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = '#f59e0b';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = '#fbbf24';
                            }}
                        >
                            Sign In
                        </Button>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header