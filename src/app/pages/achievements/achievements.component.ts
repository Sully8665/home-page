import { Component } from '@angular/core';
import { LanguageService } from '../../services/language.service';
import { ACHIEVEMENTS, Achievement } from '../../shared/models/data';

@Component({
  selector: 'app-achievements',
  templateUrl: './achievements.component.html',
  styleUrls: ['./achievements.component.css']
})
export class AchievementsComponent {
  constructor(public lang: LanguageService) { }


  achievements: Achievement[] = ACHIEVEMENTS;

  get achievementsByType() {
    const grouped = this.achievements.reduce((acc, achievement) => {
      if (!acc[achievement.type]) {
        acc[achievement.type] = [];
      }
      acc[achievement.type].push(achievement);
      return acc;
    }, {} as { [key: string]: Achievement[] });

    return grouped;
  }

  getTypeLabel(type: string): string {
    const labels: { [key: string]: string } = {
      'certification': this.lang.current === 'fa' ? 'گواهینامه‌ها' : 'Certifications',
      'award': this.lang.current === 'fa' ? 'جوایز' : 'Awards',
      'recognition': this.lang.current === 'fa' ? 'تشخیصات' : 'Recognition',
      'milestone': this.lang.current === 'fa' ? 'نقاط عطف' : 'Milestones',
      'achievement': this.lang.current === 'fa' ? 'دستاوردها' : 'Achievements'
    };
    return labels[type] || type;
  }

  // Add Object reference for template
  Object = Object;
}
