import React, { useState } from 'react';
import './AddExperience.css';

function AddExperience({ isOpen, onClose }) {
  const [form, setForm] = useState({
    name: '',
    organization: '',
    monthStart: '',
    yearStart: '',
    monthEnd: '',
    yearEnd: '',
    accreditationId: '',
    url: '',
  });
  const [errors, setErrors] = useState({});
  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!form.name || form.name.length < 3) {
      newErrors.name = 'Name must be at least 3 characters long';
    }
    if (!form.organization || form.organization.length < 2) {
      newErrors.organization = 'Organization must be at least 2 characters';
    }

    const yearStart = parseInt(form.yearStart);
    if (form.yearStart && (isNaN(yearStart) || yearStart < 1925 || yearStart > 2025)) {
      newErrors.yearStart = 'Year must be between 1925 and 2025';
    }

    const monthStart = parseInt(form.monthStart);
    if (form.monthStart && (isNaN(monthStart) || monthStart < 1 || monthStart > 12)) {
      newErrors.monthStart = 'Month must be between 1 and 12';
    }

    const yearEnd = parseInt(form.yearEnd);
    if (form.yearEnd && (isNaN(yearEnd) || yearEnd < 1925 || yearEnd > 2025)) {
      newErrors.yearEnd = 'Year must be between 1925 and 2025';
    }

    const monthEnd = parseInt(form.monthEnd);
    if (form.monthEnd && (isNaN(monthEnd) || monthEnd < 1 || monthEnd > 12)) {
      newErrors.monthEnd = 'Month must be between 1 and 12';
    }

    if (!newErrors.yearStart && !newErrors.yearEnd && !newErrors.monthStart && !newErrors.monthEnd) {
      if (yearEnd < yearStart || (yearEnd === yearStart && monthEnd < monthStart)) {
        newErrors.yearEnd = 'End date must be after start date';
      }
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      console.log('Form data:', form);
      onClose();
    }
  };
 
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close_btn" onClick={onClose}>✕</button>
        <h2>Adding a license or certificate</h2>
        <hr />
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-note">Mandatory field</div>

          <label>
            Name *
            <input
              type="text"
              name="name"
              placeholder="Name: for example microsoft certification"
              value={form.name}
              onChange={handleChange}
              required
              className={errors.name ? 'error-input' : ''}
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </label>

          <label>
            Organization that issued the certificate *
            <input
              type="text"
              name="organization"
              placeholder="For example: Microsoft"
              value={form.organization}
              onChange={handleChange}
              required
              className={errors.organization ? 'error-input' : ''}
            />
            {errors.organization && <span className="error">{errors.organization}</span>}
          </label>

          <div className="row">
            <label>
              Date of issue
              <div className="input-wrapper">
                <input
                  type="text"
                  name="monthStart"
                  placeholder="Month"
                  value={form.monthStart}
                  onChange={handleChange}
                  className={errors.monthStart ? 'error-input' : ''}
                />
                {!errors.monthStart && (
                  <img src="./Modals_img/CaretCircleDown.png" alt="icon" className="input-icon" />
                )}
              </div>
              {errors.monthStart && <span className="error">{errors.monthStart}</span>}
            </label>

            <label>
              Date of issue
              <div className="input-wrapper">
                <input
                  type="text"
                  name="yearStart"
                  placeholder="Year"
                  value={form.yearStart}
                  onChange={handleChange}
                  className={errors.yearStart ? 'error-input' : ''}
                />
                {!errors.yearStart && (
                  <img src="./Modals_img/CaretCircleDown.png" alt="icon" className="input-icon" />
                )}
              </div>
              {errors.yearStart && <span className="error">{errors.yearStart}</span>}
            </label>
          </div>

          <div className="row">
            <label>
              Expiry date
              <div className="input-wrapper">
                <input
                  type="text"
                  name="monthEnd"
                  placeholder="Month"
                  value={form.monthEnd}
                  onChange={handleChange}
                  className={errors.monthEnd ? 'error-input' : ''}
                />
                {!errors.monthEnd && (
                  <img src="./Modals_img/CaretCircleDown.png" alt="icon" className="input-icon" />
                )}
              </div>
              {errors.monthEnd && <span className="error">{errors.monthEnd}</span>}
            </label>

            <label>
              Expiry date
              <div className="input-wrapper">
                <input
                  type="text"
                  name="yearEnd"
                  placeholder="Year"
                  value={form.yearEnd}
                  onChange={handleChange}
                  className={errors.yearEnd ? 'error-input' : ''}
                />
                {!errors.yearEnd && (
                  <img src="./Modals_img/CaretCircleDown.png" alt="icon" className="input-icon" />
                )}
              </div>
              {errors.yearEnd && <span className="error">{errors.yearEnd}</span>}
            </label>
          </div>

          <label>
            Accreditation ID
            <input
              type="text"
              name="accreditationId"
              value={form.accreditationId}
              onChange={handleChange}
            />
          </label>

          <label>
            URL - organization address
            <input
              type="text"
              name="url"
              value={form.url}
              onChange={handleChange}
            />
          </label>

          <p className="skills">Skills</p>
          <p>Link at least 1 skill to this license or certificate. It will also appear in the Skills section of your profile.</p>

          <button type="submit" className="save-btn">Save</button>
        </form>
      </div>
    </div>
  );
}

export default AddExperience;
