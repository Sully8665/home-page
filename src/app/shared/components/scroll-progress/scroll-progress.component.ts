import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';

@Component({
  selector: 'app-scroll-progress',
  template: `
    <div class="scroll-progress-bar" [style.width.%]="scrollProgress">
      <div class="scroll-progress-glow"></div>
    </div>
  `,
  styles: [`
    .scroll-progress-bar {
      position: fixed;
      top: 0;
      left: 0;
      width: 0%;
      height: 4px;
      background: linear-gradient(90deg, var(--accent), var(--accent-2));
      z-index: 9999;
      transition: width 0.1s ease;
      box-shadow: 0 0 15px rgba(14, 165, 164, 0.6);
      border-radius: 0 2px 2px 0;
      max-width: 100vw; /* Ensure it doesn't exceed viewport width */
      overflow: hidden; /* Prevent any overflow */
    }
    
    .scroll-progress-glow {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
      animation: shimmer 2s infinite;
      border-radius: 0 2px 2px 0;
    }
    
    @keyframes shimmer {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(100%); }
    }
    
    /* Dark theme adjustments */
    .dark-theme .scroll-progress-bar {
      box-shadow: 0 0 15px rgba(14, 165, 164, 0.8);
    }
  `]
})
export class ScrollProgressComponent implements OnInit, OnDestroy {
  scrollProgress = 0;

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    this.updateScrollProgress();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
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
    
    if (scrollHeight > 0) {
      this.scrollProgress = Math.min((scrollTop / scrollHeight) * 100, 100);
    } else {
      this.scrollProgress = 0;
    }
  }
}
