import { Component } from '@angular/core';
import { LanguageService } from '../../services/language.service';
import { ClipboardService } from '../../services/clipboard.service';
import { ToastService } from '../../services/toast.service';
import { CONTACT_INFO, CONTACT_INTRO, CONTACT_INTRO_FA, ContactInfo, SECTION_TITLES, SECTION_TITLES_FA } from '../../shared/models/data';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent
{
  constructor(
    public lang: LanguageService,
    private clipboardService: ClipboardService,
    private toastService: ToastService
  ) { }

  SECTION_TITLES = SECTION_TITLES;
  SECTION_TITLES_FA = SECTION_TITLES_FA;
  CONTACT_INTRO = CONTACT_INTRO;
  CONTACT_INTRO_FA = CONTACT_INTRO_FA;

  showToast = false;
  toastMessage = '';
  toastType = '';

  get contactInfo(): ContactInfo[]
  {
    return CONTACT_INFO;
  }

  async copyToClipboard(text: string, type: string)
  {
    if (type === 'Email') text = text.replace('[at]', '@');
    
    const success = await this.clipboardService.copyToClipboard(text);
    if (success) {
      this.toastService.success(`${type} copied to clipboard!`);
    } else {
      this.toastService.error('Failed to copy to clipboard');
    }
  }
}
