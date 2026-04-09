import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, Star, Info, Image as ImageIcon, MessageCircle } from 'lucide-react';
import { services, shopItems } from '../data/shopData';
import './VendorDetailPage.css';

const VendorDetailPage = React.memo(() => {
  const { categoryId, vendorId } = useParams();
  const [activeTab, setActiveTab] = useState('overview');

  const vendorData = React.useMemo(() => {
    const serviceMatch = services.find((c) => c.id === categoryId);
    if (serviceMatch) {
      return {
        vendor: serviceMatch.catalog?.find((v) => v.id === vendorId),
        parentType: 'service',
        parent: serviceMatch,
      };
    }

    const shopMatch = shopItems.find((c) => c.id === categoryId);
    if (shopMatch) {
      return {
        vendor: shopMatch.catalog?.find((v) => v.id === vendorId),
        parentType: 'shop',
        parent: shopMatch,
      };
    }

    return { vendor: null, parentType: null, parent: null };
  }, [categoryId, vendorId]);

  const { vendor, parentType, parent } = vendorData;
  const backUrl = parentType === 'service' ? `/services/${categoryId}` : `/shop/${categoryId}`;
  const shopCrumb = parentType === 'service' ? '/shop#services' : '/shop#goods';
  const shopCrumbLabel = parentType === 'service' ? 'Услуги' : 'Товары';

  const [localGallery, setLocalGallery] = useState(vendor?.gallery || []);
  const [localReviews, setLocalReviews] = useState(vendor?.reviews || []);
  const [newReview, setNewReview] = useState({ user: '', rating: 5, text: '' });

  React.useEffect(() => {
    if (vendor) {
      setLocalGallery(vendor.gallery || []);
      setLocalReviews(vendor.reviews || []);
    }
  }, [vendor]);

  if (!vendor) {
    return (
      <div className="item-detail-page error-page">
        <div className="error-content">
          <h2>Специалист не найден</h2>
          <Link to="/shop" className="back-link-error">
            Вернуться в каталог
          </Link>
        </div>
      </div>
    );
  }

  const whyBullets =
    vendor.features && vendor.features.length > 0
      ? vendor.features
      : [
          vendor.desc,
          'Индивидуальный подход к заказу',
          'Проверенные отзывы клиентов',
        ].filter(Boolean);

  const handleAddPhoto = () => {
    const url = prompt('Введите URL фотографии:');
    if (url === null) return;
    const finalUrl =
      url.trim() ||
      'https://images.unsplash.com/photo-1519744346993-c43e315e2e5e?q=80&w=1200&auto=format&fit=crop';
    setLocalGallery([finalUrl, ...localGallery]);
  };

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!newReview.user.trim() || !newReview.text.trim()) return;
    setLocalReviews([
      { user: newReview.user.trim(), rating: newReview.rating, text: newReview.text.trim() },
      ...localReviews,
    ]);
    setNewReview({ user: '', rating: 5, text: '' });
  };

  const renderStars = (rating) =>
    [...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={16}
        fill={i < rating ? 'currentColor' : 'none'}
        className={i < rating ? 'star-filled' : 'star-empty'}
      />
    ));

  const primaryCta = parentType === 'service' ? 'Забронировать' : 'Заказать';

  return (
    <div className="vendor-detail-page">
      <div
        className="detail-hero"
        style={{
          backgroundImage: `url(${vendor.image})`,
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
            background: 'linear-gradient(180deg, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.92) 100%)',
          }}
        />
        <div className="detail-hero-content" style={{ position: 'relative', zIndex: 2 }}>
          <nav className="vendor-breadcrumb" aria-label="Хлебные крошки">
            <Link to="/shop">Маркетплейс</Link>
            <ChevronRight size={14} className="vendor-crumb-sep" aria-hidden />
            <Link to={shopCrumb}>{shopCrumbLabel}</Link>
            <ChevronRight size={14} className="vendor-crumb-sep" aria-hidden />
            <Link to={backUrl}>{parent?.title || 'Категория'}</Link>
            <ChevronRight size={14} className="vendor-crumb-sep" aria-hidden />
            <span className="vendor-crumb-current">{vendor.title}</span>
          </nav>
          <div className="hero-content-animated">
            <div className="vendor-avatar">
              <img src={vendor.image} alt="" />
            </div>
            {parent && <span className="vendor-cat-pill">{parent.category}</span>}
            <h1 className="hero-title">{vendor.title}</h1>
            <p className="hero-desc">{vendor.desc}</p>
            <div className="hero-price-tag">{vendor.price}</div>
            <button
              type="button"
              className="action-btn"
              onClick={() => {
                window.alert('Заявка принята! Мы свяжемся с вами в ближайшее время.');
              }}
            >
              {primaryCta}
            </button>
          </div>
        </div>
      </div>

      <div className="detail-tabs-wrapper vendor-tabs-wrapper">
        <div className="detail-tabs">
          <button
            type="button"
            className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <Info size={18} /> Обзор
          </button>
          <button
            type="button"
            className={`tab-btn ${activeTab === 'gallery' ? 'active' : ''}`}
            onClick={() => setActiveTab('gallery')}
          >
            <ImageIcon size={18} /> Галерея ({localGallery.length})
          </button>
          <button
            type="button"
            className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
            onClick={() => setActiveTab('reviews')}
          >
            <MessageCircle size={18} /> Отзывы ({localReviews.length})
          </button>
        </div>
      </div>

      <div className="detail-container">
        <div className="detail-content-area">
          <div className="tab-contents-wrapper">
            {activeTab === 'overview' && (
              <div className="tab-content">
                <div className="main-info">
                  <h2>Описание</h2>
                  <div className="description-text whitespace-pre-wrap">{vendor.fullDescription || vendor.desc}</div>
                  <div className="vendor-features-list">
                    <h3>Почему выбирают нас</h3>
                    <ul>
                      {whyBullets.map((f, i) => (
                        <li key={i}>{f}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'gallery' && (
              <div className="tab-content">
                <div className="tab-header-actions">
                  <button type="button" className="add-btn" onClick={handleAddPhoto}>
                    Добавить фото
                  </button>
                </div>
                <div className="gallery-grid">
                  {localGallery.length > 0 ? (
                    localGallery.map((img, idx) => (
                      <div
                        key={idx}
                        className="gallery-item"
                        style={{ backgroundImage: `url(${img})`, backgroundSize: 'cover' }}
                      />
                    ))
                  ) : (
                    <p className="no-data">Фотографии отсутствуют. Добавьте ссылку на снимок.</p>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="tab-content">
                <div className="reviews-list">
                  {localReviews.length > 0 ? (
                    localReviews.map((review, idx) => (
                      <div key={idx} className="review-card">
                        <div className="review-header">
                          <span className="review-user">{review.user}</span>
                          <div className="review-stars">{renderStars(review.rating)}</div>
                        </div>
                        <p className="review-text">{review.text}</p>
                      </div>
                    ))
                  ) : (
                    <p className="no-data">Пока нет отзывов.</p>
                  )}
                </div>

                <form className="review-form review-form--inline" onSubmit={handleAddReview}>
                  <h3>Оставить отзыв</h3>
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="Ваше имя"
                      value={newReview.user}
                      onChange={(e) => setNewReview({ ...newReview, user: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="rev-rating">Оценка</label>
                    <select
                      id="rev-rating"
                      value={newReview.rating}
                      onChange={(e) => setNewReview({ ...newReview, rating: parseInt(e.target.value, 10) })}
                    >
                      {[5, 4, 3, 2, 1].map((v) => (
                        <option key={v} value={v}>
                          {v}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <textarea
                      rows={4}
                      placeholder="Ваш отзыв"
                      value={newReview.text}
                      onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
                      required
                    />
                  </div>
                  <button type="submit" className="submit-btn">
                    Оставить отзыв
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

export default VendorDetailPage;
