import { Component, Input, OnInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-animated-skill-bar',
  templateUrl: './animated-skill-bar.component.html',
  styleUrls: ['./animated-skill-bar.component.scss']
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
