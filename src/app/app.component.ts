import { ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit
{

  constructor(
    private cdr: ChangeDetectorRef,
    private themeService: ThemeService
  ) { }

  ngOnInit(): void {
    // Initialize theme service
    this.themeService.watchSystemTheme();
  }

  @HostListener('window:hashchange', ['$event'])
  onHashChange(event: HashChangeEvent)
  {
    // Trigger change detection when hash changes
    this.cdr.detectChanges();
  }
}
