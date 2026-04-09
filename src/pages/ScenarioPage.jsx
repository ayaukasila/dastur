import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, ChevronRightCircle } from 'lucide-react';
import { useScenario } from '../hooks/useScenario';
import { traditions } from '../data/mockTraditions';
import { services, shopItems } from '../data/shopData';
import { getCategoryColors } from '../data/categoryColors';
import './ScenarioPage.css';

function getTraditionPreview(t) {
  if (t.shortDesc) return t.shortDesc;
  const intro = t.content?.find((b) => b.type === 'intro');
  if (intro?.text) {
    const text = intro.text;
    return text.length > 100 ? `${text.slice(0, 100)}…` : text;
  }
  return '';
}

function ScenarioPage() {
  const { slug } = useParams();
  const scenario = useScenario(slug);

  if (!scenario) {
    return (
      <div className="scenario-page scenario-page--empty">
        <p>Сценарий не найден</p>
        <Link to="/">На главную</Link>
      </div>
    );
  }

  const traditionRows = scenario.traditions
    .map((tid) => traditions.find((t) => t.id === tid))
    .filter(Boolean);

  const showServicesCol = scenario.services?.length > 0;
  const showGoodsCol = scenario.goods?.length > 0;
  const showOrganizeSection = showServicesCol || showGoodsCol;

  return (
    <div className="scenario-page">
      <nav className="scenario-breadcrumb" aria-label="Хлебные крошки">
        <Link to="/">Главная</Link>
        <span className="scenario-breadcrumb__sep" aria-hidden>
          /
        </span>
        <span className="scenario-breadcrumb__current">{scenario.title}</span>
      </nav>

      <header className="scenario-header">
        <span className="scenario-header__icon" aria-hidden>
          {scenario.icon}
        </span>
        <h1>{scenario.title}</h1>
        <p className="scenario-header__kaz">{scenario.titleKaz}</p>
        <p className="scenario-header__desc">{scenario.desc}</p>
      </header>

      <section className="scenario-section">
        <p className="scenario-section__label">Традиции — шаг за шагом</p>
        <h2 className="scenario-section__title">Что важно знать и соблюдать</h2>
        <ol className="scenario-tradition-list">
          {traditionRows.map((t, index) => {
            const col = getCategoryColors(t.categoryId);
            return (
              <li key={t.id} className="scenario-tradition-item glass-panel">
                <span className="scenario-tradition-num">{index + 1}</span>
                <div className="scenario-tradition-body">
                  <div className="scenario-tradition-top">
                    <h3>{t.title}</h3>
                    <span
                      className="scenario-tradition-tag"
                      style={{ background: col.bg, color: col.text }}
                    >
                      {t.category}
                    </span>
                  </div>
                  <p className="scenario-tradition-preview">{getTraditionPreview(t)}</p>
                  <Link
                    to={`/traditions/${t.id}?from=scenario&slug=${encodeURIComponent(scenario.slug)}`}
                    className="scenario-tradition-link"
                  >
                    Читать подробнее
                    <ChevronRight size={18} aria-hidden />
                  </Link>
                </div>
              </li>
            );
          })}
        </ol>
      </section>

      {showOrganizeSection && (
        <section className="scenario-section scenario-organize">
          <h2 className="scenario-section__title">Что организовать</h2>
          <p className="scenario-section__subtitle">Услуги и товары для этого события</p>
          <div className="scenario-organize-grid">
            {showServicesCol && (
              <div className="scenario-organize-col">
                <h3 className="scenario-organize-heading">Услуги</h3>
                {scenario.services.map((svcSlug) => {
                  const svc = services.find((s) => s.id === svcSlug);
                  if (!svc) return null;
                  const preview = svc.catalog?.slice(0, 3) || [];
                  return (
                    <div key={svcSlug} className="scenario-shop-block glass-panel">
                      <h4>{svc.title}</h4>
                      <ul className="scenario-shop-list">
                        {preview.map((v) => (
                          <li key={v.id}>
                            <span>{v.title}</span>
                            <span className="scenario-shop-price">{v.price}</span>
                          </li>
                        ))}
                      </ul>
                      <Link to={`/services/${svcSlug}`} className="scenario-shop-all">
                        Смотреть всех
                        <ChevronRightCircle size={16} aria-hidden />
                      </Link>
                    </div>
                  );
                })}
              </div>
            )}
            {showGoodsCol && (
              <div className="scenario-organize-col">
                <h3 className="scenario-organize-heading">Товары</h3>
                {scenario.goods.map((gSlug) => {
                  const cat = shopItems.find((s) => s.id === gSlug);
                  if (!cat) return null;
                  const preview = cat.catalog?.slice(0, 3) || [];
                  return (
                    <div key={gSlug} className="scenario-shop-block glass-panel">
                      <h4>{cat.title}</h4>
                      <ul className="scenario-shop-list">
                        {preview.map((item) => (
                          <li key={item.id}>
                            <span>{item.title}</span>
                            <span className="scenario-shop-price">{item.price}</span>
                          </li>
                        ))}
                      </ul>
                      <Link to={`/shop/${gSlug}`} className="scenario-shop-all">
                        Смотреть всё
                        <ChevronRightCircle size={16} aria-hidden />
                      </Link>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      )}

      <motion.section
        className="scenario-cta glass-panel"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="scenario-cta__title">Нужна помощь?</h2>
        <p className="scenario-cta__text">
          Не уверены как всё организовать? Наш консультант поможет.
        </p>
        <Link to="/consultant" className="scenario-cta__btn">
          Связаться с консультантом
        </Link>
      </motion.section>
    </div>
  );
}

export default ScenarioPage;
