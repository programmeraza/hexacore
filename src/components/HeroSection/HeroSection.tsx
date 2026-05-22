'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import LiquidEther from '../LiquidEther/LiquidEther';
import '../../i18n'; // Импортируем инициализацию i18n
import './HeroSection.css';

export default function HeroSection() {
  const { t, i18n } = useTranslation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Текущий активный язык (приводим к верхнему регистру для отображения в интерфейсе)
  const currentLang = (i18n.resolvedLanguage || 'ru').toUpperCase();

  // Закрытие dropdown при клике вне его области
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
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
    setIsDropdownOpen(false);
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
          colors={['#032230', '#009DBD', '#00B8DB']}
          autoDemo={true}
          autoSpeed={0.4}
        />
        <div className="hero-overlay" />
      </div>

      <div className="hero-container">

        {/* Шапка (Header) */}
        <header className="hero-header">
          <div className="header-logo">
            <img width={200} height={200} src="./logo2.png" alt="logo" />
          </div>

          <nav className="header-nav">
            <a href="#services" className="nav-link">{t('hero.service')}</a>
            <a href="#work" className="nav-link">{t('hero.work')}</a>
            <a href="#blog" className="nav-link">{t('hero.blog')}</a>
            <a href="#about" className="nav-link">{t('hero.about')}</a>
          </nav>

          <div className="header-actions">
            <div className="lang-selector-wrapper" ref={dropdownRef}>
              <button
                className={`lang-selector ${isDropdownOpen ? 'active' : ''}`}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                aria-haspopup="listbox"
                aria-expanded={isDropdownOpen}
              >
                {/* МЕСТО №1: Флаг активного языка */}
                <img
                  src={`./${currentLang.toLowerCase()}.png`}
                  alt={currentLang}
                  className="flag-icon-image"
                />
                <span className="lang-text">{currentLang}</span>
                <span className="arrow-down-placeholder" />
              </button>

              {/* Dropdown всегда в DOM для плавной анимации закрытия */}
              <ul className={`lang-dropdown ${isDropdownOpen ? 'open' : ''}`} role="listbox">
                {languages.map(({ code, label }) => (
                  <li
                    key={code}
                    className={`lang-option ${currentLang === label ? 'selected' : ''}`}
                    onClick={() => handleLanguageChange(code)}
                    role="option"
                    aria-selected={currentLang === label}
                  >
                    {/* МЕСТО №2: Флаги в выпадающем списке */}
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

            {/* <button className="btn btn-secondary">{t('hero.bookCall')}</button> */}
          </div>
        </header>

        {/* Главный блок (Hero Content) */}
        <main className="hero-main">
          <h1 className="hero-title">
            {t('hero.titlePart1')}
            {/* <span className="highlight-text">{t('hero.titleHighlight')}</span> */}
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
          <p className="brands-title">{t('hero.trustedBy')}</p>
          <div className="brands-grid">
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
    </section>
  );
}