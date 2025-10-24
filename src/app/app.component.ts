import { ChangeDetectorRef, Component, HostListener, OnInit, AfterViewInit } from '@angular/core';
import { ThemeService } from './services/theme.service';
import { IntersectionObserverService } from './services/intersection-observer.service';
import { PerformanceService } from './services/performance.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, AfterViewInit
{

  constructor(
    private cdr: ChangeDetectorRef,
    private themeService: ThemeService,
    private intersectionObserver: IntersectionObserverService,
    private performanceService: PerformanceService
  ) { }

  ngOnInit(): void {
    // Initialize theme service
    this.themeService.watchSystemTheme();
    
    // Initialize performance optimizations
    this.performanceService.initialize();
  }

  ngAfterViewInit(): void {
    // Initialize intersection observer for smooth transitions
    this.initializeAnimations();
  }

  private initializeAnimations(): void {
    // Add page enter animation
    document.body.classList.add('page-enter');
    
    // Observe all sections for smooth transitions
    setTimeout(() => {
      const sections = document.querySelectorAll('.section');
      this.intersectionObserver.observeElements(Array.from(sections));
      
      // Observe elements with animation classes
      const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right, .scale-in, .content-reveal');
      this.intersectionObserver.observeElements(Array.from(animatedElements));
      
      // Fallback: reveal all content-reveal elements after 2 seconds if not already revealed
      setTimeout(() => {
        const unrevealedElements = document.querySelectorAll('.content-reveal:not(.revealed)');
        unrevealedElements.forEach(element => {
          element.classList.add('revealed');
        });
      }, 2000);
    }, 100);
  }

  @HostListener('window:hashchange', ['$event'])
  onHashChange(event: HashChangeEvent)
  {
    // Trigger change detection when hash changes
    this.cdr.detectChanges();
  }
}
