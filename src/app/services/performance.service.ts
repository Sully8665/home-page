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
   * Initialize basic performance optimizations
   */
  initialize(): void {
    this.optimizeImages();
  }
}
