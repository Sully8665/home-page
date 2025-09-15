import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private lang: 'en'|'fa' = (localStorage.getItem('lang') as any) || 'en';

  get current(): 'en'|'fa' { return this.lang; }

  toggle(){ this.set(this.lang === 'en' ? 'fa' : 'en'); }

  set(lang: 'en'|'fa'){
    this.lang = lang;
    localStorage.setItem('lang', lang);
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';
  }
}


