import { Component } from '@angular/core';
import { LanguageService } from '../../shared/language.service';
import { CONTACT_INFO, CONTACT_INTRO, CONTACT_INTRO_FA, ContactInfo, SECTION_TITLES, SECTION_TITLES_FA } from '../../shared/models/data';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent
{
  constructor(public lang: LanguageService) { }

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

  onContactClick(contact: ContactInfo)
  {
    // Add analytics or tracking here if needed
    console.log(`Contact clicked: ${ contact.type } - ${ contact.value }`);
  }

  // copyToClipboard(text: string, type: string) {
  //   navigator.clipboard.writeText(text).then(() => {
  //     // You could add a toast notification here
  //     console.log(`${type} copied to clipboard: ${text}`);
  //   }).catch(err => {
  //     console.error('Failed to copy: ', err);
  //   });
  // }
  copyToClipboard(text: string, type: string)
  {
    navigator.clipboard.writeText(text).then(() =>
    {
      // Show success toast
      this.toastMessage = `${ type } copied to clipboard!`;
      this.toastType = 'success';
      this.showToast = true;

      // Auto hide after 3 seconds
      setTimeout(() =>
      {
        this.showToast = false;
      }, 3000);

    }).catch(err =>
    {
      // Show error toast
      this.toastMessage = 'Failed to copy to clipboard';
      this.toastType = 'error';
      this.showToast = true;

      // Auto hide after 3 seconds
      setTimeout(() =>
      {
        this.showToast = false;
      }, 3000);

      console.error('Failed to copy: ', err);
    });
  }
}
