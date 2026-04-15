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

  getBooks(page: number = 0): Observable<PageInterface<BookInterface>> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });

    const params = new HttpParams()
      .set('page', page+1)

    return this.http
    .get<PageInterface<BookInterface>>(this.APIUrlBook, {headers, params})
    .pipe(tap(res => this._books.set(res.content)));
  }

  loanABook(loan: Loan): Observable<Loan>{
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });

    return this.http.post<Loan>(this.APIUrlLoan, loan, {headers})
  }
}
