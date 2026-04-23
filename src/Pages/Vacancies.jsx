import './Vacancies.css'
import { useTranslation } from 'react-i18next';

export function Vacancies() {
  const { t } = useTranslation();

  const tags = [
    "marketingManager",
    "hr",
    "legal",
    "sales",
    "google",
    "analyst",
    "amazon"
  ];

  return (
    <div className="central-container2">
      <div className="section2">
        <h3 className="section-title2">{t("vacancies.bestSelection")}</h3>
        <p className="subtitle22">{t("vacancies.subtitle")}</p>
        <JobCard
          logoPath="./Vacancies_img/Company_logo1.png"
          company={t("vacancies.companies.walmart")}
          location={t("vacancies.locations.denison")}
          salary="14$/year - 22$/year"
        />
        <JobCard
          logoPath="./Vacancies_img/Company_logo2.png"
          company={t("vacancies.companies.walmart")}
          location={t("vacancies.locations.lasVegas")}
          salary="15$/year - 21$/year"
        />
        <JobCard
          logoPath="./Vacancies_img/Company_logo3.png"
          company={t("vacancies.companies.varsity")}
          location={t("vacancies.locations.varsityRemote")}
          salary="20$/year - 28$/year"
        />
        <a href="#" className="show-all2">{t("vacancies.showAll")}</a>
      </div>

      <div className="section2">
        <h4 className="section-subtitle2">{t("vacancies.recommendedQueries")}</h4>
        <div className="tags2">
          {tags.map((tag, i) => (
            <button key={i} className="tag-btn2">
              <svg className="tag-icon2" width="24" height="24" viewBox="0 0 24 24" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M21 21L15.8 15.8M17 10.5C17 14.0899 14.0899 17 10.5 17C6.91015 17 4 14.0899 4 10.5C4 6.91015 6.91015 4 10.5 4C14.0899 4 17 6.91015 17 10.5Z"
                  stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {t(`vacancies.tags.${tag}`)}
            </button>
          ))}
        </div>
      </div>

      <div className="section2">
        <h4 className="section-subtitle2">{t("vacancies.designerTitle")}</h4>
        <p className="subtitle22">{t("vacancies.designerSubtitle")}</p>
        <JobCard
          logoPath="./Vacancies_img/Company_logo4.png"
          company={t("vacancies.companies.dribbble")}
          location={t("vacancies.locations.dribbbleRemote")}
          hideMeta={true}
        />
        <JobCard
          logoPath="./Vacancies_img/Company_logo5.png"
          company={t("vacancies.companies.freshworks")}
          location={t("vacancies.locations.freshworksRemote")}
          hideMeta={true}
        />
        <a href="#" className="show-all2">{t("vacancies.showAll")}</a>
      </div>
    </div>
  );
}

function JobCard({ logoPath, company, location, salary, hideMeta }) {
  const { t } = useTranslation();

  return (
    <div className="job-card2">
      <div className="logo-and-info2">
        {logoPath && <img src={logoPath} alt={`${company} logo`} className="company-logo2" />}
        <div className="job-info2">
          <p className="subtitle2">{location}</p>
          {salary && <p className="salary2">{salary}</p>}
          {!hideMeta && (
            <p className="meta2">
              {t("vacancies.meta")} – <a href="#">{t("vacancies.candidates")}</a>
            </p>
          )}
        </div>
      </div>
      <button className="close-btn2">
        <svg className="close-icon2" width="24" height="24" viewBox="0 0 24 24" fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path d="M6 6L18 18M6 18L18 6" stroke="black" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}
