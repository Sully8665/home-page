import { Component } from '@angular/core'; import { SUMMARY, SUMMARY_FA, ROLE, ROLE_FA, NAME, NAME_FA } from '../../shared/models/data'; import { LanguageService } from '../../shared/language.service';
@Component({selector:'app-home', templateUrl:'./home.component.html'})
export class HomeComponent{ constructor(public lang: LanguageService){} NAME=NAME; NAME_FA=NAME_FA; ROLE=ROLE; ROLE_FA=ROLE_FA; get summary(){ return this.lang.current==='fa'? SUMMARY_FA : SUMMARY; } }
