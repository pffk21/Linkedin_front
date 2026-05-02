import React, { useState, useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import AddExperience from "../Modals/AddExperience";
import "./MyProfilePortfolio.css";
import AppContext from '../AppContext';


export function MyProfilePortfolio() {
  const { t } = useTranslation();
  const [modalOpen, setModalOpen] = useState(false);
  const [showFullImage, setShowFullImage] = useState(false);

  const { backUrl, user, token, request } = useContext(AppContext);

  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) {
        setIsLoading(false);
        return; 
    }

    const fetchProfile = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await request('/api/user/info');
        
        const actualData = response?.data || response?.Data;
        if (actualData) {
          setProfileData(actualData);
        }
      } catch (err) {
        console.log("Данные пойманы в catch:", err);

        const recoveredData = err?.data || err?.Data;

        if (recoveredData) {
          setProfileData(recoveredData);
          setError(null); 
        } else {
          setError(err.message || "Ошибка загрузки");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [token, request]);

  const handlePhotoClick = (e) => {
    if (e.target.className === 'overlay') {
      setShowFullImage(false);
    }
  };
  const FALLBACK_PHOTO_URL = './Header_img/Ellipse.svg';
  let photoSrc = FALLBACK_PHOTO_URL;
  
  // Берем путь, который уже содержит /Storage/Item/ (с бэкенда)
  const avatarPath = profileData?.avatarPhoto || profileData?.AvatarPhoto; 

  if (avatarPath) {
      const baseUrl = backUrl ? backUrl.replace(/\/$/, '') : ''; 
      
      // Если это локальная заглушка или внешний сайт
      if (avatarPath.startsWith('http') || avatarPath.startsWith('./')) {
          photoSrc = avatarPath;
      } else {
          // Бэкенд уже собрал путь, просто клеим к localhost!
          photoSrc = `${baseUrl}${avatarPath}`;
      }
  }

  const handleImageError = (e) => {
      if (!e.target.src.includes('Ellipse.svg')) {
          e.target.src = FALLBACK_PHOTO_URL;
      }
  };
  const userName = profileData?.name || profileData?.Name || t("profilePage.name"); 
  const userRole = profileData?.aboitSection || profileData?.AboitSection || t("profilePage.role");
  const userLocation = profileData?.location || profileData?.Location || t("profilePage.location");

  return (
    <div className="main-wrapper">
      <div className="card1">
        <div className="card1-top">
          <div className="banner">
            <div className="camera">
              <img src="./MyProfilePortfolio_img/2.png" alt="camera" />
            </div>
          </div>
          <div className="profile-img">
            <img src={photoSrc} alt="profile" onError={handleImageError} />
          </div>
          <div className="karandash">
            <img src="./MyProfilePortfolio_img/3.png" alt="edit" />
          </div>
          <div className="card1-body">
            <div className="user-info">
              {/* Выводим динамические данные вместо статичных переводов */}
              <h2>{userName}</h2>
              <p className="job-title">{userRole}</p>
              <p className="location">{userLocation}</p>
              
              <a href="#" className="profile-link">
                {t("profilePage.changeLink")}
              </a>
              <a href="#" className="edit-contact">{t("profilePage.editContact")}</a>
              <div className="btn-group">
                <button className="open-btn">{t("profilePage.openTo")}</button>
                <button className="add-btn">{t("profilePage.addSection")}</button>
                <button className="more-btn">{t("profilePage.more")}</button>
                <div className="badge">
                  <img src="./MyProfilePortfolio_img/4.png" alt="badge" />
                  <span>UCLA (Design Media Arts)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Analytics */}
      <div className="analytics">
        <h3>{t("profilePage.analytics")}</h3>
        <p className="private">
          <img src="./MyProfilePortfolio_img/5.png" className="eye-icon" />
          {t("profilePage.onlyYou")}
        </p>
        <div className="stats">
          <div className="stat">
            <img src="./MyProfilePortfolio_img/users.png" />
            <div>
              <p className="count purple">{t("profilePage.profileViews")}</p>
              <p className="desc">{t("profilePage.updateProfile")}</p>
            </div>
          </div>
          <div className="stat">
            <img src="./MyProfilePortfolio_img/6.png" />
            <div>
              <p className="count purple">{t("profilePage.postViews")}</p>
              <p className="desc">{t("profilePage.startPost")}</p>
            </div>
          </div>
        </div>
        <div className="analytics-button-wrapper">
          <button  className="show-analytics" onClick={() => setShowFullImage(true)}>
              {t("profilePage.showAnalytics")}
            <img src="./MyProfilePortfolio_img/7.png" className="arrow-icon" alt="arrow" />
          </button>
        </div>
        {showFullImage && (
        <div className="overlay" onClick={handlePhotoClick}>
          <img src="./MyProfilePortfolio_img/Analitic.jpg" className="modal-image" />
        </div>
        )}
      </div>

      {/* Experience */}
      <div className="experience-box">
        <div className="experience-header">
          <h3>{t("profilePage.experience")}</h3>
          <p>{t("profilePage.experienceText")}</p>
          <button className="close-btn">
            <img src="./MyProfilePortfolio_img/Close.png" alt="close" className="close-icon" />
          </button>
        </div>

        <div className="experience-item">
          <img src="./MyProfilePortfolio_img/Position.png" alt="icon" className="experience-icon" />
          <div className="experience-info">
            <p className="position-title">{t("profilePage.position")}</p>
            <p className="org-name">{t("profilePage.organization")}</p>
            <p className="duration">{t("profilePage.duration")}</p>
          </div>
        </div>

        <button className="add-experience-btn" onClick={() => setModalOpen(true)}>
          {t("profilePage.addExperience")}
        </button>

        <AddExperience isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      </div>

      {/* Education */}
      <div className="education-box">
        <div className="education-header">
          <h3>{t("profilePage.education")}</h3>
          <div className="education-icons">
            <img src="./MyProfilePortfolio_img/Plus.png" alt="Add" />
            <img src="./MyProfilePortfolio_img/edit.png" alt="Edit" />
          </div>
        </div>

        <div className="education-content">
          <img src="./MyProfilePortfolio_img/image.png" alt="UCLA" className="education-logo" />
          <div className="education-details">
            <p className="edu-name"><strong>{t("profilePage.university")}</strong></p>
            <p className="edu-years">{t("profilePage.eduYears")}</p>
          </div>
        </div>
      </div>

      {/* Skills */}
      <div className="skills-box">
        <div className="skills-header">
          <div>
            <h3>{t("profilePage.skills")}</h3>
            <p className="skills-desc">{t("profilePage.skillsDesc")}</p>
          </div>
          <button className="close-btn">
            <img src="./MyProfilePortfolio_img/Close.png" alt="close" />
          </button>
        </div>

        <div className="skills-list">
          <p className="skill-title">{t("profilePage.communication")}</p>
          <hr />
          <p className="skill-title2">{t("profilePage.technical")}</p>
        </div>

        <button className="add-skills-btn">{t("profilePage.addSkills")}</button>
      </div>
    </div>
  );
}
