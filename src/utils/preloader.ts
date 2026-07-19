// Preload the hero image (LCP element); everything below the fold lazy-loads
export const preloadCriticalResources = () => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = '/images/hero.webp';
  document.head.appendChild(link);
};
