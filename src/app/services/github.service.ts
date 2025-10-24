import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  owner: {
    login: string;
  };
}

export interface GitHubLanguage {
  [language: string]: number;
}

export interface GitHubStats {
  totalStars: number;
  totalForks: number;
  totalRepos: number;
  totalCommits: number;
  languages: GitHubLanguage;
  recentRepos: any[];
}

@Injectable({
  providedIn: 'root'
})
export class GitHubService {
  private readonly baseUrl = 'https://api.github.com';
  private readonly username = 'Sully8665';

  constructor(private http: HttpClient) { }

  getUserRepositories(): Observable<GitHubRepo[]> {
    return this.http.get<GitHubRepo[]>(
      `${this.baseUrl}/users/${this.username}/repos?sort=updated&per_page=100`
    ).pipe(
      catchError(error => {
        // Only log if it's not a rate limit or network error
        if (!error.status || (error.status !== 403 && error.status !== 429)) {
          console.error('Error fetching repositories:', error);
        }
        return of([]);
      })
    );
  }

  getRepositoryLanguages(owner: string, repo: string): Observable<GitHubLanguage> {
    return this.http.get<GitHubLanguage>(
      `${this.baseUrl}/repos/${owner}/${repo}/languages`
    ).pipe(
      catchError(error => {
        console.error(`Error fetching languages for ${repo}:`, error);
        return of({});
      })
    );
  }

  getGitHubStats(): Observable<GitHubStats> {
    return this.getUserRepositories().pipe(
      map(repos => {
        const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
        const totalForks = repos.reduce((sum, repo) => sum + repo.forks_count, 0);
        const totalRepos = repos.length;
        const recentRepos = repos.slice(0, 6).map(repo => ({
          name: repo.name,
          description: repo.description || 'No description available',
          html_url: repo.html_url,
          stargazers_count: repo.stargazers_count,
          forks_count: repo.forks_count,
          language: repo.language
        }));

        // Basic language statistics
        const basicLanguages: GitHubLanguage = {};
        repos.forEach(repo => {
          if (repo.language) {
            basicLanguages[repo.language] = (basicLanguages[repo.language] || 0) + 1;
          }
        });

        // Estimate total commits
        const estimatedCommits = Math.floor(totalRepos * 45);

        return {
          totalStars,
          totalForks,
          totalRepos,
          totalCommits: estimatedCommits,
          languages: basicLanguages,
          recentRepos
        } as GitHubStats;
      }),
      catchError(() => {
        // Final fallback
        return of({
          totalStars: 0,
          totalForks: 0,
          totalRepos: 0,
          totalCommits: 0,
          languages: {},
          recentRepos: []
        } as GitHubStats);
      })
    );
  }
}
