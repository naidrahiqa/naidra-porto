import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiCode } from 'react-icons/fi';
import './Navigation.css';

interface NavigationProps {
  currentPage: 'portfolio' | 'dashboard';
  onNavigate: (page: 'portfolio' | 'dashboard') => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentPage, onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  // Secret keyboard shortcut: Ctrl+Shift+D
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'D') {
        e.preventDefault();
        onNavigate('dashboard');
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [onNavigate]);

  // Reset click count after 1 second
  useEffect(() => {
    if (clickCount > 0) {
      const timer = setTimeout(() => setClickCount(0), 1000);
      return () => clearTimeout(timer);
    }
  }, [clickCount]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Secret access: Triple click on logo
  const handleLogoClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);

    if (newCount === 3) {
      onNavigate('dashboard');
      setClickCount(0);
    } else if (newCount === 1) {
      onNavigate('portfolio');
    }
  };

  return (
    <motion.nav 
      className="navigation"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="nav-container">
        {/* Logo/Brand - Secret Access via Triple Click */}
        <motion.div 
          className="nav-brand" 
          onClick={handleLogoClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          title="Triple-click for secret access 🔒"
        >
          <FiCode className="brand-icon" />
          <span className="brand-text-en">Git's</span>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="nav-links">
          {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((item) => (
            <motion.button
              key={item}
              className={`nav-link`}
              onClick={() => {
                const sectionId = item.toLowerCase();
                // If on dashboard, go to portfolio first
                if (currentPage === 'dashboard') {
                  onNavigate('portfolio');
                  // Wait for render then scroll
                  setTimeout(() => {
                    document.getElementById(sectionId === 'home' ? 'root' : sectionId)?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                } else {
                  // Already on portfolio, just scroll
                   document.getElementById(sectionId === 'home' ? 'root' : sectionId)?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="nav-text">{item}</span>
            </motion.button>
          ))}
          
{/* Theme toggle removed as requested */}
        </div>

        {/* Mobile Menu Toggle */}
        <button className="mobile-menu-toggle" onClick={toggleMenu}>
          <span className={`hamburger ${isMenuOpen ? 'open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
      </div>

      {/* Mobile Menu */}
      <motion.div 
        className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}
        initial={{ opacity: 0, height: 0 }}
        animate={{ 
          opacity: isMenuOpen ? 1 : 0,
          height: isMenuOpen ? 'auto' : 0
        }}
      >
        <button
          className={`mobile-nav-link ${currentPage === 'portfolio' ? 'active' : ''}`}
          onClick={() => {
            onNavigate('portfolio');
            setIsMenuOpen(false);
          }}
        >
          <span className="nav-en">Home</span>
        </button>
      </motion.div>
      
      {/* Secret hint tooltip */}
      {clickCount > 0 && clickCount < 3 && (
        <motion.div 
          className="secret-hint"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
        >
          Click {3 - clickCount} more time{3 - clickCount > 1 ? 's' : ''}...
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navigation;
