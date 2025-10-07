import { Component } from '@angular/core';
import { LanguageService } from '../../services/language.service';
import { SECTION_TITLES, SECTION_TITLES_FA, SUMMARY, SUMMARY_FA } from '../../shared/models/data';
@Component({ selector: 'app-about', templateUrl: './about.component.html' })
export class AboutComponent { constructor(public lang: LanguageService) { } SECTION_TITLES = SECTION_TITLES; SECTION_TITLES_FA = SECTION_TITLES_FA; get summary() { return this.lang.current === 'fa' ? SUMMARY_FA : SUMMARY; } }
