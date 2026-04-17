import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';
  private http = inject(HttpClient);
  
  // Un BehaviorSubject permet de diffuser l'état de connexion partout dans l'app
  public authStatus = new BehaviorSubject<boolean>(this.hasToken());

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData).pipe(
      tap((response: any) => this.handleAuthentication(response))
    );
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => this.handleAuthentication(response))
    );
  }

  // Stocke le token et met à jour l'état
  private handleAuthentication(response: any) {
    if (response && response.token) {
      sessionStorage.setItem('token', response.token);
      this.authStatus.next(true);
    }
  }

  // Pour savoir si on est connecté (au démarrage ou ailleurs)
  private hasToken(): boolean {
    return !!sessionStorage.getItem('token');
  }
 
  
  // Getter pour s'abonner à l'état de connexion (ex: cacher/afficher des menus)
  get isLoggedIn$() {
    return this.authStatus.asObservable();
  }

  // Récupérer le rôle pour la redirection
  getUserRole(): string {
    const token = sessionStorage.getItem('token');
    if (!token) return '';
    try {
      const decoded: any = jwtDecode(token);
      // Attention : vérifie si ton backend envoie "role", "roles" ou "authorities"
      return decoded.role || ''; 
    } catch (e) {
      return '';
    }
  }
  
  getEmail() {
    const token = sessionStorage.getItem('token');
    if (!token) return '';
    try {
      const decoded: any = jwtDecode(token);
      console.log('Contenu du token décodé :', decoded); // <--- AJOUTE CECI
      
      // Souvent dans Spring Security, l'email est dans 'sub' ou 'username'
      return decoded.email || decoded.sub || ''; 
    } catch (e) {
      console.error('Erreur décodage token', e);
      return '';
    }
  }
  changePassword(data: any): Observable<any> {
    // L'URL doit correspondre à ton @PutMapping("/change-password") côté Java
    return this.http.put(`http://localhost:8080/api/users/change-password`, data);
  }
  logout() {
    sessionStorage.removeItem('token');
    this.authStatus.next(false);
  }
}