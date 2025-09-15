import { Component } from '@angular/core';
import { TESTIMONIALS, TESTIMONIALS_FA, Testimonial, SECTION_TITLES, SECTION_TITLES_FA } from '../../shared/models/data';
import { LanguageService } from '../../shared/language.service';

@Component({ selector:'app-testimonials', templateUrl:'./testimonials.component.html' })
export class TestimonialsComponent {
  constructor(public lang: LanguageService){}
  SECTION_TITLES=SECTION_TITLES; SECTION_TITLES_FA=SECTION_TITLES_FA;
  get testimonials(): Testimonial[] { return this.lang.current==='fa'? TESTIMONIALS_FA : TESTIMONIALS; }
}


