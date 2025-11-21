# SoftDAB Logo Variants

This document describes the gradient logo variants used across the website.

## Color Gradient Logo (Header, Preloader)

**Location:** `frontend/public/logos/softdab-logo-gradient.svg`

**Gradient:** 
- Start: `#1e293b` (slate-800)
- Middle: `#2F89FC` (bright blue)
- End: `#0ea5e9` (sky-500)

**CSS Implementation:**
```css
.logo-gradient {
  font-weight: 900;
  letter-spacing: -0.02em;
  background: linear-gradient(135deg, #1e293b 0%, #2F89FC 50%, #0ea5e9 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  background-size: 200% 200%;
  padding: 0 2px;
  overflow: visible;
}
```

**Usage:**
- Website header
- Preloader screen
- Any dark/light backgrounds

---

## White Gradient Logo (Footer)

**Location:** `frontend/public/logos/softdab-logo-white.svg`

**Gradient:**
- Start: `#ffffff` (pure white)
- Middle: `#f0f9ff` (sky-50)
- End: `#e0f2fe` (sky-100)

**CSS Implementation:**
```css
.logo-gradient-footer {
  font-weight: 900;
  letter-spacing: -0.02em;
  background: linear-gradient(135deg, #ffffff 0%, #f0f9ff 50%, #e0f2fe 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  background-size: 200% 200%;
  padding: 0 2px;
  overflow: visible;
}
```

**Usage:**
- Website footer (dark background)
- Dark-themed sections
- Marketing materials on dark backgrounds

---

## React Component Usage

Import the Logo component:

```jsx
import Logo from '../components/ui/Logo';

// Default color gradient (for header, preloader)
<Logo size="md" />

// White gradient (for footer)
<Logo size="md" variant="footer" />
```

**Available sizes:**
- `sm`: text-xl (20px) - Mobile/compact layouts
- `md`: text-2xl (24px) - Default for header
- `lg`: text-4xl (36px) - Hero/featured sections

---

## Design Notes

- **Letter-spacing:** `-0.02em` prevents letter B clipping while maintaining modern look
- **Padding:** `0 2px` ensures no character clipping on any browser
- **Font-weight:** `900` (black) for maximum impact
- **Hover effect:** Background position shifts for subtle animation
- **Accessibility:** Both variants maintain excellent contrast ratios

---

## File Locations

- React Component: `frontend/src/components/ui/Logo.jsx`
- Styles: `frontend/src/components/ui/Logo.css`
- SVG Gradient: `frontend/public/logos/softdab-logo-gradient.svg`
- SVG White: `frontend/public/logos/softdab-logo-white.svg`
- Preloader: `frontend/src/components/Preloader.jsx`
- Header: `frontend/src/components/layout/Header.jsx`
- Footer: `frontend/src/components/layout/Footer.jsx`
