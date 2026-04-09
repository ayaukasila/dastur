import { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Search, Sun, Moon } from 'lucide-react';
import './Header.css';

const quickNavItems = [
  { to: '/', label: 'Главная', icon: '🏠' },
  { to: '/traditions', label: 'Традиции', icon: '📚' },
  { to: '/lifecycle', label: 'Жизненный путь', icon: '🧭' },
  { to: '/shop', label: 'Услуги и товары', icon: '🛍️' },
  { to: '/about', label: 'О проекте', icon: 'ℹ️' },
  { to: '/consultant', label: 'Консультант', icon: '💬' },
];

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState('dark');
  const navigate = useNavigate();
  const location = useLocation();
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  const goToSearch = () => {
    navigate('/');
    setTimeout(() => {
      const searchInput = document.querySelector('.hero-search-container input');
      if (searchInput) searchInput.focus();
    }, 100);
  };

  const isItemActive = (to) => {
    const path = location.pathname;
    if (to === '/') return path === '/';
    if (to === '/traditions') return path === '/traditions' || path.startsWith('/traditions/');
    if (to === '/shop') return path === '/shop' || path.startsWith('/shop/') || path.startsWith('/services/') || path.startsWith('/vendor/');
    return path === to;
  };

  return (
    <motion.header
      className="app-header glass-panel"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <div className="app-header-container">
        <NavLink to="/" className="app-header-logo" onClick={() => setIsOpen(false)} end>
          <span className="logo-mark">✧</span>
          <span className="logo-text-wrap">
            <span className="logo-title-row">
              <span className="logo-title">Дәстүр</span>
              <span className="logo-slash">/</span>
              <span className="logo-tagline">Традиции Казахстана</span>
            </span>
          </span>
        </NavLink>

        <div className="header-controls" aria-label="Навигация">
          <button type="button" className="search-btn" onClick={goToSearch} title="Поиск на главной">
            <Search size={20} />
          </button>
          <button
            type="button"
            className="header-burger"
            onClick={toggleMenu}
            ref={buttonRef}
            aria-expanded={isOpen}
            aria-label="Меню"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={menuRef}
            className="app-header-mobile glass-panel"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="quick-menu-grid">
              {quickNavItems.map(({ to, label, icon }) => (
                <NavLink key={to} to={to} className={`quick-menu-item ${isItemActive(to) ? 'quick-menu-item--active' : ''}`} onClick={toggleMenu}>
                  <span className="quick-menu-item__icon" aria-hidden>{icon}</span>
                  <span className="quick-menu-item__label">{label}</span>
                </NavLink>
              ))}
            </div>
            <div className="quick-menu-actions">
              <button type="button" className="menu-theme-toggle" onClick={toggleTheme}>
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                <span>{theme === 'dark' ? 'Светлая тема' : 'Темная тема'}</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export default Header;
