import React, { useContext, useRef, useState } from 'react';
import './Verification.css';
import { useNavigate } from 'react-router-dom';
import AppContext from '../AppContext';

export function Verification({ onSubmit, onBack }) {
  const navigate = useNavigate(); 

  const {backUrl} = useContext(AppContext);

  const inputs = useRef([]);
  const [code, setCode] = useState(Array(5).fill(''));

  const handleChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 4) {
      inputs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const handleBackRegistration = () => {
    navigate('/registration');
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const fullCode = code.join(''); 

  if (fullCode.length !== 5) {
    alert('Please enter the full 5-digit code');
    return;
  }

  const email = localStorage.getItem("pendingEmail");

  try {
    const response = await fetch(backUrl + "/api/user/verification", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email, 
        code: fullCode
      })
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Verification successful:", data.status);
      localStorage.removeItem("pendingEmail");
      navigate("/entrance");
    } else {
      const error = await response.json();
      console.error("Verification error:", error.message);
      console.log("email: ", email);
      console.log("code: ", fullCode);
      alert(error.message);
    }
    } catch (err) {
      console.error("Unexpected error:", err);
      console.log("email: ", email);
      console.log("code: ", fullCode);
      alert("Something went wrong. Try again later.");
    }

    onSubmit?.(fullCode);
  };


  return (
    <div className="logo-container1">
      <img src="./Form_img/Logo.png" alt="Logo" className="form-logo1" />
    <div className="verification-container1">
      <h3>One last step</h3>
      <h2>enter the verification code</h2>

      <form onSubmit={handleSubmit} className="code-form1">
        <div className="code-inputs1">
          {code.map((digit, idx) => (
            <input
              key={idx}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(idx, e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              ref={(el) => (inputs.current[idx] = el)}
            />
          ))}
        </div>

        <button type="submit" className="submit-btn1">Submit</button>

        <p className="resend-text1">
          Didn’t receive the code?{' '}
          <button type="button" className="resend-btn1">Send the code again</button>
        </p>

        <button type="button" className="back-btn1" onClick={handleBackRegistration}>Back</button>
      </form>
    </div>
    </div>
  );
}
