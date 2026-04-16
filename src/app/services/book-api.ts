import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { catchError, Observable, tap } from 'rxjs';
import { BookInterface } from '../models/book-interface';
import { Loan } from '../models/loan';
import { PageInterface } from '../models/page-interface';
import { CommentInterface } from '../models/comment-interface';

@Injectable({
  providedIn: 'root',
})
export class BookApi {

  private readonly http: HttpClient = inject(HttpClient);
  private readonly APIUrl = environment.apiUrl;
  private token: string | null = sessionStorage.getItem('token');

  private readonly APIUrlBook = `${this.APIUrl}/books`;
  private readonly APIUrlCategory = `${this.APIUrl}/books/category`;
  private readonly APIUrlStatus = `${this.APIUrl}/books/status`;
  private readonly APIUrlLoan = `${this.APIUrl}/loans`
  private readonly APIUrlSearchBook = `${this.APIUrl}/books/search`;
  private readonly APIUrlBookComment = `${this.APIUrl}/comments/book`;
  private readonly APIUrlComment = `${this.APIUrl}/comments`;

  private _books = signal<BookInterface[]>([]);
  private _categories = signal<string[]>([]);
  private _status = signal<string[]>([]);
  private _searchedBooks = signal<BookInterface[]>([]);
  private _comments = signal<CommentInterface[]>([]);

  public readonly books = this._books.asReadonly();
  public readonly categories = this._categories.asReadonly();
  public readonly status = this._status.asReadonly();
  public readonly comments = this._comments.asReadonly();

  
  getCommentsByBookId(bookId: number): Observable<CommentInterface[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });

    return this.http
      .get<CommentInterface[]>(`${this.APIUrlBookComment}/${bookId}`, {headers})
      .pipe(
        tap(res => {
          if(res.length) {
            this._comments.set(res);
          } else {
            this._comments.set([]);
          }
        })
      );
  }

  addComment(comment: Partial<CommentInterface>): Observable<CommentInterface> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });

    return this.http
      .post<CommentInterface>(this.APIUrlComment, comment, {headers});
  }

  getSearchedBooks(query: string): Observable<BookInterface[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });

    const params = new HttpParams().set('query', query);

    return this.http
      .get<BookInterface[]>(this.APIUrlSearchBook, {headers, params})
      .pipe(
        tap((res: BookInterface[]) => {
          this._searchedBooks.set(res);
        }),
        catchError((error) => {
          console.error('Error fetching books:', error);
          this._searchedBooks.set([]);
          return [];
        })
      );
  }

  getCategories(): Observable<string[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });

    return this.http
    .get<string[]>(this.APIUrlCategory, {headers})
    .pipe(
      tap(res => {
        if (res.length) {
          this._categories.set(res)
        } else {
          this._categories.set([]);
        }
      }
      ));
  }

  getStatus(): Observable<string[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });

    return this.http
    .get<string[]>(this.APIUrlStatus, {headers})
    .pipe(
      tap(res => {
        if (res.length) {
          this._status.set(res)
        } else {
          this._status.set([]);
        }
      }
      ));
  }

  getBooks(page: number = 0, category?: string, status?: string): Observable<PageInterface<BookInterface>> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });

    let params = new HttpParams().set('page', page);
    if (category && category !== 'null') params = params.set('category', category);
    if (status && status !== 'null') params = params.set('status', status);


    return this.http
    .get<PageInterface<BookInterface>>(this.APIUrlBook, {headers, params})
    .pipe(
      tap(res => {
        if (res && res.content) {
          this._books.set(res.content);
        } else {
          this._books.set([]);
        }
      }
      ));
  }

  loanABook(loan: Loan): Observable<Loan>{
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    return this.http.post<Loan>(this.APIUrlLoan, loan, { headers });
  }

  saveABook(book: any) {
    console.log('saveABook');
    console.log(book);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });
    return this.http.post(this.APIUrlBook, book, { headers });
  }
}
