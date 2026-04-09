import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import './ConsultantWidget.css';

const ConsultantWidget = () => {
    // ... hook logic preserved ... 

  const location = useLocation();
  const navigate = useNavigate();
  const isConsultantPage = location.pathname === '/consultant';

  const handleClick = (e) => {
    // stop propagation to prevent any parent handlers
    e.stopPropagation();
    
    if (isConsultantPage) {
        navigate(-1);
    } else {
        navigate('/consultant');
    }
  };

  return (
    <div 
      className={`consultant-widget ${isConsultantPage ? 'active' : ''}`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      style={{ cursor: 'pointer' }}
    >
      <div 
        className="consultant-btn"
        title={isConsultantPage ? "Закрыть чат" : "Онлайн Консультант"}
      >
        <MessageCircle size={28} />
      </div>
    </div>
  );
};

export default ConsultantWidget;
