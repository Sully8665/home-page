import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccessibilityService {

  constructor() { }

  /**
   * Announce a message to screen readers
   * @param message The message to announce
   * @param priority 'polite' or 'assertive'
   */
  announce(message: string, priority: 'polite' | 'assertive' = 'polite'): void {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', priority);
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    // Remove the announcement after it's been read
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }

  /**
   * Set focus to an element
   * @param element The element to focus
   */
  setFocus(element: HTMLElement): void {
    if (element) {
      element.focus();
    }
  }

  /**
   * Set focus to the main content area
   */
  focusMainContent(): void {
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      this.setFocus(mainContent);
    }
  }

  /**
   * Set focus to a specific section
   * @param sectionId The ID of the section to focus
   */
  focusSection(sectionId: string): void {
    const section = document.getElementById(sectionId);
    if (section) {
      this.setFocus(section);
    }
  }

  /**
   * Check if user prefers reduced motion
   */
  prefersReducedMotion(): boolean {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  /**
   * Check if user prefers high contrast
   */
  prefersHighContrast(): boolean {
    return window.matchMedia('(prefers-contrast: high)').matches;
  }

  /**
   * Check if user prefers dark color scheme
   */
  prefersDarkColorScheme(): boolean {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  /**
   * Get the current color scheme preference
   */
  getColorSchemePreference(): 'light' | 'dark' | 'no-preference' {
    if (this.prefersDarkColorScheme()) {
      return 'dark';
    } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light';
    } else {
      return 'no-preference';
    }
  }

  /**
   * Trap focus within a container (useful for modals)
   * @param container The container to trap focus within
   */
  trapFocus(container: HTMLElement): void {
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    container.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    });
  }

  /**
   * Remove focus trap
   * @param container The container to remove focus trap from
   */
  removeFocusTrap(container: HTMLElement): void {
    // Remove event listeners by cloning the element
    const newContainer = container.cloneNode(true) as HTMLElement;
    container.parentNode?.replaceChild(newContainer, container);
  }

  /**
   * Add loading state to an element
   * @param element The element to add loading state to
   * @param loadingText Text to announce to screen readers
   */
  setLoadingState(element: HTMLElement, loadingText: string = 'Loading'): void {
    element.setAttribute('aria-busy', 'true');
    element.setAttribute('aria-label', loadingText);
    this.announce(loadingText);
  }

  /**
   * Remove loading state from an element
   * @param element The element to remove loading state from
   * @param loadedText Text to announce to screen readers
   */
  removeLoadingState(element: HTMLElement, loadedText: string = 'Content loaded'): void {
    element.removeAttribute('aria-busy');
    element.removeAttribute('aria-label');
    this.announce(loadedText);
  }

  /**
   * Set error state for form elements
   * @param element The form element
   * @param errorMessage The error message
   */
  setErrorState(element: HTMLElement, errorMessage: string): void {
    element.setAttribute('aria-invalid', 'true');
    element.setAttribute('aria-describedby', 'error-message');
    
    // Create or update error message element
    let errorElement = document.getElementById('error-message');
    if (!errorElement) {
      errorElement = document.createElement('div');
      errorElement.id = 'error-message';
      errorElement.className = 'error-message';
      errorElement.setAttribute('role', 'alert');
      element.parentNode?.appendChild(errorElement);
    }
    errorElement.textContent = errorMessage;
    
    this.announce(errorMessage, 'assertive');
  }

  /**
   * Clear error state for form elements
   * @param element The form element
   */
  clearErrorState(element: HTMLElement): void {
    element.removeAttribute('aria-invalid');
    element.removeAttribute('aria-describedby');
    
    const errorElement = document.getElementById('error-message');
    if (errorElement) {
      errorElement.remove();
    }
  }

  /**
   * Set success state for form elements
   * @param element The form element
   * @param successMessage The success message
   */
  setSuccessState(element: HTMLElement, successMessage: string): void {
    element.setAttribute('aria-invalid', 'false');
    element.setAttribute('aria-describedby', 'success-message');
    
    // Create or update success message element
    let successElement = document.getElementById('success-message');
    if (!successElement) {
      successElement = document.createElement('div');
      successElement.id = 'success-message';
      successElement.className = 'success-message';
      successElement.setAttribute('role', 'status');
      element.parentNode?.appendChild(successElement);
    }
    successElement.textContent = successMessage;
    
    this.announce(successMessage);
  }

  /**
   * Clear success state for form elements
   * @param element The form element
   */
  clearSuccessState(element: HTMLElement): void {
    element.removeAttribute('aria-invalid');
    element.removeAttribute('aria-describedby');
    
    const successElement = document.getElementById('success-message');
    if (successElement) {
      successElement.remove();
    }
  }

  /**
   * Check if an element is visible to screen readers
   * @param element The element to check
   */
  isVisibleToScreenReader(element: HTMLElement): boolean {
    const style = window.getComputedStyle(element);
    return style.display !== 'none' && 
           style.visibility !== 'hidden' && 
           element.getAttribute('aria-hidden') !== 'true';
  }

  /**
   * Make an element visible to screen readers
   * @param element The element to make visible
   */
  makeVisibleToScreenReader(element: HTMLElement): void {
    element.removeAttribute('aria-hidden');
  }

  /**
   * Hide an element from screen readers
   * @param element The element to hide
   */
  hideFromScreenReader(element: HTMLElement): void {
    element.setAttribute('aria-hidden', 'true');
  }

  /**
   * Get all focusable elements within a container
   * @param container The container to search within
   */
  getFocusableElements(container: HTMLElement): HTMLElement[] {
    const focusableSelectors = [
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      'a[href]',
      '[tabindex]:not([tabindex="-1"])'
    ];
    
    return Array.from(container.querySelectorAll(focusableSelectors.join(', '))) as HTMLElement[];
  }

  /**
   * Navigate to next focusable element
   * @param currentElement The currently focused element
   * @param container The container to search within (defaults to document)
   */
  focusNext(currentElement: HTMLElement, container: HTMLElement = document.body): void {
    const focusableElements = this.getFocusableElements(container);
    const currentIndex = focusableElements.indexOf(currentElement);
    
    if (currentIndex < focusableElements.length - 1) {
      focusableElements[currentIndex + 1].focus();
    }
  }

  /**
   * Navigate to previous focusable element
   * @param currentElement The currently focused element
   * @param container The container to search within (defaults to document)
   */
  focusPrevious(currentElement: HTMLElement, container: HTMLElement = document.body): void {
    const focusableElements = this.getFocusableElements(container);
    const currentIndex = focusableElements.indexOf(currentElement);
    
    if (currentIndex > 0) {
      focusableElements[currentIndex - 1].focus();
    }
  }
}
