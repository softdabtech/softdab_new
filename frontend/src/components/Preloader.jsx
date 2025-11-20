import React, { useEffect, useState } from 'react';
import './Preloader.css';

const Preloader = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Hide preloader after 2 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
      // Call onComplete callback after fade out animation
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 500); // Match CSS transition duration
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div className={`preloader ${!isVisible ? 'fade-out' : ''}`}>
      <div className="preloader-content">
        {/* Animated Logo */}
        <div className="preloader-logo">
          <svg
            viewBox="0 0 200 60"
            className="logo-svg"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* S */}
            <path
              className="letter letter-1"
              d="M 20 15 Q 15 15 15 20 Q 15 25 20 25 L 35 25 Q 40 25 40 30 Q 40 35 35 35 L 15 35"
              fill="none"
              stroke="#2F89FC"
              strokeWidth="3"
              strokeLinecap="round"
            />
            
            {/* o */}
            <circle
              className="letter letter-2"
              cx="55"
              cy="25"
              r="10"
              fill="none"
              stroke="#2F89FC"
              strokeWidth="3"
            />
            
            {/* f */}
            <path
              className="letter letter-3"
              d="M 75 35 L 75 15 L 85 15"
              fill="none"
              stroke="#2F89FC"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <line
              className="letter letter-3"
              x1="72"
              y1="23"
              x2="83"
              y2="23"
              stroke="#2F89FC"
              strokeWidth="3"
              strokeLinecap="round"
            />
            
            {/* t */}
            <path
              className="letter letter-4"
              d="M 95 35 L 95 18 L 105 18"
              fill="none"
              stroke="#2F89FC"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <line
              className="letter letter-4"
              x1="92"
              y1="23"
              x2="103"
              y2="23"
              stroke="#2F89FC"
              strokeWidth="3"
              strokeLinecap="round"
            />
            
            {/* D */}
            <path
              className="letter letter-5"
              d="M 115 15 L 115 35 M 115 15 Q 130 15 130 25 Q 130 35 115 35"
              fill="none"
              stroke="#2F89FC"
              strokeWidth="3"
              strokeLinecap="round"
            />
            
            {/* A */}
            <path
              className="letter letter-6"
              d="M 140 35 L 147.5 15 L 155 35"
              fill="none"
              stroke="#2F89FC"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <line
              className="letter letter-6"
              x1="143"
              y1="27"
              x2="152"
              y2="27"
              stroke="#2F89FC"
              strokeWidth="3"
              strokeLinecap="round"
            />
            
            {/* B */}
            <path
              className="letter letter-7"
              d="M 165 15 L 165 35 M 165 15 Q 175 15 175 20 Q 175 25 165 25 Q 180 25 180 30 Q 180 35 165 35"
              fill="none"
              stroke="#2F89FC"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Loading Bar */}
        <div className="loading-bar">
          <div className="loading-progress"></div>
        </div>

        {/* Pulse Circles */}
        <div className="pulse-container">
          <div className="pulse pulse-1"></div>
          <div className="pulse pulse-2"></div>
          <div className="pulse pulse-3"></div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
