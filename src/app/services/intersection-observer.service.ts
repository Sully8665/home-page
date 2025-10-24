import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IntersectionObserverService {
  private observer?: IntersectionObserver;
  private visibleElements = new Set<Element>();
  private animationSubject = new BehaviorSubject<Set<Element>>(new Set());

  constructor() {
    this.initializeObserver();
  }

  private initializeObserver(): void {
    const options = {
      root: null,
      rootMargin: '-10% 0px -10% 0px',
      threshold: 0.1
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.visibleElements.add(entry.target);
          entry.target.classList.add('visible');
          entry.target.classList.add('animate-in');
          entry.target.classList.add('revealed');
        } else {
          this.visibleElements.delete(entry.target);
          entry.target.classList.remove('visible');
          entry.target.classList.remove('animate-in');
          entry.target.classList.remove('revealed');
        }
      });
      this.animationSubject.next(new Set(this.visibleElements));
    }, options);
  }

  observeElement(element: Element): void {
    if (this.observer) {
      this.observer.observe(element);
    }
  }

  unobserveElement(element: Element): void {
    if (this.observer) {
      this.observer.unobserve(element);
    }
  }

  observeElements(elements: Element[]): void {
    elements.forEach(element => this.observeElement(element));
  }

  unobserveElements(elements: Element[]): void {
    elements.forEach(element => this.unobserveElement(element));
  }

  getVisibleElements(): Observable<Set<Element>> {
    return this.animationSubject.asObservable();
  }

  isElementVisible(element: Element): boolean {
    return this.visibleElements.has(element);
  }

  destroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
