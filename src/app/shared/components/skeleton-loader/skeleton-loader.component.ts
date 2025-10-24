import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-skeleton-loader',
  templateUrl: './skeleton-loader.component.html',
  styleUrls: ['./skeleton-loader.component.scss']
})
export class SkeletonLoaderComponent implements OnInit {
  @Input() type: 'text' | 'card' | 'avatar' | 'button' | 'list' | 'table' = 'text';
  @Input() lines: number = 1;
  @Input() width: string = '100%';
  @Input() height: string = '1rem';
  @Input() borderRadius: string = '4px';
  @Input() animation: 'pulse' | 'wave' | 'none' = 'wave';

  textLines: number[] = [];
  listItems: number[] = [];
  tableRows: number[] = [];
  tableColumns: number[] = [1, 2, 3, 4];

  constructor() { }

  ngOnInit(): void {
    this.initializeArrays();
  }

  private initializeArrays(): void {
    this.textLines = Array.from({ length: this.lines }, (_, i) => i);
    this.listItems = Array.from({ length: this.lines }, (_, i) => i);
    this.tableRows = Array.from({ length: this.lines }, (_, i) => i);
  }

  getSkeletonClass(): string {
    return `skeleton skeleton-${this.type} skeleton-${this.animation}`;
  }
}
