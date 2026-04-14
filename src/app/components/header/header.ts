import { Component, inject } from '@angular/core';
import { RouterLinkActive, RouterLink, Router } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, AsyncPipe],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  public authService = inject(AuthService);
  private router = inject(Router);

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/connexion']);
  }
}