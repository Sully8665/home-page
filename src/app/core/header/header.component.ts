
import { Component } from '@angular/core';
import { LanguageService } from '../../shared/language.service';
import { NAME, NAME_FA, NAV_LABELS, NAV_LABELS_FA } from '../../shared/models/data';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent
{
  theme: 'light' | 'dark' = (localStorage.getItem('theme') as any) || 'dark';
  activeSectionId: string = 'home';
  get currentLang() { return this.lang.current; }
  NAME = NAME; NAME_FA = NAME_FA;
  NAV = NAV_LABELS; NAV_FA = NAV_LABELS_FA;
  constructor(public lang: LanguageService) { document.documentElement.classList.toggle('theme-dark', this.theme === 'dark'); }
  toggleTheme() { this.theme = this.theme === 'light' ? 'dark' : 'light'; document.documentElement.classList.toggle('theme-dark', this.theme === 'dark'); localStorage.setItem('theme', this.theme); }
  toggleLang() { this.lang.toggle(); }
  ngOnInit()
  {
    const onScroll = () =>
    {
      const sectionIds = ['home', 'about', 'skills', 'experience', 'education', 'testimonials'];
      let current = 'home';
      for (const id of sectionIds)
      {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= 140 && rect.bottom >= 140) { current = id; break; }
      }
      this.activeSectionId = current;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }
}
