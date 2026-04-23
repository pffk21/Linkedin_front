import './Footer.css'
import { useTranslation } from 'react-i18next';

export function Footer({ shadow = false }) {
  const { t, i18n } = useTranslation();
  const footer = shadow ? "footer footer-shadow" : "footer";

  const handleChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <footer className={footer}>
      <div className='footer_info'>
        <ul className="footer_column">
          <li>{t("footer.generalInfo")}</li>
          <li>{t("footer.careers")}</li>
          <li>{t("footer.adSettings")}</li>
          <li>{t("footer.securityCenter")}</li>
        </ul>
        <ul className="footer_column">
          <li>{t("footer.accessibility")}</li>
          <li>{t("footer.privacy")}</li>
          <li>{t("footer.mobile")}</li>
        </ul>
        <ul className="footer_column">
          <li>{t("footer.policies")}</li>
          <li>{t("footer.sales")}</li>
          <li>{t("footer.ads")}</li>
        </ul>
      </div>

      <div className='footer_settings'>
        <div className='footer_set'>
          <img src='Footer_img/Question.svg' alt='Question'/>
          <div className='footer_set_text'>
            <span><strong>{t("footer.questionTitle")}</strong></span>
            <span>{t("footer.questionText")}</span>
          </div>
        </div>
        <div className='footer_set'>
          <img src='Footer_img/GearSix.svg' alt='GearSix' />
          <div className='footer_set_text'>
            <span><strong>{t("footer.manageTitle")}</strong></span>
            <span>{t("footer.manageText")}</span>
          </div>
        </div>
        <div className='footer_set'>
          <img src='Footer_img/ShieldCheck.svg' alt='ShieldCheck'/>
          <div className='footer_set_text'>
            <span><strong>{t("footer.recommendTitle")}</strong></span>
            <span>{t("footer.recommendText")}</span>
          </div>
        </div>
      </div>

      <form className="footer_form">
        <label htmlFor="language-select">{t("footer.language")}:</label>
        <select
          name="language"
          id="language-select"
          onChange={handleChange}
          value={i18n.language}
        >
          <option value="en">English</option>
          <option value="uk">Українська</option>
          <option value="pl">Polski</option>
          <option value="de">Deutsch</option>
        </select>
      </form>
    </footer>
  );
}
