'use client';

import React, { useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroSection from '../components/HeroSection/HeroSection';
import ExpertiseSection from '../components/ExpertiseSection/ExpertiseSection';
import Footer from '../components/Footer/Footer';
import StatsSection from '../components/StatsSection/StatsSection';
import ConsultationModal from '../components/ConsultationModal/ConsultationModal';
import PortfolioSection from '../components/PortfolioSection/PortfolioSection';

export default function App() {
  useEffect(() => {
    // Отключаем встроенное автоматическое восстановление прокрутки браузера
    // и всегда открываем страницу сверху — иначе reveal-анимация hero сыграет,
    // пока пользователь смотрит в конец страницы после обновления.
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    // Пересчитываем позиции ScrollTrigger после первой раскладки — шрифты и
    // картинки могут ещё чуть сдвинуть геометрию страницы, а от неё зависят
    // триггеры (например, проявление букв NEUROTECH в футере).
    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'auto';
      }
    };
  }, []);

  return (
    <div className="app-content-wrapper">
      <ConsultationModal />
      <HeroSection />
      <ExpertiseSection />
      <PortfolioSection />
      <StatsSection />
      <Footer />
    </div>
  );
}