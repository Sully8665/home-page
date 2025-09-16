import { Component } from '@angular/core';
import { CONTACT_INFO, CONTACT_INTRO, CONTACT_INTRO_FA, SECTION_TITLES, SECTION_TITLES_FA, ContactInfo } from '../../shared/models/data';
import { LanguageService } from '../../shared/language.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  constructor(public lang: LanguageService) {}

  SECTION_TITLES = SECTION_TITLES;
  SECTION_TITLES_FA = SECTION_TITLES_FA;
  CONTACT_INTRO = CONTACT_INTRO;
  CONTACT_INTRO_FA = CONTACT_INTRO_FA;

  get contactInfo(): ContactInfo[] {
    return CONTACT_INFO;
  }

  onContactClick(contact: ContactInfo) {
    // Add analytics or tracking here if needed
    console.log(`Contact clicked: ${contact.type} - ${contact.value}`);
  }

  copyToClipboard(text: string, type: string) {
    navigator.clipboard.writeText(text).then(() => {
      // You could add a toast notification here
      console.log(`${type} copied to clipboard: ${text}`);
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  }
}
