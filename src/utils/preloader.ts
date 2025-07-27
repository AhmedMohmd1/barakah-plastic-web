// Resource preloader for critical assets
export const preloadCriticalResources = () => {
  // Preload critical images
  const criticalImages = [
    '/images/plasticbag.jpeg',
    '/images/softbagsCover.png',
    '/images/canvas.jpeg',
    '/images/كيس سلوفان.jpeg',
    '/images/اكياس-بقفل.png',
  ];

  criticalImages.forEach((src) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });

  // Preload critical fonts
  const fontLink = document.createElement('link');
  fontLink.rel = 'preload';
  fontLink.as = 'font';
  fontLink.type = 'font/woff2';
  fontLink.href = '/fonts/tajawal.woff2';
  fontLink.crossOrigin = 'anonymous';
  document.head.appendChild(fontLink);

  // Preload critical CSS
  const cssLink = document.createElement('link');
  cssLink.rel = 'preload';
  cssLink.as = 'style';
  cssLink.href = '/src/index.css';
  document.head.appendChild(cssLink);
};

// Preload route components
export const preloadRoute = (routePath: string) => {
  switch (routePath) {
    case '/products':
      import('@/pages/ProductDetails').then((module) => {
        console.log('ProductDetails preloaded');
      });
      break;
    default:
      break;
  }
};

// Preload data for better UX
export const preloadProductData = async () => {
  try {
    // Preload product data
    const response = await fetch('/api/products');
    if (response.ok) {
      const data = await response.json();
      // Store in memory for quick access
      (window as any).__PRELOADED_PRODUCTS__ = data;
    }
  } catch (error) {
    console.log('Failed to preload product data:', error);
  }
}; 