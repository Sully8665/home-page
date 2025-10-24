import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResourcePreloaderService {

  private preloadedResources = new Set<string>();

  constructor() { }

  /**
   * Preload critical CSS files
   */
  preloadCSS(href: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.preloadedResources.has(href)) {
        resolve();
        return;
      }

      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'style';
      link.href = href;
      link.onload = () => {
        link.rel = 'stylesheet';
        this.preloadedResources.add(href);
        resolve();
      };
      link.onerror = reject;
      document.head.appendChild(link);
    });
  }

  /**
   * Preload JavaScript files
   */
  preloadJS(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.preloadedResources.has(src)) {
        resolve();
        return;
      }

      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'script';
      link.href = src;
      link.onload = () => {
        this.preloadedResources.add(src);
        resolve();
      };
      link.onerror = reject;
      document.head.appendChild(link);
    });
  }

  /**
   * Preload images
   */
  preloadImage(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.preloadedResources.has(src)) {
        resolve();
        return;
      }

      const img = new Image();
      img.onload = () => {
        this.preloadedResources.add(src);
        resolve();
      };
      img.onerror = reject;
      img.src = src;
    });
  }

  /**
   * Preload fonts
   */
  preloadFont(href: string, fontFamily: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.preloadedResources.has(href)) {
        resolve();
        return;
      }

      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'font';
      link.type = 'font/woff2';
      link.href = href;
      link.crossOrigin = 'anonymous';
      link.onload = () => {
        this.preloadedResources.add(href);
        resolve();
      };
      link.onerror = reject;
      document.head.appendChild(link);
    });
  }

  /**
   * Preload multiple resources in parallel
   */
  async preloadResources(resources: Array<{
    type: 'css' | 'js' | 'image' | 'font';
    href: string;
    fontFamily?: string;
  }>): Promise<void> {
    const promises = resources.map(resource => {
      switch (resource.type) {
        case 'css':
          return this.preloadCSS(resource.href);
        case 'js':
          return this.preloadJS(resource.href);
        case 'image':
          return this.preloadImage(resource.href);
        case 'font':
          return this.preloadFont(resource.href, resource.fontFamily || '');
        default:
          return Promise.resolve();
      }
    });

    await Promise.allSettled(promises);
  }

  /**
   * Preload resources based on user interaction
   */
  preloadOnInteraction(element: HTMLElement, resources: Array<{
    type: 'css' | 'js' | 'image' | 'font';
    href: string;
    fontFamily?: string;
  }>): void {
    const preloadResources = () => {
      this.preloadResources(resources);
      // Remove listeners after preloading
      element.removeEventListener('mouseenter', preloadResources);
      element.removeEventListener('touchstart', preloadResources);
    };

    // Preload on hover or touch
    element.addEventListener('mouseenter', preloadResources, { once: true });
    element.addEventListener('touchstart', preloadResources, { once: true });
  }

  /**
   * Preload resources when browser is idle
   */
  preloadWhenIdle(resources: Array<{
    type: 'css' | 'js' | 'image' | 'font';
    href: string;
    fontFamily?: string;
  }>): void {
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        this.preloadResources(resources);
      });
    } else {
      // Fallback for browsers that don't support requestIdleCallback
      setTimeout(() => {
        this.preloadResources(resources);
      }, 100);
    }
  }

  /**
   * Initialize critical resource preloading
   */
  initialize(): void {
    // Preload critical resources immediately
    const criticalResources = [
      { type: 'image' as const, href: '/assets/avatar.png' },
      { type: 'image' as const, href: '/assets/og/saleh-og.png' },
      { type: 'image' as const, href: '/assets/preview.png' }
    ];

    this.preloadResources(criticalResources);

    // Preload secondary resources when idle
    const secondaryResources = [
      { type: 'css' as const, href: 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css' }
    ];

    this.preloadWhenIdle(secondaryResources);
  }
}
