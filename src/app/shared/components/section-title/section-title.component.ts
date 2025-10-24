import { Component, Input } from '@angular/core';
import { LanguageService } from '../../../services/language.service';

@Component({
  selector: 'app-section-title',
  templateUrl: './section-title.component.html',
  styleUrls: ['./section-title.component.scss']
})
export class SectionTitleComponent {
  @Input() titleEn!: string;
  @Input() titleFa!: string;

  constructor(public lang: LanguageService) { }

  getTitle(): string {
    return this.lang.current === 'fa' ? this.titleFa : this.titleEn;
  }
}
