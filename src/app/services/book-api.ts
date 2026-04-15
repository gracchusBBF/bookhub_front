import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable, tap } from 'rxjs';
import { BookInterface } from '../models/book-interface';
import { Loan } from '../models/loan';

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

  getBooks(): Observable<BookInterface[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });

    return this.http.get<BookInterface[]>(this.APIUrlBook, {headers})
    .pipe(tap(books => this._books.set(books)));
  }

  loanABook(loan: Loan): Observable<Loan>{
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });

    return this.http.post<Loan>(this.APIUrlLoan, loan, {headers})
  }
}
