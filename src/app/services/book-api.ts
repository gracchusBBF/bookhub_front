import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable, tap } from 'rxjs';
import { BookInterface } from '../models/book-interface';
import { Loan } from '../models/loan';
import { PageInterface } from '../models/page-interface';

@Injectable({
  providedIn: 'root',
})
export class BookApi {

  private readonly http: HttpClient = inject(HttpClient);
  private readonly APIUrl = environment.apiUrl;
  private readonly APIUrlBook = `${this.APIUrl}/books`;
  private readonly APIUrlLoan = `${this.APIUrl}/loans`
  private readonly token = environment.token;
  private _books = signal<BookInterface[]>([]);
  public readonly books = this._books.asReadonly();

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
      Authorization: `Bearer ${this.token}`
    });

    return this.http.post<Loan>(this.APIUrlLoan, loan, {headers})
  }
}
