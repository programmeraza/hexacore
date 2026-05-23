'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './PortfolioSection.css';

export default function PortfolioSection() {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (sectionRef.current) {
            observer.unobserve(sectionRef.current);
          }
        }
      },
      { threshold: 0.12 } // Анимация запускается, когда 12% блока в зоне видимости
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      className={`portfolio-section ${isVisible ? 'visible' : ''}`} 
      id="work" 
      ref={sectionRef}
    >
      <div className="portfolio-container">
        
        {/* Заголовок блока */}
        <h2 className="portfolio-title">
          {t('portfolio.title')}
        </h2>

        {/* Адаптивная bento-сетка */}
        <div className="portfolio-bento-grid">
          
          {/* КАРТОЧКА 1: Personalized Support */}
          <div className="bento-card bento-card-small" style={{ '--card-index': 0 } as React.CSSProperties}>
            <div className="bento-graphic-wrapper">
              {/* Плейсхолдер для аватарок */}
              <div className="avatars-placeholder">
                <div className="avatar-circle"></div>
                <div className="avatar-circle"></div>
                <div className="avatar-circle"></div>
                <div className="avatar-circle"></div>
              </div>
            </div>
            <div className="bento-text-content">
              <h3 className="bento-card-title">{t('portfolio.cards.support.title')}</h3>
              <p className="bento-card-desc">{t('portfolio.cards.support.desc')}</p>
            </div>
          </div>

          {/* КАРТОЧКА 2: With You Every Step */}
          <div className="bento-card bento-card-small" style={{ '--card-index': 1 } as React.CSSProperties}>
            <div className="bento-graphic-wrapper">
              {/* Плейсхолдер чата Maddy */}
              <div className="chat-placeholder">
                <div className="chat-header-line">Maddy • 10:15 AM</div>
                <div className="chat-bubble bubble-received">Hi, Daniel! Your design draft is ready.</div>
                <div className="chat-bubble bubble-received">Want feedback before next step?</div>
                <div className="chat-bubble bubble-dots">...</div>
              </div>
            </div>
            <div className="bento-text-content">
              <h3 className="bento-card-title">{t('portfolio.cards.step.title')}</h3>
              <p className="bento-card-desc">{t('portfolio.cards.step.desc')}</p>
            </div>
          </div>

          {/* КАРТОЧКА 3: Measurable Impact */}
          <div className="bento-card bento-card-small" style={{ '--card-index': 2 } as React.CSSProperties}>
            <div className="bento-graphic-wrapper">
              {/* Плейсхолдер графиков */}
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
          <div className="bento-card bento-card-medium" style={{ '--card-index': 3 } as React.CSSProperties}>
            <div className="bento-graphic-wrapper">
              {/* Плейсхолдер 3D куба с нодами */}
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
          <div className="bento-card bento-card-large" style={{ '--card-index': 4 } as React.CSSProperties}>
            <div className="bento-graphic-wrapper">
              {/* Плейсхолдер таймлайна */}
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