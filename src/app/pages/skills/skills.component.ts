import { Component } from '@angular/core'; import { SKILLS, SKILLS_FA, SECTION_TITLES, SECTION_TITLES_FA } from '../../shared/models/data'; import { LanguageService } from '../../shared/language.service';
@Component({selector:'app-skills', templateUrl:'./skills.component.html'})
export class SkillsComponent { constructor(public lang: LanguageService){} SECTION_TITLES=SECTION_TITLES; SECTION_TITLES_FA=SECTION_TITLES_FA; get skills(){ return SKILLS; } }
