import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import './AIFloatingButton.css';

const AIFloatingButton = () => {
  const navigate = useNavigate();

  return (
    <motion.button
      type="button"
      className="ai-floating-btn"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1, type: "spring" }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      title="Перейти к консультанту"
      onClick={() => navigate('/consultant')}
    >
      <div className="ai-btn-content">
        <Sparkles size={24} color="white" />
      </div>
      <div className="ai-pulse" />
    </motion.button>
  );
};

export default AIFloatingButton;
