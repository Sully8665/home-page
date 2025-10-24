import { Component, Input, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-typewriter',
  templateUrl: './typewriter.component.html',
  styleUrls: ['./typewriter.component.scss']
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
