import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';

const protocol = 'http';
const host = '127.0.0.1';
const port = 8080;
const baseURL = `${protocol}://${host}:${port}/api/loans`;


@Injectable({
  providedIn: 'root',
})
export class DashboardLibrarianService {
  private readonly http =  inject(HttpClient);
  private token : string | null = localStorage.getItem("token");

  getOverdueLoans() {
    const url = `${baseURL}/overdue`;
    return this.http.get(url, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
      responseType: 'json',
    });
  }
}
