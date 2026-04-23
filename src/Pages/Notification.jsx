import './Notification.css'
import React from 'react';
import { useTranslation } from 'react-i18next';

export function Notification() {
  const { t } = useTranslation();
  const [eventFilter, setEventFilter] = React.useState('all');

  const eventFilters = [
    { key: "all", label: t("notification.filters.all") },
    { key: "career", label: t("notification.filters.career") },
    { key: "birthdays", label: t("notification.filters.birthdays") },
    { key: "education", label: t("notification.filters.education") }
  ];

  return (
    <div className="notification-wrapper">
      <div className="notification-tabs">
        <div className="event-filters">
          {eventFilters.map((filter) => (
            <button
              key={filter.key}
              className={`filter ${eventFilter === filter.key ? 'active' : ''}`}
              onClick={() => setEventFilter(filter.key)}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>
      <div className="notification-box">
        <img src="./Pages_img/Frame_16.svg" alt="No notifications" className="notification-image" />
        <h2 className="notification-title">{t("notification.noNew")}</h2>
        <p className="notification-text">{t("notification.checkHome")}</p>
        <button className="notification-home-button">{t("notification.homeButton")}</button>
      </div>
    </div>
  );
}
