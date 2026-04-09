import { motion } from 'framer-motion';
import './AboutPage.css';

const AboutPage = () => {
  return (
    <div className="about-page">
      <section className="about-hero">
        <img
          src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1920&auto=format&fit=crop"
          alt=""
          className="about-hero__img"
        />
        <div className="about-hero__overlay" />
        <motion.div
          className="about-hero-content"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75 }}
        >
          <span className="about-hero-tag">О проекте</span>
          <h1>О проекте «Дәстүр»</h1>
          <p className="about-subtitle">Живая энциклопедия казахских традиций и обычаев</p>
        </motion.div>
      </section>

      <section className="about-section">
        <div className="container">
          <motion.div
            className="mission-card glass-panel"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2>Наша миссия</h2>
            <p>
              Сохранять и передавать культурное наследие казахского народа: обряды, обычаи и смыслы,
              которые связывают поколения. Мы помогаем узнать, как традиции устроены и как их
              уважать в современной жизни.
            </p>
          </motion.div>

          <div className="about-grid">
            {[
              {
                title: 'Зачем мы это создали',
                text:
                  'Чтобы знание о традициях было собрано в одном месте — наглядно, по шагам и с контекстом, а не разрозненными фрагментами.',
              },
              {
                title: 'Образовательная ценность',
                text:
                  'Мы объясняем не только «что», но и «зачем»: кто участвует, когда проводится и что символизирует каждый элемент обряда.',
              },
              {
                title: 'Для кого этот сайт',
                text:
                  'Для семей, молодёжи, гостей Казахстана и всех, кто хочет глубже понять культуру Великой степи.',
              },
              {
                title: 'Наш подход',
                text:
                  'Уважение к первоисточникам и живым практикам, простой язык и честность: традиции меняются, но их дух остаётся.',
              },
            ].map((card, i) => (
              <motion.div
                key={card.title}
                className="about-card glass-panel"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
              >
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="values-section">
        <div className="container">
          <h2 className="values-heading">Ценности</h2>
          <div className="values-grid">
            {[
              { icon: '◈', title: 'Аутентичность', text: 'Опора на традиционные знания и живую память общества' },
              { icon: '◉', title: 'Доступность', text: 'Понятные объяснения без лишней академической тяжести' },
              { icon: '◎', title: 'Уважение', text: 'Бережное отношение к обрядам и к людям разных поколений' },
              { icon: '◌', title: 'Современность', text: 'Показываем, как наследие звучит в жизни сегодня' },
            ].map((v) => (
              <motion.div
                key={v.title}
                className="value-item glass-panel"
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
              >
                <span className="value-glyph" aria-hidden>
                  {v.icon}
                </span>
                <h4>{v.title}</h4>
                <p>{v.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="quote-section">
        <div className="container">
          <motion.blockquote
            className="about-quote"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <p className="about-quote-kz">Ата салтын ұмытпа — ол сенің тамырың</p>
            <cite>«Не забывай обычаи предков — они твои корни»</cite>
          </motion.blockquote>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
