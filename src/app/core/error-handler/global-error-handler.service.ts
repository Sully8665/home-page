import { ErrorHandler, Injectable } from '@angular/core';
import { ToastService } from '../../services/toast.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandlerService implements ErrorHandler {
  
  constructor(private toastService: ToastService) {}

  handleError(error: any): void {
    console.error('Global error:', error);
    
    // In development mode, be more lenient with error handling
    const isDevelopment = !environment.production;
    
    // Ignore common non-critical errors
    if (this.shouldIgnoreError(error)) {
      return;
    }
    
    // In development, only show critical errors
    if (isDevelopment && !this.isCriticalError(error)) {
      return;
    }
    
    // Handle different types of errors
    if (error?.message?.includes('GitHub API') || error?.message?.includes('github.com')) {
      this.toastService.error('Failed to load GitHub statistics. Please try again later.');
    } else if (error?.message?.includes('Network') || error?.message?.includes('fetch')) {
      this.toastService.error('Network error. Please check your connection.');
    } else if (error?.message?.includes('Clipboard') || error?.message?.includes('clipboard')) {
      this.toastService.error('Failed to copy to clipboard.');
    } else if (error?.message?.includes('ResizeObserver')) {
      // Ignore ResizeObserver errors - they're common and not critical
      return;
    } else if (error?.message?.includes('Non-Error promise rejection')) {
      // Ignore promise rejection errors that are not actual errors
      return;
    } else {
      // Only show generic error for truly unexpected errors
      if (this.isCriticalError(error)) {
        this.toastService.error('An unexpected error occurred. Please refresh the page.');
      }
    }

    // Log error for debugging (in production, send to logging service)
    this.logError(error);
  }

  private shouldIgnoreError(error: any): boolean {
    const errorMessage = error?.message || '';
    const errorStack = error?.stack || '';
    
    // List of errors to ignore
    const ignorableErrors = [
      'ResizeObserver loop limit exceeded',
      'Non-Error promise rejection',
      'Script error',
      'Loading chunk',
      'Loading CSS chunk',
      'ChunkLoadError',
      'Loading module',
      'Failed to fetch dynamically imported module'
    ];
    
    return ignorableErrors.some(ignorableError => 
      errorMessage.includes(ignorableError) || errorStack.includes(ignorableError)
    );
  }

  private isCriticalError(error: any): boolean {
    const errorMessage = error?.message || '';
    const errorStack = error?.stack || '';
    
    // Only show toast for critical errors
    const criticalErrors = [
      'TypeError',
      'ReferenceError',
      'SyntaxError',
      'RangeError'
    ];
    
    return criticalErrors.some(criticalError => 
      errorMessage.includes(criticalError) || errorStack.includes(criticalError)
    );
  }

  private logError(error: any): void {
    // In production, you would send this to a logging service
    // For now, we'll just log to console
    const errorInfo = {
      message: error?.message || 'Unknown error',
      stack: error?.stack,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href
    };
    
    console.error('Error details:', errorInfo);
  }
}
