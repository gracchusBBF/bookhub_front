import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface DeleteAccountDTO {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/users/delete-account'; // Ajuste l'URL selon ton backend

  constructor(private http: HttpClient) {}

  deleteAccount(data : DeleteAccountDTO): Observable<any> {
    return this.http.put(`${this.apiUrl}`, data, {
      responseType: 'text'
    });
  }
}