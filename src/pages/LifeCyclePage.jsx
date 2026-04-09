import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Baby, GraduationCap, Heart, Users, Crown, BookHeart, Flower2, ChevronDown, ChevronUp } from 'lucide-react';
import { lifeStages } from '../data/lifecycleStages';
import { traditions as allTraditions } from '../data/mockTraditions';
import './LifeCyclePage.css';

const iconMap = {
  Baby,
  GraduationCap,
  Heart,
  Users,
  Crown,
  BookHeart,
  Flower2,
};

const GenderBadge = ({ gender }) => {
  if (!gender) return null;
  if (gender === 'male') {
    return <span className="gender-badge gender-male" title="Для сыновей">М</span>;
  }
  return <span className="gender-badge gender-female" title="Для дочерей">Ж</span>;
};

const LifeCyclePage = () => {
  const [expandedStage, setExpandedStage] = useState(null);

  const toggleStage = (id) => {
    setExpandedStage(expandedStage === id ? null : id);
  };

  const traditionHref = (stageId, t) => {
    const exists = t.id != null && allTraditions.some((tr) => tr.id === t.id);
    if (exists) {
      return `/traditions/${t.id}?from=lifecycle&stage=${stageId}`;
    }
    return `/traditions?search=${encodeURIComponent(t.name)}`;
  };

  return (
    <div className="lifecycle-page">
      <section className="lifecycle-hero">
        <motion.div
          className="lifecycle-hero-content"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
        >
          <span className="lifecycle-hero-tag">Жизненный путь</span>
          <h1>От рождения до ухода</h1>
          <p className="lifecycle-hero-sub">
            Традиции сопровождают казаха на каждом этапе жизни
          </p>
        </motion.div>
      </section>

      <section className="gender-legend" aria-label="Условные обозначения">
        <span className="legend-item">
          <span className="legend-dot" aria-hidden /> М — традиция для сыновей
        </span>
        <span className="legend-item">
          <span className="legend-dot" aria-hidden /> Ж — традиция для дочерей
        </span>
      </section>

      <section className="stages-container stages-container--timeline">
        {lifeStages.map((stage, index) => {
          const Icon = iconMap[stage.iconName] || Heart;
          const expanded = expandedStage === stage.id;

          return (
            <motion.div
              key={stage.id}
              className={`stage-row ${expanded ? 'stage-row--open' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: index * 0.05 }}
            >
              <div className="stage-timeline">
                <span className="stage-dot" style={{ borderColor: stage.color }} />
                {index < lifeStages.length - 1 && <span className="stage-line" />}
              </div>

              <div className="stage-main">
                <button
                  type="button"
                  className="stage-summary"
                  onClick={() => toggleStage(stage.id)}
                  aria-expanded={expanded}
                >
                  <span className="stage-icon" style={{ backgroundColor: stage.color }}>
                    <Icon size={24} />
                  </span>
                  <span className="stage-summary-text">
                    <span className="stage-title">{stage.title}</span>
                    <span className="stage-kazakh">{stage.kazakh}</span>
                    <span className="stage-age">{stage.ageRange}</span>
                  </span>
                  <span className="stage-chevron">{expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}</span>
                </button>

                <AnimatePresence>
                  {expanded && (
                    <motion.div
                      className="stage-expanded"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="stage-desc">{stage.description}</p>
                      <ul className="tradition-detail-list">
                        {stage.traditions.map((t, i) => (
                          <li key={`${t.name}-${i}`} className="tradition-detail-item">
                            <span className="td-num">{i + 1}</span>
                            <div className="td-body">
                              <div className="td-top">
                                <Link to={traditionHref(stage.id, t)} className="td-chip">
                                  {t.name}
                                  <GenderBadge gender={t.gender} />
                                </Link>
                                <span className="td-timing">{t.timing}</span>
                              </div>
                              <p className="td-desc">{t.desc}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </section>
    </div>
  );
};

export default LifeCyclePage;
