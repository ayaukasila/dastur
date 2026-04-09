import { useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Music, Gift, Scissors, ShoppingBag, Store } from 'lucide-react';
import { services, shopItems } from '../data/shopData';
import { KazakhDivider } from '../components/UI/Ornaments';
import './ShopPage.css';

const serviceCards = [
  { id: 'tamada', title: 'Тамада', desc: 'Ведущие традиционных мероприятий', icon: Music },
  { id: 'toibastars', title: 'Тойбастар', desc: 'Организация праздников и тоев', icon: Gift },
  { id: 'kasapshy', title: 'Қасапшы', desc: 'Мастера забоя и разделки скота', icon: Scissors },
  { id: 'musicians', title: 'Музыканты', desc: 'Домбра, кобыз, традиционные песни', icon: Music },
];

const goodsCards = [
  { id: 'national-clothes', title: 'Ұлттық киім', desc: 'Национальная одежда для всей семьи', icon: ShoppingBag },
  { id: 'instruments', title: 'Аспаптар', desc: 'Музыкальные инструменты', icon: Music },
  { id: 'souvenirs', title: 'Сувенирлер', desc: 'Подарки и сувениры', icon: Gift },
  { id: 'decor', title: 'Безендіру', desc: 'Традиционный декор', icon: Store },
];

function ShopPage() {
  const location = useLocation();

  const scrollToSection = useCallback((hash) => {
    const id = hash.replace('#', '');
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (!hash) return;
    const t = requestAnimationFrame(() => {
      const el = document.getElementById(hash);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    return () => cancelAnimationFrame(t);
  }, [location.hash, location.pathname]);

  return (
    <div className="shop-page">
      <div className="shop-hero">
        <motion.div
          className="shop-hero-content"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
        >
          <span className="shop-hero-tag">Маркетплейс</span>
          <h1>Товары и услуги</h1>
          <p>Национальные мастера и традиционные товары рядом с вами</p>
        </motion.div>
      </div>

      <section className="shop-scenario-banner glass-panel" aria-label="Сценарии">
        <p className="shop-scenario-banner__q">Ищете всё необходимое для конкретного события?</p>
        <div className="shop-scenario-banner__scroll">
          <Link to="/scenario/wedding-daughter" className="shop-scenario-chip">
            Свадьба
          </Link>
          <Link to="/scenario/newborn" className="shop-scenario-chip">
            Рождение
          </Link>
          <Link to="/scenario/nowruz" className="shop-scenario-chip">
            Наурыз
          </Link>
        </div>
      </section>

      <nav className="shop-anchor-tabs" aria-label="Разделы маркетплейса">
        <button type="button" className="shop-anchor-pill" onClick={() => scrollToSection('#services')}>
          Услуги
        </button>
        <button type="button" className="shop-anchor-pill" onClick={() => scrollToSection('#goods')}>
          Товары
        </button>
      </nav>

      <section id="services" className="services-section">
        <div className="section-header">
          <h2 className="section-title">Услуги</h2>
          <span className="section-badge">{services.length} категории</span>
        </div>

        <div className="services-grid">
          {serviceCards.map((service, index) => {
            const full = services.find((s) => s.id === service.id);
            const Icon = service.icon;
            return (
              <Link to={`/services/${service.id}`} key={service.id} className="card-link">
                <motion.article
                  className="service-card"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -4 }}
                >
                  <div className="service-icon">
                    <Icon size={36} strokeWidth={1.5} />
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.desc}</p>
                  {full?.priceRange && <span className="price-line">{full.priceRange}</span>}
                </motion.article>
              </Link>
            );
          })}
        </div>
      </section>

      <KazakhDivider />

      <section id="goods" className="shop-section">
        <div className="section-header">
          <h2 className="section-title">Товары</h2>
          <span className="section-badge">{shopItems.length} категории</span>
        </div>

        <div className="shop-grid">
          {goodsCards.map((item, index) => {
            const full = shopItems.find((s) => s.id === item.id);
            const Icon = item.icon;
            return (
              <Link to={`/shop/${item.id}`} key={item.id} className="card-link">
                <motion.article
                  className="shop-card"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -4 }}
                >
                  <div className="shop-icon">
                    <Icon size={36} strokeWidth={1.5} />
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                  {full?.priceRange && <span className="price-line">{full.priceRange}</span>}
                </motion.article>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="shop-cta">
        <div className="shop-cta-inner glass-panel">
          <h2>Нужен консультант по традициям?</h2>
          <p>Поможем правильно провести обряд, подобрать мастеров и товары</p>
          <Link to="/consultant" className="shop-cta-btn">
            Связаться
          </Link>
        </div>
      </section>
    </div>
  );
}

export default ShopPage;
