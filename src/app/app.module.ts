
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { FooterComponent } from './core/footer/footer.component';
import { HeaderComponent } from './core/header/header.component';
import { AboutComponent } from './pages/about/about.component';
import { ArticlesComponent } from './pages/articles/articles.component';
import { ContactComponent } from './pages/contact/contact.component';
import { EducationComponent } from './pages/education/education.component';
import { ExperienceComponent } from './pages/experience/experience.component';
import { HomeComponent } from './pages/home/home.component';
import { SkillsComponent } from './pages/skills/skills.component';
import { TestimonialsComponent } from './pages/testimonials/testimonials.component';
import { SkillModalComponent } from './shared/components/skill-modal/skill-modal.component';
import { AnimatedSkillBarComponent } from './shared/components/animated-skill-bar/animated-skill-bar.component';
import { ParticleBackgroundComponent } from './shared/components/particle-background/particle-background.component';
import { ScrollProgressComponent } from './shared/components/scroll-progress/scroll-progress.component';
import { TypewriterComponent } from './shared/components/typewriter/typewriter.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { AchievementsComponent } from './pages/achievements/achievements.component';
import { GitHubStatsComponent } from './shared/components/github-stats/github-stats.component';
import { SectionTitleComponent } from './shared/components/section-title/section-title.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent, HomeComponent, AboutComponent, SkillsComponent, ExperienceComponent,
    TestimonialsComponent, EducationComponent, ContactComponent, SkillModalComponent, ArticlesComponent, AnimatedSkillBarComponent,
    ParticleBackgroundComponent, ScrollProgressComponent, TypewriterComponent, ProjectsComponent, AchievementsComponent, GitHubStatsComponent, SectionTitleComponent],
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, MatIconModule, BrowserAnimationsModule, HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
