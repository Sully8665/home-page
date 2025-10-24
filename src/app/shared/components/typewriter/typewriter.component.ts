import { Component, Input, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-typewriter',
  template: `
    <span class="typewriter-text" [innerHTML]="displayedText"></span>
    <span class="cursor" [class.blinking]="showCursor">|</span>
  `,
  styles: [`
    .typewriter-text {
      display: inline;
    }
    
    .cursor {
      color: var(--accent);
      font-weight: bold;
      animation: blink 1s infinite;
    }
    
    .cursor.blinking {
      animation: blink 1s infinite;
    }
    
    @keyframes blink {
      0%, 50% { opacity: 1; }
      51%, 100% { opacity: 0; }
    }
  `]
})
export class TypewriterComponent implements OnInit, OnDestroy {
  @Input() text: string = '';
  @Input() speed: number = 100; // milliseconds per character
  @Input() delay: number = 1000; // delay before starting
  
  displayedText = '';
  showCursor = true;
  private currentIndex = 0;
  private timeoutId?: number;

  ngOnInit() {
    setTimeout(() => {
      this.startTyping();
    }, this.delay);
  }

  ngOnDestroy() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }

  private startTyping() {
    if (this.currentIndex < this.text.length) {
      this.displayedText += this.text[this.currentIndex];
      this.currentIndex++;
      
      this.timeoutId = window.setTimeout(() => {
        this.startTyping();
      }, this.speed);
    } else {
      // Typing complete
      setTimeout(() => {
        this.showCursor = false;
      }, 2000);
    }
  }
}
