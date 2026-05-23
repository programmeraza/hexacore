'use client';

import React, { useEffect, useState } from 'react';
import './Preloader.css';

interface PreloaderProps {
  onComplete?: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    // Имитация плавной загрузки ресурсов
    const duration = 2000; // 2 секунды общего времени загрузки
    const intervalTime = 30;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const nextProgress = Math.min(Math.round((currentStep / steps) * 100), 100);
      setProgress(nextProgress);

      if (nextProgress >= 100) {
        clearInterval(timer);
        
        // Задержка перед началом плавного исчезновения
        setTimeout(() => {
          setIsFadingOut(true);
          
          // Полное размонтирование после завершения CSS-перехода (800ms)
          setTimeout(() => {
            setIsMounted(false);
            if (onComplete) onComplete();
          }, 800);
        }, 300);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  if (!isMounted) return null;

  return (
    <div className={`preloader-overlay ${isFadingOut ? 'fade-out' : ''}`}>
      <div className="preloader-content">
        
        {/* Парящий глянцевый 3D-куб */}
        <div className="preloader-logo-area">
          <div className="preloader-cube-glow" />
          <div className="preloader-cube">
            <div className="cube-face face-front"></div>
            <div className="cube-face face-back"></div>
            <div className="cube-face face-left"></div>
            <div className="cube-face face-right"></div>
            <div className="cube-face face-top"></div>
            <div className="cube-face face-bottom"></div>
          </div>
        </div>

        {/* Название бренда */}
        <img src="./logo2.png" alt="" />

        {/* Прогресс-бар и счетчик */}
        <div className="preloader-progress-wrapper">
          <div className="preloader-progress-track">
            <div 
              className="preloader-progress-bar" 
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="preloader-percentage">
            <span>{progress}</span>%
          </div>
        </div>

      </div>
    </div>
  );
}