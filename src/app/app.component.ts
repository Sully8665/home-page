import { Component, HostListener, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  
  constructor(private cdr: ChangeDetectorRef) {}
  
  @HostListener('window:hashchange', ['$event'])
  onHashChange(event: HashChangeEvent) {
    // Trigger change detection when hash changes
    this.cdr.detectChanges();
  }
}
