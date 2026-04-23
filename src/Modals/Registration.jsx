import React, { useContext, useEffect, useState } from 'react';
import './Registration.css';
import { useNavigate } from 'react-router-dom';
import AppContext from '../AppContext';

export function Registration({ onSuccess, onSwitchToSignIn }) {
  const navigate = useNavigate();
  const { request, backUrl } = useContext(AppContext);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    workingPlace: '',
    location: '',
    birthDate: '',
    profileImageUrl: null,
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const validate = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email or phone is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email) && !/^\+?\d{10,}$/.test(formData.email)) {
      newErrors.email = 'Enter valid email or phone number';
    }

    if (!formData.firstName.trim()) newErrors.firstName = 'First Name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last Name is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (!formData.confirmPassword) newErrors.confirmPassword = 'Confirm Password is required';
    if (!formData.profileImageUrl) newErrors.profileImageUrl = 'Profile image is required';

    const passwordRequirements = [
      { test: /.{8,}/, message: 'Password must be at least 8 characters' },
      { test: /[A-Z]/, message: 'Password must contain at least one uppercase letter' },
      { test: /[0-9]/, message: 'Password must contain at least one digit' },
      { test: /[^A-Za-z0-9]/, message: 'Password must contain at least one special character' }
    ];

    for (const req of passwordRequirements) {
      if (!req.test.test(formData.password)) {
        newErrors.password = req.message;
        break;
      }
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };


  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, profileImageUrl: e.target.files[0] }));
  };

  const handleEntrance = () => navigate('/entrance');


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    localStorage.setItem("pendingEmail", formData.email);

    const dataToSend = new FormData(e.target);

    fetch(backUrl + "/api/user/registration", {
      method: "POST",
      body: dataToSend
    })
      .then(response => {
        if (!response.ok) {
          return response.text().then(text => {
            throw new Error(text);
          });
        }
        return response.json();
      })
      .then(data => {
        console.log("Status:", data.Status);
        navigate("/verification");
      })
      .catch(err => {
        console.error(err);
        alert(err.message);
      });
  };

  return (
    <div className="logo-container1">
      <img src="./Form_img/Logo.png" alt="Logo" className="form-logo1" />
      <div className="form-container">
        <h2 className="welcome-text1">
          Welcome to your<br /><span className="community-text1">professional community</span>
        </h2>
        <form onSubmit={handleSubmit} noValidate>

          <div className="input-group1">
            <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} />
            {errors.firstName && <p className="error1">{errors.firstName}</p>}
          </div>

          <div className="input-group1">
            <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} />
            {errors.lastName && <p className="error1">{errors.lastName}</p>}
          </div>

          <div className="input-group1">
            <input type="text" name="email" placeholder="Email or phone number" value={formData.email} onChange={handleChange}/>
            {errors.email && <p className="error1">{errors.email}</p>}
          </div>

          <div className="input-group1">
            <input type="text" name="workingPlace" placeholder="Working Place" value={formData.workingPlace} onChange={handleChange} />
          </div>

          <div className="input-group1">
            <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} />
          </div>

          <div className="input-group1">
            <input type="date" name="birthDate" value={formData.birthDate} onChange={handleChange} />
          </div>

          <div className="input-group1">
            <input type="file" name="profileImageUrl" onChange={handleFileChange} />
            {errors.profileImageUrl && <p className="error1">{errors.profileImageUrl}</p>}
          </div>

          <div className="input-group1">
            <input type={showPassword ? 'text' : 'password'} name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
            <span className="icon-right1" onClick={() => setShowPassword(!showPassword)}>
              <img src={showPassword ? "./Form_img/EyeSlash.png" : "./Form_img/eye.png"} alt="toggle visibility" />
            </span>
            {errors.password && <p className="error1">{errors.password}</p>}
          </div>

          <div className="input-group1">
            <input type={showConfirm ? 'text' : 'password'} name="confirmPassword" placeholder="Confirm password" value={formData.confirmPassword} onChange={handleChange} />
            <span className="icon-right1" onClick={() => setShowConfirm(!showConfirm)}>
              <img src={showConfirm ? "./Form_img/EyeSlash.png" : "./Form_img/eye.png"} alt="toggle visibility" />
            </span>
            {errors.confirmPassword && <p className="error1">{errors.confirmPassword}</p>}
          </div>

          <button type="submit" className="signup-btn1">Sign Up</button>

          <p className="terms1">
            By Signing Up, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
          </p>

          <div className="divider1"><span>or</span></div>

          <button type="button" className="google-btn1">
            <img src="./Form_img/Google.png" alt="Google Logo" /> Continue with Google
          </button>

          <button type="button" className="signin-btn1" onClick={handleEntrance}>
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}