import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';

@Component({
  selector: 'app-scroll-progress',
  template: '<div class="scroll-progress" [style.width.%]="scrollProgress"></div>',
  styles: [`
    .scroll-progress {
      position: fixed;
      top: 0;
      left: 0;
      width: 0%;
      height: 3px;
      background: linear-gradient(90deg, var(--accent), var(--accent-2));
      z-index: 1000;
      transition: width 0.1s ease;
      box-shadow: 0 0 10px rgba(14, 165, 164, 0.5);
    }
  `]
})
export class ScrollProgressComponent implements OnInit, OnDestroy {
  scrollProgress = 0;

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    this.updateScrollProgress();
  }

  ngOnInit() {
    this.updateScrollProgress();
  }

  ngOnDestroy() {
    // Cleanup if needed
  }

  private updateScrollProgress() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    this.scrollProgress = (scrollTop / scrollHeight) * 100;
  }
}
