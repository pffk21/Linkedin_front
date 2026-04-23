import './Sidebar_left.css'
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export function Sidebar_left() {
  const location = useLocation();

  if (location.pathname.startsWith('/network')) {
    return <Sidebar_left_network />;
  } else if (location.pathname.startsWith('/messages')) {
    return <ChatSidebar />;
  }

  return <Sidebar_left_home />;
}

export function Sidebar_left_home() {
  const { t } = useTranslation();

  return (
    <aside className='sidebar_left'>
    <div className='homesd'>
      <img src='./Header_img/Ellipse.svg'/>
      <div className='homesd_name'>{t("profileSidebar.name")}</div>
      <div className='homesd_prof'>{t("profileSidebar.role")}</div>
    </div>
      <div className='sidebar_contacts'>
        <span className='contacts_title'>{t("sidebar.contacts")}</span>
        <span>{t("sidebar.expandContacts")}</span>
      </div>

      <div className='sidebar_saved'>
        <a href='#' className='sidebar_href'>
          <img src='./Sidebars_img/bookmark.svg' />
          <span>{t("sidebar.savedElements")}</span>
        </a>
      </div>
    </aside>
  );
}

export function Sidebar_left_network() {
  const { t } = useTranslation();

  return (
    <aside className='sidebar_left'>
      <div className='homesd_name'>{t("sidebar.manageNetwork")}</div>
      <ul className='networksb_grid'>
        <li className='networksb_li'>
          <img src='./Sidebars_img/Users.svg' />
          <span>{t("sidebar.contacts")}</span>
        </li>
        <li className='networksb_li'>
          <img src='./Sidebars_img/User.svg' />
          <span>{t("sidebar.peopleFollow")}</span>
        </li>
        <li className='networksb_li'>
          <img src='./Sidebars_img/UsersThree.svg' />
          <span>{t("sidebar.groups")}</span>
        </li>
        <li className='networksb_li'>
          <img src='./Sidebars_img/Calendar.svg' />
          <span>{t("sidebar.events")}</span>
        </li>
        <li className='networksb_li'>
          <img src='./Sidebars_img/Browsers.svg' />
          <span>{t("sidebar.pages")}</span>
        </li>
      </ul>
    </aside>
  );
}

const chats = [
  { id: 1, name: 'Marcus Dias', message: 'YOU: Thank you! Good luck.', time: { type: "minutesAgo", value: 45 }, avatar: './ChatSidebar_img/Avatar1.png' },
  { id: 2, name: 'Alena Curtis', message: "Alright. I'll call you back.", time: { type: "minutesAgo", value: 2 }, unread: true, avatar: './ChatSidebar_img/Avatar2.png' },
  { id: 3, name: 'Abram Lipshutz', message: 'Looking forward to your conf...', time: { type: "hoursAgo", value: 3 }, avatar: './ChatSidebar_img/Avatar3.png' },
  { id: 4, name: 'Hanna Bergson', message: 'Thanks for the offer!', time: { type: "hoursAgo", value: 3 }, unread: true, avatar: './ChatSidebar_img/Avatar4.png' },
  { id: 5, name: 'Carla Herwitz', message: 'YOU: Thank you for your feed...', time: { type: "hoursAgo", value: 20 }, avatar: './ChatSidebar_img/Avatar5.png' },
  { id: 6, name: 'Skylar Carder', message: 'YOU: Let me know if there’s a...', time: { type: "daysAgo", value: 1 }, avatar: './ChatSidebar_img/Avatar6.png' },
  { id: 7, name: 'Leo George', message: 'Looking forward to discussin...', time: { type: "daysAgo", value: 6 }, unread: true, avatar: './ChatSidebar_img/Avatar7.png' },
  { id: 8, name: 'Miracle Lipshutz', message: "Thanks for the meeting, we’ll ...", time: { type: "weeksAgo", value: 1 }, unread: true, avatar: './ChatSidebar_img/Avatar8.png' },
  { id: 9, name: 'Ahmad Vaccaro', message: 'I’ll wait for your go-ahead bef...', time: { type: "yearsAgo", value: 1 }, unread: true, avatar: './ChatSidebar_img/Avatar9.png' },
];

export function ChatSidebar() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <aside className="chat-sidebar">
      <div className="chat-tabs">
        <span className="active-tab">
          {t("chat.chats")}
          <img src="./ChatSidebar_img/Frame.png" alt="chat" className="tab-icon" />
        </span>
        <span className="archived-tab">{t("chat.archived")}</span>
      </div>

      <div className="chat-search">
        <form role="search" className="sidebar_search">
          <input
            name="header_search"
            type="search"
            placeholder={t("chat.searchMessages")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <img src="./Header_img/search.svg" alt="search icon" />
        </form>
      </div>

      <ul className="chat-list">
        {filteredChats.map((chat) => (
          <li key={chat.id} className={`chat-item ${chat.active ? 'active' : ''}`}>
            <img src={chat.avatar} alt={`${chat.name} avatar`} className="avatar" />
            <div className="chat-info">
              <div className="chat-name">{chat.name}</div>
              <div className="chat-msg">
                {chat.message.startsWith('YOU:') ? (
                  <>
                    <span className="you-label">{t("chat.you")}:</span>
                    <span className="you-text">{chat.message.slice(4)}</span>
                  </>
                ) : (
                  chat.message
                )}
              </div>
            </div>
            <div className="chat-meta">
              <div className="chat-time">
                {t(`time.${chat.time.type}`, { count: chat.time.value })}
              </div>
              {chat.unread && <div className="unread-dot"></div>}
            </div>
          </li>
        ))}
      </ul>
    </aside>
  );
}
