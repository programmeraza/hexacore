'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import './Footer.css';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="footer-section">
      <div className="footer-container">
        
        {/* --- ВЕРХНИЙ БЛОК: CTA BANNER --- */}
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

        {/* --- НИЖНИЙ БЛОК: NAVIGATION --- */}
        <div className="footer-nav-area">
          
          {/* Левая колонка: Логотип, Соцсети, Копирайт */}
          <div className="footer-brand-column">
            <div className="footer-logo">
              <img src="./logo2.png" alt="HexaCore Logo" />
            </div>
            
            {/* Круглые кнопки соцсетей (macOS Glass Style) */}
            <div className="footer-socials">
              <a href="#instagram" className="social-icon-btn" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a href="#linkedin" className="social-icon-btn" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              <a href="#youtube" className="social-icon-btn" aria-label="YouTube">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
                </svg>
              </a>
              <a href="#twitter" className="social-icon-btn" aria-label="Twitter">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                </svg>
              </a>
            </div>

            <p className="footer-copyright">
              {t('footer.copyright')}
            </p>
          </div>

          {/* Правая часть: Сетка из 4 колонок со ссылками */}
          <div className="footer-links-grid">
            
            {/* Колонки навигации */}
            <div className="footer-column">
              <h4 className="column-title">{t('footer.columns.company.title')}</h4>
              <ul className="column-links">
                <li><a href="#about">{t('footer.columns.company.about')}</a></li>
                <li><a href="#careers">{t('footer.columns.company.careers')}</a></li>
                <li><a href="#culture">{t('footer.columns.company.culture')}</a></li>
                <li><a href="#sustainability">{t('footer.columns.company.sustainability')}</a></li>
                <li><a href="#contact">{t('footer.columns.company.contact')}</a></li>
              </ul>
            </div>

            <div className="footer-column">
              <h4 className="column-title">{t('footer.columns.resources.title')}</h4>
              <ul className="column-links">
                <li><a href="#blog">{t('footer.columns.resources.blog')}</a></li>
                <li><a href="#whitepapers">{t('footer.columns.resources.whitepapers')}</a></li>
                <li><a href="#webinars">{t('footer.columns.resources.webinars')}</a></li>
                <li><a href="#toolkits">{t('footer.columns.resources.toolkits')}</a></li>
                <li><a href="#press">{t('footer.columns.resources.press')}</a></li>
              </ul>
            </div>

            <div className="footer-column">
              <h4 className="column-title">{t('footer.columns.solutions.title')}</h4>
              <ul className="column-links">
                <li><a href="#services">{t('footer.columns.solutions.service')}</a></li>
                <li><a href="#work">{t('footer.columns.solutions.work')}</a></li>
                <li><a href="#stories">{t('footer.columns.solutions.stories')}</a></li>
                <li><a href="#lab">{t('footer.columns.solutions.lab')}</a></li>
              </ul>
            </div>

            <div className="footer-column">
              <h4 className="column-title">{t('footer.columns.legal.title')}</h4>
              <ul className="column-links">
                <li><a href="#help">{t('footer.columns.legal.help')}</a></li>
                <li><a href="#status">{t('footer.columns.legal.status')}</a></li>
                <li><a href="#docs">{t('footer.columns.legal.docs')}</a></li>
                <li><a href="#accessibility">{t('footer.columns.legal.accessibility')}</a></li>
              </ul>
            </div>

          </div>
        </div>

      </div>
    </footer>
  );
}