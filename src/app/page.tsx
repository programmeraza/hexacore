'use client';

import React, { useState } from 'react';
import Preloader from '../components/Preloader/Preloader';
import HeroSection from '../components/HeroSection/HeroSection';
import ExpertiseSection from '../components/ExpertiseSection/ExpertiseSection';
import Footer from '../components/Footer/Footer';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {/* Прелоадер */}
      <Preloader onComplete={() => setIsLoading(false)} />

      {/* Основной контент рендерится всегда (или плавно проявляется), 
          но взаимодействие разблокируется после окончания загрузки */}
      <div className={`app-content-wrapper ${isLoading ? 'locked' : 'ready'}`}>
        <HeroSection />
        <ExpertiseSection />
        <Footer />
      </div>
    </>
  );
}