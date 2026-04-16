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

  private tokenSto = sessionStorage.getItem('token');

  readonly url = 'http://localhost:8080/api/users';

  private readonly token = 'eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiUk9MRV9BRE1JTiIsInN1YiI6InRlc3RAYm9va2h1Yi5jb20iLCJpYXQiOjE3NzYzMzIyNjMsImV4cCI6MTc3NjMzNTg2M30.ktDg19VfTWsiB2wzQta0Ygm3b-qvAosi-8sHt7dnI8c'
  
  private get authHeaders(): HttpHeaders {
    return new HttpHeaders({ Authorization: `Bearer ${this.token}` });
  }
  
  getUsers(): Observable<User[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });
    
    return this.http.get<User[]>(this.url, { headers }).pipe(
      tap(users => this._users.set(users))
    );
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.url}/${id}`);
  }

  updateRole(userId: number, roleId: number): Observable<any> {
    return this.http.patch(
      `${this.url}/${userId}/role`,
      { id: roleId },         
      { headers: this.authHeaders,
        responseType: 'text'
       }
    );
  }

  deleteUser(id: number) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });
    return this.http.delete<User>(`${this.url}/${id}`, { headers });
  }

}