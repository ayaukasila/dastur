import { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight, ChevronDown, Scroll, Map } from 'lucide-react';
import { TraditionService } from '../services/api';
import { stageTraditionIds, stageLabelsRu } from '../data/lifecycleStages';
import { categories } from '../data/categories';
import { scenarios } from '../data/scenarios';
import { useScenariosForTradition } from '../hooks/useScenario';
import './TraditionDetail.css';

const CollapsibleBranch = ({ branch }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`tree-branch ${isOpen ? 'branch-open' : ''}`}>
      <button type="button" className="branch-name" onClick={() => setIsOpen(!isOpen)}>
        <ChevronDown className={`branch-chevron ${isOpen ? 'chevron-open' : ''}`} size={18} />
        {branch.name}
        <span className="branch-count">({branch.children?.length || 0})</span>
      </button>
      <AnimatePresence>
        {isOpen && branch.children && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            style={{ overflow: 'hidden' }}
          >
            <div className="branch-children">
              {branch.children.map((child, j) => (
                <span key={j} className="branch-child">
                  {child}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

function isModernHowtoBlock(block) {
  if (block.type !== 'howto') return false;
  const t = `${block.title || ''}`.toLowerCase();
  return t.includes('сейчас') || t.includes('современн');
}

const TraditionDetail = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const fromLifecycle = searchParams.get('from') === 'lifecycle';
  const fromScenario = searchParams.get('from') === 'scenario';
  const scenarioSlug = searchParams.get('slug');
  const categoryParam = searchParams.get('category');
  const stageId = searchParams.get('stage');

  const [tradition, setTradition] = useState(null);
  const [siblings, setSiblings] = useState({ prev: null, next: null });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('history');
  const [expandedRegion, setExpandedRegion] = useState('south');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    TraditionService.getTraditionById(id)
      .then((data) => {
        if (cancelled) return;
        setTradition(data);

        TraditionService.getAllTraditions().then((allTraditions) => {
          if (cancelled) return;
          const sorted = [...allTraditions].sort((a, b) => a.id - b.id);

          let siblingList;
          if (fromLifecycle && stageId && stageTraditionIds[stageId]) {
            siblingList = stageTraditionIds[stageId]
              .map((tid) => sorted.find((t) => t.id === tid))
              .filter(Boolean);
          } else {
            siblingList = sorted;
          }

          const currentIndex = siblingList.findIndex((t) => t.id === Number(id));
          setSiblings({
            prev: currentIndex > 0 ? siblingList[currentIndex - 1] : null,
            next: currentIndex < siblingList.length - 1 ? siblingList[currentIndex + 1] : null,
          });
        });
        setLoading(false);
      })
      .catch(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [id, fromLifecycle, stageId]);

  const relatedScenarios = useScenariosForTradition(Number(id));

  const backConfig = useMemo(() => {
    if (fromScenario && scenarioSlug) {
      const sc = scenarios.find((s) => s.slug === scenarioSlug);
      if (sc) {
        return {
          to: `/scenario/${scenarioSlug}`,
          label: `← Вернуться: ${sc.title}`,
        };
      }
    }
    if (fromLifecycle && stageId && stageLabelsRu[stageId]) {
      return {
        to: '/lifecycle',
        label: `← Этап: ${stageLabelsRu[stageId]}`,
      };
    }
    if (categoryParam) {
      const cat = categories.find((c) => c.id === categoryParam);
      return {
        to: `/traditions?category=${encodeURIComponent(categoryParam)}`,
        label: `← ${cat?.title || 'Категория'}`,
      };
    }
    return { to: '/traditions', label: '← Все традиции' };
  }, [fromScenario, scenarioSlug, fromLifecycle, stageId, categoryParam]);

  const buildNavLink = (traditionId) => {
    const params = new URLSearchParams();
    if (fromScenario && scenarioSlug) {
      params.set('from', 'scenario');
      params.set('slug', scenarioSlug);
    } else if (fromLifecycle) {
      params.set('from', 'lifecycle');
      if (stageId) params.set('stage', stageId);
    }
    if (categoryParam) params.set('category', categoryParam);
    const qs = params.toString();
    return qs ? `/traditions/${traditionId}?${qs}` : `/traditions/${traditionId}`;
  };

  if (loading) return <div className="detail-container">Загрузка...</div>;
  if (!tradition) return <div className="detail-container">Традиция не найдена</div>;

  const renderHistoryBlocks = (blocks) => {
    if (!blocks) return null;
    return blocks.map((block, index) => {
      if (block.type === 'howto' && isModernHowtoBlock(block)) return null;

      switch (block.type) {
        case 'intro':
          return (
            <p key={index} className="detail-intro">
              {block.text}
            </p>
          );
        case 'section':
          return (
            <div key={index} className="content-section">
              {block.title && <h3>{block.title}</h3>}
              {block.image && (
                <div className="content-image-placeholder">
                  <span className="img-caption">{block.image}</span>
                </div>
              )}
              {block.text && <p>{block.text}</p>}
            </div>
          );
        case 'quote':
          return (
            <div key={index} className="content-quote">
              <Quote className="quote-icon" size={32} />
              <blockquote>{block.text}</blockquote>
            </div>
          );
        case 'list':
          return (
            <div key={index} className="content-list">
              {block.title && <h3>{block.title}</h3>}
              <ul>
                {block.items?.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          );
        case 'do':
          return (
            <div key={index} className="content-do">
              <h3>Что делать</h3>
              <ul>
                {block.items?.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          );
        case 'dont':
          return (
            <div key={index} className="content-dont">
              <h3>Чего нельзя</h3>
              <ul>
                {block.items?.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          );
        case 'howto':
          return (
            <div key={index} className="content-howto">
              <h3>{block.title || 'Как проходит обряд'}</h3>
              <ol>
                {block.steps?.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ol>
            </div>
          );
        case 'tree':
          return (
            <div key={index} className="content-tree">
              {block.title && <h3 className="tree-title">{block.title}</h3>}
              <div className="tree-container">
                {block.branches?.map((branch, i) => (
                  <CollapsibleBranch key={i} branch={branch} />
                ))}
              </div>
            </div>
          );
        default:
          return null;
      }
    });
  };

  const modernHowtoBlocks =
    tradition.content?.filter((b) => b.type === 'howto' && isModernHowtoBlock(b)) || [];

  const regionOrder = [
    { id: 'south', label: 'Юг' },
    { id: 'west', label: 'Запад' },
    { id: 'east', label: 'Восток' },
    { id: 'north', label: 'Север' },
  ];

  const regionalText =
    tradition.regionalVariations?.[expandedRegion] ||
    'Региональные особенности уточняйте у консультанта';

  return (
    <div className="detail-page">
      <Link to={backConfig.to} className="back-pill">
        {backConfig.label}
      </Link>

      <motion.div className="detail-header" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
        <div className="detail-bg-overlay" />
        <div className="detail-content-wrapper detail-content-wrapper--stack">
          <div className="detail-meta-row">
            <span className="meta-tag">{tradition.category}</span>
            {tradition.gender === 'male' && <span className="meta-gender meta-gender-male">М</span>}
            {tradition.gender === 'female' && <span className="meta-gender meta-gender-female">Ж</span>}
          </div>
          <h1 className="detail-title">{tradition.title}</h1>
        </div>
      </motion.div>

      <motion.div
        className="detail-body glass-panel"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.15 }}
      >
        <div className="detail-tabs-wrapper">
          <div className="detail-tabs">
            <button
              type="button"
              className={`tab-btn ${activeTab === 'history' ? 'active' : ''}`}
              onClick={() => setActiveTab('history')}
            >
              <Scroll size={20} className="tab-icon" />
              <span className="tab-text">История и суть</span>
            </button>
            <button
              type="button"
              className={`tab-btn ${activeTab === 'modern' ? 'active' : ''}`}
              onClick={() => setActiveTab('modern')}
            >
              <Map size={20} className="tab-icon" />
              <span className="tab-text">Современность и регионы</span>
            </button>
          </div>
        </div>

        <div className="tab-content-area">
          <AnimatePresence mode="wait">
            {activeTab === 'history' && (
              <motion.div
                key="history"
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 12 }}
                transition={{ duration: 0.25 }}
              >
                {tradition.content ? (
                  renderHistoryBlocks(tradition.content)
                ) : (
                  <div className="detail-text">
                    <p>{tradition.fullDesc}</p>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'modern' && (
              <motion.div
                key="modern"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.25 }}
              >
                <div className="modern-section">
                  {modernHowtoBlocks.map((block, idx) => (
                    <div key={idx} className="content-howto">
                      <h3>{block.title || 'Современность'}</h3>
                      <ol>
                        {block.steps?.map((step, i) => (
                          <li key={i}>{step}</li>
                        ))}
                      </ol>
                    </div>
                  ))}

                  <div className="regional-variations">
                    <h3 className="regional-title">Особенности по регионам</h3>
                    <div className="regional-switch-row">
                      {regionOrder.map(({ id: rid, label }) => (
                        <button
                          key={rid}
                          type="button"
                          className={`region-switch ${expandedRegion === rid ? 'active' : ''}`}
                          onClick={() => setExpandedRegion(rid)}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                    <motion.div
                      key={expandedRegion}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                      className="regional-body"
                    >
                      <p>{regionalText}</p>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="tradition-navigation">
          {siblings.prev ? (
            <Link to={buildNavLink(siblings.prev.id)} className="nav-btn nav-prev">
              <ChevronLeft size={20} />
              <div className="nav-info">
                <span className="nav-label">Предыдущая</span>
                <span className="nav-title">{siblings.prev.title}</span>
              </div>
            </Link>
          ) : (
            <span className="nav-btn nav-prev nav-btn--disabled" aria-disabled="true">
              <ChevronLeft size={20} />
              <div className="nav-info">
                <span className="nav-label">Предыдущая</span>
                <span className="nav-title">—</span>
              </div>
            </span>
          )}

          {siblings.next ? (
            <Link to={buildNavLink(siblings.next.id)} className="nav-btn nav-next">
              <div className="nav-info">
                <span className="nav-label">Следующая</span>
                <span className="nav-title">{siblings.next.title}</span>
              </div>
              <ChevronRight size={20} />
            </Link>
          ) : (
            <span className="nav-btn nav-next nav-btn--disabled" aria-disabled="true">
              <div className="nav-info">
                <span className="nav-label">Следующая</span>
                <span className="nav-title">—</span>
              </div>
              <ChevronRight size={20} />
            </span>
          )}
        </div>

        {relatedScenarios.length > 0 && (
          <div className="detail-related-scenarios">
            <h3 className="detail-related-title">Это нужно для</h3>
            <div className="detail-related-grid">
              {relatedScenarios.map((s) => (
                <Link
                  key={s.slug}
                  to={`/scenario/${s.slug}`}
                  className="detail-related-card glass-panel"
                >
                  <span className="detail-related-icon" aria-hidden>
                    {s.icon}
                  </span>
                  <div className="detail-related-text">
                    <span className="detail-related-name">{s.title}</span>
                    <span className="detail-related-kaz">{s.titleKaz}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default TraditionDetail;
