import React, { useEffect } from 'react';
import './Alert.css';

export function Alert({ message, type = 'error', onClose, duration = 4000 }) {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [message, onClose, duration]);

  if (!message) return null;

  return (
    <div className={`alert-toast ${type}`}>
      <div className="alert-content">
        <span className="alert-icon">
          {type === 'error' ? '⚠️' : '✅'}
        </span>
        <span className="alert-text">{message}</span>
        <button className="alert-close" onClick={onClose}>&times;</button>
      </div>
      <div className="progress-bar" style={{ animationDuration: `${duration}ms` }}></div>
    </div>
  );
}