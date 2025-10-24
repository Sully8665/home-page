import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ToastService, Toast } from '../../../services/toast.service';

@Component({
  selector: 'app-toast',
  template: `
    <div class="toast-container" [class.show]="showToast">
      <div class="toast-message" 
           [class.success]="currentToast?.type === 'success'" 
           [class.error]="currentToast?.type === 'error'"
           [class.info]="currentToast?.type === 'info'">
        <div class="toast-content">
          <i [class]="getToastIcon()" class="toast-icon"></i>
          <span class="toast-text">{{ currentToast?.message }}</span>
        </div>
        <button class="toast-close" (click)="hideToast()" aria-label="Close notification">
          <i class="bi bi-x"></i>
        </button>
      </div>
    </div>
  `,
  styles: [`
    .toast-container {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 9999;
      opacity: 0;
      transform: translateX(100%);
      transition: all 0.3s ease;
    }

    .toast-container.show {
      opacity: 1;
      transform: translateX(0);
    }

    .toast-message {
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 1rem;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      display: flex;
      align-items: center;
      justify-content: space-between;
      min-width: 300px;
      max-width: 400px;
    }

    .toast-message.success {
      border-left: 4px solid #28a745;
    }

    .toast-message.error {
      border-left: 4px solid #dc3545;
    }

    .toast-message.info {
      border-left: 4px solid #17a2b8;
    }

    .toast-content {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .toast-icon {
      font-size: 1.2rem;
    }

    .toast-message.success .toast-icon {
      color: #28a745;
    }

    .toast-message.error .toast-icon {
      color: #dc3545;
    }

    .toast-message.info .toast-icon {
      color: #17a2b8;
    }

    .toast-text {
      color: var(--fg);
      font-size: 0.9rem;
    }

    .toast-close {
      background: none;
      border: none;
      color: var(--muted);
      cursor: pointer;
      padding: 0.25rem;
      border-radius: 4px;
      transition: all 0.2s ease;
    }

    .toast-close:hover {
      background: var(--border);
      color: var(--fg);
    }

    /* Mobile responsive */
    @media (max-width: 768px) {
      .toast-container {
        top: 10px;
        right: 10px;
        left: 10px;
      }

      .toast-message {
        min-width: auto;
        max-width: none;
      }
    }
  `]
})
export class ToastComponent implements OnInit, OnDestroy {
  showToast = false;
  currentToast: Toast | null = null;
  private subscription: Subscription = new Subscription();
  private hideTimeout: any;

  constructor(private toastService: ToastService) {}

  ngOnInit(): void {
    this.subscription = this.toastService.toastState.subscribe((toast: Toast) => {
      this.showToast = true;
      this.currentToast = toast;
      
      // Auto-hide after duration
      if (this.hideTimeout) {
        clearTimeout(this.hideTimeout);
      }
      
      this.hideTimeout = setTimeout(() => {
        this.hideToast();
      }, toast.duration || 3000);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
    }
  }

  hideToast(): void {
    this.showToast = false;
    this.currentToast = null;
  }

  getToastIcon(): string {
    if (!this.currentToast) return '';
    
    switch (this.currentToast.type) {
      case 'success':
        return 'bi bi-check-circle-fill';
      case 'error':
        return 'bi bi-exclamation-circle-fill';
      case 'info':
      default:
        return 'bi bi-info-circle-fill';
    }
  }
}
