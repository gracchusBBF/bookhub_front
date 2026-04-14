import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface LoanDTO {
  id: number;
  startDate: string;  // Correspond au Timestamp
  returnDate: string; // Correspond au Date
  deadline: string;   // Correspond au Date
  userId: number;
  bookId: number;
  bookTitle: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoanService {
  private apiUrl = 'http://localhost:8080/api/loans'; // Ajuste l'URL selon ton backend

  constructor(private http: HttpClient) {}

  getLoansByUserEmail(email: string): Observable<LoanDTO[]> {
    return this.http.get<LoanDTO[]>(`${this.apiUrl}/${email}`);
  }
}