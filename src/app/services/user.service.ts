import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { User } from '../models/user.model';
import { Observable, tap } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class UserService {

  private token = sessionStorage.getItem('token');
  readonly url = 'http://localhost:8080/api/users';

  private http = inject(HttpClient);
  private _users = signal<User[]>([]);
  readonly users = this._users.asReadonly();
  
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