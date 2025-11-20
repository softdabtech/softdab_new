# CodeFlowBackground Animation - Implementation Guide

## Overview
A subtle, elegant background animation for the SoftDAB hero section that visualizes "Custom Software Development" through floating code symbols and connecting network lines.

## Features

### Visual Elements
1. **Floating Code Symbols** - CSS-animated brackets, braces, and programming symbols
   - Symbols: `</>`, `{ }`, `[ ]`, `=>`, `( )`, `;`, `∞`, `λ`
   - Ultra-low opacity (8%) for subtle effect
   - 30-second float animation from top to bottom
   - Staggered delays for natural flow

2. **Network Connections** - Canvas-based particle system
   - ~50 floating particles (adaptive based on screen width)
   - Dynamic lines connecting nearby particles
   - Represents system architecture / code relationships
   - Particle count: `Math.min(50, screenWidth / 30)`

3. **Pulsing Grid** - Subtle grid overlay
   - 50x50px grid (40px on mobile)
   - 20-second fade in/out cycle
   - Represents code structure / alignment

## Performance Optimizations

### CSS Optimizations
- `will-change` properties on animated elements
- Hardware acceleration via `transform` animations
- Reduced particle count on mobile devices
- Grid disabled on small screens (<480px)

### JavaScript Optimizations
- RequestAnimationFrame for smooth 60fps
- Minimal DOM manipulation (canvas-based rendering)
- Efficient particle update loop
- Automatic cleanup on unmount

### Responsive Behavior
```css
Desktop (>768px):  All 8 symbols + canvas + grid
Mobile (≤768px):   5 symbols + canvas + grid (smaller)
Small (≤480px):    5 symbols + grid only (no canvas)
```

### Accessibility
- Respects `prefers-reduced-motion` - disables animations
- No impact on screen readers (decorative only)
- Doesn't interfere with interactive elements

## Color Scheme
All elements use SoftDAB primary blue (`#2F89FC`) with ultra-low opacity:
- Code symbols: `rgba(47, 137, 252, 0.08)` - 8% opacity
- Particles: `rgba(47, 137, 252, 0.15)` - 15% opacity
- Connection lines: Dynamic opacity based on distance (max 10%)
- Grid lines: `rgba(47, 137, 252, 0.03)` - 3% opacity

## File Structure
```
frontend/src/components/
├── animations/
│   ├── CodeFlowBackground.jsx    # React component
│   └── CodeFlowBackground.css    # Styles & animations
└── sections/
    └── HeroSection.jsx           # Integration point
```

## Integration

The component is already integrated into `HeroSection.jsx`:

```jsx
import CodeFlowBackground from '../animations/CodeFlowBackground';

// Inside the section:
<section className="relative min-h-screen ...">
  <CodeFlowBackground />
  {/* Rest of hero content */}
</section>
```

## Customization Options

### Adjust Animation Speed
In `CodeFlowBackground.css`:
```css
.code-symbol {
  animation: float-symbol 30s ease-in-out infinite; /* Change 30s */
}

.grid-overlay {
  animation: grid-pulse 20s ease-in-out infinite; /* Change 20s */
}
```

### Adjust Opacity
In `CodeFlowBackground.jsx`:
```javascript
// Code symbols
color: rgba(47, 137, 252, 0.08); // Change 0.08

// Particles
ctx.fillStyle = 'rgba(47, 137, 252, 0.15)'; // Change 0.15

// Connection lines
const opacity = (1 - distance / maxDistance) * 0.1; // Change 0.1
```

### Add/Remove Symbols
In `CodeFlowBackground.jsx`, modify the `code-symbols` div:
```jsx
<span className="code-symbol" style={{ left: '10%', animationDelay: '0s' }}>
  YOUR_SYMBOL
</span>
```

### Change Particle Count
In `CodeFlowBackground.jsx`:
```javascript
const particleCount = Math.min(50, Math.floor(canvas.width / 30));
// Change 50 (max) or 30 (density ratio)
```

### Adjust Connection Distance
```javascript
const maxDistance = 150; // Change to increase/decrease connection range
```

## Performance Metrics

### Expected Performance
- **Desktop**: 60 FPS with <1% CPU usage
- **Mobile**: 60 FPS with <2% CPU usage
- **Memory**: <5MB additional usage
- **Bundle Size**: ~3KB (minified + gzipped)

### Monitoring
Check performance in Chrome DevTools:
1. Performance tab → Record
2. Check FPS (should be ~60)
3. Check Main thread activity (should be minimal)

## Browser Support
- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Mobile Safari iOS 14+
- ✅ Chrome Android 90+

## Troubleshooting

### Animation not visible
- Check z-index: Component should be `z-index: 0`, content should be `z-index: 10`
- Verify opacity values aren't too low
- Check if `prefers-reduced-motion` is enabled

### Performance issues on mobile
- Reduce particle count further
- Disable canvas on all mobile (not just <480px)
- Increase animation duration (slower = less CPU)

### Symbols not animating
- Check if CSS file is imported
- Verify no CSS conflicts with `animation` property
- Check browser console for errors

## Future Enhancements (Optional)

1. **Interactive Mode**: Particles react to mouse movement
2. **Theme Variants**: Different color schemes for dark mode
3. **Symbol Variety**: Random selection from larger symbol pool
4. **Performance API**: Auto-disable if FPS drops below threshold
5. **WebGL Version**: For more complex visualizations (if needed)

## Credits
- Design: Minimalist tech aesthetic inspired by code editors
- Colors: SoftDAB brand guidelines (#2F89FC)
- Animation principles: Google Material Design motion guidelines

---

**Status**: ✅ Deployed and optimized
**Last Updated**: November 20, 2025
**Maintained by**: SoftDAB Development Team
