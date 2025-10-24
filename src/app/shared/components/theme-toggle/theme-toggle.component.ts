import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  template: `
    <button class="theme-toggle-btn" 
            (click)="toggleTheme()" 
            [title]="isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
            [attr.aria-label]="isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'">
      <i [class]="isDark ? 'bi bi-sun-fill' : 'bi bi-moon-fill'" class="theme-icon"></i>
    </button>
  `,
  styles: [`
    .theme-toggle-btn {
      background: var(--bg);
      border: 1px solid var(--border);
      border-radius: 50%;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.3s ease;
      color: var(--fg);
    }

    .theme-toggle-btn:hover {
      background: var(--accent);
      color: white;
      transform: scale(1.1);
    }

    .theme-toggle-btn:active {
      transform: scale(0.95);
    }

    .theme-icon {
      font-size: 1.2rem;
      transition: all 0.3s ease;
    }

    .theme-toggle-btn:hover .theme-icon {
      transform: rotate(180deg);
    }

    /* Mobile optimization */
    @media (max-width: 768px) {
      .theme-toggle-btn {
        width: 36px;
        height: 36px;
      }

      .theme-icon {
        font-size: 1rem;
      }
    }
  `]
})
export class ThemeToggleComponent implements OnInit, OnDestroy {
  isDark = false;
  private subscription: Subscription = new Subscription();

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    // Set initial theme state
    this.isDark = this.themeService.isDarkTheme();
    
    // Subscribe to theme changes
    this.subscription = this.themeService.theme$.subscribe(theme => {
      this.isDark = this.themeService.isDarkTheme();
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
