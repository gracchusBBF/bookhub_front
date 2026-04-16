import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';

const protocol = 'http';
const host = '127.0.0.1';
const port = 8080;
const baseURL = `${protocol}://${host}:${port}/api/loans`;


@Injectable({
  providedIn: 'root',
})
export class DashboardLibrarianService {
  private readonly http = inject(HttpClient);
  private token: string | null = localStorage.getItem('token');

  getLoansList() {
    return this.http.get<[]>(baseURL, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
      responseType: 'json',
    });
  }

  // api/loans/active
  getActiveLoansList(): Observable<any[]> {
    return this.http.get<any[]>(`${baseURL}/active`, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
      responseType: 'json',
    });
  }

  getOverdueLoans() {
    const url = `${baseURL}/overdue`;
    return this.http.get(url, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
      responseType: 'json',
    });
  }

  getNbTotalLoans() {
    const url = `${baseURL}/stats/totalLoans`;
    return this.http.get<number>(url, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
      responseType: 'json',
    });
  }

  getNbActiveLoans() {
    const url = `${baseURL}/stats/activeLoans`;
    return this.http.get<number>(url, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
      responseType: 'json',
    });
  }

  returnABook(id: string) {
    const url = `${baseURL}/${id}/return`;
    return this.http.put(
      url,
      {},
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
        responseType: 'json',
      },
    );
  }
}
