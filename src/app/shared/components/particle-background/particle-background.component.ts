import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-particle-background',
  template: '<div #particleContainer class="particles"></div>',
  styles: [`
    .particles {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: -1;
      overflow: hidden;
    }
  `]
})
export class ParticleBackgroundComponent implements OnInit, OnDestroy {
  @ViewChild('particleContainer') particleContainer!: ElementRef;
  private particles: HTMLElement[] = [];
  private animationId?: number;

  ngOnInit() {
    this.createParticles();
    this.animateParticles();
  }

  ngOnDestroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    this.particles.forEach(particle => {
      if (particle.parentNode) {
        particle.parentNode.removeChild(particle);
      }
    });
  }

  private createParticles() {
    const container = this.particleContainer.nativeElement;
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      // Random size between 2-6px
      const size = Math.random() * 4 + 2;
      particle.style.width = size + 'px';
      particle.style.height = size + 'px';
      
      // Random position
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = '100vh';
      
      // Random animation duration
      const duration = Math.random() * 10 + 15; // 15-25 seconds
      particle.style.animationDuration = duration + 's';
      particle.style.animationDelay = Math.random() * 5 + 's';
      
      container.appendChild(particle);
      this.particles.push(particle);
    }
  }

  private animateParticles() {
    const animate = () => {
      this.particles.forEach(particle => {
        const rect = particle.getBoundingClientRect();
        if (rect.top < -10) {
          // Reset particle to bottom
          particle.style.top = '100vh';
          particle.style.left = Math.random() * 100 + '%';
        }
      });
      
      this.animationId = requestAnimationFrame(animate);
    };
    
    animate();
  }
}
