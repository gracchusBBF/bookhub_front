import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface DeleteAccountDTO {
  email: string;
  password: string;
}
export interface GetUserDataDTO {
  email: string;
  
}
export interface UserDataDTO {
  email: string;
  lastName: string;
  firstName: string;
  phoneNumber: string;
  
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/users'; // Ajuste l'URL selon ton backend

  constructor(private http: HttpClient) {}

  deleteAccount(data : DeleteAccountDTO): Observable<any> {
    return this.http.put(`${this.apiUrl}`+"/delete-account", data, {
      responseType: 'text'
    });
  }
  getUser(email: string): Observable<UserDataDTO> {
    return this.http.get<UserDataDTO>(`${this.apiUrl}`+`/details`+`/${email}`);
  }
  updateUser(email: string, data: Partial<UserDataDTO>): Observable<UserDataDTO> {
    return this.http.put<UserDataDTO>(`${this.apiUrl}/update-details`, data);
  }
}