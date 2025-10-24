import { Component } from '@angular/core';
import { LanguageService } from '../../services/language.service';
import { PROJECTS, Project } from '../../shared/models/data';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {
  constructor(public lang: LanguageService) { }

  projects: Project[] = PROJECTS;

  get featuredProjects(): Project[] {
    return this.projects.filter(project => project.featured);
  }

  get allProjects(): Project[] {
    return this.projects;
  }

  getProjectsByCategory(category: string): Project[] {
    return this.projects.filter(project => project.category === category);
  }
}
