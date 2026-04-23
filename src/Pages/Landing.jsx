import { useContext, useState } from 'react';
import './Landing.css';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AppContext from '../AppContext';

export function Landing() {
  const { request, backUrl } = useContext(AppContext);
  const [text, setText] = useState([]);

  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleEntrance = () => {
    navigate('/entrance');
  };
  

  return (
    <>
      <div className='container container--landing'>
        <div className="landing-container">
          <div className="left-section">
            <h1>{t("landing.welcome")}</h1>
            <button className="google_btn" onClick={handleEntrance}>{t("landing.loginGoogle")}</button>
            <button className="email_btn" onClick={handleEntrance}>{t("landing.loginEmail")}</button>
            <p className="terms">{t("landing.terms")}</p>
            <p className="join-link">
              {t("landing.notMember")} <a href="#">{t("landing.join")}</a>
            </p>
          </div>
          <div className="right-section">
            <img src="./Landing_img/illustration.png" alt="Woman with laptop" />
          </div>
        </div>
      </div>

      <div className="vacancy-container">
        <div className='vacancy_main'>
          <div className="vacancy-left">
            <h2>{t("landing.findVacancy")}</h2>
          </div>
          <div className="vacancy-tags">
            {[
              t("landing.tags.engineering"),
              t("landing.tags.business"),
              t("landing.tags.finance"),
              t("landing.tags.admin"),
              t("landing.tags.retail"),
              t("landing.tags.helpdesk"),
              t("landing.tags.operations"),
              t("landing.tags.it"),
              t("landing.tags.marketing"),
              t("landing.tags.hr"),
              t("landing.tags.education"),
              t("landing.tags.sales"),
            ].map((tag, index) => (
              <span key={index} className="tag">{tag}</span>
            ))}
          </div>
        </div>
      </div>

      <div className='container container--landing'>
        <div className="discover-section">
          <div className="top-part">
            <h2>{t("landing.postVacancyTitle")}</h2>
            <button className="post-btn">{t("landing.postVacancyBtn")}</button>
          </div>

          <div className="middle-part">
            <div className="left">
              <h3>{t("landing.discoverTitle")}</h3>
              <p>{t("landing.discoverText")}</p>
            </div>
            <div className="right">
              <div className="tag-middle">{t("landing.tags.ecommerce")}</div>
              <div className="tag-middle">{t("landing.tags.recruiting")}</div>
              <div className="tag-middle">{t("landing.tags.crm")}</div>
              <div className="tag-middle">{t("landing.tags.social")}</div>
              <div className="tag-middle">{t("landing.tags.hrSystems")}</div>
              <div className="tag-middle">{t("landing.tags.pm")}</div>
            </div>
          </div>

          <div className="bottom-part">
            <h2>{t("landing.connectTitle")}</h2>
            <button className="login-btn" onClick={handleEntrance}>{t("landing.login")}</button>
          </div>
        </div>
      </div>
    </>
  );
}
