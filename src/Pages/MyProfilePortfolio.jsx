import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import AddExperience from "../Modals/AddExperience";
import "./MyProfilePortfolio.css";

export function MyProfilePortfolio() {
  const { t } = useTranslation();
  const [modalOpen, setModalOpen] = useState(false);
  const [showFullImage, setShowFullImage] = useState(false);

  const handlePhotoClick = (e) => {
    if (e.target.className === 'overlay') {
      setShowFullImage(false);
    }
  };

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
            <img src="./MyProfilePortfolio_img/1.jpg" alt="profile" />
          </div>
          <div className="karandash">
            <img src="./MyProfilePortfolio_img/3.png" alt="edit" />
          </div>
          <div className="card1-body">
            <div className="user-info">
              <h2>{t("profilePage.name")}</h2>
              <p className="job-title">{t("profilePage.role")}</p>
              <p className="location">{t("profilePage.location")}</p>
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
