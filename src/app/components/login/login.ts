import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

// Angular Material Imports
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  private authService = inject(AuthService);
  private router = inject(Router);
  hide = true; 
  errorMessage = signal('');
  
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  onSubmit() {
    if (this.loginForm.valid) {
      this.errorMessage.set('');
      // 2. Appel au service de login
      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          
          // 3. Récupération du rôle et redirection
          const role = this.authService.getUserRole();
          this.redirectBasedOnRole(role);
        },
        error: (err) => {
          if (err.status === 403 || err.status === 401) {
            this.errorMessage.set("Échec de la connexion : identifiants incorrects.");
          } else {
            this.errorMessage.set('Une erreur est survenue. Veuillez réessayer.');
          }
        }
      });
    }
  }
  private redirectBasedOnRole(role: string) {
    if (role === 'ROLE_ADMIN') {
      this.router.navigate(['/admin']);
    } else if (role === 'ROLE_LIBRARIAN') {
      this.router.navigate(['/librarian']);
    } else {
      this.router.navigate(['']);
    }
  }
}