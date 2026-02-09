import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Sun, Moon, User, ChevronDown, LogOut } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { FaBars, FaTimes, FaUserCircle } from 'react-icons/fa';

export const Navbar = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  // logout fonksiyonunu useAuth içinden alıyoruz
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navbarStyle = {
    backgroundColor: isScrolled 
      ? (isDarkMode ? '#1A0B2E' : '#FFDCF3') 
      : 'transparent',
    transition: 'all 0.4s ease-in-out',
  };

  return (
    <nav style={navbarStyle} className={`fixed top-0 left-0 right-0 px-6 py-4 z-[9999] ${isScrolled ? "shadow-2xl border-b border-accent/20" : ""}`}>
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-accent">
          TUI<span className="text-text-primary">EVOLUTION</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="hover:text-accent font-bold transition-colors">Home</Link>
          <Link to="/projects" className="hover:text-accent font-bold transition-colors">Projects</Link>
          <div className="relative group py-2">
            <Link to="/about" className="hover:text-accent font-bold flex items-center gap-1 transition-colors">
              About Us <ChevronDown size={14} className="group-hover:rotate-180 transition-transform" />
            </Link>
            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-300">
              <div style={{ backgroundColor: isDarkMode ? '#1A0B2E' : '#FFDCF3' }} className="w-44 border-2 border-accent/20 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
                <Link to="/about/evrim" className="px-4 py-3 hover:bg-accent hover:text-white text-sm font-bold transition-colors">Evrim Aluç</Link>
                <Link to="/about/tuana" className="px-4 py-3 hover:bg-accent hover:text-white text-sm font-bold transition-colors">Tuana Akyıldız</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Action Icons */}
        <div className="flex items-center gap-4">
          <button onClick={toggleTheme} className="p-2 text-accent hover:rotate-12 transition-transform">
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          <div className="relative">
            {user ? (
              <div className="relative">
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-white shadow-lg border-2 border-white/20 hover:scale-105 transition-transform"
                >
                  <User size={20} />
                </button>

                {isProfileOpen && (
                  <div className="absolute top-full right-0 mt-2 w-56 bg-bg-primary border-2 border-accent/20 rounded-2xl shadow-2xl overflow-hidden animate-fade-in">
                    <div className="px-4 py-3 border-b border-accent/10 bg-accent/5">
                      <p className="text-[10px] opacity-50 uppercase font-black">Active Account</p>
                      <p className="text-sm font-bold truncate">{user.email}</p>
                    </div>
                    <Link to="/profile" className="flex items-center gap-2 px-4 py-3 hover:bg-accent hover:text-white text-sm transition-colors font-semibold">
                      <User size={16} /> My Profile
                    </Link>
                    <button 
                      onClick={() => { logout(); setIsProfileOpen(false); }}
                      className="w-full flex items-center gap-2 text-left px-4 py-3 hover:bg-red-500 hover:text-white text-sm text-red-500 font-bold transition-colors border-t border-accent/5"
                    >
                      <LogOut size={16} /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="bg-accent text-white px-6 py-2 rounded-full text-sm font-bold shadow-md hover:bg-opacity-90 transition-all">
                Sign In
              </Link>
            )}
          </div>

          <button className="md:hidden text-accent" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;