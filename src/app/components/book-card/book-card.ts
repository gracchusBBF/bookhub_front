import { ChangeDetectorRef, Component, inject, Input } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { BookInterface } from '../../models/book-interface';
import { MatButtonModule } from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import { BookApi } from '../../services/book-api';
import { AuthService } from '../../services/auth';
import { Loan } from '../../models/loan';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-book-card',
  imports: [MatSnackBarModule, MatCardModule, MatButtonModule, MatDividerModule, MatIconModule],
  templateUrl: './book-card.html',
  styleUrl: './book-card.css',
})
export class BookCard {
  @Input({required: true}) book!: BookInterface;

  constructor(
    protected _snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) {}

  protected readonly authService = inject(AuthService);
  protected readonly bookApiService = inject(BookApi);

  isModal: boolean = false;
  isDetails: boolean = false;

  moreDetails() {
    this.isDetails = !this.isDetails;
  }

  loan() {
    const email = this.authService.getEmail();
    if (!email) {
      console.error("Email utilisateur non disponible !");
      this.isModal = false;
      this.cdr.detectChanges();
      return;
    }
    const loan: Loan = {
      id: 0,
      startDate: Date.now(),
      returnDate: null,
      deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      userEmail: email,
      bookId: this.book.id,
      bookTitle: this.book.title
    };

    this.bookApiService.loanABook(loan).subscribe({
      next: (response) => {
        this._snackBar.open("Emprunt réussi !", "Fermer", {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
        this.isModal = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this._snackBar.open("Erreur lors de l'emprunt", "Réessayer", {
          duration: 5000,
          panelClass: ['error-snackbar']
        });
        this.isModal = false;
        this.cdr.detectChanges();
      }
    });
  }

  reserve() {
    this._snackBar.open("Réservation réussie !", "Fermer", {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
    this.isModal = false;
  }
}
