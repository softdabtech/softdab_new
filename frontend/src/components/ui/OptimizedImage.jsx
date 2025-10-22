// OptimizedImage.jsx - Критически оптимизированный компонент изображений для LCP
import React, { useState, useCallback, memo } from 'react';

const OptimizedImage = memo(({
  src,
  alt,
  className = '',
  width,
  height,
  priority = false,
  webpSrc,
  sizes = '100vw',
  onLoad,
  onError,
  ...props
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleLoad = useCallback((event) => {
    setImageLoaded(true);
    onLoad?.(event);
  }, [onLoad]);

  const handleError = useCallback((event) => {
    setImageError(true);
    onError?.(event);
  }, [onError]);

  // Критические атрибуты для LCP оптимизации
  const imageProps = {
    alt,
    width,
    height,
    sizes,
    onLoad: handleLoad,
    onError: handleError,
    className: `${className} ${imageLoaded ? 'loaded' : 'loading'} ${imageError ? 'error' : ''}`,
    // Критический приоритет для hero изображений
    loading: priority ? 'eager' : 'lazy',
    decoding: priority ? 'sync' : 'async',
    fetchPriority: priority ? 'high' : 'auto',
    ...props
  };

  // Критическая поддержка WebP с fallback
  if (webpSrc) {
    return (
      <picture>
        <source srcSet={webpSrc} type="image/webp" sizes={sizes} />
        <source srcSet={src} sizes={sizes} />
        <img
          src={src}
          {...imageProps}
          data-critical={priority}
        />
      </picture>
    );
  }

  return (
    <img
      src={src}
      {...imageProps}
      data-critical={priority}
    />
  );
});

OptimizedImage.displayName = 'OptimizedImage';

export default OptimizedImage;