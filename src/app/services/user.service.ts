import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { User } from '../models/user.model';
import { Observable, tap } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class UserService {

  private http = inject(HttpClient);
  private _users = signal<User[]>([]);
  readonly users = this._users.asReadonly();
  readonly url = 'http://localhost:8080/api/users';

  private readonly token = 'eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiUk9MRV9BRE1JTiIsInN1YiI6InRlc3RAYm9va2h1Yi5jb20iLCJpYXQiOjE3NzYxNzE1NTEsImV4cCI6MTc3NjE3NTE1MX0.Zc5Jzmik8Eo5jcYfolTMeXGoiJOKvznhmewD-p2-yas'
  getUsers(): Observable<User[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });
    
    return this.http.get<User[]>(this.url, { headers }).pipe(
      tap(users => this._users.set(users))
    );
  }

  createUser(user: Omit<User,'id'>): Observable<User> {
    return this.http.post<User>(this.url, user);
  }

  getUserById(id: string) {
    return this.http.get<User>(`${this.url}/${id}`);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.url}/${user.id}`, user)
  }

  patchUser(id: number, changes: Partial<User>): Observable<User> {
    return this.http.patch<User>(`${this.url}/${id}`, changes);
  }

}