import { useMemo, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import { TraditionService } from '../services/api';
import { getCategoryColors } from '../data/categoryColors';
import { stageLabelsRu, stageTraditionIds } from '../data/lifecycleStages';
import { scenarios } from '../data/scenarios';
import './TraditionPage.css';

const FILTER_PILLS = [
  { key: 'all', label: 'Все', categoryId: null },
  { key: 'wedding', label: 'Свадьба', categoryId: 'wedding' },
  { key: 'childhood', label: 'Детство', categoryId: 'childhood' },
  { key: 'hospitality', label: 'Гостеприимство', categoryId: 'hospitality' },
  { key: 'holidays', label: 'Праздники', categoryId: 'holidays' },
  { key: 'funeral', label: 'Уход', categoryId: 'funeral' },
  { key: 'oraza', label: 'Ораза', categoryId: 'oraza' },
];

const CATEGORY_TITLE = {
  wedding: 'Семья и свадьба',
  childhood: 'Детство',
  hospitality: 'Гостеприимство',
  holidays: 'Праздничные традиции',
  funeral: 'Уход',
  oraza: 'Ораза',
};

function TraditionPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [traditions, setTraditions] = useState([]);

  const categoryFilter = searchParams.get('category');
  const lifecycleOn = searchParams.get('lifecycle') === 'true';
  const stageSlug = searchParams.get('stage');
  const searchQuery = searchParams.get('search');
  const fromScenario = searchParams.get('from') === 'scenario';
  const scenarioSlug = searchParams.get('slug');

  useEffect(() => {
    const run = async () => {
      const all = await TraditionService.getAllTraditions();
      let list = all;

      if (searchQuery) {
        list = await TraditionService.searchTraditions(searchQuery);
      } else if (lifecycleOn && stageSlug && stageTraditionIds[stageSlug]) {
        const ids = new Set(stageTraditionIds[stageSlug]);
        list = all.filter((t) => ids.has(t.id));
      } else if (categoryFilter) {
        list = all.filter((t) => t.categoryId === categoryFilter);
      }

      const sorted = [...list].sort((a, b) => a.id - b.id);
      setTraditions(sorted);
    };
    run();
  }, [categoryFilter, lifecycleOn, stageSlug, searchQuery]);

  const heroTitle = useMemo(() => {
    if (searchQuery) return `Результаты: «${searchQuery}»`;
    if (lifecycleOn && stageSlug && stageLabelsRu[stageSlug]) {
      return `Этап: ${stageLabelsRu[stageSlug]}`;
    }
    if (categoryFilter && CATEGORY_TITLE[categoryFilter]) {
      return CATEGORY_TITLE[categoryFilter];
    }
    return 'Все традиции';
  }, [searchQuery, lifecycleOn, stageSlug, categoryFilter]);

  const scenario = useMemo(
    () => (scenarioSlug ? scenarios.find((s) => s.slug === scenarioSlug) : null),
    [scenarioSlug],
  );

  const traditionDetailSuffix = useMemo(() => {
    if (!fromScenario || !scenarioSlug) return '';
    const p = new URLSearchParams();
    p.set('from', 'scenario');
    p.set('slug', scenarioSlug);
    return `?${p.toString()}`;
  }, [fromScenario, scenarioSlug]);

  const setCategoryPill = (categoryId) => {
    const next = new URLSearchParams(searchParams);
    next.delete('search');
    next.delete('lifecycle');
    next.delete('stage');
    if (categoryId) {
      next.set('category', categoryId);
    } else {
      next.delete('category');
    }
    setSearchParams(next);
  };

  return (
    <div className="traditions-page">
      <section className="tradition-hero">
        <img
          className="tradition-hero__bg"
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1920&auto=format&fit=crop"
          alt=""
        />
        <div className="tradition-hero__overlay" />

        {fromScenario && scenario && (
          <Link to={`/scenario/${scenario.slug}`} className="tradition-scenario-back">
            ← {scenario.title}
          </Link>
        )}

        <div className="tradition-hero-content">
          <h1 className="page-title">{heroTitle}</h1>
          <p className="page-subtitle">Традиции — мост между поколениями!</p>
        </div>
      </section>

      <div className="tradition-filters-row">
        {FILTER_PILLS.map((p) => {
          const isActive =
            p.key === 'all'
              ? !categoryFilter && !searchQuery && !(lifecycleOn && stageSlug)
              : p.categoryId === categoryFilter && !searchQuery && !lifecycleOn;
          return (
            <button
              key={p.key}
              type="button"
              className={`tradition-filter-pill ${isActive ? 'tradition-filter-pill--active' : ''}`}
              onClick={() => setCategoryPill(p.categoryId)}
            >
              {p.label}
            </button>
          );
        })}
      </div>

      <div className="traditions-grid-container">
        {traditions.length > 0 ? (
          traditions.map((item, index) => {
            const c = getCategoryColors(item.categoryId);
            const letter = item.title?.charAt(0) || '—';
            return (
              <Link
                to={`/traditions/${item.id}${traditionDetailSuffix}`}
                key={item.id}
                className="tradition-card-link"
              >
                <motion.article
                  className="tradition-card"
                  style={{ '--tc-accent': c.accent }}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(index * 0.04, 0.4) }}
                  whileHover={{ y: -4 }}
                >
                  <span className="tradition-card__accent" />
                  <span className="tradition-card__letter" aria-hidden>
                    {letter}
                  </span>
                  <span
                    className="tradition-card__tag"
                    style={{ background: c.bg, color: c.text }}
                  >
                    {item.category}
                  </span>
                  <h3 className="tradition-card__title">{item.title}</h3>
                  <p className="tradition-card__excerpt">{item.shortDesc}</p>
                </motion.article>
              </Link>
            );
          })
        ) : (
          <div className="no-traditions">
            <p>Ничего не найдено</p>
            <Link to="/traditions" className="reset-link">
              Посмотреть все
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default TraditionPage;
