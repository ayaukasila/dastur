import { Link } from 'react-router-dom';
import { Github, Instagram, Twitter } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-ornament-top" />
      
      <div className="footer-content">
        <div className="footer-section">
          <h3 className="footer-logo">✧ Дәстүр</h3>
          <p>Традиции — мост между поколениями!</p>
        </div>
        
        <div className="footer-section">
          <h4>Навигация</h4>
          <Link to="/">Главная</Link>
          <Link to="/lifecycle">Жизненный путь</Link>
          <Link to="/traditions">Традиции</Link>
          <Link to="/shop">Услуги и товары</Link>
          <Link to="/about">О проекте</Link>
        </div>
        
        <div className="footer-section">
          <h4>Контакты</h4>
          <p>Email: info@dastur.kz</p>
          <div className="social-links">
            <a href="#"><Instagram size={20} /></a>
            <a href="#"><Twitter size={20} /></a>
            <a href="#"><Github size={20} /></a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Dastur Project. Все права защищены.</p>
      </div>
    </footer>
  );
};

export default Footer;
