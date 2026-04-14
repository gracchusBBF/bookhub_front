import { Component, inject, OnInit } from '@angular/core';
import { BookApi } from '../../services/book-api';
import { BookCard } from '../../components/book-card/book-card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BookCard, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatIconModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  protected readonly bookApiService = inject(BookApi);

  ngOnInit(): void {
    this.bookApiService.getBooks().subscribe({
      next: (books) => {
        console.log('Livres reçus : ', books);
      },
      error: (err) => {
        console.error('Erreur lors de la récupation : ', err)
      }
    });
  }

  value = 'Clear me';
}
