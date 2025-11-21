import React, { useEffect, useState } from 'react';
import './Preloader.css';

// Sequence timings (ms)
const LOGO_PHASE = 2000; // logo only
const WORDS_PHASE = 1200; // words staggered (each 400ms)
const HOLD_AFTER_WORDS = 400; // pause before dissolve
const DISSOLVE_PHASE = 1200; // dissolve animation duration matches CSS

const Preloader = ({ onComplete }) => {
  const [phase, setPhase] = useState('logo'); // 'logo' | 'words' | 'dissolve' | 'done'
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    const timers = [];
    // Switch to words
    timers.push(setTimeout(() => setPhase('words'), LOGO_PHASE));
    // Switch to dissolve
    timers.push(setTimeout(() => setPhase('dissolve'), LOGO_PHASE + WORDS_PHASE + HOLD_AFTER_WORDS));
    // Finish and unmount
    timers.push(setTimeout(() => {
      setPhase('done');
      setMounted(false);
      if (onComplete) onComplete();
    }, LOGO_PHASE + WORDS_PHASE + HOLD_AFTER_WORDS + DISSOLVE_PHASE));

    return () => timers.forEach(t => clearTimeout(t));
  }, [onComplete]);

  if (!mounted) return null;

  return (
    <div className={`preloader phase-${phase} ${phase === 'dissolve' ? 'dissolve' : ''}`}>
      {/* Liquid Gradients */}
      <div className="gradient-bg">
        <div className="blob"></div>
        <div className="blob"></div>
        <div className="blob"></div>
      </div>

      {/* Overlay (fades during dissolve) */}
      <div className="overlay"></div>

      {/* Decorative Circles */}
      <div className="deco-circle"></div>
      <div className="deco-circle"></div>

      {/* Logo & Words */}
      <div className="logo-container">
        <div className="logo">SOFTDAB</div>
        <div className="words">
          <span className="word word-1">Innovate</span>
          <span className="word word-2">Build</span>
          <span className="word word-3">Scale</span>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
