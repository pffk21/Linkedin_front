import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import "./Header.css"
import { useContext } from 'react';
import AppContext from '../AppContext';

export function Header({ maximal = false }) {
  const navigate = useNavigate(); 
  const { t } = useTranslation();

  const {user, backUrl} = useContext(AppContext); 

  const FALLBACK_PHOTO_URL = './Header_img/Ellipse.svg';
  let photoSrc = FALLBACK_PHOTO_URL;
  const avatar = user?.avatarPhoto || user?.AvatarPhoto;

  if (avatar) {
    const baseUrl = backUrl ? backUrl.replace(/\/$/, '') : '';
    if (avatar.startsWith('http') || avatar.startsWith('./')) {
      photoSrc = avatar;
    } else if (!avatar.includes('/')) {
      photoSrc = `${baseUrl}/Storage/Item/${avatar}`;
    } else {
      photoSrc = `${baseUrl}${avatar.startsWith('/') ? avatar : '/' + avatar}`;
    }
  }

  const handleSignIn = () => {
    navigate('/entrance'); 
  };

  const handleSignUp = () => {
    navigate('/entranceVerification');
  };

  return (
    <header>
      <div className="header_logo">
        <img src="Header_img/Logo.svg" alt="logo" />
      </div>

      {maximal ? (
        <>
          <div className="header_frame">
            <form role="search" className="header_input">
              <input
                name="header_search"
                type="search"
                placeholder={t("header.search")}
              />
              <img
                src="Header_img/search.svg"
                className="header_icon"
                alt="group"
              />
            </form>

            <nav className="header_nav">
              <NavLink to="/" className="nav-link">
                <img src="Header_img/home.svg" alt="Home" />
                <span>{t("header.home")}</span>
              </NavLink>
              <NavLink to="/network" className="nav-link">
                <img src="Header_img/users.svg" alt="Network" />
                <span>{t("header.network")}</span>
              </NavLink>
              <NavLink to="/vacancies" className="nav-link">
                <img src="Header_img/Suitcase.svg" alt="Vacancies" />
                <span>{t("header.vacancies")}</span>
              </NavLink>
              <NavLink to="/messages" className="nav-link">
                <img src="Header_img/ChatCircleDots.svg" alt="Messages" />
                <span>{t("header.messages")}</span>
              </NavLink>
              <NavLink to="/notification" className="nav-link">
                <img src="Header_img/BellRinging.svg" alt="Notification" />
                <span>{t("header.notification")}</span>
              </NavLink>
            </nav>
          </div>

          <nav className="header_iconsgroup">
            <NavLink to="/myProfilePortfolio" className="header_myprofileportfolio">
              <img 
                src={photoSrc} 
                alt="my avatar" 
                onError={(e) => {
                  if (!e.target.src.includes('Ellipse.svg')) {
                    e.target.src = FALLBACK_PHOTO_URL;
                  }
                }}
              />
              <span>{t("header.myProfile")}</span>
            </NavLink>
            <NavLink to="/Linkidin" className="header_logout">
              <img src="Header_img/LogOut.svg" alt="logout" />
            </NavLink>
          </nav>
        </>
      ) : (
        <div className='header_btn'>
          <button onClick={handleSignIn} className="btn_sing">
            {t("header.signIn")}
          </button>
          <button onClick={handleSignUp} className="btn_sing">
            {t("header.signUp")}
          </button>
        </div>
      )}
    </header>
  );
}
