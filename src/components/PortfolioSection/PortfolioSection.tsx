'use client';

import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { portfolioItems, type PortfolioItem } from './portfolioData';
import './PortfolioSection.css';

// Регистрируем плагины GSAP. useGSAP используем вместо обычного useEffect —
// это useLayoutEffect под капотом, как и в Footer.tsx. Если этот pin
// создавать в обычном useEffect, React сначала выполнит ВСЕ layout-эффекты
// (в т.ч. useGSAP в Footer.tsx) и только потом — этот, уже пассивный, эффект.
// Тогда триггер в футере посчитает свою позицию до того, как здесь появится
// pin-spacer, и посчитает её неверно — ровно на длину скролла этого пина.
gsap.registerPlugin(useGSAP, ScrollTrigger);

// Вычисление координат мыши относительно карты для Spotlight-подсветки
function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
  const rect = e.currentTarget.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  e.currentTarget.style.setProperty('--x', `${x}px`);
  e.currentTarget.style.setProperty('--y', `${y}px`);
}

function PortfolioVisual({ item, title }: { item: PortfolioItem; title: string }) {
  switch (item.visual) {
    case 'image':
      return (
        <div className="image-placeholder">
          <img src={item.image} alt={title} loading="lazy" />
        </div>
      );

    case 'chart':
      return (
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
      );

    case 'cube':
      return (
        <div className="cube-nodes-placeholder">
          <div className="cube-node-glow"></div>
          <div className="cube-node-3d"></div>
        </div>
      );

    case 'timeline':
      return (
        <div className="timeline-placeholder">
          <div className="timeline-item">Brief approval</div>
          <div className="timeline-item">Content plan</div>
          <div className="timeline-item active">Client feedback</div>
          <div className="timeline-item">Launch setup</div>
        </div>
      );

    default:
      return null;
  }
}

export default function PortfolioSection() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
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

    // Обновляем триггеры после завершения рендеринга Next.js
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => clearTimeout(refreshTimer);
  }, { scope: sectionRef });

  return (
    <section className="portfolio-section" id="work" ref={sectionRef}>
      <div className="portfolio-container">

        {/* Заголовок блока */}
        <h2 className="portfolio-title">
          {t('portfolio.title')}
        </h2>

        {/* Стек-контейнер карт. Порядок карточек задаётся массивом portfolioItems */}
        <div className="portfolio-stack-container" ref={containerRef}>
          {portfolioItems.map((item, index) => {
            const title = t(`portfolio.cards.${item.id}.title`);
            const desc = t(`portfolio.cards.${item.id}.desc`);

            return (
              <div
                key={item.id}
                className={`portfolio-card ${index === 0 ? 'card-first' : ''}`}
                onMouseMove={handleMouseMove}
              >
                <div className="bento-graphic-wrapper">
                  <PortfolioVisual item={item} title={title} />
                </div>
                <div className="bento-text-content">
                  {item.tag && <span className="bento-card-tag">{item.tag}</span>}
                  <h3 className="bento-card-title">{title}</h3>
                  <p className="bento-card-desc">{desc}</p>
                  {item.link && (
                    <a
                      className="bento-card-link"
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {t('portfolio.viewProject')} →
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
