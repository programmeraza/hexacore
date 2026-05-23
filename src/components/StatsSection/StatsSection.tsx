'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './StatsSection.css';

export default function StatsSection() {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Состояния для чисел
  const [satisfiedCount, setSatisfiedCount] = useState(0);
  const [retentionCount, setRetentionCount] = useState(0);
  const [ratingCount, setRatingCount] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Анимация последовательного подсчета цифр
  useEffect(() => {
    if (!isVisible) return;

    const animateNumber = (
      start: number,
      end: number,
      duration: number,
      isFloat: boolean,
      callback: (val: number) => void,
      nextStepCallback?: () => void
    ) => {
      const startTime = performance.now();

      const update = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeProgress = progress * (2 - progress); // Ease Out Quad
        const currentVal = start + (end - start) * easeProgress;

        callback(isFloat ? parseFloat(currentVal.toFixed(2)) : Math.floor(currentVal));

        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          if (nextStepCallback) nextStepCallback();
        }
      };

      requestAnimationFrame(update);
    };

    animateNumber(0, 350, 1000, false, setSatisfiedCount, () => {
      animateNumber(0, 90, 800, false, setRetentionCount, () => {
        animateNumber(0, 4.97, 800, true, setRatingCount);
      });
    });

  }, [isVisible]);

  return (
    <section 
      className={`stats-section ${isVisible ? 'visible' : ''}`} 
      ref={sectionRef}
    >
      {/* 
        Три неоновые дуги со значительно расширенным шагом отступа (50px).
      */}
      <div className="stats-arc-background">
        <svg viewBox="0 0 1000 350" fill="none" xmlns="http://www.w3.org/2000/svg" className="stats-svg">
          <defs>
            <linearGradient id="arcGlow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(0, 157, 189, 0)" />
              <stop offset="50%" stopColor="rgba(0, 184, 219, 0.85)" />
              <stop offset="100%" stopColor="rgba(0, 157, 189, 0)" />
            </linearGradient>
            <linearGradient id="arcGlowMuted" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(0, 157, 189, 0)" />
              <stop offset="50%" stopColor="rgba(0, 184, 219, 0.35)" />
              <stop offset="100%" stopColor="rgba(0, 157, 189, 0)" />
            </linearGradient>
          </defs>

          {/* Внешняя размытая фоновая дуга */}
          <path 
            d="M 30,30 A 570 310 0 0 0 970 30" 
            stroke="url(#arcGlowMuted)" 
            strokeWidth="10" 
            strokeLinecap="round"
            className="svg-arc-glow"
          />

          {/* Линия №1 - Внешняя (Основная толстая) */}
          <path 
            d="M 30,30 A 570 310 0 0 0 970 30" 
            stroke="url(#arcGlow)" 
            strokeWidth="2.8" 
            strokeLinecap="round"
            className="svg-arc-main"
          />

          {/* Линия №2 - Средняя (Тонкая акцентная) */}
          <path 
            d="M 95,80 A 505 255 0 0 0 905 80" 
            stroke="url(#arcGlow)" 
            strokeWidth="1.2" 
            strokeLinecap="round"
            className="svg-arc-inner"
          />

          {/* Линия №3 - Внутренняя (Новая тонкая линия) */}
          <path 
            d="M 160,130 A 440 200 0 0 0 840 130" 
            stroke="url(#arcGlow)" 
            strokeWidth="0.9" 
            strokeLinecap="round"
            className="svg-arc-inner-2"
          />
        </svg>
      </div>

      <div className="stats-container">
        
        <h2 className="stats-title">
          {t('stats.titlePart1')}
        </h2>

        <div className="stats-grid">
          
          <div className="stats-item">
            <div className="stats-number">
              <span>{satisfiedCount}</span>+
            </div>
            <p className="stats-label">{t('stats.satisfied')}</p>
          </div>

          <div className="stats-item">
            <div className="stats-number">
              <span>{retentionCount}</span>%
            </div>
            <p className="stats-label">{t('stats.retention')}</p>
          </div>

          <div className="stats-item">
            <div className="stats-number">
              <span>{ratingCount.toFixed(2)}</span>
            </div>
            <p className="stats-label">{t('stats.rating')}</p>
          </div>

        </div>

      </div>
    </section>
  );
}