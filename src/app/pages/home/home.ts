import { Component, inject, OnInit, signal } from '@angular/core';
import { BookApi } from '../../services/book-api';
import { BookCard } from '../../components/book-card/book-card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BookCard, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatIconModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  protected readonly bookApiService = inject(BookApi);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly currentPage = signal<number>(0);
  readonly totalPages  = signal<number>(0);

  ngOnInit(): void {
    // Se déclenche à chaque changement de ?page= dans l'URL
    this.route.queryParamMap.subscribe(params => {
      const page = Number(params.get('page') ?? 1);
      this.currentPage.set(page);
      this.loadBooks(page);
    });
  }

  private loadBooks(page: number): void {
    this.bookApiService.getBooks(page).subscribe({
      next: (response) => {
        this.totalPages.set(response.totalPages);
      },
      error: (err) => console.error('Erreur :', err)
    });
  }

  goToPage(page: number): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page },
      queryParamsHandling: 'merge'
    });
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages() }, (_, i) => i);
  }


  value = '';
}
