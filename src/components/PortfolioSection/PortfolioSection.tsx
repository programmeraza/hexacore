'use client';

import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './PortfolioSection.css';

// Регистрируем плагин ScrollTrigger для GSAP
gsap.registerPlugin(ScrollTrigger);

export default function PortfolioSection() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
        const cards = gsap.utils.toArray<HTMLElement>('.portfolio-card');
      
      // Инициализируем начальные позиции карт через GSAP:
      // Первая карта на месте (0%), остальные скрыты внизу (100%)
      gsap.set(cards, { yPercent: (i) => (i === 0 ? 0 : 100) });

      // Создаем таймлайн скролла для стэка (работает на всех устройствах)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true, // Замораживаем экран на месте
          scrub: 1.2, // Плавный реверс анимации при скролле
          start: 'top top', // Фиксируем, как только верх секции касается верха экрана
          end: () => `+=${window.innerHeight * 3.5}`, // Длина скролла (длина стэка)
          invalidateOnRefresh: true,
          anticipatePin: 1, // Предотвращает рывки браузера при фиксации
        }
      });

      // Поочередно анимируем наслоение карт и размытие предыдущих
      cards.forEach((card, index) => {
        if (index === 0) return; // Первая карта уже на месте

        const label = `card-${index}`;

        tl.to(card, {
          yPercent: 0, // Карта выезжает снизу вверх
          ease: 'none',
        }, label)
        .to(cards[index - 1], {
          scale: 0.92, // Предыдущая карта уменьшается
          opacity: 0.35, // Предыдущая карта затухает
          filter: 'blur(4px)', // Предыдущая карта уходит в мягкий фокус
          ease: 'none',
        }, label); // Запускаем строго одновременно с заходом новой карты
      });

      // Буферный интервал в конце таймлайна для плавного выхода из секции
      tl.to({}, { duration: 0.3 });

    }, sectionRef);

    // Обновляем триггеры после завершения рендеринга Next.js
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(refreshTimer);
      ctx.revert(); // Полная очистка триггеров во избежание утечек памяти
    };
  }, []);

  // Вычисление координат мыши относительно карты для Spotlight-подсветки
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    e.currentTarget.style.setProperty('--x', `${x}px`);
    e.currentTarget.style.setProperty('--y', `${y}px`);
  };

  return (
    <section className="portfolio-section" id="work" ref={sectionRef}>
      <div className="portfolio-container">
        
        {/* Заголовок блока */}
        <h2 className="portfolio-title">
          {t('portfolio.title')}
        </h2>

        {/* Стек-контейнер карт */}
        <div className="portfolio-stack-container" ref={containerRef}>
          
          {/* КАРТОЧКА 1: Personalized Support */}
          <div 
            className="portfolio-card card-first" 
            onMouseMove={handleMouseMove}
          >
            <div className="bento-graphic-wrapper">
              <div className="avatars-placeholder">
                <img width={220} src="./beeline1.png" alt="" />
              </div>
            </div>
            <div className="bento-text-content">
              <h3 className="bento-card-title">{t('portfolio.cards.support.title')}</h3>
              <p className="bento-card-desc">{t('portfolio.cards.support.desc')}</p>
            </div>
          </div>

          {/* КАРТОЧКА 2: With You Every Step */}
          <div 
            className="portfolio-card" 
            onMouseMove={handleMouseMove}
          >
            <div className="bento-graphic-wrapper">
              <div className="chat-placeholder">
                <img src="./akfa-medline.png" alt="" />
              </div>
            </div>
            <div className="bento-text-content">
              <h3 className="bento-card-title">{t('portfolio.cards.step.title')}</h3>
              <p className="bento-card-desc">{t('portfolio.cards.step.desc')}</p>
            </div>
          </div>

          {/* КАРТОЧКА 3: Measurable Impact */}
          <div 
            className="portfolio-card" 
            onMouseMove={handleMouseMove}
          >
            <div className="bento-graphic-wrapper">
              <div className="chart-placeholder">
                <div className="chart-title">Uptime Trends</div>
                <div className="chart-bars">
                  <div className="chart-bar" style={{ height: '55%' }}></div>
                  <div className="chart-bar" style={{ height: '70%' }}></div>
                  <div className="chart-bar" style={{ height: '60%' }}></div>
                  <div className="chart-bar" style={{ height: '85%' }}></div>
                  <div className="chart-bar active" style={{ height: '95%' }}></div>
                  <div className="chart-bar" style={{ height: '75%' }}></div>
                  <div className="chart-bar" style={{ height: '80%' }}></div>
                </div>
              </div>
            </div>
            <div className="bento-text-content">
              <h3 className="bento-card-title">{t('portfolio.cards.impact.title')}</h3>
              <p className="bento-card-desc">{t('portfolio.cards.impact.desc')}</p>
            </div>
          </div>

          {/* КАРТОЧКА 4: Future-Ready Solutions */}
          <div 
            className="portfolio-card" 
            onMouseMove={handleMouseMove}
          >
            <div className="bento-graphic-wrapper">
              <div className="cube-nodes-placeholder">
                <div className="cube-node-glow"></div>
                <div className="cube-node-3d"></div>
              </div>
            </div>
            <div className="bento-text-content">
              <h3 className="bento-card-title">{t('portfolio.cards.solutions.title')}</h3>
              <p className="bento-card-desc">{t('portfolio.cards.solutions.desc')}</p>
            </div>
          </div>

          {/* КАРТОЧКА 5: Transparent Process */}
          <div 
            className="portfolio-card" 
            onMouseMove={handleMouseMove}
          >
            <div className="bento-graphic-wrapper">
              <div className="timeline-placeholder">
                <div className="timeline-item">Brief approval</div>
                <div className="timeline-item">Content plan</div>
                <div className="timeline-item active">Client feedback</div>
                <div className="timeline-item">Launch setup</div>
              </div>
            </div>
            <div className="bento-text-content">
              <h3 className="bento-card-title">{t('portfolio.cards.process.title')}</h3>
              <p className="bento-card-desc">{t('portfolio.cards.process.desc')}</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}