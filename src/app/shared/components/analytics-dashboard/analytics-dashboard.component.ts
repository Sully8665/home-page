import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from '../../../services/analytics.service';
import { ErrorTrackingService } from '../../../services/error-tracking.service';

@Component({
  selector: 'app-analytics-dashboard',
  template: `
    <div class="analytics-dashboard card-flat">
      <h3 class="mb-3">📊 Performance Analytics</h3>
      
      <div class="row g-3">
        <!-- Performance Metrics -->
        <div class="col-md-6">
          <div class="metric-card">
            <h5>🚀 Performance</h5>
            <div class="metric-item">
              <span class="metric-label">Page Views:</span>
              <span class="metric-value">{{ analytics?.totalPageViews || 0 }}</span>
            </div>
            <div class="metric-item">
              <span class="metric-label">Avg Load Time:</span>
              <span class="metric-value">{{ analytics?.avgPageLoadTime || 0 }}ms</span>
            </div>
            <div class="metric-item">
              <span class="metric-label">Avg Session:</span>
              <span class="metric-value">{{ analytics?.avgSessionDuration || 0 }}s</span>
            </div>
            <div class="metric-item">
              <span class="metric-label">Scroll Depth:</span>
              <span class="metric-value">{{ analytics?.avgScrollDepth || 0 }}%</span>
            </div>
          </div>
        </div>

        <!-- Error Statistics -->
        <div class="col-md-6">
          <div class="metric-card">
            <h5>⚠️ Error Tracking</h5>
            <div class="metric-item">
              <span class="metric-label">Total Errors:</span>
              <span class="metric-value">{{ errorStats?.totalErrors || 0 }}</span>
            </div>
            <div class="metric-item">
              <span class="metric-label">Session Errors:</span>
              <span class="metric-value">{{ errorStats?.sessionErrors || 0 }}</span>
            </div>
            <div class="metric-item">
              <span class="metric-label">Recent Errors:</span>
              <span class="metric-value">{{ errorStats?.recentErrors || 0 }}</span>
            </div>
            <div class="metric-item">
              <span class="metric-label">Critical Errors:</span>
              <span class="metric-value text-danger">{{ criticalErrors?.length || 0 }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Performance Status -->
      <div class="mt-3">
        <div class="performance-status">
          <h6>Performance Status:</h6>
          <div class="status-indicator" [class]="getPerformanceStatusClass()">
            {{ getPerformanceStatus() }}
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div class="mt-3 d-flex gap-2">
        <button class="btn btn-outline-accent btn-sm" (click)="refreshData()">
          🔄 Refresh
        </button>
        <button class="btn btn-outline-accent btn-sm" (click)="exportData()">
          📤 Export
        </button>
        <button class="btn btn-outline-accent btn-sm" (click)="clearData()">
          🗑️ Clear
        </button>
      </div>
    </div>
  `,
  styles: [`
    .analytics-dashboard {
      max-width: 800px;
      margin: 0 auto;
    }

    .metric-card {
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 0.75rem;
      padding: 1rem;
      height: 100%;
    }

    .metric-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.5rem 0;
      border-bottom: 1px solid var(--border);
    }

    .metric-item:last-child {
      border-bottom: none;
    }

    .metric-label {
      font-weight: 500;
      color: var(--muted);
    }

    .metric-value {
      font-weight: 600;
      color: var(--fg);
    }

    .performance-status {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .status-indicator {
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      font-weight: 600;
      font-size: 0.875rem;
    }

    .status-good {
      background: rgba(25, 135, 84, 0.1);
      color: #198754;
      border: 1px solid rgba(25, 135, 84, 0.2);
    }

    .status-warning {
      background: rgba(255, 193, 7, 0.1);
      color: #ffc107;
      border: 1px solid rgba(255, 193, 7, 0.2);
    }

    .status-poor {
      background: rgba(220, 53, 69, 0.1);
      color: #dc3545;
      border: 1px solid rgba(220, 53, 69, 0.2);
    }

    @media (max-width: 768px) {
      .analytics-dashboard {
        margin: 0 1rem;
      }
      
      .performance-status {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;
      }
    }
  `]
})
export class AnalyticsDashboardComponent implements OnInit {
  analytics: any = null;
  errorStats: any = null;
  criticalErrors: any[] = [];

  constructor(
    private analyticsService: AnalyticsService,
    private errorTrackingService: ErrorTrackingService
  ) {}

  ngOnInit(): void {
    this.refreshData();
  }

  refreshData(): void {
    this.analytics = this.analyticsService.getAnalyticsSummary();
    this.errorStats = this.errorTrackingService.getErrorStatistics();
    this.criticalErrors = this.errorTrackingService.getCriticalErrors();
  }

  getPerformanceStatus(): string {
    if (!this.analytics) return 'Loading...';
    
    const loadTime = this.analytics.avgPageLoadTime;
    if (loadTime < 2000) return 'Excellent';
    if (loadTime < 4000) return 'Good';
    if (loadTime < 6000) return 'Needs Improvement';
    return 'Poor';
  }

  getPerformanceStatusClass(): string {
    if (!this.analytics) return 'status-warning';
    
    const loadTime = this.analytics.avgPageLoadTime;
    if (loadTime < 2000) return 'status-good';
    if (loadTime < 4000) return 'status-good';
    if (loadTime < 6000) return 'status-warning';
    return 'status-poor';
  }

  exportData(): void {
    const analyticsData = this.analyticsService.exportAnalyticsData();
    const errorData = this.errorTrackingService.exportErrorData();
    
    const exportData = {
      analytics: analyticsData,
      errors: errorData,
      exportedAt: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analytics-export-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  clearData(): void {
    if (confirm('Are you sure you want to clear all analytics data?')) {
      this.analyticsService.clearAnalyticsData();
      this.errorTrackingService.clearErrorData();
      this.refreshData();
    }
  }
}
