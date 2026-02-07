import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Sun, Moon, User, ChevronDown } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

export const Navbar = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // 10px kaydığında tetiklenir
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Inline stil tanımları (CSS değişkenleri üzerinden kesin çözüm)
  const navbarStyle = {
    backgroundColor: isScrolled 
      ? (isDarkMode ? '#1A0B2E' : '#FFDCF3') // Scroll sonrası tam opak renk
      : 'transparent',
    transition: 'all 0.4s ease-in-out',
  };

  return (
    <nav 
      style={navbarStyle}
      className={`fixed top-0 left-0 right-0 px-6 py-4 z-[9999] ${
        isScrolled ? "shadow-2xl border-b border-accent/20" : ""
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-accent">
          TUI<span className="text-text-primary">EVOLUTION</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="hover:text-accent font-bold">Home</Link>
          <Link to="/projects" className="hover:text-accent font-bold">Projects</Link>
          
          <div className="relative group py-2">
            <Link to="/about" className="hover:text-accent font-bold flex items-center gap-1">
              About <ChevronDown size={14} />
            </Link>
            {/* Dropdown - Her zaman solid */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all">
              <div 
                style={{ backgroundColor: isDarkMode ? '#1A0B2E' : '#FFDCF3' }}
                className="w-44 border-2 border-accent/20 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
              >
                <Link to="/about/evrim" className="px-4 py-3 hover:bg-accent hover:text-white text-sm font-bold">Evrim Aluç</Link>
                <Link to="/about/tuana" className="px-4 py-3 hover:bg-accent hover:text-white text-sm font-bold">Tuana Akyıldız</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Sağ İkonlar */}
        <div className="flex items-center gap-4">
          <button onClick={toggleTheme} className="p-2 text-accent">
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          <div className="hidden md:block">
            {user ? (
              <Link to="/profile" className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-white shadow-lg">
                <User size={20}/>
              </Link>
            ) : (
              <Link to="/login" className="bg-accent text-white px-6 py-2 rounded-full text-sm font-bold shadow-md">
                Sign In
              </Link>
            )}
          </div>

          <button className="md:hidden text-accent" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobil Menü - Her zaman solid */}
      {isOpen && (
        <div 
          style={{ backgroundColor: isDarkMode ? '#1A0B2E' : '#FFDCF3' }}
          className="md:hidden absolute top-full left-0 right-0 border-t-2 border-accent/10 flex flex-col p-6 gap-4 shadow-2xl"
        >
          <Link to="/" onClick={() => setIsOpen(false)} className="text-lg font-bold">Home</Link>
          <Link to="/projects" onClick={() => setIsOpen(false)} className="text-lg font-bold">Projects</Link>
          <div className="h-[1px] bg-accent/20 my-2" />
          <Link to="/about/evrim" onClick={() => setIsOpen(false)} className="text-accent font-black text-2xl">Evrim Aluç</Link>
          <Link to="/about/tuana" onClick={() => setIsOpen(false)} className="text-accent font-black text-2xl">Tuana Akyıldız</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;