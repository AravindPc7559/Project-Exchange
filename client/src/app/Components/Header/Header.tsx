'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, User, Bell } from 'lucide-react';
import { useRouter } from 'next/navigation';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header 
        className="fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 bg-[#151942] shadow-md py-2">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between">
            <div className="cursor-pointer" onClick={() => router.push('/homepage')}>
              <div className="flex items-center transition-transform duration-300 hover:scale-105">
                <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                  PROJECT X CHANGE
                </span>
              </div>
            </div>

            <div className="flex items-center">
              <button 
                className="relative mr-2 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-all duration-200 hover:scale-110"
                aria-label="Notifications"
              >
                <Bell size={20} className="text-gray-700" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-green-500 rounded-full animate-pulse"></span>
              </button>
              
              <button 
                className="relative p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-all duration-200 hover:scale-110"
                aria-label="User Profile"
              >
                <User size={20} className="text-gray-700" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-green-500 rounded-full animate-pulse"></span>
              </button>

            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;