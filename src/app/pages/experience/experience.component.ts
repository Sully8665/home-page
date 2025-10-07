
import { Component } from '@angular/core';
import { LanguageService } from '../../services/language.service';
import { EXPERIENCES, EXPERIENCES_FA, SECTION_TITLES, SECTION_TITLES_FA } from '../../shared/models/data';

@Component({ selector: 'app-experience', templateUrl: './experience.component.html' })
export class ExperienceComponent
{
  constructor(public lang: LanguageService) { }
  SECTION_TITLES = SECTION_TITLES; SECTION_TITLES_FA = SECTION_TITLES_FA;
  get experiences() { const list = this.lang.current === 'fa' ? EXPERIENCES_FA : EXPERIENCES; return [...list].sort((a, b) => (b.year || 0) - (a.year || 0)); }
  showAll = false;
  expanded: Set<number> = new Set<number>();

  visibleExperiences() { return this.experiences; }
  toggleExpand(i: number) { this.expanded.has(i) ? this.expanded.delete(i) : this.expanded.add(i); }
}
