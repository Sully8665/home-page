import { Component } from '@angular/core';
import { LanguageService } from '../../services/language.service';
import { SECTION_TITLES, SECTION_TITLES_FA, TESTIMONIALS, TESTIMONIALS_FA, Testimonial } from '../../shared/models/data';

@Component({ selector: 'app-testimonials', templateUrl: './testimonials.component.html' })
export class TestimonialsComponent
{
  constructor(public lang: LanguageService) { }
  SECTION_TITLES = SECTION_TITLES; SECTION_TITLES_FA = SECTION_TITLES_FA;
  get testimonials(): Testimonial[] { return this.lang.current === 'fa' ? TESTIMONIALS_FA : TESTIMONIALS; }
}


