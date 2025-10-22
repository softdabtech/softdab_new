// CriticalCSS.jsx - Критический inline CSS для FCP < 1.8s
import { memo } from 'react';

const CriticalCSS = memo(() => {
  const criticalStyles = `
    /* Критический CSS для above-the-fold контента - FCP оптимизация */
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    html {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
      line-height: 1.5;
      -webkit-text-size-adjust: 100%;
    }

    body {
      margin: 0;
      font-family: inherit;
      background-color: #ffffff;
      color: #1a1a1a;
    }

    /* Критические стили для header */
    .header {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 50;
      background-color: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(8px);
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      height: 72px;
    }

    .header-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 100%;
    }

    /* Критические стили для hero секции - LCP оптимизация */
    .hero {
      min-height: 100vh;
      display: flex;
      align-items: center;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      position: relative;
      overflow: hidden;
    }

    .hero-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 24px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 48px;
      align-items: center;
    }

    .hero-content {
      z-index: 2;
    }

    .hero-title {
      font-size: clamp(2.5rem, 5vw, 4rem);
      font-weight: 700;
      line-height: 1.1;
      color: #ffffff;
      margin-bottom: 24px;
    }

    .hero-description {
      font-size: 1.25rem;
      color: rgba(255, 255, 255, 0.9);
      margin-bottom: 32px;
      line-height: 1.6;
    }

    /* Критические стили для кнопок CTA */
    .cta-button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 16px 32px;
      background-color: #ffffff;
      color: #667eea;
      border-radius: 8px;
      font-weight: 600;
      font-size: 1.1rem;
      text-decoration: none;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }

    .cta-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
    }

    /* Критическая оптимизация для изображений - LCP */
    .hero-image {
      width: 100%;
      height: auto;
      border-radius: 12px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
    }

    /* Критические media queries для мобильных */
    @media (max-width: 768px) {
      .hero-container {
        grid-template-columns: 1fr;
        text-align: center;
        gap: 32px;
        padding-top: 100px;
      }

      .hero-title {
        font-size: clamp(2rem, 8vw, 3rem);
      }

      .hero-description {
        font-size: 1.1rem;
      }

      .header-container {
        padding: 0 16px;
      }
    }

    /* Критическая оптимизация загрузки шрифтов */
    @font-face {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 400;
      font-display: swap;
      src: url('https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiJ-Ek-_EeA.woff2') format('woff2');
    }

    @font-face {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 600;
      font-display: swap;
      src: url('https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuI6fAZ9hiJ-Ek-_EeA.woff2') format('woff2');
    }

    /* Критическая анимация загрузки */
    .loading {
      display: inline-block;
      width: 20px;
      height: 20px;
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      border-top-color: #ffffff;
      animation: spin 1s ease-in-out infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    /* Скрываем некритический контент до полной загрузки */
    .below-fold {
      opacity: 0;
      animation: fadeIn 0.5s ease-in-out 0.5s forwards;
    }

    @keyframes fadeIn {
      to { opacity: 1; }
    }
  `;

  return (
    <style 
      dangerouslySetInnerHTML={{ __html: criticalStyles }}
      data-critical-css="true"
    />
  );
});

CriticalCSS.displayName = 'CriticalCSS';

export default CriticalCSS;