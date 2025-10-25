import { Injectable } from '@angular/core';

export interface ErrorReport {
  id: string;
  message: string;
  stack?: string;
  url: string;
  lineNumber?: number;
  columnNumber?: number;
  userAgent: string;
  timestamp: Date;
  severity: 'low' | 'medium' | 'high' | 'critical';
  category: 'javascript' | 'network' | 'resource' | 'performance' | 'user' | 'unknown';
  userId?: string;
  sessionId: string;
  pageUrl: string;
  referrer: string;
  screenResolution: string;
  viewportSize: string;
  connectionType: string;
  deviceType: 'mobile' | 'tablet' | 'desktop';
  browser: string;
  os: string;
}

@Injectable({
  providedIn: 'root'
})
export class ErrorTrackingService {
  private errors: ErrorReport[] = [];
  private sessionId: string;
  private errorCount = 0;
  private maxErrorsPerSession = 50;

  constructor() {
    this.sessionId = this.generateSessionId();
    this.initializeErrorTracking();
  }

  /**
   * Initialize error tracking
   */
  private initializeErrorTracking(): void {
    // Track unhandled JavaScript errors
    window.addEventListener('error', (event) => {
      this.trackError({
        message: event.message,
        stack: event.error?.stack,
        url: event.filename,
        lineNumber: event.lineno,
        columnNumber: event.colno,
        category: 'javascript',
        severity: this.determineSeverity(event.error)
      });
    });

    // Track unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      this.trackError({
        message: event.reason?.message || 'Unhandled Promise Rejection',
        stack: event.reason?.stack,
        category: 'javascript',
        severity: 'medium'
      });
    });

    // Track resource loading errors
    window.addEventListener('error', (event) => {
      if (event.target !== window) {
        const target = event.target as HTMLElement;
        this.trackError({
          message: `Failed to load resource: ${target.tagName}`,
          url: (target as any).src || (target as any).href || 'unknown',
          category: 'resource',
          severity: 'low'
        });
      }
    }, true);

    // Track network errors
    this.trackNetworkErrors();
  }

  /**
   * Track network errors
   */
  private trackNetworkErrors(): void {
    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
      try {
        const response = await originalFetch(...args);
        if (!response.ok) {
          this.trackError({
            message: `HTTP ${response.status}: ${response.statusText}`,
            url: args[0] as string,
            category: 'network',
            severity: response.status >= 500 ? 'high' : 'medium'
          });
        }
        return response;
      } catch (error) {
        this.trackError({
          message: `Network error: ${error}`,
          url: args[0] as string,
          category: 'network',
          severity: 'high'
        });
        throw error;
      }
    };
  }

  /**
   * Track a custom error
   */
  trackError(errorData: Partial<ErrorReport>): void {
    if (this.errorCount >= this.maxErrorsPerSession) {
      return; // Prevent error spam
    }

    const errorReport: ErrorReport = {
      id: this.generateErrorId(),
      message: errorData.message || 'Unknown error',
      stack: errorData.stack,
      url: errorData.url || window.location.href,
      lineNumber: errorData.lineNumber,
      columnNumber: errorData.columnNumber,
      userAgent: navigator.userAgent,
      timestamp: new Date(),
      severity: errorData.severity || 'medium',
      category: errorData.category || 'unknown',
      userId: errorData.userId,
      sessionId: this.sessionId,
      pageUrl: window.location.href,
      referrer: document.referrer,
      screenResolution: `${screen.width}x${screen.height}`,
      viewportSize: `${window.innerWidth}x${window.innerHeight}`,
      connectionType: this.getConnectionType(),
      deviceType: this.getDeviceType(),
      browser: this.getBrowser(),
      os: this.getOS(),
      ...errorData
    };

    this.errors.push(errorReport);
    this.errorCount++;
    this.storeError(errorReport);

    // Log to console in development
    if (!this.isProduction()) {
      console.error('Error tracked:', errorReport);
    }
  }

  /**
   * Track performance errors
   */
  trackPerformanceError(metric: string, value: number, threshold: number): void {
    this.trackError({
      message: `Performance threshold exceeded: ${metric} (${value}ms > ${threshold}ms)`,
      category: 'performance',
      severity: value > threshold * 2 ? 'high' : 'medium'
    });
  }

  /**
   * Track user interaction errors
   */
  trackUserError(action: string, error: string): void {
    this.trackError({
      message: `User action failed: ${action} - ${error}`,
      category: 'user',
      severity: 'low'
    });
  }

  /**
   * Determine error severity
   */
  private determineSeverity(error: any): 'low' | 'medium' | 'high' | 'critical' {
    if (!error) return 'medium';

    const message = error.message || '';
    const stack = error.stack || '';

    // Critical errors
    if (message.includes('ChunkLoadError') || 
        message.includes('Loading chunk') ||
        message.includes('Failed to fetch dynamically imported module')) {
      return 'critical';
    }

    // High severity errors
    if (message.includes('TypeError') || 
        message.includes('ReferenceError') ||
        message.includes('SyntaxError')) {
      return 'high';
    }

    // Medium severity errors
    if (message.includes('Network') || 
        message.includes('fetch') ||
        message.includes('timeout')) {
      return 'medium';
    }

    // Low severity errors
    if (message.includes('ResizeObserver') || 
        message.includes('Non-Error promise rejection')) {
      return 'low';
    }

    return 'medium';
  }

  /**
   * Store error in localStorage
   */
  private storeError(error: ErrorReport): void {
    try {
      const stored = this.getStoredErrors();
      stored.push(error);
      
      // Keep only last 100 errors
      if (stored.length > 100) {
        stored.splice(0, stored.length - 100);
      }
      
      localStorage.setItem('errorReports', JSON.stringify(stored));
    } catch (e) {
      console.warn('Failed to store error report:', e);
    }
  }

  /**
   * Get stored errors
   */
  private getStoredErrors(): ErrorReport[] {
    try {
      const stored = localStorage.getItem('errorReports');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  /**
   * Get error statistics
   */
  getErrorStatistics(): any {
    const allErrors = [...this.errors, ...this.getStoredErrors()];
    
    const errorsByCategory = allErrors.reduce((acc, error) => {
      acc[error.category] = (acc[error.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const errorsBySeverity = allErrors.reduce((acc, error) => {
      acc[error.severity] = (acc[error.severity] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const recentErrors = allErrors
      .filter(error => {
        const dayAgo = new Date();
        dayAgo.setDate(dayAgo.getDate() - 1);
        return new Date(error.timestamp) > dayAgo;
      })
      .length;

    return {
      totalErrors: allErrors.length,
      sessionErrors: this.errors.length,
      recentErrors,
      errorsByCategory,
      errorsBySeverity,
      lastUpdated: new Date().toISOString()
    };
  }

  /**
   * Get critical errors
   */
  getCriticalErrors(): ErrorReport[] {
    const allErrors = [...this.errors, ...this.getStoredErrors()];
    return allErrors.filter(error => error.severity === 'critical');
  }

  /**
   * Get errors by category
   */
  getErrorsByCategory(category: string): ErrorReport[] {
    const allErrors = [...this.errors, ...this.getStoredErrors()];
    return allErrors.filter(error => error.category === category);
  }

  /**
   * Export error data
   */
  exportErrorData(): any {
    return {
      errors: [...this.errors, ...this.getStoredErrors()],
      statistics: this.getErrorStatistics(),
      sessionId: this.sessionId,
      exportedAt: new Date().toISOString()
    };
  }

  /**
   * Clear error data
   */
  clearErrorData(): void {
    localStorage.removeItem('errorReports');
    this.errors = [];
    this.errorCount = 0;
  }

  /**
   * Generate session ID
   */
  private generateSessionId(): string {
    return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  /**
   * Generate error ID
   */
  private generateErrorId(): string {
    return 'error_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  /**
   * Get connection type
   */
  private getConnectionType(): string {
    const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
    return connection ? connection.effectiveType || 'unknown' : 'unknown';
  }

  /**
   * Get device type
   */
  private getDeviceType(): 'mobile' | 'tablet' | 'desktop' {
    const width = window.innerWidth;
    if (width < 768) return 'mobile';
    if (width < 1024) return 'tablet';
    return 'desktop';
  }

  /**
   * Get browser name
   */
  private getBrowser(): string {
    const userAgent = navigator.userAgent;
    if (userAgent.includes('Chrome')) return 'Chrome';
    if (userAgent.includes('Firefox')) return 'Firefox';
    if (userAgent.includes('Safari')) return 'Safari';
    if (userAgent.includes('Edge')) return 'Edge';
    return 'Unknown';
  }

  /**
   * Get operating system
   */
  private getOS(): string {
    const userAgent = navigator.userAgent;
    if (userAgent.includes('Windows')) return 'Windows';
    if (userAgent.includes('Mac')) return 'macOS';
    if (userAgent.includes('Linux')) return 'Linux';
    if (userAgent.includes('Android')) return 'Android';
    if (userAgent.includes('iOS')) return 'iOS';
    return 'Unknown';
  }

  /**
   * Check if in production
   */
  private isProduction(): boolean {
    return window.location.hostname !== 'localhost' && !window.location.hostname.includes('127.0.0.1');
  }
}
