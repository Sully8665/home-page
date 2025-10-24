import { Component, Input, OnInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-animated-skill-bar',
  template: `
    <div class="skill-item">
      <div class="skill-info">
        <span class="skill-name">{{ skill.name }}</span>
        <span class="skill-percentage">{{ skill.percentage }}%</span>
      </div>
      <div class="skill-bar-container">
        <div 
          #skillBar
          class="skill-bar" 
          [style.--skill-width]="skill.percentage + '%'"
          [class.animate]="isVisible">
        </div>
      </div>
    </div>
  `,
  styles: [`
    .skill-item {
      margin-bottom: 1rem;
    }
    
    .skill-info {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.5rem;
    }
    
    .skill-name {
      font-weight: 600;
      color: var(--fg);
    }
    
    .skill-percentage {
      color: var(--accent);
      font-weight: 600;
    }
    
    .skill-bar-container {
      height: 8px;
      background: var(--border);
      border-radius: 4px;
      overflow: hidden;
    }
    
    .skill-bar {
      height: 100%;
      background: linear-gradient(90deg, var(--accent), var(--accent-2));
      border-radius: 4px;
      width: 0;
      transition: width 2s ease-in-out;
    }
    
    .skill-bar.animate {
      width: var(--skill-width);
    }
  `]
})
export class AnimatedSkillBarComponent implements OnInit {
  @Input() skill!: { name: string; percentage: number };
  @ViewChild('skillBar') skillBar!: ElementRef;
  
  isVisible = false;

  ngOnInit() {
    // Use Intersection Observer to trigger animation when visible
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.isVisible = true;
          observer.unobserve(entry.target);
        }
      });
    });

    // Start observing after view init
    setTimeout(() => {
      if (this.skillBar) {
        observer.observe(this.skillBar.nativeElement);
      }
    }, 100);
  }
}
