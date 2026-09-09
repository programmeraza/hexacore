'use client';

import React, { useEffect, useState } from 'react';
import Preloader from '../components/Preloader/Preloader';
import HeroSection from '../components/HeroSection/HeroSection';
import ExpertiseSection from '../components/ExpertiseSection/ExpertiseSection';
import Footer from '../components/Footer/Footer';
import StatsSection from '../components/StatsSection/StatsSection';
import ConsultationModal from '../components/ConsultationModal/ConsultationModal';
import PortfolioSection from '../components/PortfolioSection/PortfolioSection';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 1. Отключаем встроенное автоматическое восстановление прокрутки браузера
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // 2. Мгновенно прокручиваем страницу в координаты (0, 0) при загрузке/обновлении
    window.scrollTo(0, 0);

    // 3. Возвращаем стандартное поведение при размонтировании компонента (хороший тон в React)
    return () => {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'auto';
      }
    };
  }, []);

  // Пока прелоадер на экране, блокируем скролл и клики по контенту под ним —
  // иначе скролл фоном уже двигает GSAP ScrollTrigger и триггерит анимации
  // до того, как сайт готов их показать.
  useEffect(() => {
    document.body.style.overflow = isLoading ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isLoading]);

  return (
    <>
      {/* Прелоадер */}
      <Preloader onComplete={() => setIsLoading(false)} />

      {/* Основной контент рендерится всегда (или плавно проявляется), 
          но взаимодействие разблокируется после окончания загрузки */}
      <div className={`app-content-wrapper ${isLoading ? 'locked' : 'ready'}`}>
        <ConsultationModal />
        <HeroSection />
        <ExpertiseSection />
        <PortfolioSection />
        <StatsSection/>
        <Footer />
      </div>
    </>
  );
}