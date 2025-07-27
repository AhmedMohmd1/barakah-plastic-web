import { useEffect, useRef } from 'react';

interface PerformanceMetrics {
  loadTime: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  cumulativeLayoutShift: number;
}

export const usePerformance = () => {
  const metricsRef = useRef<PerformanceMetrics>({
    loadTime: 0,
    firstContentfulPaint: 0,
    largestContentfulPaint: 0,
    cumulativeLayoutShift: 0,
  });

  useEffect(() => {
    // Measure page load time
    const loadTime = performance.now();
    metricsRef.current.loadTime = loadTime;

    // Measure First Contentful Paint
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.name === 'first-contentful-paint') {
          metricsRef.current.firstContentfulPaint = entry.startTime;
        }
      }
    });

    observer.observe({ entryTypes: ['paint'] });

    // Measure Largest Contentful Paint
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      metricsRef.current.largestContentfulPaint = lastEntry.startTime;
    });

    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

    // Measure Cumulative Layout Shift
    const clsObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const layoutShiftEntry = entry as any;
        if (!layoutShiftEntry.hadRecentInput) {
          metricsRef.current.cumulativeLayoutShift += layoutShiftEntry.value;
        }
      }
    });

    clsObserver.observe({ entryTypes: ['layout-shift'] });

    // Log performance metrics
    const logMetrics = () => {
      const metrics = metricsRef.current;
      console.log('Performance Metrics:', {
        'Load Time': `${metrics.loadTime.toFixed(2)}ms`,
        'First Contentful Paint': `${metrics.firstContentfulPaint.toFixed(2)}ms`,
        'Largest Contentful Paint': `${metrics.largestContentfulPaint.toFixed(2)}ms`,
        'Cumulative Layout Shift': metrics.cumulativeLayoutShift.toFixed(3),
      });

      // Send to analytics if needed
      if (process.env.NODE_ENV === 'production') {
        // Analytics.send('performance', metrics);
      }
    };

    // Log metrics after page load
    window.addEventListener('load', logMetrics);

    return () => {
      observer.disconnect();
      lcpObserver.disconnect();
      clsObserver.disconnect();
      window.removeEventListener('load', logMetrics);
    };
  }, []);

  return metricsRef.current;
};

// Hook for measuring component render time
export const useRenderTime = (componentName: string) => {
  const renderStart = useRef<number>(0);

  useEffect(() => {
    renderStart.current = performance.now();
  });

  useEffect(() => {
    const renderTime = performance.now() - renderStart.current;
    console.log(`${componentName} render time: ${renderTime.toFixed(2)}ms`);
  });
}; 