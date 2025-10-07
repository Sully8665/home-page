import { Component } from '@angular/core';
import { LanguageService } from '../../services/language.service';
import { EDUCATION, EDUCATION_FA, SECTION_TITLES, SECTION_TITLES_FA } from '../../shared/models/data';
@Component({ selector: 'app-education', templateUrl: './education.component.html' })
export class EducationComponent { constructor(public lang: LanguageService) { } SECTION_TITLES = SECTION_TITLES; SECTION_TITLES_FA = SECTION_TITLES_FA; get education() { return this.lang.current === 'fa' ? EDUCATION_FA : EDUCATION; } }
