'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './ExpertiseSection.css';

export default function ExpertiseSection() {
    const { t } = useTranslation();
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    // Отключаем наблюдение после первого срабатывания анимации
                    if (sectionRef.current) {
                        observer.unobserve(sectionRef.current);
                    }
                }
            },
            { threshold: 0.10 } // Срабатывает, когда 10% блока показалось на экране
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const cards = [
        {
            key: 'cloud',
            iconPath: (
                <svg id="fi_709711" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 450.56 450.56" height="28" width="28">
                    <g>
                        <g>
                            <path d="M304.384,0H146.176c-31.232,0-56.32,25.088-56.32,56.32v337.92c0,31.232,25.6,56.32,56.32,56.32h158.208c31.232,0,56.32-25.088,56.32-56.32V56.32C360.704,25.088,335.616,0,304.384,0z M225.536,414.208c-14.336,0-25.6-11.264-25.6-25.6s11.264-25.6,25.6-25.6s25.6,11.264,25.6,25.6S239.872,414.208,225.536,414.208z M335.104,335.872H115.456V75.264h219.648V335.872z" fill="url(#paint0_linear_custom)" stroke="#FAFAF9" strokeWidth="10" strokeLinejoin="round"></path>
                        </g>
                    </g>
                    <defs>
                        <linearGradient id="paint0_linear_custom" x1="45" y1="225" x2="405" y2="225" gradientUnits="userSpaceOnUse">
                            <stop offset="0.4" stopColor="#FAFAF9" />
                            <stop offset="1" stopColor="#66686E" />
                        </linearGradient>
                    </defs>
                </svg>
            )
        },
        {
            key: 'data',
            iconPath: (
                <svg xmlns="http://www.w3.org/2000/svg" id="fi_16806607" viewBox="0 0 128 128" height="28" width="28">
                    <path d="M49.7,43.72l-12,37.44A1.39,1.39,0,0,0,39,83h3.36a1.39,1.39,0,0,0,1.33-1l1.88-6H62l-.23-.37L63.83,82a1.39,1.39,0,0,0,1.33,1h3.36a1.39,1.39,0,0,0,1.33-1.82l-12-37.44a1.4,1.4,0,0,0-1.33-1H51A1.39,1.39,0,0,0,49.7,43.72ZM47.57,70l6.19-19.27L60,70Z" fill="url(#gradient_cyber)" stroke="#FAFAF9" strokeWidth="3"></path>
                    <rect x="79" y="42.75" width="6" height="40.24" rx="1.4" fill="url(#gradient_cyber)" stroke="#FAFAF9" strokeWidth="3"></rect>
                    <path d="M67.26,98H38.16A8.16,8.16,0,0,1,30,89.84V38.16A8.16,8.16,0,0,1,38.16,30H89.84A8.16,8.16,0,0,1,98,38.16V64A2.07,2.07,0,0,0,100.12,66h0a11,11,0,0,1,4.91,1.14,2.06,2.06,0,0,0,3-1.87V38.16A18.16,18.16,0,0,0,89.84,20H38.16A18.16,18.16,0,0,0,20,38.16V89.84A18.16,18.16,0,0,0,38.16,108h33.3a2.07,2.07,0,0,0,1.47-3.53,16.13,16.13,0,0,1-3.71-5.06A2.11,2.11,0,0,0,67.26,98Z" fill="url(#gradient_cyber)" stroke="#FAFAF9" strokeWidth="3"></path>
                    <path d="M111.73,101.8l9.06-3.57a1,1,0,0,0,0-1.86l-9.06-3.57a12.61,12.61,0,0,1-7.09-7.09l-3.57-9a1.261,1.261,0,0,0-.93-.63,1,1,0,0,0-.93.63l-3.57,9a12.58,12.58,0,0,1-7.09,7.09l-9,3.57a1,1,0,0,0,0,1.86l9,3.57a12.58,12.58,0,0,1,7.09,7.09l3.57,9a1,1,0,0,0,.93.64,1,1,0,0,0,.93-.64l3.57-9A12.61,12.61,0,0,1,111.73,101.8Z" fill="url(#gradient_cyber)" stroke="#FAFAF9" strokeWidth="3"></path>
                    <defs>
                        <linearGradient id="gradient_cyber" x1="10" y1="64" x2="118" y2="64" gradientUnits="userSpaceOnUse">
                            <stop offset="0.4" stopColor="#FAFAF9" />
                            <stop offset="1" stopColor="#66686E" />
                        </linearGradient>
                    </defs>
                </svg>
            )
        },
        {
            key: 'cyber',
            iconPath: (
                <svg id="fi_4629126" height="28" viewBox="0 0 512 512" width="28" xmlns="http://www.w3.org/2000/svg">
                    <path
                        clipRule="evenodd"
                        d="m100.037 98.248v-49.537c0-11.291 9.209-20.5 20.5-20.5h360.963c11.291 0 20.5 9.209 20.5 20.5v253.362c0 11.29-9.21 20.5-20.5 20.5h-49.537v-183.825c0-22.329-18.171-40.5-40.5-40.5zm-69.537 20c-11.291 0-20.5 9.209-20.5 20.5v260.742c0 11.291 9.209 20.5 20.5 20.5h69.537v58.782c0 2.009 1.108 3.726 2.938 4.555s3.852.527 5.361-.798l71.205-62.539h211.923c11.291 0 20.5-9.209 20.5-20.5v-260.742c0-11.291-9.209-20.5-20.5-20.5zm273.913 167.44c3.629 0 6.569-2.941 6.569-6.569v-19.999c0-3.628-2.94-6.569-6.569-6.569-19.693 0-29.574-23.857-15.65-37.781 2.565-2.565 2.565-6.725 0-9.29l-14.142-14.142c-2.565-2.565-6.725-2.565-9.29 0-13.924 13.924-37.781 4.044-37.781-15.649 0-3.629-2.942-6.569-6.569-6.569h-19.999c-3.627 0-6.569 2.94-6.569 6.569 0 19.693-23.857 29.574-37.782 15.649-2.565-2.565-6.725-2.565-9.29 0l-14.141 14.142c-2.565 2.565-2.565 6.725 0 9.29 13.924 13.924 4.043 37.781-15.649 37.781-3.629 0-6.569 2.942-6.569 6.569v19.999c0 3.627 2.94 6.569 6.569 6.569 19.692 0 29.573 23.857 15.649 37.781-2.565 2.565-2.565 6.725 0 9.29l14.142 14.142c2.565 2.565 6.725 2.565 9.29 0 13.942-13.942 37.782-4.068 37.782 15.649 0 3.629 2.942 6.569 6.569 6.569h19.999c3.627 0 6.569-2.939 6.569-6.569 0-19.693 23.857-29.573 37.781-15.649 2.565 2.565 6.725 2.565 9.29 0l14.142-14.142c2.565-2.565 2.565-6.725 0-9.29-13.925-13.924-4.044-37.781 15.649-37.781zm-93.431-58.459c-23.135 0-41.89 18.755-41.89 41.89s18.755 41.89 41.89 41.89 41.89-18.755 41.89-41.89-18.755-41.89-41.89-41.89z"
                        fillRule="evenodd"
                        fill="url(#gradient_cloud)"
                        stroke="#FAFAF9"
                        strokeWidth="12"
                        strokeLinejoin="round"
                    />
                    <defs>
                        <linearGradient id="gradient_cloud" x1="60" y1="256" x2="452" y2="256" gradientUnits="userSpaceOnUse">
                            <stop offset="0.4" stopColor="#FAFAF9" />
                            <stop offset="1" stopColor="#66686E" />
                        </linearGradient>
                    </defs>
                </svg>
            )
        },
        {
            key: 'workplace',
            iconPath: (
                <svg id="fi_11743813" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" height="28" width="28">
                    <path d="m15 7.25c-4.27 0-7.75 3.48-7.75 7.75s3.48 7.75 7.75 7.75 7.75-3.48 7.75-7.75-3.48-7.75-7.75-7.75zm-1.14 9.72c.29.29.29.77 0 1.06-.15.15-.34.22-.53.22s-.38-.07-.53-.22l-2.5-2.5c-.29-.29-.29-.77 0-1.06l2.5-2.5c.29-.29.77-.29 1.06 0s.29.77 0 1.06l-1.97 1.97zm5.83-1.44-2.5 2.5c-.15.15-.34.22-.53.22s-.38-.07-.53-.22c-.29-.29-.29-.77 0-1.06l1.97-1.97-1.97-1.97c-.29-.29-.29-.77 0-1.06s.77-.29 1.06 0l2.5 2.5c.29.29.29.77 0 1.06zm-11.01-7.3c-1.12 1.06-1.99 2.39-2.47 3.88-2.96-.26-4.66-.84-4.97-1.2v-4.35c1.93 1.31 5.26 1.63 7.44 1.67zm-2.22 10.34c-2.61-.3-5.22-1.03-5.22-2.57v-3.4c1.22.53 3 .81 4.61.97-.07.47-.11.94-.11 1.43 0 1.26.26 2.47.72 3.57zm3.04-17.32c-3.06 0-8.25.58-8.25 2.75s5.19 2.75 8.25 2.75 8.25-.58 8.25-2.75-5.19-2.75-8.25-2.75z" fill="url(#gradient_workplace)" stroke="#FAFAF9" strokeWidth="0.8"></path>
                    <defs>
                        <linearGradient id="gradient_workplace" x1="3" y1="12" x2="21" y2="12" gradientUnits="userSpaceOnUse">
                            <stop offset="0.4" stopColor="#FAFAF9" />
                            <stop offset="1" stopColor="#66686E" />
                        </linearGradient>
                    </defs>
                </svg>
            )
        },
        {
            key: 'strategy',
            iconPath: (
                <svg id="fi_7020085" height="28" viewBox="0 0 64 64" width="28" xmlns="http://www.w3.org/2000/svg">
                    <path d="m62.024 52.17.524-.289a.845.845 0 0 0 .331-1.181l-1.45-2.4a.927.927 0 0 0 -1.235-.316l-.53.292a.959.959 0 0 1 -1.029-.084 7.685 7.685 0 0 0 -1.692-.939.89.89 0 0 1 -.589-.81v-.579a.885.885 0 0 0 -.9-.864h-2.9a.885.885 0 0 0 -.9.864v.579a.89.89 0 0 1 -.589.81 7.685 7.685 0 0 0 -1.692.939.959.959 0 0 1 -1.029.084l-.53-.292a.927.927 0 0 0 -1.235.316l-1.45 2.4a.845.845 0 0 0 .331 1.181l.524.289a.836.836 0 0 1 .445.841 6.924 6.924 0 0 0 0 1.978.836.836 0 0 1 -.445.841l-.524.289a.845.845 0 0 0 -.331 1.181l1.45 2.4a.927.927 0 0 0 1.235.316l.53-.292a.959.959 0 0 1 1.029.084 7.685 7.685 0 0 0 1.692.939.89.89 0 0 1 .589.81v.579a.885.885 0 0 0 .9.864h2.9a.885.885 0 0 0 .9-.864v-.579a.89.89 0 0 1 .589-.81 7.685 7.685 0 0 0 1.692-.939.959.959 0 0 1 1.029-.084l.53.292a.927.927 0 0 0 1.235-.316l1.45-2.4a.845.845 0 0 0 -.331-1.181l-.524-.289a.836.836 0 0 1 -.445-.841 6.924 6.924 0 0 0 0-1.978.836.836 0 0 1 .445-.841zm-8.024 5.205a3.375 3.375 0 1 1 3.375-3.375 3.375 3.375 0 0 1 -3.375 3.375z" fill="url(#gradient_strategy)" stroke="#FAFAF9" strokeWidth="1.5"></path>
                    <path d="m18 53h-2v6a1 1 0 0 0 1 1h25v-2h-24z" fill="url(#gradient_strategy)" stroke="#FAFAF9" strokeWidth="1.5"></path>
                    <path d="m38 43h-2v8a1 1 0 0 0 1 1h5v-2h-4z" fill="url(#gradient_strategy)" stroke="#FAFAF9" strokeWidth="1.5"></path>
                    <path d="m54 32h2v10h-2z" fill="url(#gradient_strategy)" stroke="#FAFAF9" strokeWidth="1.5"></path>
                    <path d="m31 49v-20a1 1 0 0 0 -1-1h-28a1 1 0 0 0 -1 1v20a1 1 0 0 0 1 1h28a1 1 0 0 0 1-1zm-6-17h-2v-2h2zm4 0h-2v-2h2z" fill="url(#gradient_strategy)" stroke="#FAFAF9" strokeWidth="1.5"></path>
                    <path d="m46 39v-22a1 1 0 0 0 -1-1h-32a1 1 0 0 0 -1 1v9h19a2 2 0 0 1 2 2v12h12a1 1 0 0 0 1-1zm-6-19h-2v-2h2zm4 0h-2v-2h2z" fill="url(#gradient_strategy)" stroke="#FAFAF9" strokeWidth="1.5"></path>
                    <path d="m62 1h-38a1 1 0 0 0 -1 1v12h23a2 2 0 0 1 2 2v13h14a1 1 0 0 0 1-1v-26a1 1 0 0 0 -1-1zm-5 4h-2v-2h2zm4 0h-2v-2h2z" fill="url(#gradient_strategy)" stroke="#FAFAF9" strokeWidth="1.5"></path>
                    <defs>
                        <linearGradient id="gradient_strategy" x1="5" y1="32" x2="59" y2="32" gradientUnits="userSpaceOnUse">
                            <stop offset="0.4" stopColor="#FAFAF9" />
                            <stop offset="1" stopColor="#66686E" />
                        </linearGradient>
                    </defs>
                </svg>
            )
        },
        {
            key: 'modern',
            iconPath: (
                <svg version="1.1" id="fi_617333" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 323.97 323.97" height="28" width="28">
                    <g>
                        <g>
                            <path d="M315.062,175.001h-112.28c-4.907,0-8.907,4-8.907,8.906c0,2.499,1.062,4.75,2.718,6.374l79.062,79.062 c1.624,1.75,3.97,2.845,6.533,2.845c3.093,0,5.811-1.563,7.405-3.938c19.438-22.563,31.938-51.219,34.189-82.75 c0.125-0.531,0.187-1.062,0.187-1.594C323.97,179.001,320,175.001,315.062,175.001z" fill="url(#gradient_modern)" stroke="#FAFAF9" strokeWidth="8"></path>
                        </g>
                    </g>
                    <g>
                        <g>
                            <path d="M168.875,13.594c-4.907,0.03-8.875,4-8.875,8.906v124.781c0,4.938,3.968,8.938,8.875,8.938h124.813 c4.907,0,8.906-4,8.906-8.938C298.187,75.47,240.718,18.001,168.875,13.594z" fill="url(#gradient_modern)" stroke="#FAFAF9" strokeWidth="8"></path>
                        </g>
                    </g>
                    <g>
                        <g>
                            <path d="M237.469,262.063l-92.062-92.062c-1.562-1.594-2.499-3.813-2.499-6.219L142.875,33.75c0-4.906-3.968-8.875-8.875-8.875 C59.219,29.438,0,91.562,0,167.47c0,78.906,63.97,142.906,142.875,142.906c36,0,68.875-13.312,94-35.282 c1.938-1.626,3.157-4.062,3.157-6.781C240.032,265.906,239.062,263.687,237.469,262.063z" fill="url(#gradient_modern)" stroke="#FAFAF9" strokeWidth="8"></path>
                        </g>
                    </g>
                    <defs>
                        <linearGradient id="gradient_modern" x1="30" y1="162" x2="293" y2="162" gradientUnits="userSpaceOnUse">
                            <stop offset="0.4" stopColor="#FAFAF9" />
                            <stop offset="1" stopColor="#66686E" />
                        </linearGradient>
                    </defs>
                </svg>
            )
        }
    ];

    return (
        <section
            className={`expertise-section ${isVisible ? 'visible' : ''}`}
            id="services"
            ref={sectionRef}
        >
            <div className="expertise-container">

                {/* Главный заголовок */}
                <h2 className="expertise-title">
                    {t('expertise.title')}
                </h2>

                {/* Сетка из 6 резиновых карточек */}
                <div className="expertise-grid">
                    {cards.map((card, index) => (
                        <div
                            key={card.key}
                            className="expertise-card"
                            style={{ '--card-index': index } as React.CSSProperties}
                        >
                            <div className="card-icon-wrapper">
                                {card.iconPath}
                            </div>
                            <h3 className="card-title">
                                {t(`expertise.cards.${card.key}.title`)}
                            </h3>
                            <p className="card-description">
                                {t(`expertise.cards.${card.key}.desc`)}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}