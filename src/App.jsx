import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Layout/Footer';
import ScrollToTop from './components/UI/ScrollToTop';
import StarryBackground from './components/UI/StarryBackground';
import HomePage from './pages/HomePage';
import TraditionPage from './pages/TraditionPage';
import TraditionDetail from './pages/TraditionDetail';
import AboutPage from './pages/AboutPage';
import LifeCyclePage from './pages/LifeCyclePage';
import ConsultantPage from './pages/ConsultantPage';
import ShopPage from './pages/ShopPage';
import ItemDetailPage from './pages/ItemDetailPage';
import VendorDetailPage from './pages/VendorDetailPage';
import ConsultantWidget from './components/UI/ConsultantWidget';
import ScenarioPage from './pages/ScenarioPage';

function App() {
  return (
    <>
      <StarryBackground />
      <Router>
        <ScrollToTop />
        <div className="app-shell">
          <Header />
          <div className="app-path-hint">
            Путь по сайту: 1) выберите раздел в меню, 2) откройте карточку, 3) читайте детали или переходите к услугам
          </div>
          <main className="app-main">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/consultant" element={<ConsultantPage />} />
              <Route path="/lifecycle" element={<LifeCyclePage />} />
              <Route path="/traditions" element={<TraditionPage />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/scenario/:slug" element={<ScenarioPage />} />
              <Route path="/services/:id" element={<ItemDetailPage type="service" />} />
              <Route path="/shop/:id" element={<ItemDetailPage type="shop" />} />
              <Route path="/vendor/:categoryId/:vendorId" element={<VendorDetailPage />} />
              <Route path="/traditions/:id" element={<TraditionDetail />} />
            </Routes>
          </main>
          <Footer />
        </div>
        <ConsultantWidget />
      </Router>
    </>
  );
}

export default App;
