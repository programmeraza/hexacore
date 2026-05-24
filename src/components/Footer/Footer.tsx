'use client';

import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import './Footer.css';

// Регистрируем плагины GSAP
gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Footer() {
  const { t } = useTranslation();
  const logoRef = useRef<HTMLHeadingElement>(null);

  // Сплит-анимация букв гигантского логотипа при скролле
  useGSAP(
    () => {
      if (!logoRef.current) return;

      const text = new SplitType(logoRef.current, {
        types: 'chars',
        charClass: 'footer-logo-char',
      });

      // Начальное состояние букв (спущены вниз и скрыты)
      gsap.set('.footer-logo-char', {
        y: '100%',
        display: 'inline-block',
      });

      // Таймлайн появления букв снизу вверх по очереди
      gsap
        .timeline({
          scrollTrigger: {
            trigger: logoRef.current,
            start: 'top 95%', // Анимация начнется, как только верх текста покажется на экране
            toggleActions: 'play none none none',
          },
        })
        .to('.footer-logo-char', {
          y: '0%',
          stagger: 0.03, // Скорость поочередного вылета букв
          duration: 0.8,
          ease: 'power2.out',
        });

      return () => {
        if (text) text.revert();
        ScrollTrigger.getAll()
          .filter((st) => st.vars.trigger === logoRef.current)
          .forEach((st) => st.kill());
      };
    },
    { scope: logoRef }
  );

  return (
    <footer className="footer-section">
      <div className="footer-container">
        
        {/* --- ВЕРХНИЙ БЛОК: CTA BANNER (HexaCore) --- */}
        <div className="footer-cta-banner">
          <div className="cta-content">
            <h2 className="cta-title">
              {t('footer.cta.titlePart1')}
              <span className="highlight-text">{t('footer.cta.titleHighlight')}</span>
            </h2>
            <p className="cta-subtitle">
              {t('footer.cta.subtitle')}
            </p>
            <div className="cta-buttons">
              <button className="btn btn-secondary">{t('footer.cta.getStarted')}</button>
              <button className="btn btn-primary">{t('footer.cta.bookCall')}</button>
            </div>
          </div>

          {/* Пустой контейнер под интерактивный 3D-граф / Схему */}
          <div className="cta-graphics-placeholder">
            <div className="placeholder-inner-border">
              <span className="placeholder-text">3D Diagram Placeholder</span>
            </div>
          </div>
        </div>

        {/* --- НИЖНИЙ БЛОК: СТРУКТУРА WellFit ( соцсети, адреса и телефоны) --- */}
        <div className="footer-content">
          <div className="col">
            
            <div className="row1">
              <div className="footer-socials">
                <a href="https://www.instagram.com/wellfit.uz/" target="_blank" rel="noopener noreferrer">Instagram</a>
                <a href="https://t.me/wellfit_uz" target="_blank" rel="noopener noreferrer">Telegram</a>
              </div>
              <h3>{t('footer.locationTitle', 'Tashkent')}</h3>
            </div>

            <div className="row2">
              <div className="location">
                <p>Forum Business Center</p>
                <p>5th Floor, Tashkent</p>
                <p>Uzbekistan</p>
                <div className="location-tel">
                  <a href="tel:+998977011111" style={{ marginTop: '1em' }}>+998 97 701 11 11</a>
                  <a href="tel:+998555071111">+998 55 507 11 11</a>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Гигантский анимированный логотип NEUROTECH */}
        <div className="footer-logo">
          <h1 ref={logoRef}>NEUROTECH</h1>
        </div>

        {/* Копирайт */}
        <div className="footer-copyright">
          <p>{t('footer.copyright', 'All rights reserved')}.</p>
          <p>Designed by Aziz</p>
        </div>

      </div>
    </footer>
  );
}