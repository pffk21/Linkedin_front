import React, { useRef, useState } from 'react';
import './Verification.css';
import { useNavigate } from 'react-router-dom';

export function EntranceVerification({ onSubmit, onBack }) {
  const navigate = useNavigate(); 
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

  const handleBackEntrance = () => {
    navigate('/entrance');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fullCode = code.join('');
    if (fullCode.length === 5) {
      console.log('Code submitted:', fullCode);
      onSubmit?.(fullCode);
    } else {
      alert('Please enter the full 5-digit code');
    }
    navigate('/');
  };

  return (
    <div className="logo-container1">
      <img src="./Form_img/Logo.png" alt="Logo" className="form-logo1" />
    <div className="verification-container1">
      <h3>One last step</h3>
      <h2>enter the authentication code</h2>

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

        <button type="button" className="back-btn1" onClick={handleBackEntrance}>Back</button>
      </form>
    </div>
    </div>
  );
}
