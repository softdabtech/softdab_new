// LCPOptimizedImage.jsx - Специально оптимизированный компонент для LCP элементов
import React, { useState, useEffect, useRef, useCallback, memo } from 'react';

const LCPOptimizedImage = memo(({
  src,
  webpSrc,
  alt,
  width,
  height,
  className = '',
  sizes = '100vw',
  priority = false,
  onLoad,
  onError,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef(null);

  const handleLoad = useCallback((event) => {
    setIsLoaded(true);
    onLoad?.(event);
    
    // Критический LCP мониторинг
    if (priority) {
      console.log('🎯 LCP изображение загружено:', alt, performance.now().toFixed(0) + 'ms');
    }
  }, [onLoad, priority, alt]);

  const handleError = useCallback((event) => {
    setHasError(true);
    onError?.(event);
    console.warn('❌ Ошибка загрузки LCP изображения:', src);
  }, [onError, src]);

  useEffect(() => {
    // Критическая предзагрузка для LCP изображений
    if (priority && src) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = webpSrc || src;
      if (webpSrc) link.type = 'image/webp';
      link.fetchPriority = 'high';
      document.head.appendChild(link);

      return () => {
        document.head.removeChild(link);
      };
    }
  }, [priority, src, webpSrc]);

  // Критические атрибуты для LCP оптимизации
  const imageProps = {
    ref: imgRef,
    alt,
    width,
    height,
    sizes,
    onLoad: handleLoad,
    onError: handleError,
    className: `${className} ${isLoaded ? 'lcp-loaded' : 'lcp-loading'} ${hasError ? 'lcp-error' : ''}`,
    // Критические атрибуты производительности
    loading: priority ? 'eager' : 'lazy',
    decoding: priority ? 'sync' : 'async',
    fetchPriority: priority ? 'high' : 'auto',
    // Data атрибуты для LCP отслеживания
    'data-lcp-critical': priority,
    'data-lcp-element': priority ? 'true' : 'false',
    ...props
  };

  // Критическая поддержка WebP с optimized fallback
  if (webpSrc) {
    return (
      <picture className={priority ? 'lcp-picture-critical' : 'lcp-picture'}>
        <source 
          srcSet={webpSrc} 
          type="image/webp" 
          sizes={sizes}
          media={priority ? '' : '(min-width: 1px)'}
        />
        <source 
          srcSet={src} 
          sizes={sizes}
        />
        <img
          src={src}
          {...imageProps}
        />
      </picture>
    );
  }

  return (
    <img
      src={src}
      {...imageProps}
    />
  );
});

LCPOptimizedImage.displayName = 'LCPOptimizedImage';

export default LCPOptimizedImage;