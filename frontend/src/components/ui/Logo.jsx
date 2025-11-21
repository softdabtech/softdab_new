import React from 'react';
import './Logo.css';

/**
 * Logo component with gradient effect matching preloader design
 * Can be used in different sizes: 'sm', 'md', 'lg'
 * Variant: 'default' (colored gradient) or 'footer' (white with subtle gradient)
 */
const Logo = ({ size = 'md', variant = 'default', className = '' }) => {
  const sizeClasses = {
    sm: 'text-xl', // 20px - for mobile or compact layouts
    md: 'text-2xl', // 24px - default for header
    lg: 'text-4xl', // 36px - for hero or featured sections
  };

  const variantClass = variant === 'footer' ? 'logo-gradient-footer' : 'logo-gradient';

  return (
    <span className={`${variantClass} ${sizeClasses[size]} ${className}`}>
      SOFTDAB
    </span>
  );
};

export default Logo;
