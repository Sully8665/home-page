import { Component } from '@angular/core';
import { LanguageService } from '../../services/language.service';
import { NAME, NAME_FA, ROLE, ROLE_FA, SUMMARY, SUMMARY_FA } from '../../shared/models/data';
@Component({
    selector: 'app-home', templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent { constructor(public lang: LanguageService) { } NAME = NAME; NAME_FA = NAME_FA; ROLE = ROLE; ROLE_FA = ROLE_FA; get summary() { return this.lang.current === 'fa' ? SUMMARY_FA : SUMMARY; } }
