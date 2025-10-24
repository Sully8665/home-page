import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceWorkerService {

  constructor() { }

  /**
   * Register service worker for caching and offline functionality
   */
  async registerServiceWorker(): Promise<void> {
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js');
        console.log('Service Worker registered successfully:', registration);

        // Handle service worker updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // New content is available, prompt user to refresh
                this.showUpdateNotification();
              }
            });
          }
        });

        // Handle service worker messages
        navigator.serviceWorker.addEventListener('message', (event) => {
          if (event.data && event.data.type === 'CACHE_UPDATED') {
            console.log('Cache updated:', event.data.payload);
          }
        });

      } catch (error) {
        console.error('Service Worker registration failed:', error);
      }
    } else {
      console.log('Service Worker not supported');
    }
  }

  /**
   * Show notification when app update is available
   */
  private showUpdateNotification(): void {
    // Create a simple notification
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #0ea5a4;
      color: white;
      padding: 15px 20px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      z-index: 10000;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      font-size: 14px;
      max-width: 300px;
    `;

    notification.innerHTML = `
      <div style="display: flex; align-items: center; gap: 10px;">
        <span>🔄 New version available!</span>
        <button id="refresh-btn" style="
          background: rgba(255, 255, 255, 0.2);
          border: none;
          color: white;
          padding: 5px 10px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 12px;
        ">Refresh</button>
        <button id="close-btn" style="
          background: none;
          border: none;
          color: white;
          cursor: pointer;
          font-size: 16px;
          padding: 0;
          margin-left: auto;
        ">×</button>
      </div>
    `;

    document.body.appendChild(notification);

    // Add event listeners
    const refreshBtn = notification.querySelector('#refresh-btn');
    const closeBtn = notification.querySelector('#close-btn');

    refreshBtn?.addEventListener('click', () => {
      window.location.reload();
    });

    closeBtn?.addEventListener('click', () => {
      document.body.removeChild(notification);
    });

    // Auto-remove after 10 seconds
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification);
      }
    }, 10000);
  }

  /**
   * Check for service worker updates
   */
  async checkForUpdates(): Promise<void> {
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.getRegistration();
        if (registration) {
          await registration.update();
        }
      } catch (error) {
        console.error('Failed to check for updates:', error);
      }
    }
  }

  /**
   * Clear all caches
   */
  async clearCaches(): Promise<void> {
    if ('caches' in window) {
      try {
        const cacheNames = await caches.keys();
        await Promise.all(
          cacheNames.map(cacheName => caches.delete(cacheName))
        );
        console.log('All caches cleared');
      } catch (error) {
        console.error('Failed to clear caches:', error);
      }
    }
  }

  /**
   * Get cache information
   */
  async getCacheInfo(): Promise<{ name: string; size: number }[]> {
    if ('caches' in window) {
      try {
        const cacheNames = await caches.keys();
        const cacheInfo = await Promise.all(
          cacheNames.map(async (name) => {
            const cache = await caches.open(name);
            const keys = await cache.keys();
            return { name, size: keys.length };
          })
        );
        return cacheInfo;
      } catch (error) {
        console.error('Failed to get cache info:', error);
        return [];
      }
    }
    return [];
  }

  /**
   * Initialize service worker
   */
  initialize(): void {
    // Register service worker
    this.registerServiceWorker();

    // Check for updates periodically (every 30 minutes)
    setInterval(() => {
      this.checkForUpdates();
    }, 30 * 60 * 1000);

    // Check for updates when page becomes visible
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) {
        this.checkForUpdates();
      }
    });
  }
}
