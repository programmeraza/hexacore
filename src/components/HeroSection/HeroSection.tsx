'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import LiquidEther from '../LiquidEther/LiquidEther';
import '../../i18n'; // Импортируем инициализацию i18n
import './HeroSection.css';

export default function HeroSection() {
  const { t, i18n } = useTranslation();
  
  // Состояния для десктопного меню выбора языка
  const [isDesktopDropdownOpen, setIsDesktopDropdownOpen] = useState(false);
  const desktopDropdownRef = useRef<HTMLDivElement>(null);

  // Состояния для мобильного меню выбора языка
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);
  const mobileDropdownRef = useRef<HTMLDivElement>(null);

  // Состояние мобильного бургер-меню
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);

  // Текущий активный язык
  const currentLang = (i18n.resolvedLanguage || 'ru').toUpperCase();

  // Блокировка прокрутки страницы при открытом бургер-меню
  useEffect(() => {
    if (isBurgerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isBurgerOpen]);

  // Закрытие выпадающих списков при клике вне их области
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      
      if (desktopDropdownRef.current && !desktopDropdownRef.current.contains(target)) {
        setIsDesktopDropdownOpen(false);
      }
      if (mobileDropdownRef.current && !mobileDropdownRef.current.contains(target)) {
        setIsMobileDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const languages = [
    { code: 'en' as const, label: 'EN' },
    { code: 'ru' as const, label: 'RU' },
    { code: 'uz' as const, label: 'UZ' },
  ];

  const handleLanguageChange = (langCode: 'en' | 'ru' | 'uz') => {
    i18n.changeLanguage(langCode);
    setIsDesktopDropdownOpen(false);
    setIsMobileDropdownOpen(false);
  };

  return (
    <section className="hero-section">
      {/* 3D-эффект в качестве интерактивного фона */}
      <div className="hero-background">
        <LiquidEther
          mouseForce={32}
          cursorSize={100}
          isViscous={false}
          resolution={0.55}
          colors={['#03080c', '#009DBD', '#00B8DB']}
          autoDemo={true}
          autoSpeed={0.4}
        />
        <div className="hero-overlay" />
      </div>

      <div className="hero-container">

        {/* Шапка (Header) */}
        <header className="hero-header">
          <div className="header-logo">
            <img src="./logo2.png" alt="logo" />
          </div>

          {/* Десктопная навигация */}
          <nav className="header-nav">
            <a href="#services" className="nav-link">{t('hero.service')}</a>
            <a href="#work" className="nav-link">{t('hero.work')}</a>
            <a href="#blog" className="nav-link">{t('hero.blog')}</a>
            <a href="#about" className="nav-link">{t('hero.about')}</a>
          </nav>

          {/* Десктопные действия */}
          <div className="header-actions">
            <div className="lang-selector-wrapper" ref={desktopDropdownRef}>
              <button
                className={`lang-selector ${isDesktopDropdownOpen ? 'active' : ''}`}
                onClick={() => setIsDesktopDropdownOpen(!isDesktopDropdownOpen)}
                aria-haspopup="listbox"
                aria-expanded={isDesktopDropdownOpen}
              >
                <img
                  src={`./${currentLang.toLowerCase()}.png`}
                  alt={currentLang}
                  className="flag-icon-image"
                />
                <span className="lang-text">{currentLang}</span>
                <span className="arrow-down-placeholder" />
              </button>

              <ul className={`lang-dropdown ${isDesktopDropdownOpen ? 'open' : ''}`} role="listbox">
                {languages.map(({ code, label }) => (
                  <li
                    key={code}
                    className={`lang-option ${currentLang === label ? 'selected' : ''}`}
                    onClick={() => handleLanguageChange(code)}
                    role="option"
                    aria-selected={currentLang === label}
                  >
                    <img
                      src={`./${code}.png`}
                      alt={label}
                      className="flag-icon-image"
                    />
                    <span className="option-text">{label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Бургер-кнопка триггера мобильного меню */}
          <button 
            className={`burger-trigger ${isBurgerOpen ? 'active' : ''}`}
            onClick={() => setIsBurgerOpen(!isBurgerOpen)}
            aria-label="Toggle menu"
          >
            <span className="burger-line" />
            <span className="burger-line" />
            <span className="burger-line" />
          </button>
        </header>

        {/* Главный блок (Hero Content) */}
        <main className="hero-main">
          <h1 className="hero-title">
            {t('hero.titlePart1')}
          </h1>

          <p className="hero-subtitle">
            {t('hero.subtitle')}
          </p>

          <div className="hero-buttons">
            <button className="btn btn-secondary">{t('hero.getStarted')}</button>
            <button className="btn btn-primary">{t('hero.bookCall')}</button>
          </div>
        </main>

        {/* Блок партнеров (Trust Section) */}
        <footer className="hero-brands-section">
          <div className="brands-grid">
            {/* Набор №1 */}
            <img src="./1.png" alt="" />
            <img src="./2.png" alt="" />
            <img src="./3.png" alt="" />
            <img src="./4.png" alt="" />
            <img src="./5.png" alt="" />
            <img src="./6.png" alt="" />
            <img src="./7.png" alt="" />
            
            {/* Набор №2 (Копия первого набора для бесшовного бесконечного зацикливания) */}
            <img src="./1.png" alt="" />
            <img src="./2.png" alt="" />
            <img src="./3.png" alt="" />
            <img src="./4.png" alt="" />
            <img src="./5.png" alt="" />
            <img src="./6.png" alt="" />
            <img src="./7.png" alt="" />
          </div>
        </footer>

      </div>

      {/* Затемняющая фоновая подложка */}
      <div 
        className={`mobile-menu-overlay ${isBurgerOpen ? 'show' : ''}`}
        onClick={() => setIsBurgerOpen(false)}
      />

      {/* Выдвижное полноэкранное меню */}
      <aside className={`mobile-menu-drawer ${isBurgerOpen ? 'open' : ''}`}>
        
        {/* Кнопка закрытия */}
        <button 
          className="mobile-menu-close-btn"
          onClick={() => setIsBurgerOpen(false)}
          aria-label="Close menu"
        >
          <span className="close-btn-line" />
          <span className="close-btn-line" />
        </button>

        <div className="mobile-menu-content">
          <nav className="mobile-nav">
            <a href="#services" className="mobile-nav-link" onClick={() => setIsBurgerOpen(false)}>
              {t('hero.service')}
            </a>
            <a href="#work" className="mobile-nav-link" onClick={() => setIsBurgerOpen(false)}>
              {t('hero.work')}
            </a>
            <a href="#blog" className="mobile-nav-link" onClick={() => setIsBurgerOpen(false)}>
              {t('hero.blog')}
            </a>
            <a href="#about" className="mobile-nav-link" onClick={() => setIsBurgerOpen(false)}>
              {t('hero.about')}
            </a>
          </nav>

          {/* Интеграция переключателя языков */}
          <div className="mobile-lang-section">
            <div className="lang-selector-wrapper" ref={mobileDropdownRef}>
              <button
                className={`lang-selector ${isMobileDropdownOpen ? 'active' : ''}`}
                onClick={() => setIsMobileDropdownOpen(!isMobileDropdownOpen)}
                aria-haspopup="listbox"
                aria-expanded={isMobileDropdownOpen}
              >
                <img
                  src={`./${currentLang.toLowerCase()}.png`}
                  alt={currentLang}
                  className="flag-icon-image"
                />
                <span className="lang-text">{currentLang}</span>
                <span className="arrow-down-placeholder" />
              </button>

              <ul className={`lang-dropdown ${isMobileDropdownOpen ? 'open' : ''}`} role="listbox">
                {languages.map(({ code, label }) => (
                  <li
                    key={code}
                    className={`lang-option ${currentLang === label ? 'selected' : ''}`}
                    onClick={() => handleLanguageChange(code)}
                    role="option"
                    aria-selected={currentLang === label}
                  >
                    <img
                      src={`./${code}.png`}
                      alt={label}
                      className="flag-icon-image"
                    />
                    <span className="option-text">{label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </aside>
    </section>
  );
}