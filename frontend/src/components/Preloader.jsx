import React, { useEffect, useState } from 'react';
import './Preloader.css';

const Preloader = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Hide preloader after 3 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
      // Call onComplete callback after fade out animation (1 second)
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 1000);
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className={`preloader ${!isVisible ? 'fade-out' : ''}`}>
      {/* Liquid Gradients */}
      <div className="gradient-bg">
        <div className="blob"></div>
        <div className="blob"></div>
        <div className="blob"></div>
      </div>

      {/* Overlay */}
      <div className="overlay"></div>

      {/* Decorative Circles */}
      <div className="deco-circle"></div>
      <div className="deco-circle"></div>

      {/* Logo */}
      <div className="logo-container">
        <div className="logo">SOFTDAB</div>
        <div className="tagline">Innovate • Build • Scale</div>
      </div>
    </div>
  );
};

export default Preloader;
