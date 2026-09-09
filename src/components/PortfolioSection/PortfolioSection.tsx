'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { portfolioItems, type PortfolioItem } from './portfolioData';
import './PortfolioSection.css';

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
          <img src={item.image} alt={title} loading="lazy" draggable={false} />
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

const pad = (n: number) => String(n).padStart(2, '0');

export default function PortfolioSection() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState({ widthPct: 100, leftPct: 0 });
  const [hasInteracted, setHasInteracted] = useState(false);

  // Проявление секции при попадании в вьюпорт (без скролл-джекинга)
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

  // Пересчёт "активной" (центральной) карточки, прогресс-бара и
  // фокус-эффекта (центральная карта крупнее и ярче соседних).
  // Обновляется по событию scroll трека, throttled одним rAF за раз.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let rafId: number | null = null;

    const measure = () => {
      rafId = null;
      const trackRect = track.getBoundingClientRect();
      const centerX = trackRect.left + trackRect.width / 2;

      const cards = Array.from(track.querySelectorAll<HTMLElement>('.portfolio-card'));
      let closestIndex = 0;
      let closestDist = Infinity;

      cards.forEach((card, i) => {
        const cardRect = card.getBoundingClientRect();
        const cardCenter = cardRect.left + cardRect.width / 2;
        const dist = Math.abs(centerX - cardCenter);
        const norm = Math.min(dist / (trackRect.width / 2), 1);

        card.style.setProperty('--focus', String(1 - norm));

        if (dist < closestDist) {
          closestDist = dist;
          closestIndex = i;
        }
      });

      setActiveIndex(closestIndex);

      const maxScroll = track.scrollWidth - track.clientWidth;
      const scrollPct = maxScroll > 0 ? track.scrollLeft / maxScroll : 0;
      const widthPct = Math.max((track.clientWidth / track.scrollWidth) * 100, 8);
      setProgress({ widthPct, leftPct: scrollPct * (100 - widthPct) });
    };

    const handleScroll = () => {
      if (rafId === null) rafId = requestAnimationFrame(measure);
      setHasInteracted(true);
    };

    measure();
    track.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      track.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  // Перетаскивание мышью (на тач-устройствах и трекпаде работает нативный скролл)
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let isDragging = false;
    let startX = 0;
    let startScrollLeft = 0;
    let moved = false;

    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      isDragging = true;
      moved = false;
      startX = e.clientX;
      startScrollLeft = track.scrollLeft;
      track.classList.add('dragging');
      track.setPointerCapture(e.pointerId);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 4) moved = true;
      track.scrollLeft = startScrollLeft - dx;
    };

    const onPointerUp = (e: PointerEvent) => {
      if (!isDragging) return;
      isDragging = false;
      track.classList.remove('dragging');
      track.releasePointerCapture(e.pointerId);
    };

    // Клик по ссылке/кнопке внутри карты не должен считаться перетаскиванием
    const onClickCapture = (e: MouseEvent) => {
      if (moved) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    track.addEventListener('pointerdown', onPointerDown);
    track.addEventListener('pointermove', onPointerMove);
    track.addEventListener('pointerup', onPointerUp);
    track.addEventListener('pointercancel', onPointerUp);
    track.addEventListener('click', onClickCapture, true);

    return () => {
      track.removeEventListener('pointerdown', onPointerDown);
      track.removeEventListener('pointermove', onPointerMove);
      track.removeEventListener('pointerup', onPointerUp);
      track.removeEventListener('pointercancel', onPointerUp);
      track.removeEventListener('click', onClickCapture, true);
    };
  }, []);

  const scrollToIndex = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const clamped = Math.min(Math.max(index, 0), portfolioItems.length - 1);
    const card = track.querySelectorAll<HTMLElement>('.portfolio-card')[clamped];
    card?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') scrollToIndex(activeIndex + 1);
    if (e.key === 'ArrowLeft') scrollToIndex(activeIndex - 1);
  };

  return (
    <section
      className={`portfolio-section ${isVisible ? 'visible' : ''}`}
      id="work"
      ref={sectionRef}
    >
      <div className="portfolio-container">

        <div className="portfolio-header">
          <div className="portfolio-heading">
            <div className="portfolio-badge">
              <span>{t('portfolio.eyebrow')}</span>
            </div>
            <h2 className="portfolio-title">{t('portfolio.title')}</h2>
          </div>

          <div className="portfolio-controls">
            <span className="portfolio-counter">
              <span className="portfolio-counter-current">{pad(activeIndex + 1)}</span>
              <span className="portfolio-counter-sep">/</span>
              <span className="portfolio-counter-total">{pad(portfolioItems.length)}</span>
            </span>
            <div className="portfolio-arrows">
              <button
                type="button"
                className="portfolio-arrow"
                onClick={() => scrollToIndex(activeIndex - 1)}
                disabled={activeIndex === 0}
                aria-label="Previous project"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button
                type="button"
                className="portfolio-arrow"
                onClick={() => scrollToIndex(activeIndex + 1)}
                disabled={activeIndex === portfolioItems.length - 1}
                aria-label="Next project"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Горизонтальная лента карточек. Порядок задаётся массивом portfolioItems */}
        <div
          className="portfolio-track"
          ref={trackRef}
          tabIndex={0}
          onKeyDown={handleKeyDown}
        >
          {portfolioItems.map((item) => {
            const title = t(`portfolio.cards.${item.id}.title`);
            const desc = t(`portfolio.cards.${item.id}.desc`);

            return (
              <div
                key={item.id}
                className="portfolio-card"
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

        <div className="portfolio-footer">
          <div className="portfolio-progress-track">
            <div
              className="portfolio-progress-bar"
              style={{ width: `${progress.widthPct}%`, left: `${progress.leftPct}%` }}
            />
          </div>
          <p className={`portfolio-drag-hint ${hasInteracted ? 'hidden' : ''}`}>
            {t('portfolio.dragHint')} →
          </p>
        </div>
      </div>
    </section>
  );
}
