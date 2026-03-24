import React, { useState } from 'react';
import MessageModal from './MessageModal';
import { generateGoogleCalendarUrl } from '../utils/calendarUtils';
import { useTranslation, useLang } from '../i18n';
import './InvitationCard.css';

const InvitationCard = ({ data }) => {
  const { graduate, event, message } = data;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const t = useTranslation();
  const lang = useLang();

  const calendarUrl = generateGoogleCalendarUrl(event, graduate, t);

  const switchLang = lang === 'en' ? '#/vi' : '#/';

  return (
    <div className="invitation-card">
      <div className="lang-switcher">
        <a href={switchLang}>{t.switchLang}</a>
      </div>
      <div className="card-border">
        <header className="card-header">
          <div className="school-name">{graduate.university}</div>
          <p className="intro-text">{t.announcesGraduation}</p>
          <h1 className="graduate-name">{graduate.name}</h1>
          <div className="degree-text">{graduate.degree}</div>
          <div className="year-text">{t.classOf} {graduate.graduationYear}</div>
        </header>

        <div className="divider">
          <span className="divider-icon">🎓</span>
        </div>

        <section className="event-details">
          <p className="message">{message}</p>

          <div className="details-grid">
            <div className="detail-item">
              <h3>{t.when}</h3>
              <p className="date">{event.date}</p>
              <p className="time">{event.time}</p>
              <a
                href={calendarUrl}
                target="_blank"
                rel="noreferrer"
                className="calendar-link"
              >
                {t.addToCalendar}
              </a>
            </div>

            <div className="detail-item">
              <h3>{t.where}</h3>
              <p className="venue">{event.location.venue}</p>
              <p className="address">{event.location.address}</p>
              <a href={event.location.mapLink} target="_blank" rel="noreferrer" className="map-link">{t.viewMap}</a>
            </div>
          </div>

          <div className="schedule-preview">
            {event.schedule.map((item, index) => (
              <div key={index} className="schedule-item">
                <span className="schedule-time">{item.time}</span>
                <span className="schedule-activity">{item.activity}</span>
              </div>
            ))}
          </div>
        </section>

        <footer className="card-footer">
          <button onClick={() => setIsModalOpen(true)} className="rsvp-button">
            {t.sendMessageRsvp}
          </button>
        </footer>
      </div>

      <MessageModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default InvitationCard;
