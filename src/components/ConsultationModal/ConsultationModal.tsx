'use client';

import React, { useState, useEffect, useRef } from 'react';
import './ConsultationModal.css';

// Константы для интеграции с Telegram (Замените на свои данные из BotFather)
const TELEGRAM_BOT_TOKEN = '8804223977:AAGqbDjSkYRhmECAbQ0l_n3MREC5N1EONHM';
const TELEGRAM_CHAT_ID = '-5178082257';

export default function ConsultationModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [projectType, setProjectType] = useState<string>('');
  const [comment, setComment] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const modalRef = useRef<HTMLDivElement>(null);

  // Варианты типов проектов из макета
  const projectTypes = [
    { id: 'mobile', label: 'Мобильное приложение' },
    { id: 'desktop', label: 'Автоматизация бизнеса' },
    { id: 'web', label: 'RAG архитектура' },
    { id: 'saas', label: 'SaaS решения' },
    { id: 'crm', label: 'CRM / ERP системы' },
    { id: 'ai', label: 'ИИ-решения' },
    { id: 'other', label: 'Другое' }
  ];

  // Глобальное прослушивание события открытия
  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      setStatus('idle');
      // Блокируем скролл страницы
      document.body.style.overflow = 'hidden';
    };

    window.addEventListener('open-consultation', handleOpen);
    return () => {
      window.removeEventListener('open-consultation', handleOpen);
    };
  }, []);

  // Функция закрытия окна
  const handleClose = () => {
    setIsOpen(false);
    // Разблокируем скролл страницы
    document.body.style.overflow = '';
  };

  // Закрытие при клике на оверлей вне модального окна
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      handleClose();
    }
  };

  // Отправка данных в Telegram
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !contact) {
      alert('Пожалуйста, заполните обязательные поля: Имя и Контактные данные.');
      return;
    }

    setStatus('loading');

    // Форматируем сообщение для отправки в Telegram (поддерживает HTML разметку)
    const message = `
<b>🔔 Новая заявка на консультацию!</b>\n
<b>👤 Имя:</b> ${name}\n
<b>📱 Контакт (TG/Тел):</b> ${contact}\n
<b>💻 Тип проекта:</b> ${projectType || 'Не выбран'}\n
<b>💬 Комментарий:</b> ${comment || 'Отсутствует'}
    `.trim();

    try {
      const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: 'HTML',
        }),
      });

      if (response.ok) {
        setStatus('success');
        // Очищаем форму после успешной отправки
        setName('');
        setContact('');
        setProjectType('');
        setComment('');
        // Закрываем окно через 2 секунды после успеха
        setTimeout(() => {
          handleClose();
        }, 2000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-window" ref={modalRef}>

        {/* Кнопка закрытия окна (Крестик) */}
        <button className="modal-close-btn" onClick={handleClose} aria-label="Close modal">
          <span className="close-line" />
          <span className="close-line" />
        </button>

        <div className="modal-header">
          <h2>Ваша заявка</h2>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">

          {/* Поле: Имя */}
          <div className="form-group">
            <label htmlFor="name">ФИО</label>
            <input
              type="text"
              id="name"
              placeholder="Как к вам обращаться?"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Поле: Контакт */}
          <div className="form-group">
            <label htmlFor="contact">Telegram или телефон</label>
            <input
              type="text"
              id="contact"
              placeholder="@username или +998..."
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              required
            />
          </div>

          {/* Поле: Выбор типа проекта (Pills) */}
          <div className="form-group">
            <label>Тип проекта</label>
            <div className="project-types-grid">
              {projectTypes.map((type) => (
                <button
                  key={type.id}
                  type="button"
                  className={`project-type-pill ${projectType === type.label ? 'active' : ''}`}
                  onClick={() => setProjectType(type.label)}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          {/* Поле: Комментарий */}
          {/* <div className="form-group">
            <label htmlFor="comment">Комментарий <span>необязательно</span></label>
            <textarea
              id="comment"
              placeholder="Кратко опишите задачу или вопрос..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
            />
          </div> */}

          {/* Кнопка отправки формы */}
          <button
            type="submit"
            className={`modal-submit-btn ${status === 'loading' ? 'loading' : ''} ${status === 'success' ? 'success' : ''}`}
            disabled={status === 'loading' || status === 'success'}
          >
            {status === 'idle' && (
              <>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="send-icon">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
                <span>Отправить заявку</span>
              </>
            )}
            {status === 'loading' && <span>Отправка данных...</span>}
            {status === 'success' && <span>Заявка успешно отправлена!</span>}
            {status === 'error' && <span>Ошибка. Повторить отправку</span>}
          </button>

          {/* Футер безопасности */}
          <div className="modal-form-footer">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lock-icon">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <span>Данные не передаются третьим лицам</span>
          </div>

        </form>

      </div>
    </div>
  );
}