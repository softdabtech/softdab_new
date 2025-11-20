import React, { useEffect, useRef } from 'react';
import './CodeFlowBackground.css';

/**
 * CodeFlowBackground - Advanced animated background with digital rain and glowing orbs
 * Creates an immersive tech atmosphere with binary streams and particle effects
 */
const CodeFlowBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let streams = [];
    let orbs = [];

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Binary stream class (digital rain effect)
    class BinaryStream {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * -canvas.height;
        this.speed = Math.random() * 2 + 1;
        this.chars = '01';
        this.fontSize = 16;
        this.length = Math.floor(Math.random() * 20) + 10;
        this.opacity = Math.random() * 0.4 + 0.4;
      }

      update() {
        this.y += this.speed;
        if (this.y > canvas.height + 100) {
          this.y = -100;
          this.x = Math.random() * canvas.width;
        }
      }

      draw() {
        ctx.font = `${this.fontSize}px monospace`;
        for (let i = 0; i < this.length; i++) {
          const char = this.chars[Math.floor(Math.random() * this.chars.length)];
          const opacity = this.opacity * (1 - i / this.length);
          ctx.fillStyle = `rgba(47, 137, 252, ${opacity})`;
          ctx.fillText(char, this.x, this.y - i * this.fontSize);
        }
      }
    }

    // Glowing orb class
    class GlowOrb {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = Math.random() * 30 + 10;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.pulse = Math.random() * Math.PI * 2;
        this.pulseSpeed = 0.02;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.pulse += this.pulseSpeed;

        // Bounce off edges
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }

      draw() {
        const pulseSize = Math.sin(this.pulse) * 8;
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.radius + pulseSize
        );
        gradient.addColorStop(0, 'rgba(47, 137, 252, 0.4)');
        gradient.addColorStop(0.5, 'rgba(47, 137, 252, 0.15)');
        gradient.addColorStop(1, 'rgba(47, 137, 252, 0)');
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius + pulseSize, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }
    }

    // Initialize effects
    const streamCount = Math.min(30, Math.floor(canvas.width / 40));
    const orbCount = Math.min(6, Math.floor(canvas.width / 300));
    
    for (let i = 0; i < streamCount; i++) {
      streams.push(new BinaryStream());
    }
    
    for (let i = 0; i < orbCount; i++) {
      orbs.push(new GlowOrb());
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw orbs first (background layer)
      orbs.forEach(orb => {
        orb.update();
        orb.draw();
      });

      // Draw binary streams
      streams.forEach(stream => {
        stream.update();
        stream.draw();
      });

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
      <canvas ref={canvasRef} className="code-flow-canvas" />
      
      {/* Animated gradient overlay */}
      <div className="gradient-orbs">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
      </div>

      {/* Pulsing grid */}
      <div className="grid-overlay" />
    </div>
  );
};

export default CodeFlowBackground;
