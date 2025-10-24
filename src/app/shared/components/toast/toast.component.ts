import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ToastService, Toast } from '../../../services/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
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
