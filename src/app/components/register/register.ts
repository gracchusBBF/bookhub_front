import { Component, inject } from '@angular/core'; // 1. Ajout de inject
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { AuthService } from '../../services/auth'; // 2. Vérifie bien le nom du fichier
import { Router } from '@angular/router';
// Material
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-register',
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
  templateUrl: './register.html',
  styleUrls: ['./register.css'] 
})
export class Register {
  // 3. Utilisation de inject() au lieu du constructor
  private authService = inject(AuthService);
  private router = inject(Router);

  hidePassword = true;
  hideConfirm = true;

  registerForm = new FormGroup({
    lastName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    firstName: new FormControl('', [Validators.required, Validators.minLength(3)]), // Correction typo ici
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[0-9]{10}$/)
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.pattern(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{10,}$/)
    ]),
    confirmPassword: new FormControl('', [Validators.required])
  }, { validators: this.passwordMatchValidator });

  // 4. Correction du validateur (doit être une arrow function ou bindé pour garder le 'this' si besoin)
  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirm = control.get('confirmPassword')?.value;
    return password === confirm ? null : { passwordMismatch: true };
  }

  errorMessage = '';

onRegister() {
  if (this.registerForm.valid) {
    this.errorMessage = '';
    this.authService.register(this.registerForm.value).subscribe({
      next: () => {
        const role = this.authService.getUserRole();
        if (role === 'ROLE_ADMIN') {
          this.router.navigate(['/admin']);
        } else if (role === 'ROLE_LIBRARIAN') {
          this.router.navigate(['/librarian']);
        } else {
          this.router.navigate(['']);
        }
      },
      error: (err) => {
        console.error('Erreur inscription:', err);
        this.errorMessage = err?.error?.message || 'Une erreur est survenue. Veuillez réessayer.';
      }
    });
  }
}
}