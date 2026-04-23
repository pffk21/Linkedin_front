import React from 'react';
import './Network.css';
import { useTranslation } from 'react-i18next';

export function Network() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = React.useState('connections');
  const [eventFilter, setEventFilter] = React.useState('all');

  const eventFilters = [
    { key: "all", label: t("network.filters.all") },
    { key: "vacancies", label: t("network.filters.vacancies") },
    { key: "publications", label: t("network.filters.publications") },
    { key: "mentions", label: t("network.filters.mentions") }
  ];

  const people = [
    {
      name: t("networkPeople.person1.name"),
      title: t("networkPeople.person1.title"),
      username: t("networkPeople.person1.username"),
      image: './Network_img/person1.png'
    },
    {
      name: t("networkPeople.person2.name"),
      title: t("networkPeople.person2.title"),
      username: t("networkPeople.person2.username"),
      image: './Network_img/person2.png'
    },
    {
      name: t("networkPeople.person3.name"),
      title: t("networkPeople.person3.title"),
      username: t("networkPeople.person3.username"),
      image: './Network_img/person3.png'
    },
    {
      name: t("networkPeople.person4.name"),
      title: t("networkPeople.person4.title"),
      username: t("networkPeople.person4.username"),
      image: './Network_img/person4.png'
    },
    {
      name: t("networkPeople.person5.name"),
      title: t("networkPeople.person5.title"),
      username: t("networkPeople.person5.username"),
      image: './Network_img/person5.png'
    },
    {
      name: t("networkPeople.person6.name"),
      title: t("networkPeople.person6.title"),
      username: t("networkPeople.person6.username"),
      image: './Network_img/person6.png'
    }
  ];

  return (
    <div className="central-wrapper">
      <div className="tabsf">
        <div
          className={`tabf ${activeTab === 'connections' ? 'active' : ''}`}
          onClick={() => setActiveTab('connections')}>
          {t("network.newConnections")}
        </div>
        <div
          className={`tabf ${activeTab === 'event' ? 'active' : ''}`}
          onClick={() => setActiveTab('event')}>
          {t("network.event")}
        </div>
      </div>

      <div className={activeTab === 'connections' ? 'central-container' : 'event-container'}>
        {activeTab === 'connections' && (
          <>
            <div className="section-title">
              {t("network.peopleIn")}
            </div>
            <div className="cards-grid">
              {people.map((person, index) => (
                <div className="card" key={index}>
                  <img src={person.image} alt={person.name} />
                  <div className="card-name">{person.name}</div>
                  <div className="card-title">
                    {person.title}<br />
                    <span>{person.username}</span>
                  </div>
                  <button className="contact-button">{t("network.makeContact")}</button>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === 'event' && (
          <>
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
            <img src="./Network_img/bloknot.png" alt="No updates" className="event-image" />
            <h3 className="event-title">{t("network.noUpdates")}</h3>
            <p className="event-subtext">{t("network.expandUpdates")}</p>
            <button className="event-expand-button">{t("network.expandContacts")}</button>
          </>
        )}
      </div>
    </div>
  );
}
