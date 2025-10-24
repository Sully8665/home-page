import { Injectable } from '@angular/core';

export interface ToastOptions {
  duration?: number;
  type?: 'success' | 'error' | 'info' | 'warning';
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  show(message: string, options: ToastOptions = {}): void {
    const {
      duration = 3000,
      type = 'info',
      position = 'top-right'
    } = options;

    const toast = this.createToast(message, type, position);
    document.body.appendChild(toast);

    // Trigger animation
    setTimeout(() => {
      toast.classList.add('show');
    }, 100);

    // Auto remove
    setTimeout(() => {
      this.removeToast(toast);
    }, duration);
  }

  success(message: string, options: Omit<ToastOptions, 'type'> = {}): void {
    this.show(message, { ...options, type: 'success' });
  }

  error(message: string, options: Omit<ToastOptions, 'type'> = {}): void {
    this.show(message, { ...options, type: 'error' });
  }

  info(message: string, options: Omit<ToastOptions, 'type'> = {}): void {
    this.show(message, { ...options, type: 'info' });
  }

  warning(message: string, options: Omit<ToastOptions, 'type'> = {}): void {
    this.show(message, { ...options, type: 'warning' });
  }

  private createToast(message: string, type: string, position: string): HTMLElement {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type} toast-${position}`;
    toast.innerHTML = `
      <div class="toast-content">
        <span class="toast-message">${message}</span>
        <button class="toast-close" onclick="this.parentElement.parentElement.remove()">×</button>
      </div>
    `;

    // Add styles
    const styles = `
      .toast {
        position: fixed;
        z-index: 10000;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        color: white;
        font-weight: 500;
        max-width: 400px;
        transform: translateX(100%);
        transition: all 0.3s ease;
        backdrop-filter: blur(10px);
      }
      
      .toast.show {
        transform: translateX(0);
      }
      
      .toast-success { background: rgba(34, 197, 94, 0.9); }
      .toast-error { background: rgba(239, 68, 68, 0.9); }
      .toast-info { background: rgba(59, 130, 246, 0.9); }
      .toast-warning { background: rgba(245, 158, 11, 0.9); }
      
      .toast-top-right { top: 1rem; right: 1rem; }
      .toast-top-left { top: 1rem; left: 1rem; }
      .toast-bottom-right { bottom: 1rem; right: 1rem; }
      .toast-bottom-left { bottom: 1rem; left: 1rem; }
      .toast-top-center { top: 1rem; left: 50%; transform: translateX(-50%); }
      .toast-bottom-center { bottom: 1rem; left: 50%; transform: translateX(-50%); }
      
      .toast-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
      }
      
      .toast-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: background-color 0.2s ease;
      }
      
      .toast-close:hover {
        background: rgba(255, 255, 255, 0.2);
      }
    `;

    // Add styles if not already added
    if (!document.getElementById('toast-styles')) {
      const styleSheet = document.createElement('style');
      styleSheet.id = 'toast-styles';
      styleSheet.textContent = styles;
      document.head.appendChild(styleSheet);
    }

    return toast;
  }

  private removeToast(toast: HTMLElement): void {
    toast.classList.remove('show');
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 300);
  }
}
