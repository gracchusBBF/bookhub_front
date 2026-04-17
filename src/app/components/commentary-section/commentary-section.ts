import { Component, inject, Input, OnChanges, OnInit, signal, SimpleChanges  } from '@angular/core';
import { BookApi } from '../../services/book-api';
import { CommentInterface } from '../../models/comment-interface';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth';

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
  protected readonly authService = inject(AuthService)
  readonly comments = signal<CommentInterface[]>([]);

  newComment = signal<Partial<CommentInterface>>({
    rate: 0,
    comment: "",
    bookId: 0,
    userEmail: "",
  })

  protected editNewComment: boolean = false;
  userEmail = this.authService.getEmail();

  ngOnInit(): void {
    this.newComment.set({rate: 0, comment: "", bookId: this.bookId, userEmail: this.userEmail})
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
    console.log("Comment: ", payload)

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
