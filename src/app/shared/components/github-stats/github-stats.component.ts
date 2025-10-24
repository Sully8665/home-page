import { Component, OnInit } from '@angular/core';
import { GitHubService, GitHubStats } from '../../../services/github.service';

@Component({
  selector: 'app-github-stats',
  templateUrl: './github-stats.component.html',
  styleUrls: ['./github-stats.component.scss']
})
export class GitHubStatsComponent implements OnInit {
  stats: GitHubStats | null = null;
  loading = true;

  constructor(private githubService: GitHubService) { }

  ngOnInit() {
    this.loadGitHubStats();
  }

  private loadGitHubStats() {
    this.githubService.getGitHubStats().subscribe({
      next: (stats) => {
        this.stats = stats;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading GitHub stats:', error);
        this.loadFallbackData();
      }
    });
  }

  private loadFallbackData() {
    // Fallback data in case API fails
    this.stats = {
      totalStars: 0,
      totalForks: 0,
      totalRepos: 0,
      totalCommits: 0,
      languages: {},
      recentRepos: []
    };
    this.loading = false;
  }

  getTopLanguages() {
    if (!this.stats?.languages) return [];
    
    const total = Object.values(this.stats.languages).reduce((sum, count) => sum + count, 0);
    return Object.entries(this.stats.languages)
      .map(([name, count]) => ({
        name,
        count,
        percentage: Math.round((count / total) * 100)
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  }

  getLanguageColor(language: string): string {
    const colors: { [key: string]: string } = {
      'TypeScript': '#3178c6',
      'JavaScript': '#f7df1e',
      'C#': '#239120',
      'HTML': '#e34c26',
      'CSS': '#1572b6',
      'Python': '#3776ab',
      'Java': '#ed8b00'
    };
    return colors[language] || '#6b7280';
  }
}
