'use client'
// components/Header.jsx
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, User,Bell } from 'lucide-react';
import { useRouter } from 'next/navigation';


const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white shadow-md py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className='cursor-pointer' onClick={() => router.push('/homepage')}>
            <div className="flex items-center transition-transform duration-300 hover:scale-105">
              <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                YourLogo
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          {/* <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-500 transition-colors duration-200">
              Home
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-blue-500 transition-colors duration-200">
              About
            </Link>
            <Link href="/services" className="text-gray-700 hover:text-blue-500 transition-colors duration-200">
              Services
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-blue-500 transition-colors duration-200">
              Contact
            </Link>
          </nav> */}

          <div className="flex items-center">
            {/* Notification Icon */}
          <button 
              className="relative mr-2 cursor-pointer p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-all duration-200 hover:scale-110"
              aria-label="User profile"
              >
              <Bell size={20} className="text-gray-700" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-green-500 rounded-full animate-pulse"></span>
            </button>
            
            {/* Profile Icon */}
            <button 
              className="relative cursor-pointer p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-all duration-200 hover:scale-110"
              aria-label="User profile"
            >
              <User size={20} className="text-gray-700" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-green-500 rounded-full animate-pulse"></span>
            </button>

            {/* Mobile Menu Button */}
            <button 
              className="ml-4 md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? (
                <X size={24} className="text-gray-700" />
              ) : (
                <Menu size={24} className="text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {/* <div 
          className={`md:hidden transition-all duration-300 overflow-hidden ${
            isMobileMenuOpen ? 'max-h-60 opacity-100 mt-4' : 'max-h-0 opacity-0'
          }`}
        >
          <nav className="flex flex-col space-y-4 py-2">
            <Link 
              href="/" 
              className="text-gray-700 hover:text-blue-500 transition-colors duration-200 transform hover:translate-x-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/about" 
              className="text-gray-700 hover:text-blue-500 transition-colors duration-200 transform hover:translate-x-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              href="/services" 
              className="text-gray-700 hover:text-blue-500 transition-colors duration-200 transform hover:translate-x-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Services
            </Link>
            <Link 
              href="/contact" 
              className="text-gray-700 hover:text-blue-500 transition-colors duration-200 transform hover:translate-x-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>
          </nav>
        </div> */}
      </div>
    </header>
  );
};

export default Header;