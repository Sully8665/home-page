
import { Component } from '@angular/core';
import { CONTACT_INTRO, CONTACT_INTRO_FA, SECTION_TITLES, SECTION_TITLES_FA } from '../../shared/models/data';
import { LanguageService } from '../../shared/language.service';
@Component({ selector:'app-contact', templateUrl:'./contact.component.html' })
export class ContactComponent {
  copied = false;
  CONTACT_INTRO = CONTACT_INTRO;
  CONTACT_INTRO_FA = CONTACT_INTRO_FA;
  SECTION_TITLES = SECTION_TITLES;
  SECTION_TITLES_FA = SECTION_TITLES_FA;
  constructor(public lang: LanguageService){}
  copyEmail(){
    navigator.clipboard.writeText('saleh.rezaei@gmail.com').then(()=>{
      this.copied = true;
      setTimeout(()=> this.copied = false, 2000);
    });
  }
}
