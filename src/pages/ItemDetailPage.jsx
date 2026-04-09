import React, { useMemo, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronRight, Check } from 'lucide-react';
import { services, shopItems } from '../data/shopData';
import './ItemDetailPage.css';

const ItemDetailPage = React.memo(({ type }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(null);

  const item = useMemo(() => {
    const items = type === 'service' ? services : shopItems;
    return items.find((i) => i.id === id);
  }, [type, id]);

  if (!item) {
    return (
      <div className="item-detail-page error-page">
        <div className="error-content">
          <h2>Элемент не найден</h2>
          <Link to="/shop" className="back-link-error">
            Вернуться в каталог
          </Link>
        </div>
      </div>
    );
  }

  const sectionCatalogTitle =
    type === 'service' ? item.catalogTitle || 'Наши мастера' : 'Товары в категории';

  const shopSectionLink = type === 'service' ? '/shop#services' : '/shop#goods';
  const shopSectionLabel = type === 'service' ? 'Услуги' : 'Товары';

  return (
    <div className="item-detail-page">
      <div
        className="detail-hero"
        style={{
          backgroundImage: `url(${item.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
        }}
      >
        <div
          className="hero-overlay"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(0,0,0,0.72) 0%, rgba(30,30,30,0.88) 100%)',
            zIndex: 1,
          }}
        />
        <div className="detail-hero-content" style={{ position: 'relative', zIndex: 2 }}>
          <nav className="item-breadcrumb" aria-label="Хлебные крошки">
            <Link to="/shop">Маркетплейс</Link>
            <ChevronRight size={14} className="item-crumb-sep" aria-hidden />
            <Link to={shopSectionLink}>{shopSectionLabel}</Link>
            <ChevronRight size={14} className="item-crumb-sep" aria-hidden />
            <span className="item-crumb--current">{item.title}</span>
          </nav>
          <div className="hero-title-container">
            <span className="hero-category">{item.category}</span>
            <h1 className="hero-title">{item.title}</h1>
            <p className="hero-desc">{item.shortDesc}</p>
          </div>
        </div>
      </div>

      <div className="detail-container">
        <div className="detail-content-area">
          {item.catalog ? (
            <div className="catalog-only-section">
              <h2 className="catalog-section-title">{sectionCatalogTitle}</h2>
              <div className="catalog-grid">
                {item.catalog.map((catItem) => (
                  <div
                    key={catItem.id}
                    className="catalog-card clickable-card"
                    onClick={() => navigate(`/vendor/${item.id}/${catItem.id}`)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') navigate(`/vendor/${item.id}/${catItem.id}`);
                    }}
                    role="button"
                    tabIndex={0}
                  >
                    <div className="catalog-image-placeholder">
                      {catItem.image ? (
                        <img src={catItem.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        <span>{catItem.title[0]}</span>
                      )}
                    </div>
                    <div className="catalog-info">
                      <h4>{catItem.title}</h4>
                      <p className="catalog-desc">{catItem.desc}</p>
                      <span className="catalog-price">{catItem.price}</span>
                      <div className="catalog-actions">
                        <button
                          type="button"
                          className="catalog-btn-small"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/vendor/${item.id}/${catItem.id}`);
                          }}
                        >
                          Подробнее
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="tab-content overview-grid">
              <div className="main-info">
                <h2>Описание</h2>
                <p className="description-text">{item.fullDescription}</p>

                <div className="features-list">
                  <h3>Преимущества</h3>
                  <ul>
                    {item.features.map((feature, index) => (
                      <li key={index}>
                        <Check size={18} className="feature-check" /> {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {item.process && type === 'service' && (
                  <div className="process-timeline">
                    <h3>Как мы работаем</h3>
                    <ol className="process-numbered">
                      {item.process.map((step) => (
                        <li key={step.step}>
                          <strong>{step.title}</strong> — {step.desc}
                        </li>
                      ))}
                    </ol>
                  </div>
                )}

                {item.specifications && (
                  <div className="specs-table-container">
                    <h3>Характеристики</h3>
                    <table className="specs-table">
                      <tbody>
                        {item.specifications.map((spec, idx) => (
                          <tr key={idx}>
                            <td className="spec-label">{spec.label}</td>
                            <td className="spec-value">{spec.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {item.faq && item.faq.length > 0 && (
                  <div className="faq-accordion">
                    <h3>Частые вопросы</h3>
                    {item.faq.map((q, idx) => (
                      <div key={idx} className="faq-acc-item">
                        <button
                          type="button"
                          className={`faq-acc-q ${openFaq === idx ? 'open' : ''}`}
                          onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                          aria-expanded={openFaq === idx}
                        >
                          {q.q}
                        </button>
                        {openFaq === idx && <p className="faq-acc-a">{q.a}</p>}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

export default ItemDetailPage;
