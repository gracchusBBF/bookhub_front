import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { BookApi } from '../../services/book-api';
import { BookCard } from '../../components/book-card/book-card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { BookInterface } from '../../models/book-interface';
import { forkJoin } from 'rxjs';

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
  readonly selectedCategory= signal<string>("");
  readonly selectedStatus= signal<string>("");
  public books = signal<BookInterface[]>([])

  readonly categories = this.bookApiService.categories;
  readonly status = this.bookApiService.status;

  ngOnInit(): void {
    forkJoin([
      this.bookApiService.getCategories(),
      this.bookApiService.getStatus(),
    ]).subscribe();

    this.route.queryParamMap.subscribe(params => {
      const pageUrl = Number(params.get('page') ?? 1);
      const internalPage = pageUrl > 0 ? pageUrl - 1 : 0;
      const category = params.get('category') ?? "";
      const status = params.get('status') ?? "";

      this.currentPage.set(internalPage);
      this.selectedCategory.set(category.toLowerCase());

      this.loadBooks(internalPage, category, status!);
    });
  }

  onCategoryChange(event: Event): void {
    const category = (event.target as HTMLSelectElement).value;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { 
        page: 1,
        category: category || null 
      },
      queryParamsHandling: 'merge'
    });
  }

  onStatusChange(event: Event): void {
    const status = (event.target as HTMLSelectElement).value;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: 1, status: status || null },
      queryParamsHandling: 'merge',
    });
  }

  private loadBooks(page: number, category: string, status: string): void {

    this.bookApiService.getBooks(page, category, status).subscribe({
      next: (response) => {
        console.log(category, status)
        this.books.set(response?.content ?? []);
        this.totalPages.set(response?.totalPages ?? 0);
      },
      error: (err) => console.error('Erreur :', err)
    });
  }

  goToPage(pageIndex: number): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: pageIndex + 1},
      queryParamsHandling: 'merge'
    });
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages() }, (_, i) => i);
  }


  value = '';
}
