import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly THEME_KEY = 'portfolio-theme';
  private readonly DARK_THEME = 'dark-theme';
  private readonly LIGHT_THEME = 'light-theme';
  
  private themeSubject = new BehaviorSubject<string>(this.getInitialTheme());
  public theme$ = this.themeSubject.asObservable();

  constructor() {
    this.initializeTheme();
  }

  private getInitialTheme(): string {
    // Check localStorage first
    const savedTheme = localStorage.getItem(this.THEME_KEY);
    if (savedTheme) {
      return savedTheme;
    }

    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return this.DARK_THEME;
    }

    return this.LIGHT_THEME;
  }

  private initializeTheme(): void {
    const theme = this.getInitialTheme();
    this.setTheme(theme);
  }

  setTheme(theme: string): void {
    const body = document.body;
    const html = document.documentElement;
    
    // Add transition class for smooth animation
    body.classList.add('theme-transitioning');
    html.classList.add('theme-transitioning');
    
    // Remove existing theme classes
    body.classList.remove(this.DARK_THEME, this.LIGHT_THEME);
    html.classList.remove(this.DARK_THEME, this.LIGHT_THEME);
    
    // Add new theme class
    body.classList.add(theme);
    html.classList.add(theme);
    
    // Update meta theme-color
    this.updateMetaThemeColor(theme);
    
    // Save to localStorage
    localStorage.setItem(this.THEME_KEY, theme);
    
    // Update subject
    this.themeSubject.next(theme);
    
    // Remove transition class after animation completes
    setTimeout(() => {
      body.classList.remove('theme-transitioning');
      html.classList.remove('theme-transitioning');
    }, 400);
  }

  toggleTheme(): void {
    const currentTheme = this.getCurrentTheme();
    const newTheme = currentTheme === this.DARK_THEME ? this.LIGHT_THEME : this.DARK_THEME;
    this.setTheme(newTheme);
  }

  getCurrentTheme(): string {
    return this.themeSubject.value;
  }

  isDarkTheme(): boolean {
    return this.getCurrentTheme() === this.DARK_THEME;
  }

  isLightTheme(): boolean {
    return this.getCurrentTheme() === this.LIGHT_THEME;
  }

  private updateMetaThemeColor(theme: string): void {
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', theme === this.DARK_THEME ? '#0e131a' : '#ffffff');
    }
  }

  // Listen to system theme changes
  watchSystemTheme(): void {
    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        // Only update if user hasn't manually set a preference
        if (!localStorage.getItem(this.THEME_KEY)) {
          const systemTheme = e.matches ? this.DARK_THEME : this.LIGHT_THEME;
          this.setTheme(systemTheme);
        }
      });
    }
  }
}
