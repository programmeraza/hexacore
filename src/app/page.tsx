'use client';

import React, { useEffect, useState } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
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
    if (isLoading) {
      // Компенсируем ширину скроллбара паддингом, чтобы его скрытие не сдвигало
      // разметку (а вместе с ней — уже посчитанные позиции ScrollTrigger).
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';

      // Пока прелоадер был на экране, могла измениться раскладка (шрифты,
      // картинки, сам возврат скроллбара) — все триггеры GSAP (в т.ч. проявление
      // букв NEUROTECH в футере) были посчитаны на "старой" геометрии. Без этого
      // пересчёта они могут сработать не в той точке скролла, и снаружи это
      // выглядит так, будто анимация пропала.
      requestAnimationFrame(() => ScrollTrigger.refresh());
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
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