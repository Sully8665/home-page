import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SkillDetail } from '../../models/data';
import { LanguageService } from '../../language.service';

@Component({
  selector: 'app-skill-modal',
  templateUrl: './skill-modal.component.html',
  styleUrls: ['./skill-modal.component.css']
})
export class SkillModalComponent {
  @Input() skillDetail: SkillDetail | null = null;
  @Input() isOpen: boolean = false;
  @Output() closeModal = new EventEmitter<void>();

  constructor(public lang: LanguageService) {}

  onClose() {
    this.closeModal.emit();
  }

  onBackdropClick(event: Event) {
    if (event.target === event.currentTarget) {
      this.onClose();
    }
  }
}
