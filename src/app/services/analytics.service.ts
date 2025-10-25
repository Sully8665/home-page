import { Injectable } from '@angular/core';

export interface PerformanceMetrics {
  pageLoadTime: number;
  domContentLoaded: number;
  firstPaint: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  firstInputDelay: number;
  cumulativeLayoutShift: number;
  pageSize: number;
  requestCount: number;
  timestamp: Date;
}

export interface UserBehavior {
  pageViews: number;
  sessionDuration: number;
  scrollDepth: number;
  clickEvents: number;
  userAgent: string;
  screenResolution: string;
  connectionType: string;
  timestamp: Date;
}

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  private performanceMetrics: PerformanceMetrics[] = [];
  private userBehavior: UserBehavior[] = [];
  private sessionStartTime: number = Date.now();
  private pageViewCount: number = 0;
  private clickCount: number = 0;
  private maxScrollDepth: number = 0;

  constructor() {
    this.initializeTracking();
  }

  /**
   * Initialize analytics tracking
   */
  private initializeTracking(): void {
    this.trackPageView();
    this.trackScrollDepth();
    this.trackClickEvents();
    this.trackPerformanceMetrics();
    this.trackUserBehavior();
  }

  /**
   * Track page view
   */
  private trackPageView(): void {
    this.pageViewCount++;
    
    // Track page view in localStorage for persistence
    const pageViews = this.getStoredPageViews();
    pageViews.push({
      url: window.location.href,
      timestamp: new Date().toISOString(),
      referrer: document.referrer
    });
    
    // Keep only last 100 page views
    if (pageViews.length > 100) {
      pageViews.splice(0, pageViews.length - 100);
    }
    
    localStorage.setItem('pageViews', JSON.stringify(pageViews));
  }

  /**
   * Track scroll depth
   */
  private trackScrollDepth(): void {
    let ticking = false;
    
    const updateScrollDepth = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollDepth = Math.round((scrollTop / documentHeight) * 100);
      
      this.maxScrollDepth = Math.max(this.maxScrollDepth, scrollDepth);
      ticking = false;
    };

    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollDepth);
        ticking = true;
      }
    };

    window.addEventListener('scroll', requestTick, { passive: true });
  }

  /**
   * Track click events
   */
  private trackClickEvents(): void {
    document.addEventListener('click', (event) => {
      this.clickCount++;
      
      const target = event.target as HTMLElement;
      const clickData = {
        element: target.tagName,
        className: target.className,
        id: target.id,
        text: target.textContent?.substring(0, 50) || '',
        timestamp: new Date().toISOString()
      };
      
      this.storeClickEvent(clickData);
    }, { passive: true });
  }

  /**
   * Track performance metrics
   */
  private trackPerformanceMetrics(): void {
    window.addEventListener('load', () => {
      setTimeout(() => {
        const metrics = this.collectPerformanceMetrics();
        this.performanceMetrics.push(metrics);
        this.storePerformanceMetrics(metrics);
      }, 1000);
    });
  }

  /**
   * Collect performance metrics
   */
  private collectPerformanceMetrics(): PerformanceMetrics {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    const resources = performance.getEntriesByType('resource');
    
    // Calculate page size
    const pageSize = resources.reduce((total, resource) => {
      const resourceEntry = resource as PerformanceResourceTiming;
      return total + (resourceEntry.transferSize || 0);
    }, 0);

    // Get Core Web Vitals
    const paintEntries = performance.getEntriesByType('paint');
    const firstPaint = paintEntries.find(entry => entry.name === 'first-paint')?.startTime || 0;
    const firstContentfulPaint = paintEntries.find(entry => entry.name === 'first-contentful-paint')?.startTime || 0;

    return {
      pageLoadTime: navigation.loadEventEnd - navigation.fetchStart,
      domContentLoaded: navigation.domContentLoadedEventEnd - navigation.fetchStart,
      firstPaint,
      firstContentfulPaint,
      largestContentfulPaint: 0, // Will be updated by LCP observer
      firstInputDelay: 0, // Will be updated by FID observer
      cumulativeLayoutShift: 0, // Will be updated by CLS observer
      pageSize: Math.round(pageSize / 1024), // Convert to KB
      requestCount: resources.length,
      timestamp: new Date()
    };
  }

  /**
   * Track user behavior
   */
  private trackUserBehavior(): void {
    // Track session duration
    const trackSessionDuration = () => {
      const sessionDuration = Date.now() - this.sessionStartTime;
      
      const behavior: UserBehavior = {
        pageViews: this.pageViewCount,
        sessionDuration: Math.round(sessionDuration / 1000), // Convert to seconds
        scrollDepth: this.maxScrollDepth,
        clickEvents: this.clickCount,
        userAgent: navigator.userAgent,
        screenResolution: `${screen.width}x${screen.height}`,
        connectionType: this.getConnectionType(),
        timestamp: new Date()
      };
      
      this.userBehavior.push(behavior);
      this.storeUserBehavior(behavior);
    };

    // Track session duration every 30 seconds
    setInterval(trackSessionDuration, 30000);
    
    // Track session duration on page unload
    window.addEventListener('beforeunload', trackSessionDuration);
  }

  /**
   * Get connection type
   */
  private getConnectionType(): string {
    const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
    return connection ? connection.effectiveType || 'unknown' : 'unknown';
  }

  /**
   * Store performance metrics
   */
  private storePerformanceMetrics(metrics: PerformanceMetrics): void {
    const stored = this.getStoredPerformanceMetrics();
    stored.push(metrics);
    
    // Keep only last 50 metrics
    if (stored.length > 50) {
      stored.splice(0, stored.length - 50);
    }
    
    localStorage.setItem('performanceMetrics', JSON.stringify(stored));
  }

  /**
   * Store user behavior
   */
  private storeUserBehavior(behavior: UserBehavior): void {
    const stored = this.getStoredUserBehavior();
    stored.push(behavior);
    
    // Keep only last 20 behavior records
    if (stored.length > 20) {
      stored.splice(0, stored.length - 20);
    }
    
    localStorage.setItem('userBehavior', JSON.stringify(stored));
  }

  /**
   * Store click events
   */
  private storeClickEvent(clickData: any): void {
    const stored = this.getStoredClickEvents();
    stored.push(clickData);
    
    // Keep only last 100 click events
    if (stored.length > 100) {
      stored.splice(0, stored.length - 100);
    }
    
    localStorage.setItem('clickEvents', JSON.stringify(stored));
  }

  /**
   * Get stored performance metrics
   */
  private getStoredPerformanceMetrics(): PerformanceMetrics[] {
    try {
      const stored = localStorage.getItem('performanceMetrics');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  /**
   * Get stored user behavior
   */
  private getStoredUserBehavior(): UserBehavior[] {
    try {
      const stored = localStorage.getItem('userBehavior');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  /**
   * Get stored click events
   */
  private getStoredClickEvents(): any[] {
    try {
      const stored = localStorage.getItem('clickEvents');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  /**
   * Get stored page views
   */
  private getStoredPageViews(): any[] {
    try {
      const stored = localStorage.getItem('pageViews');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  /**
   * Get analytics summary
   */
  getAnalyticsSummary(): any {
    const performanceMetrics = this.getStoredPerformanceMetrics();
    const userBehavior = this.getStoredUserBehavior();
    const clickEvents = this.getStoredClickEvents();
    const pageViews = this.getStoredPageViews();

    // Calculate averages
    const avgPageLoadTime = performanceMetrics.length > 0 
      ? performanceMetrics.reduce((sum, m) => sum + m.pageLoadTime, 0) / performanceMetrics.length 
      : 0;

    const avgSessionDuration = userBehavior.length > 0 
      ? userBehavior.reduce((sum, b) => sum + b.sessionDuration, 0) / userBehavior.length 
      : 0;

    const avgScrollDepth = userBehavior.length > 0 
      ? userBehavior.reduce((sum, b) => sum + b.scrollDepth, 0) / userBehavior.length 
      : 0;

    return {
      totalPageViews: pageViews.length,
      totalSessions: userBehavior.length,
      totalClicks: clickEvents.length,
      avgPageLoadTime: Math.round(avgPageLoadTime),
      avgSessionDuration: Math.round(avgSessionDuration),
      avgScrollDepth: Math.round(avgScrollDepth),
      lastUpdated: new Date().toISOString()
    };
  }

  /**
   * Export analytics data
   */
  exportAnalyticsData(): any {
    return {
      performanceMetrics: this.getStoredPerformanceMetrics(),
      userBehavior: this.getStoredUserBehavior(),
      clickEvents: this.getStoredClickEvents(),
      pageViews: this.getStoredPageViews(),
      summary: this.getAnalyticsSummary(),
      exportedAt: new Date().toISOString()
    };
  }

  /**
   * Clear analytics data
   */
  clearAnalyticsData(): void {
    localStorage.removeItem('performanceMetrics');
    localStorage.removeItem('userBehavior');
    localStorage.removeItem('clickEvents');
    localStorage.removeItem('pageViews');
    
    this.performanceMetrics = [];
    this.userBehavior = [];
    this.pageViewCount = 0;
    this.clickCount = 0;
    this.maxScrollDepth = 0;
    this.sessionStartTime = Date.now();
  }
}
