import { motion } from 'framer-motion';

// Basic SVG Path for a "Koshkar Muiz" (Ram's Horn) element
const KoshkarMuizPath = "M10,20 C10,10 25,10 25,20 C25,30 10,30 10,20 M25,20 C25,10 40,10 40,20 C40,30 25,30 25,20"; // Simplified spiral representation

export const KazakhDivider = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '3rem 0', opacity: 0.8 }}>
      <svg width="300" height="40" viewBox="0 0 300 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <motion.path
          d="M0 20 H300 M150 20 Q160 5 170 20 T190 20 T210 20 M150 20 Q140 35 130 20 T110 20 T90 20"
          stroke="url(#gold-gradient)"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
        <defs>
          <linearGradient id="gold-gradient" x1="0" y1="0" x2="300" y2="0" gradientUnits="userSpaceOnUse">
            <stop stopColor="transparent" />
            <stop offset="0.5" stopColor="#D4AF37" />
            <stop offset="1" stopColor="transparent" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export const CornerOrnament = ({ position = 'top-left' }) => {
  const isLeft = position.includes('left');
  const isTop = position.includes('top');
  
  const style = {
    position: 'absolute',
    top: isTop ? 0 : 'auto',
    bottom: isTop ? 'auto' : 0,
    left: isLeft ? 0 : 'auto',
    right: isLeft ? 'auto' : 0,
    zIndex: 0,
    pointerEvents: 'none',
    width: '200px',
    height: '200px',
    transform: `scale(${isLeft ? 1 : -1}, ${isTop ? 1 : -1})`
  };

  return (
    <div style={style}>
      <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none">
        <motion.path
          d="M0 0 H50 Q80 0 80 30 V60" 
          stroke="var(--color-gold)"
          strokeWidth="1"
          strokeOpacity="0.2"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
        />
        <motion.path
          d="M10 10 H40 Q60 10 60 30 V50" 
          stroke="var(--color-gold)"
          strokeWidth="1"
          strokeOpacity="0.15"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 0.7 }}
        />
        {/* Decorative circle */}
        <motion.circle 
            cx="20" cy="20" r="2" 
            fill="var(--color-gold)" 
            opacity="0.5"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1 }} 
        />
      </svg>
    </div>
  );
};
