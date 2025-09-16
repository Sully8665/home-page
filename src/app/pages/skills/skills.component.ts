import { Component } from '@angular/core';
import { SKILLS, SKILLS_FA, SECTION_TITLES, SECTION_TITLES_FA, SKILL_DETAILS, SkillDetail } from '../../shared/models/data';
import { LanguageService } from '../../shared/language.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent {
  selectedSkill: SkillDetail | null = null;
  isModalOpen = false;

  constructor(public lang: LanguageService) {}

  SECTION_TITLES = SECTION_TITLES;
  SECTION_TITLES_FA = SECTION_TITLES_FA;

  get skills() {
    return SKILLS;
  }

  get skillDetails() {
    return SKILL_DETAILS;
  }

  onSkillClick(skillName: string) {
    this.selectedSkill = this.skillDetails.find(skill => skill.name === skillName) || null;
    this.isModalOpen = true;
  }

  onCloseModal() {
    this.isModalOpen = false;
    this.selectedSkill = null;
  }
}
