import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, User, LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Navbar = () => {
  const { user } = useAuth();
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass px-6 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-accent dark:text-accent">
          TUI<span className="text-text-primary dark:text-text-primary">EVOLUTION</span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="hover:text-accent font-medium transition-colors">Home</Link>
          <Link to="/projects" className="hover:text-accent font-medium transition-colors">Projects</Link>

          {/* About Us Dropdown Container */}
          <div className="relative group py-2">
            <Link 
              to="/about" 
              className="hover:text-accent font-medium flex items-center gap-1 transition-colors"
            >
              About Us <ChevronDown size={16} className="group-hover:rotate-180 transition-transform"/>
            </Link>

            {/* Hover Köprüsü ve Dropdown Menü */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-300">
              <div className="w-48 bg-bg-secondary dark:bg-bg-secondary rounded-2xl shadow-2xl border border-accent/20 overflow-hidden flex flex-col">
                <Link 
                  to="/about/evrim" 
                  className="px-4 py-3 hover:bg-accent hover:text-white transition-colors text-sm text-center font-semibold"
                >
                  Evrim Aluç
                </Link>
                <div className="h-[1px] bg-accent/10 mx-2"></div>
                <Link 
                  to="/about/tuana" 
                  className="px-4 py-3 hover:bg-accent hover:text-white transition-colors text-sm text-center font-semibold"
                >
                  Tuana Akyıldız
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Auth Section */}
        <div>
          {user ? (
            <Link to="/profile" className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-white shadow-lg">
              <User size={20} />
            </Link>
          ) : (
            <Link to="/login" className="flex items-center gap-2 bg-accent text-white px-5 py-2 rounded-full text-sm font-bold shadow-md">
              <LogIn size={16} /> Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;