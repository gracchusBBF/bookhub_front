import { Component, inject, Input } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { BookInterface } from '../../models/book-interface';
import { MatButtonModule } from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import { BookApi } from '../../services/book-api';
import { AuthService } from '../../services/auth';
import { Loan } from '../../models/loan';

@Component({
  selector: 'app-book-card',
  imports: [MatCardModule, MatButtonModule, MatDividerModule, MatIconModule],
  templateUrl: './book-card.html',
  styleUrl: './book-card.css',
})
export class BookCard {
  @Input({required: true}) book! : BookInterface;
  
  protected readonly authService = inject(AuthService);
  protected readonly bookApiService = inject(BookApi);

  isModal: boolean = false;
  showModal() {
    this.isModal = !this.isModal
  }

  loan() {
    const email = this.authService.getEmail();
    if (!email) {
      console.error("Email utilisateur non disponible !");
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
    }

    this.bookApiService.loanABook(loan).subscribe({
      next: (response) => console.log("Emprunt réussi !", response),
      error: (err) => console.error("Erreur lors de l'emprunt", err)
    })
  }

  reserve() {
    console.log("Reserve !")
  }
}
