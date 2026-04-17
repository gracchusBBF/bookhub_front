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
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { BookDialog } from '../book-dialog/book-dialog';

@Component({
  selector: 'app-book-card',
  imports: [MatDialogModule, MatSnackBarModule, MatCardModule, MatButtonModule, MatDividerModule, MatIconModule],
  templateUrl: './book-card.html',
  styleUrl: './book-card.css',
})
export class BookCard {
  @Input({required: true}) book!: BookInterface;

  constructor(
    protected _snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) {}

  private readonly dialog = inject(MatDialog);
  protected readonly authService = inject(AuthService);
  protected readonly bookApiService = inject(BookApi);

  isModal: boolean = false;
  isDetails: boolean = false;

  moreDetails() {
    this.dialog.open(BookDialog, {
      width: '90vw',
      height: '90vh',
      maxWidth: '90vw',
      data: { book: this.book },
      panelClass: 'book-details-dialog'
    });
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

  handleDeleteABookClick(id: number): any {
    this.bookApiService.deleteABook(id).subscribe({
      next: (response) => {
        console.log(`Le livre avec id ${id} a bien été supprimé.`)
      },
      error: (err) => {
        console.error('Erreur :', err);
      },
    });
  }
}
