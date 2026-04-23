import './Sidebar_right.css'
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export function Sidebar_right() {
  const location = useLocation();

  if (location.pathname.startsWith('/messages')) {
    return <Sidebar_ChatM />;
  }

  return <Sidebar_right_main />;
}

export function Sidebar_right_main() {
  const [active, setActive] = useState(0);
  const [showChatList, setShowChatList] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { t } = useTranslation();

  const chats = [
    { id: 1, name: 'Marcus Dias', message: 'YOU: Thank you! Good luck.', time: '45 min', avatar: './ChatSidebar_img/Avatar1.png' },
    { id: 2, name: 'Alena Curtis', message: "Alright. I'll call you back.", time: '2 min', unread: true, avatar: './ChatSidebar_img/Avatar2.png' },
    { id: 3, name: 'Abram Lipshutz', message: 'Looking forward to your conf...', time: '3 h', avatar: './ChatSidebar_img/Avatar3.png' },
    { id: 4, name: 'Hanna Bergson', message: 'Thanks for the offer!', time: '3 h', unread: true, avatar: './ChatSidebar_img/Avatar4.png' },
    { id: 5, name: 'Carla Herwitz', message: 'YOU: Thank you for your feed...', time: '20 h', avatar: './ChatSidebar_img/Avatar5.png' },
    { id: 6, name: 'Skylar Carder', message: 'YOU: Let me know if there’s a...', time: '1 d', avatar: './ChatSidebar_img/Avatar6.png' },
    { id: 7, name: 'Leo George', message: 'Looking forward to discussin...', time: '6 d', unread: true, avatar: './ChatSidebar_img/Avatar7.png' },
    { id: 8, name: 'Miracle Lipshutz', message: "Thanks for the meeting, we’ll ...", time: '1 w', unread: true, avatar: './ChatSidebar_img/Avatar8.png' },
    { id: 9, name: 'Ahmad Vaccaro', message: 'I’ll wait for your go-ahead bef...', time: '1 y', unread: true, avatar: './ChatSidebar_img/Avatar9.png' },
  ];

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <aside className='sidebar_right'>
      <div className='sidebar_header'>
        <div className='right_title'>
          <img src='./Header_img/Ellipse.svg' />
          <span>{t("chat.messages")}</span>
        </div>
        <div className='sidebar_icons'>
          <img src='./Sidebars_img/mhorizontal.svg' />
          <img src='./Sidebars_img/edit.svg' />
          <img src='./Sidebars_img/CCD.svg' />
        </div>
      </div>

      {!showChatList && (
        <>
          <div className='sidebar_fullsearch'>
            <form role="search" className='sidebar_search'>
              <input
                name="header_search"
                type="search"
                placeholder={t("chat.searchMessages")}
              />
              <img src='./Header_img/search.svg' />
            </form>
            <img src='./Sidebars_img/Sliders.svg' />
          </div>

          <div className='sidebar_messagebox'>
            <div className='messagebox_btn'>
              <button className={active === 1 ? 'active' : ''} onClick={() => setActive(1)}>
                {t("chat.sorted")}
              </button>
              <button className={active === 0 ? 'active' : ''} onClick={() => setActive(0)}>
                {t("chat.other")}
              </button>
            </div>

            <div className='fullmessagebox'>
              <img src='./Sidebars_img/Mail.png' />
              <div className='fullmessagebox_info'>
                <span className='title'>{t("chat.noMessages")}</span>
                <span>{t("chat.contactMember")}</span>
                <button onClick={() => setShowChatList(true)}>{t("chat.sendMessage")}</button>
              </div>
            </div>
          </div>
        </>
      )}

      {showChatList && (
        <div className='SendMessageTo'>
          <div className='SendMessageTo_title'>{t("chat.newMessage")}</div>
          <form role="search" className='sidebar_search'>
            <input
              name="header_search"
              type="search"
              placeholder={t("chat.keepName")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
          <div className='SendMessageTo_subtitle'>{t("chat.recommended")}</div>
          <ul className="chat-list">
            {filteredChats.slice(1, 4).map((chat) => (
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
                  <div className="chat-time">{chat.time}</div>
                  {chat.unread && <div className="unread-dot"></div>}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </aside>
  );
}

export function Sidebar_ChatM() {
  const { t } = useTranslation();
  return (
    <div className="profile-card1">
      <img src="./ChatSidebar_img/Avatar1.png" alt="avatar" className="profile-avatar1" />
      <h2 className="profile-name1">Marcus Dias</h2>
      <div className="profile-info1">
        <p className="label1">{t("profile.phone")}</p>
        <p className="value1">+880 789 569 895</p>
        <p className="label1">{t("profile.email")}</p>
        <p className="value1">MarcusAntonioDias@gmail.com</p>
        <p className="label1">{t("profile.position")}</p>
        <p
          className="value1"
          dangerouslySetInnerHTML={{ __html: t("profile.positionDetails") }}
        />

        <p className="label1">{t("profile.education")}</p>
        <p
          className="value1"
          dangerouslySetInnerHTML={{ __html: t("profile.educationDetails") }}
        />
        <p className="label1">{t("profile.birthDate")}</p>
        <p className="value1">{t("profile.birthDateValue")}</p>
        <p className="label1">{t("profile.website")}</p>
        <p className="value1">www.marcusdias.com</p>
      </div>
    </div>
  );
}
