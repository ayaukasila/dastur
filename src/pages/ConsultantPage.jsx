import { useState } from 'react';
import { motion } from 'framer-motion';
import { HeartHandshake, MessageCircle, Clock } from 'lucide-react';
import { scenarios } from '../data/scenarios';
import './ConsultantPage.css';

const ConsultantPage = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="consultant-page">
      <section
        className="consultant-hero"
        style={{
          backgroundImage:
            'linear-gradient(180deg, rgba(0,0,0,0.65), rgba(15,15,20,0.92)), url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1920&auto=format&fit=crop)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <motion.div
          className="consultant-hero-inner"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1>Персональный консультант</h1>
          <p>Ваш проводник в мире казахских традиций</p>
        </motion.div>
      </section>

      <section className="consultant-benefits">
        <div className="consultant-benefits-grid">
          {[
            { icon: HeartHandshake, title: 'Сопровождение обрядов', text: 'Поможем выстроить сценарий с учётом семьи и региона' },
            { icon: MessageCircle, title: 'Ответы на любые вопросы', text: 'Поясним смысл обычаев простым языком' },
            { icon: Clock, title: 'Связь 24/7', text: 'Оставьте заявку — ответим в удобное для вас время' },
          ].map((b) => (
            <motion.article
              key={b.title}
              className="consultant-benefit-card glass-panel"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <b.icon className="consultant-benefit-icon" size={28} />
              <h3>{b.title}</h3>
              <p>{b.text}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="consultant-form-section">
        {!submitted ? (
          <motion.form
            className="consultant-form-card glass-panel"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2>Заявка</h2>
            <div className="form-group">
              <label htmlFor="c-name">Имя</label>
              <input id="c-name" name="name" type="text" required placeholder="Асқар" />
            </div>
            <div className="form-group">
              <label htmlFor="c-topic">Тема</label>
              <select id="c-topic" name="topic" defaultValue="toy">
                <option value="toy">Той</option>
                <option value="wedding">Свадьба</option>
                <option value="children">Детские обряды</option>
                <option value="funeral">Похороны</option>
                <option value="other">Другое</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="c-event">По какому событию</label>
              <select id="c-event" name="event" defaultValue="">
                <option value="">Не выбрано</option>
                {scenarios.map((s) => (
                  <option key={s.slug} value={s.slug}>
                    {s.title}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="c-phone">Телефон</label>
              <input id="c-phone" name="phone" type="tel" required placeholder="+7 (777) 000 00 00" />
            </div>
            <div className="form-group">
              <label htmlFor="c-q">Вопрос</label>
              <textarea id="c-q" name="question" rows={4} required placeholder="Опишите ситуацию…" />
            </div>
            <button type="submit" className="submit-btn">
              Отправить заявку
            </button>
          </motion.form>
        ) : (
          <motion.div
            className="consultant-success glass-panel"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <p>Заявка принята!</p>
          </motion.div>
        )}
      </section>
    </div>
  );
};

export default ConsultantPage;
