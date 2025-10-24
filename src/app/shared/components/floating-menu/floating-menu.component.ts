import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { LanguageService } from '../../../services/language.service';
import { NAV_LABELS, NAV_LABELS_FA, NAME, NAME_FA } from '../../models/data';

@Component({
  selector: 'app-floating-menu',
  template: `
    <div class="floating-menu" [class.active]="isMenuOpen" [class.visible]="showMenu">
      <!-- Menu Toggle Button -->
      <button class="menu-toggle" (click)="toggleMenu()" [title]="isMenuOpen ? 'Close Menu' : 'Open Menu'">
        <i class="bi" [class.bi-list]="!isMenuOpen" [class.bi-x]="isMenuOpen"></i>
      </button>

      <!-- Menu Items -->
      <div class="menu-items" [class.open]="isMenuOpen">
        <div class="menu-header">
          <h6>{{ lang.current === 'fa' ? NAME_FA : NAME }}</h6>
        </div>
        
        <div class="menu-list">
          <a href="#home" class="menu-item" (click)="closeMenu()" [class.active]="activeSection === 'home'">
            <i class="bi bi-house"></i>
            <span>{{ lang.current === 'fa' ? 'خانه' : 'Home' }}</span>
          </a>
          
          <a href="#about" class="menu-item" (click)="closeMenu()" [class.active]="activeSection === 'about'">
            <i class="bi bi-person"></i>
            <span>{{ lang.current === 'fa' ? NAV_FA.about : NAV.about }}</span>
          </a>
          
          <a href="#skills" class="menu-item" (click)="closeMenu()" [class.active]="activeSection === 'skills'">
            <i class="bi bi-gear"></i>
            <span>{{ lang.current === 'fa' ? NAV_FA.skills : NAV.skills }}</span>
          </a>
          
          <a href="#projects" class="menu-item" (click)="closeMenu()" [class.active]="activeSection === 'projects'">
            <i class="bi bi-folder"></i>
            <span>{{ lang.current === 'fa' ? 'پروژه‌ها' : 'Projects' }}</span>
          </a>
          
          <a href="#experience" class="menu-item" (click)="closeMenu()" [class.active]="activeSection === 'experience'">
            <i class="bi bi-briefcase"></i>
            <span>{{ lang.current === 'fa' ? NAV_FA.experience : NAV.experience }}</span>
          </a>
          
          <a href="#achievements" class="menu-item" (click)="closeMenu()" [class.active]="activeSection === 'achievements'">
            <i class="bi bi-trophy"></i>
            <span>{{ lang.current === 'fa' ? 'دستاوردها' : 'Achievements' }}</span>
          </a>
          
          <a href="#education" class="menu-item" (click)="closeMenu()" [class.active]="activeSection === 'education'">
            <i class="bi bi-mortarboard"></i>
            <span>{{ lang.current === 'fa' ? NAV_FA.education : NAV.education }}</span>
          </a>
          
          <a href="#testimonials" class="menu-item" (click)="closeMenu()" [class.active]="activeSection === 'testimonials'">
            <i class="bi bi-quote"></i>
            <span>{{ lang.current === 'fa' ? NAV_FA.testimonials : NAV.testimonials }}</span>
          </a>
          
          <a href="#articles" class="menu-item" (click)="closeMenu()" [class.active]="activeSection === 'articles'">
            <i class="bi bi-newspaper"></i>
            <span>{{ lang.current === 'fa' ? NAV_FA.article : NAV.article }}</span>
          </a>
          
          <a href="#contact" class="menu-item" (click)="closeMenu()" [class.active]="activeSection === 'contact'">
            <i class="bi bi-envelope"></i>
            <span>{{ lang.current === 'fa' ? NAV_FA.contact : NAV.contact }}</span>
          </a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .floating-menu {
      position: fixed;
      bottom: 30px;
      right: 30px;
      z-index: 1000;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.3s ease, visibility 0.3s ease;
    }

    .floating-menu.visible {
      opacity: 1;
      visibility: visible;
    }

    .menu-toggle {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: var(--accent);
      border: none;
      color: white;
      font-size: 1.5rem;
      cursor: pointer;
      box-shadow: 0 4px 20px rgba(14, 165, 164, 0.3);
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .menu-toggle:hover {
      background: var(--accent-2);
      transform: scale(1.1);
      box-shadow: 0 6px 25px rgba(14, 165, 164, 0.4);
    }

    .menu-toggle:active {
      transform: scale(0.95);
    }

    .menu-items {
      position: absolute;
      bottom: 80px;
      right: 0;
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 16px;
      box-shadow: var(--shadow);
      min-width: 250px;
      max-height: 0;
      overflow: hidden;
      opacity: 0;
      transform: translateY(20px);
      transition: all 0.3s ease;
    }

    .menu-items.open {
      max-height: 500px;
      opacity: 1;
      transform: translateY(0);
    }

    .menu-header {
      padding: 1rem 1.5rem 0.5rem;
      border-bottom: 1px solid var(--border);
      text-align: center;
    }

    .menu-header h6 {
      margin: 0;
      color: var(--fg);
      font-weight: 600;
      font-size: 0.9rem;
    }

    .menu-list {
      padding: 0.5rem 0;
    }

    .menu-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.75rem 1.5rem;
      color: var(--fg);
      text-decoration: none;
      transition: all 0.2s ease;
      border-left: 3px solid transparent;
    }

    .menu-item:hover {
      background: var(--border);
      color: var(--accent);
      border-left-color: var(--accent);
    }

    .menu-item.active {
      background: rgba(14, 165, 164, 0.1);
      color: var(--accent);
      border-left-color: var(--accent);
      font-weight: 600;
    }

    .menu-item i {
      font-size: 1.1rem;
      width: 20px;
      text-align: center;
    }

    .menu-item span {
      font-size: 0.9rem;
    }

    /* Mobile Optimization */
    @media (max-width: 768px) {
      .floating-menu {
        bottom: 20px;
        right: 20px;
      }

      .menu-toggle {
        width: 50px;
        height: 50px;
        font-size: 1.3rem;
      }

      .menu-items {
        bottom: 70px;
        right: -10px;
        min-width: 220px;
      }

      .menu-item {
        padding: 0.6rem 1.2rem;
        gap: 0.6rem;
      }

      .menu-item span {
        font-size: 0.85rem;
      }
    }

    /* Animation for menu items */
    .menu-item {
      opacity: 0;
      transform: translateX(20px);
      transition: all 0.3s ease;
    }

    .menu-items.open .menu-item {
      opacity: 1;
      transform: translateX(0);
    }

    .menu-items.open .menu-item:nth-child(1) { transition-delay: 0.05s; }
    .menu-items.open .menu-item:nth-child(2) { transition-delay: 0.1s; }
    .menu-items.open .menu-item:nth-child(3) { transition-delay: 0.15s; }
    .menu-items.open .menu-item:nth-child(4) { transition-delay: 0.2s; }
    .menu-items.open .menu-item:nth-child(5) { transition-delay: 0.25s; }
    .menu-items.open .menu-item:nth-child(6) { transition-delay: 0.3s; }
    .menu-items.open .menu-item:nth-child(7) { transition-delay: 0.35s; }
    .menu-items.open .menu-item:nth-child(8) { transition-delay: 0.4s; }
    .menu-items.open .menu-item:nth-child(9) { transition-delay: 0.45s; }
    .menu-items.open .menu-item:nth-child(10) { transition-delay: 0.5s; }
  `]
})
export class FloatingMenuComponent implements OnInit, OnDestroy {
  showMenu = false;
  isMenuOpen = false;
  activeSection = 'home';
  private scrollThreshold = 200;

  // Navigation data
  NAV = NAV_LABELS;
  NAV_FA = NAV_LABELS_FA;
  NAME = NAME;
  NAME_FA = NAME_FA;

  constructor(public lang: LanguageService) {}

  ngOnInit(): void {
    this.setupScrollListener();
    this.setupSectionObserver();
  }

  ngOnDestroy(): void {
    // Cleanup handled by HostListener
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const scrollY = window.scrollY;
    this.showMenu = scrollY > this.scrollThreshold;
  }

  @HostListener('window:resize', [])
  onWindowResize(): void {
    // Close menu on resize
    if (this.isMenuOpen) {
      this.closeMenu();
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    const menuElement = target.closest('.floating-menu');
    
    if (!menuElement && this.isMenuOpen) {
      this.closeMenu();
    }
  }

  private setupScrollListener(): void {
    // Initial check
    this.onWindowScroll();
  }

  private setupSectionObserver(): void {
    const sections = ['home', 'about', 'skills', 'projects', 'experience', 'achievements', 'education', 'testimonials', 'articles', 'contact'];
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          if (sections.includes(sectionId)) {
            this.activeSection = sectionId;
          }
        }
      });
    }, {
      threshold: 0.3,
      rootMargin: '-100px 0px -50% 0px'
    });

    sections.forEach(sectionId => {
      const element = document.getElementById(sectionId);
      if (element) {
        observer.observe(element);
      }
    });
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }
}
