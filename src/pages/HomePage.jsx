import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, Briefcase, ArrowRight } from 'lucide-react';
import { traditions } from '../data/mockTraditions';
import { scenarios } from '../data/scenarios';
import { categories as categoriesData } from '../data/categories';
import { getCategoryColors } from '../data/categoryColors';
import { KazakhDivider, CornerOrnament } from '../components/UI/Ornaments';
import './HomePage.css';

const encyclopediaCategories = [
  {
    categoryId: 'childhood',
    title: 'Рождение и детство',
    to: '/traditions?category=childhood',
    letter: 'Б',
    examples: 'Тұсаукесер, Бесік той, Сүндет той',
  },
  {
    categoryId: 'wedding',
    title: 'Семья и свадьба',
    to: '/traditions?category=wedding',
    letter: 'Ү',
    examples: 'Беташар, Қыз ұзату, Үйлену той',
  },
  {
    categoryId: 'funeral',
    title: 'Уход',
    to: '/traditions?category=funeral',
    letter: 'Ж',
    examples: 'Жаназа, Жоқтау, Ас беру',
  },
];

const quickNavItems = [
  { to: '/', label: 'Главная', icon: '🏠' },
  { to: '/traditions', label: 'Традиции', icon: '📚' },
  { to: '/lifecycle', label: 'Жизненный путь', icon: '🧭' },
  { to: '/shop', label: 'Услуги и товары', icon: '🛍️' },
  { to: '/about', label: 'О проекте', icon: 'ℹ️' },
  { to: '/consultant', label: 'Консультант', icon: '💬' },
];

function HomePage() {
  const location = useLocation();

  const isQuickItemActive = (to) => {
    const path = location.pathname;
    if (to === '/') return path === '/';
    if (to === '/traditions') return path === '/traditions' || path.startsWith('/traditions/');
    if (to === '/shop') return path === '/shop' || path.startsWith('/shop/') || path.startsWith('/services/') || path.startsWith('/vendor/');
    return path === to;
  };

  return (
    <div className="home-page">
      <section className="hero-section">
        <CornerOrnament position="top-left" />
        <CornerOrnament position="top-right" />
        <CornerOrnament position="bottom-left" />
        <CornerOrnament position="bottom-right" />

        <div className="hero-content">
          <motion.span
            className="hero-pill"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Дәстүр · Казахские традиции
          </motion.span>
          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75 }}
          >
            Сохраним традиции — и они сохранят нас
          </motion.h1>
          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.1 }}
          >
            Традиции — мост между поколениями. Откройте живую энциклопедию казахской культуры.
          </motion.p>
          <motion.div
            className="hero-search-container"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <HeroSearch />
          </motion.div>
        </div>
      </section>

      <section className="home-block home-block--scenarios">
        <div className="home-start-guide glass-panel">
          <h3>С чего начать</h3>
          <ol>
            <li>Если знаете название обряда - введите его в поиск выше.</li>
            <li>Если не знаете - выберите ситуацию ниже.</li>
            <li>Если нужен специалист - откройте раздел "Товары и услуги".</li>
          </ol>
        </div>
        <p className="home-section-label">С чем вы пришли?</p>
        <h2 className="home-section-title">Выберите ситуацию — мы проведём вас шаг за шагом</h2>
        <div className="home-scenarios-grid">
          {scenarios.map((card, index) => (
            <Link key={card.slug} to={`/scenario/${card.slug}`} className="home-card-link">
              <motion.article
                className="home-scenario-card glass-panel"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                whileHover={{ y: -4 }}
              >
                <span className="home-scenario-card__icon" aria-hidden>
                  {card.icon}
                </span>
                <h3 className="home-scenario-card__title">{card.title}</h3>
                <p className="home-scenario-card__kaz">{card.titleKaz}</p>
                <p className="home-scenario-card__desc">{card.desc}</p>
                <span className="home-scenario-card__more">
                  <span>Перейти</span>
                  <ArrowRight size={18} aria-hidden />
                </span>
              </motion.article>
            </Link>
          ))}
        </div>
      </section>

      <KazakhDivider />

      <section className="home-block">
        <p className="home-section-label">Энциклопедия</p>
        <h2 className="home-section-title">Все традиции</h2>
        <div className="home-cards home-cards--3 home-cards--ency">
          {encyclopediaCategories.map((card, index) => {
            const c = getCategoryColors(card.categoryId);
            const cat = categoriesData.find((x) => x.id === card.categoryId);
            return (
              <Link key={card.to} to={card.to} className="home-card-link">
                <motion.article
                  className="home-cat-card glass-panel home-cat-card--compact"
                  style={{ '--cat-accent': c.accent }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  whileHover={{ y: -6 }}
                >
                  <span className="home-cat-card__accent" />
                  <span className="home-cat-card__letter" aria-hidden>
                    {card.letter}
                  </span>
                  <span
                    className="home-cat-card__tag"
                    style={{ background: c.bg, color: c.text }}
                  >
                    {cat?.title || card.categoryId}
                  </span>
                  <h3 className="home-cat-card__heading">{card.title}</h3>
                  <p className="home-cat-card__desc">{card.examples}</p>
                </motion.article>
              </Link>
            );
          })}
        </div>
        <div className="home-view-all-wrap">
          <Link to="/traditions" className="home-view-all-link">
            Смотреть все традиции →
          </Link>
        </div>
      </section>

      <section className="home-block home-block--market">
        <p className="home-section-label">Маркетплейс</p>
        <h2 className="home-section-title">Товары и услуги</h2>
        <div className="home-cards home-cards--2 home-cards--market-split">
          <Link to="/shop#services" className="home-card-link">
            <motion.article
              className="home-market-card glass-panel"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="home-market-card__icon">
                <Briefcase size={36} strokeWidth={1.5} />
              </div>
              <h3>Услуги мастеров</h3>
              <p>Тамада, тойбастар, қасапшы, музыканты — дәстүрлі тойды кәсіби өткізіңіз.</p>
            </motion.article>
          </Link>
          <Link to="/shop#goods" className="home-card-link">
            <motion.article
              className="home-market-card glass-panel"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.06 }}
              whileHover={{ y: -5 }}
            >
              <div className="home-market-card__icon">
                <ShoppingBag size={36} strokeWidth={1.5} />
              </div>
              <h3>Национальные товары</h3>
              <p>Киім, сувенирлер, аспаптар және безендіру — ұлттық сәнбен үйіңізге.</p>
            </motion.article>
          </Link>
        </div>
      </section>

      <section className="home-block home-block--quick-nav">
        <p className="home-section-label">Навигация</p>
        <h2 className="home-section-title">Быстрый доступ к разделам</h2>
        <div className="home-quick-menu-grid">
          {quickNavItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`home-quick-menu-item glass-panel ${isQuickItemActive(item.to) ? 'home-quick-menu-item--active' : ''}`}
            >
              <span className="home-quick-menu-item__icon" aria-hidden>{item.icon}</span>
              <span className="home-quick-menu-item__label">{item.label}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

function HeroSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 1) {
      setResults([]);
      setShowDropdown(false);
      return;
    }
    const r = traditions.filter((t) => t.title.toLowerCase().includes(q)).slice(0, 5);
    setResults(r);
    setShowDropdown(r.length > 0);
  }, [query]);

  const handleSearch = () => {
    const q = query.trim();
    if (!q) return;
    navigate(`/traditions?search=${encodeURIComponent(q)}`);
    setShowDropdown(false);
  };

  return (
    <div className="search-wrapper">
      <div className="search-bar glass-panel">
        <Search className="search-icon" size={24} />
        <input
          type="text"
          placeholder="Найти традицию по названию…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSearch();
          }}
          autoComplete="off"
        />
        <button type="button" className="search-confirm-btn" onClick={handleSearch}>
          Найти
        </button>
      </div>

      {showDropdown && results.length > 0 && (
        <motion.div
          className="search-dropdown glass-panel"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {results.map((item) => {
            const col = getCategoryColors(item.categoryId);
            return (
              <Link
                key={item.id}
                to={`/traditions/${item.id}`}
                className="search-dropdown-item"
                onClick={() => setShowDropdown(false)}
              >
                <span className="search-dropdown-tag" style={{ background: col.bg, color: col.text }}>
                  {item.category}
                </span>
                <span className="search-dropdown-title">{item.title}</span>
              </Link>
            );
          })}
        </motion.div>
      )}
    </div>
  );
}

export default HomePage;
