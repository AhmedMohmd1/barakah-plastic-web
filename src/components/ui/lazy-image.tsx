import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  fallbackSrc?: string;
  onLoad?: () => void;
  onError?: () => void;
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className,
  imgClassName,
  fallbackSrc,
  onLoad,
  onError,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!('IntersectionObserver' in window)) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px 0px',
        threshold: 0.01,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
      return;
    }
    setHasError(true);
    onError?.();
  };

  return (
    <div ref={containerRef} className={cn('relative overflow-hidden', className)}>
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-muted animate-pulse" />
      )}

      {hasError && (
        <div className="absolute inset-0 bg-muted flex items-center justify-center">
          <span className="text-muted-foreground text-sm">الصورة غير متوفرة</span>
        </div>
      )}

      {isInView && !hasError && (
        <img
          src={currentSrc}
          alt={alt}
          className={cn(
            'transition-opacity duration-300',
            isLoaded ? 'opacity-100' : 'opacity-0',
            imgClassName
          )}
          onLoad={handleLoad}
          onError={handleError}
          loading="lazy"
        />
      )}
    </div>
  );
};

export default LazyImage;
