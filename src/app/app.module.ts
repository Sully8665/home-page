
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

import { AppComponent } from './app.component';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { SkillsComponent } from './pages/skills/skills.component';
import { ExperienceComponent } from './pages/experience/experience.component';
import { EducationComponent } from './pages/education/education.component';
import { TestimonialsComponent } from './pages/testimonials/testimonials.component';
import { ContactComponent } from './pages/contact/contact.component';
import { SkillModalComponent } from './shared/components/skill-modal/skill-modal.component';
import { MarkdownPipe } from './shared/pipes/markdown.pipe';

@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent, HomeComponent, AboutComponent, SkillsComponent, ExperienceComponent, EducationComponent, TestimonialsComponent, ContactComponent, SkillModalComponent, MarkdownPipe],
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, MatIconModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
