import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appKeyboardNavigation]'
})
export class KeyboardNavigationDirective implements OnInit {
  @Input() appKeyboardNavigation: string = '';
  @Input() navigationTarget?: string;
  @Input() announceOnFocus: boolean = true;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    // Ensure the element is focusable
    if (!this.el.nativeElement.hasAttribute('tabindex') && 
        !['button', 'a', 'input', 'select', 'textarea'].includes(this.el.nativeElement.tagName.toLowerCase())) {
      this.el.nativeElement.setAttribute('tabindex', '0');
    }
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'Enter':
      case ' ':
        if (this.navigationTarget) {
          event.preventDefault();
          this.navigateToTarget();
        }
        break;
      case 'ArrowDown':
        event.preventDefault();
        this.focusNext();
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.focusPrevious();
        break;
      case 'Home':
        event.preventDefault();
        this.focusFirst();
        break;
      case 'End':
        event.preventDefault();
        this.focusLast();
        break;
    }
  }

  @HostListener('focus', ['$event'])
  onFocus(event: FocusEvent): void {
    if (this.announceOnFocus && this.appKeyboardNavigation) {
      this.announceToScreenReader(this.appKeyboardNavigation);
    }
  }

  private navigateToTarget(): void {
    if (this.navigationTarget) {
      const target = document.querySelector(this.navigationTarget);
      if (target) {
        (target as HTMLElement).focus();
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }

  private focusNext(): void {
    const focusableElements = this.getFocusableElements();
    const currentIndex = focusableElements.indexOf(this.el.nativeElement);
    
    if (currentIndex < focusableElements.length - 1) {
      focusableElements[currentIndex + 1].focus();
    }
  }

  private focusPrevious(): void {
    const focusableElements = this.getFocusableElements();
    const currentIndex = focusableElements.indexOf(this.el.nativeElement);
    
    if (currentIndex > 0) {
      focusableElements[currentIndex - 1].focus();
    }
  }

  private focusFirst(): void {
    const focusableElements = this.getFocusableElements();
    if (focusableElements.length > 0) {
      focusableElements[0].focus();
    }
  }

  private focusLast(): void {
    const focusableElements = this.getFocusableElements();
    if (focusableElements.length > 0) {
      focusableElements[focusableElements.length - 1].focus();
    }
  }

  private getFocusableElements(): HTMLElement[] {
    const focusableSelectors = [
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      'a[href]',
      '[tabindex]:not([tabindex="-1"])'
    ];
    
    return Array.from(document.querySelectorAll(focusableSelectors.join(', '))) as HTMLElement[];
  }

  private announceToScreenReader(message: string): void {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      if (document.body.contains(announcement)) {
        document.body.removeChild(announcement);
      }
    }, 1000);
  }
}
