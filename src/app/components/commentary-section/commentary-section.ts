import { Component, inject, Input, OnInit, signal  } from '@angular/core';
import { BookApi } from '../../services/book-api';
import { CommentInterface } from '../../models/comment-interface';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-commentary-section',
  standalone: true,
  imports: [FormsModule, MatButtonModule],
  templateUrl: './commentary-section.html',
  styleUrl: './commentary-section.css',
})
export class CommentarySection implements OnInit {
  @Input({required: true}) bookId!: number; 

  protected readonly bookApiService = inject(BookApi);
  readonly comments = signal<CommentInterface[]>([]);

  newComment = signal<Partial<CommentInterface>>({
    rate: 0,
    comment: "",
    bookId: 0
  })

  protected editNewComment: boolean = false;

  ngOnInit(): void {
    this.bookApiService.getCommentsByBookId(this.bookId).subscribe({
      next: (response) => this.comments.set(response),
      error: (err) => console.error('Erreur :', err)
    })
  }
  onRateChange(rate: number): void {
    this.newComment.update(c => ({...c, rate}));
  }

  onCommentChange(comment: string): void {
    this.newComment.update(c => ({...c, comment}));
  }

  openAddComment(): void{
    this.editNewComment = !this.editNewComment;
  }

  submitComment():void {
    const payload = this.newComment();

    if(!payload.comment?.trim() || !payload.rate) return;

    this.bookApiService.addComment(payload).subscribe({
      next: () => {
        // Rechargement des commentaires après ajout
        this.bookApiService.getCommentsByBookId(this.bookId).subscribe({
          next: (response) => this.comments.set(response),
          error: (err) => console.error('Erreur :', err)
        });
        // Reset du formulaire
        this.newComment.set({ rate: 0, comment: '', bookId: this.bookId });
      },
      error: (err) => console.error('Erreur ajout commentaire :', err)
    });
  }
}
