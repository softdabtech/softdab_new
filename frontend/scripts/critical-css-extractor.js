// critical-css-extractor.js - Инструмент для извлечения критического CSS
import fs from 'fs';
import path from 'path';

// Критические CSS селекторы для above-the-fold контента
const CRITICAL_SELECTORS = [
  // Base & reset
  '*', 'html', 'body',
  
  // Critical layout
  '.App', '.min-h-screen', '.flex', '.items-center', '.justify-center',
  '.container', '.mx-auto', '.px-6', '.py-32', '.relative', '.z-10',
  
  // Header критические стили
  '.fixed', '.top-0', '.left-0', '.right-0', '.z-50',
  '.bg-white\\/95', '.backdrop-blur-sm', '.border-b', '.border-gray-200',
  '.h-18', '.max-w-7xl', '.justify-between',
  
  // Hero критические стили
  '.bg-gradient-to-br', '.from-blue-50', '.to-indigo-100',
  '.text-4xl', '.sm\\:text-5xl', '.md\\:text-7xl',
  '.font-bold', '.text-gray-900', '.text-balance', '.leading-tight',
  '.text-lg', '.sm\\:text-xl', '.md\\:text-2xl', '.text-gray-600',
  '.max-w-4xl', '.leading-relaxed',
  
  // CTA критические стили
  '.inline-flex', '.px-8', '.py-4', '.bg-blue-600', '.text-white',
  '.rounded-lg', '.font-semibold', '.hover\\:bg-blue-700',
  '.transition-colors', '.duration-200',
  
  // Trust indicators
  '.space-x-2', '.text-green-500', '.flex-shrink-0',
  
  // Critical responsive
  '@media (max-width: 768px)',
  '.sm\\:px-4', '.sm\\:text-base', '.sm\\:gap-6'
];

// Функция извлечения критического CSS из полного CSS файла
function extractCriticalCSS(fullCSSPath, outputPath) {
  try {
    console.log('🎯 Извлечение критического CSS для LCP оптимизации...');
    
    const fullCSS = fs.readFileSync(fullCSSPath, 'utf8');
    const criticalCSS = [];
    
    // Разбиваем CSS на правила
    const cssRules = fullCSS.split('}').filter(rule => rule.trim());
    
    cssRules.forEach(rule => {
      const cleanRule = rule.trim() + '}';
      
      // Проверяем, содержит ли правило критические селекторы
      const isCritical = CRITICAL_SELECTORS.some(selector => {
        // Простая проверка наличия селектора в правиле
        const selectorRegex = new RegExp(selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
        return selectorRegex.test(cleanRule);
      });
      
      if (isCritical) {
        criticalCSS.push(cleanRule);
      }
    });
    
    // Минификация критического CSS
    const minifiedCriticalCSS = criticalCSS
      .join('\n')
      .replace(/\s+/g, ' ')           // Убираем лишние пробелы
      .replace(/;\s*}/g, '}')         // Убираем последние точки с запятой
      .replace(/\s*{\s*/g, '{')       // Убираем пробелы вокруг скобок
      .replace(/\s*}\s*/g, '}')
      .replace(/\s*,\s*/g, ',')       // Убираем пробелы вокруг запятых
      .replace(/:\s*/g, ':')          // Убираем пробелы после двоеточий
      .trim();
    
    // Сохраняем критический CSS
    fs.writeFileSync(outputPath, minifiedCriticalCSS);
    
    const originalSize = (fullCSS.length / 1024).toFixed(2);
    const criticalSize = (minifiedCriticalCSS.length / 1024).toFixed(2);
    const reduction = (((fullCSS.length - minifiedCriticalCSS.length) / fullCSS.length) * 100).toFixed(1);
    
    console.log(`✅ Критический CSS извлечен:`);
    console.log(`   Оригинал: ${originalSize} KB`);
    console.log(`   Критический: ${criticalSize} KB`);
    console.log(`   Сокращение: ${reduction}%`);
    
    return minifiedCriticalCSS;
    
  } catch (error) {
    console.error('❌ Ошибка извлечения критического CSS:', error);
    return '';
  }
}

// Генерация обновленного index.html с inline критическим CSS
function injectCriticalCSS(htmlPath, criticalCSS) {
  try {
    let html = fs.readFileSync(htmlPath, 'utf8');
    
    // Находим существующий critical CSS block и заменяем его
    const criticalCSSBlock = `    <!-- CRITICAL INLINE CSS для мгновенного FCP < 1.8s -->
    <style>
${criticalCSS}
    </style>`;
    
    // Ищем существующий блок критического CSS
    const existingCSSRegex = /<!-- КРИТИЧЕСКИЙ INLINE CSS.*?<\/style>/s;
    
    if (existingCSSRegex.test(html)) {
      html = html.replace(existingCSSRegex, criticalCSSBlock);
    } else {
      // Если нет существующего блока, добавляем перед </head>
      html = html.replace('</head>', `${criticalCSSBlock}\n  </head>`);
    }
    
    fs.writeFileSync(htmlPath, html);
    console.log('✅ Критический CSS внедрен в index.html');
    
  } catch (error) {
    console.error('❌ Ошибка внедрения критического CSS:', error);
  }
}

// Export для использования в build процессе
export { extractCriticalCSS, injectCriticalCSS, CRITICAL_SELECTORS };

// CLI usage
if (import.meta.url === `file://${process.argv[1]}`) {
  const [,, fullCSSPath, outputPath, htmlPath] = process.argv;
  
  if (!fullCSSPath) {
    console.error('Использование: node critical-css-extractor.js <путь-к-полному-CSS> [выходной-путь] [путь-к-HTML]');
    process.exit(1);
  }
  
  const criticalCSS = extractCriticalCSS(
    fullCSSPath, 
    outputPath || './critical.css'
  );
  
  if (htmlPath && criticalCSS) {
    injectCriticalCSS(htmlPath, criticalCSS);
  }
}