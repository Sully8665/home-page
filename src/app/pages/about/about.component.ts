import { Component } from '@angular/core'; import { SUMMARY, SUMMARY_FA, SECTION_TITLES, SECTION_TITLES_FA } from '../../shared/models/data'; import { LanguageService } from '../../shared/language.service';
@Component({selector:'app-about', templateUrl:'./about.component.html'})
export class AboutComponent { constructor(public lang: LanguageService){} SECTION_TITLES=SECTION_TITLES; SECTION_TITLES_FA=SECTION_TITLES_FA; get summary(){ return this.lang.current==='fa'? SUMMARY_FA : SUMMARY; } }
