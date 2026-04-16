import { Component, Input  } from '@angular/core';

@Component({
  selector: 'app-commentary-section',
  standalone: true,
  imports: [],
  templateUrl: './commentary-section.html',
  styleUrl: './commentary-section.css',
})
export class CommentarySection {
  @Input() bookId!: number; 
}
