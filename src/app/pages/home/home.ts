import { Component, inject, OnInit, signal } from '@angular/core';
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
  value = '';

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
      const query = params.get('query') ?? "";

      this.currentPage.set(internalPage);
      this.selectedCategory.set(category.toLowerCase());
      this.value = query;

      if(query) {
        this.bookApiService.getSearchedBooks(query).subscribe(books => this.books.set(books));
      } else {
        this.loadBooks(internalPage, category, status);
      }
    });
  }

  onSearch():void {
    if(!this.value.trim()) return;
    this.bookApiService.getSearchedBooks(this.value).subscribe({
      next: (books) => {
        this.books.set(books);
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: { query: this.value, page: 1 },
          queryParamsHandling: 'merge',
        });
    },
      error: (err) => console.error('Erreur de recherche :', err)
    });
  }

  onClearSearch(): void {
    this.value = '';
    this.loadBooks(this.currentPage(), this.selectedCategory(), this.selectedStatus());
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { query: null },
      queryParamsHandling: 'merge',
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


  
}
