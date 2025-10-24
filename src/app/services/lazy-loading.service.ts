import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LazyLoadingService {

  constructor() { }

  /**
   * Dynamically load a component when needed
   * This helps with code splitting and reduces initial bundle size
   */
  async loadComponent(componentPath: string): Promise<any> {
    try {
      const module = await import(componentPath);
      return module;
    } catch (error) {
      console.error(`Failed to load component from ${componentPath}:`, error);
      throw error;
    }
  }

  /**
   * Preload components that are likely to be needed soon
   * This improves perceived performance
   */
  preloadComponents(componentPaths: string[]): void {
    componentPaths.forEach(path => {
      // Use requestIdleCallback for better performance
      if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
          this.loadComponent(path).catch(() => {
            // Silently fail for preloading
          });
        });
      } else {
        // Fallback for browsers that don't support requestIdleCallback
        setTimeout(() => {
          this.loadComponent(path).catch(() => {
            // Silently fail for preloading
          });
        }, 100);
      }
    });
  }

  /**
   * Load components based on user interaction patterns
   */
  loadOnInteraction(element: HTMLElement, componentPath: string): void {
    const loadComponent = () => {
      this.loadComponent(componentPath);
      // Remove listeners after loading
      element.removeEventListener('mouseenter', loadComponent);
      element.removeEventListener('touchstart', loadComponent);
    };

    // Load on hover or touch
    element.addEventListener('mouseenter', loadComponent, { once: true });
    element.addEventListener('touchstart', loadComponent, { once: true });
  }
}
