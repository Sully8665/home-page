import { Injectable } from '@angular/core';
import { ResourcePreloaderService } from './resource-preloader.service';
import { ServiceWorkerService } from './service-worker.service';

@Injectable({
  providedIn: 'root'
})
export class PerformanceService {

  constructor(
    private resourcePreloader: ResourcePreloaderService,
    private serviceWorker: ServiceWorkerService
  ) { }

  /**
   * Monitor and report performance metrics
   */
  measurePerformance(): void {
    if ('performance' in window && 'getEntriesByType' in performance) {
      // Measure navigation timing
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      
      // Measure resource loading
      const resources = performance.getEntriesByType('resource');
      
      // Log performance metrics
      console.group('Performance Metrics');
      console.log('Page Load Time:', navigation.loadEventEnd - navigation.fetchStart, 'ms');
      console.log('DOM Content Loaded:', navigation.domContentLoadedEventEnd - navigation.fetchStart, 'ms');
      console.log('First Paint:', this.getFirstPaint());
      console.log('Resources Loaded:', resources.length);
      console.groupEnd();
    }
  }

  /**
   * Get First Paint timing
   */
  private getFirstPaint(): number | null {
    const paintEntries = performance.getEntriesByType('paint');
    const firstPaint = paintEntries.find(entry => entry.name === 'first-paint');
    return firstPaint ? firstPaint.startTime : null;
  }

  /**
   * Optimize images based on device capabilities
   */
  optimizeImages(): void {
    const images = document.querySelectorAll('img[data-src]');
    
    images.forEach((img) => {
      if (img instanceof HTMLImageElement) {
        // Add loading="lazy" for better performance
        img.loading = 'lazy';
        
        // Add decoding="async" for non-blocking image decoding
        img.decoding = 'async';
      }
    });
  }

  /**
   * Preload critical resources
   */
  preloadCriticalResources(): void {
    const criticalResources = [
      '/assets/avatar.png',
      '/assets/og/saleh-og.png'
    ];

    criticalResources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource;
      link.as = 'image';
      document.head.appendChild(link);
    });
  }

  /**
   * Implement resource hints for better performance
   */
  addResourceHints(): void {
    const hints = [
      { rel: 'dns-prefetch', href: 'https://fonts.googleapis.com' },
      { rel: 'dns-prefetch', href: 'https://cdn.jsdelivr.net' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' },
      { rel: 'preconnect', href: 'https://dev.to' }
    ];

    hints.forEach(hint => {
      const link = document.createElement('link');
      link.rel = hint.rel;
      link.href = hint.href;
      if (hint.crossorigin) {
        link.crossOrigin = hint.crossorigin;
      }
      document.head.appendChild(link);
    });
  }

  /**
   * Monitor Core Web Vitals
   */
  monitorWebVitals(): void {
    // Monitor Largest Contentful Paint (LCP)
    if ('PerformanceObserver' in window) {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        console.log('LCP:', lastEntry.startTime);
      });
      
      try {
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      } catch (e) {
        // Browser doesn't support LCP
      }

      // Monitor First Input Delay (FID)
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach(entry => {
          if (entry instanceof PerformanceEventTiming) {
            console.log('FID:', entry.processingStart - entry.startTime);
          }
        });
      });

      try {
        fidObserver.observe({ entryTypes: ['first-input'] });
      } catch (e) {
        // Browser doesn't support FID
      }
    }
  }

  /**
   * Initialize performance optimizations
   */
  initialize(): void {
    this.addResourceHints();
    this.preloadCriticalResources();
    this.optimizeImages();
    this.monitorWebVitals();
    this.resourcePreloader.initialize();
    this.serviceWorker.initialize();
    
    // Measure performance after page load
    window.addEventListener('load', () => {
      setTimeout(() => this.measurePerformance(), 1000);
    });
  }
}
