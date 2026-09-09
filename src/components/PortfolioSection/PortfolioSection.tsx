'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { portfolioItems } from './portfolioData';
import './PortfolioSection.css';

// Вычисление координат мыши относительно карты для Spotlight-подсветки
function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
  const rect = e.currentTarget.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  e.currentTarget.style.setProperty('--x', `${x}px`);
  e.currentTarget.style.setProperty('--y', `${y}px`);
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  );
}

export default function PortfolioSection() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Каскадное появление карточек при попадании секции во вьюпорт
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className={`portfolio-section ${isVisible ? 'visible' : ''}`}
      id="work"
      ref={sectionRef}
    >
      <div className="portfolio-container">
        <h2 className="portfolio-title">{t('portfolio.title')}</h2>

        <div className="portfolio-grid">
          {portfolioItems.map((item, index) => {
            const category = t(`portfolio.cards.${item.id}.category`);
            const title = t(`portfolio.cards.${item.id}.title`);
            const subtitle = t(`portfolio.cards.${item.id}.subtitle`);

            const CardArrow = (
              <span className="portfolio-card-arrow" aria-hidden={!item.link}>
                <ArrowIcon />
              </span>
            );

            return (
              <div
                key={item.id}
                className="portfolio-card"
                style={{ '--card-index': index } as React.CSSProperties}
                onMouseMove={handleMouseMove}
              >
                <div className="portfolio-card-top">
                  <span className="portfolio-card-category">{category}</span>
                  {item.link ? (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${t('portfolio.viewSite')}: ${title}`}
                    >
                      {CardArrow}
                    </a>
                  ) : (
                    CardArrow
                  )}
                </div>

                <h3 className="portfolio-card-title">{title}</h3>
                <p className="portfolio-card-subtitle">{subtitle}</p>

                <div className="portfolio-device">
                  <div className="portfolio-device-screen">
                    <span className="portfolio-device-dot" />
                    {item.image ? (
                      <img src={item.image} alt={title} loading="lazy" draggable={false} />
                    ) : (
                      <div className="portfolio-device-placeholder">
                        <span className="portfolio-device-bar" />
                        <span className="portfolio-device-mark">{title.charAt(0)}</span>
                      </div>
                    )}
                  </div>
                  <div className="portfolio-device-base" />
                </div>

                {item.link && (
                  <a
                    className="portfolio-card-link"
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t('portfolio.viewSite')}
                    <ArrowIcon />
                  </a>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
