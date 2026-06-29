'use client';

import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import { FaInstagram, FaTelegramPlane } from "react-icons/fa";
import './Footer.css';

// Регистрируем плагины GSAP
gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Footer() {
  const { t } = useTranslation();
  const logoRef = useRef<HTMLHeadingElement>(null);

  // Сплит-анимация букв гигантского логотипа при скролле
  useGSAP(() => {
    if (!logoRef.current) return;

    const split = new SplitType(
      logoRef.current,
      {
        types: "chars",
        charClass: "footer-logo-char",
      }
    );

    const chars =
      logoRef.current.querySelectorAll(
        ".footer-logo-char"
      );

    gsap.set(chars, {
      yPercent: 100,
    });

    gsap.timeline({
      scrollTrigger: {
        trigger: logoRef.current,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    })
      .to(chars, {
        yPercent: 0,
        stagger: 0.05,
        duration: 0.9,
        ease: "power3.out",
      });

    return () => split.revert();
  }, {
    scope: logoRef
  });

  return (
    <footer className="footer-section">

      <div className="footer-container">

        <div className="footer-cta-banner">
          <div className="cta-content">
            <p className="highlight-text">
              <span className="cta-title">
                {t('footer.cta.titlePart1')}
              </span>
              {t('footer.cta.titleHighlight1')}
            </p>

            <p className="highlight-text">
              {t('footer.cta.titleHighlight2')}
            </p>

            <p className="highlight-text">
              {/* <span className="cta-title">
                {t('footer.cta.titlePart1')}
              </span>{" "} */}
              {t('footer.cta.titleHighlight3')}
            </p>
            <p>
              {t('footer.cta.titleHighlight4')}
            </p>
          </div>
        </div>

        <div id="contact" className="footer-content">
          <div className="col">

            <div className="row1">

              <img
                width={200}
                src="/logo2.png"
                alt="logo"
              />
              <div className="footer-socials">
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <FaInstagram />
                </a>

                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Telegram"
                >
                  <FaTelegramPlane />
                </a>
              </div>
            </div>

            <div className="row2">
              <div className="location">
                <p className="location-text">
                  {t('footer.address')}
                </p>


                <div className="location-tel">
                  <a className="location-email" target="_blank" rel="noopener noreferrer" href="mailto:info@ntec.uz">info@ntec.uz</a>
                  <a className="location-phone" target="_blank" rel="noopener noreferrer" href="tel:+998949900007">
                    {t('footer.phone')}
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>


      {/* FULL WIDTH LOGO */}
      <div className="footer-logo">
        <h1 ref={logoRef}>
          <span className="logo-bold">NEURO</span>
          <span className="logo-light">TECH</span>
        </h1>
      </div>

      {/* COPYRIGHT */}
      <div className="footer-container">
        <div className="footer-copyright">
          <p>{t('footer.copyright')}.</p>
          <p>{t('footer.designedBy')}</p>
        </div>
      </div>

    </footer>
  );
}