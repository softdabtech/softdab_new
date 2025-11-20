import React, { useEffect, useRef } from 'react';
import './CodeFlowBackground.css';

/**
 * CodeFlowBackground - Subtle animated background for hero sections
 * Represents software development through floating code symbols and connecting lines
 * Optimized for performance with CSS animations and minimal DOM elements
 */
const CodeFlowBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle class for floating nodes
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.radius = Math.random() * 2 + 1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Wrap around edges
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(47, 137, 252, 0.3)'; // SoftDAB primary blue
        ctx.fill();
      }
    }

    // Initialize particles (fewer for better performance)
    const particleCount = Math.min(50, Math.floor(canvas.width / 30));
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Draw connecting lines between nearby particles
    const drawConnections = () => {
      const maxDistance = 150;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            const opacity = (1 - distance / maxDistance) * 0.2;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(47, 137, 252, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      drawConnections();

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="code-flow-background">
      {/* Canvas for connecting lines */}
      <canvas ref={canvasRef} className="code-flow-canvas" />

      {/* Floating code symbols (CSS animated) */}
      <div className="code-symbols">
        <span className="code-symbol" style={{ left: '10%', animationDelay: '0s' }}>&lt;/&gt;</span>
        <span className="code-symbol" style={{ left: '25%', animationDelay: '3s' }}>{'{ }'}</span>
        <span className="code-symbol" style={{ left: '45%', animationDelay: '6s' }}>[ ]</span>
        <span className="code-symbol" style={{ left: '60%', animationDelay: '9s' }}>=&gt;</span>
        <span className="code-symbol" style={{ left: '75%', animationDelay: '12s' }}>( )</span>
        <span className="code-symbol" style={{ left: '90%', animationDelay: '15s' }}>;</span>
        <span className="code-symbol" style={{ left: '35%', animationDelay: '18s' }}>∞</span>
        <span className="code-symbol" style={{ left: '85%', animationDelay: '21s' }}>λ</span>
      </div>

      {/* Subtle grid overlay */}
      <div className="grid-overlay" />
    </div>
  );
};

export default CodeFlowBackground;
