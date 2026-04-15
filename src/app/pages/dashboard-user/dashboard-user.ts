import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LoanService, LoanDTO } from '../../services/loan';
import { UserService, DeleteAccountDTO } from '../../services/user';
import { ChangePasswordDialog } from '../../components/change-password-dialog/change-password-dialog';
import { DeleteAccountDialog } from '../../components/delete-account-dialog/delete-account-dialog';
import { AuthService } from '../../services/auth';
import { MatSnackBar } from '@angular/material/snack-bar'; // Optionnel pour les alertes
import { ChangeDetectorRef } from '@angular/core';
// Imports Angular Material
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

// Définition des interfaces pour tes données
interface Emprunt {
  titre: string;
  dateRetour: string;
  retard: string;
}

interface Reservation {
  titre: string;
  dateRetour: string;
  position: string;
}

@Component({
  selector: 'app-dashboard-user',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatDialogModule
  ],
  templateUrl: './dashboard-user.html',
  styleUrl: './dashboard-user.css',
})
export class DashboardUser implements OnInit {
  constructor(
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
    public authService: AuthService,
  private snackBar: MatSnackBar,
  private loanService: LoanService,
  private userService: UserService,
  private router: Router
  ) {}
  
  // Données de test (à remplacer plus tard par un appel API)
  empruntsSource: LoanDTO[] = []

  reservationsSource: Reservation[] = [
    { titre: 'Dune', dateRetour: 'En attente', position: '2/5' },
    { titre: '', dateRetour: '', position: '' }
  ];

  ngOnInit(): void {
    const email = this.authService.getEmail();
    if (email) {
      this.loanService.getLoansByUserEmail(email).subscribe({
        next: (data) => {
          this.empruntsSource = data;
          this.cdr.detectChanges(); // 3. Force Angular à rafraîchir la vue
        },
        error: (err) => console.error(err)
      });
    }
  }
  isOverdue(deadline: string): boolean {
    if (!deadline) return false;
    return new Date(deadline) < new Date();
  }
  onLogout() {
    // Logique de déconnexion si nécessaire ici aussi
  }
  openDeleteAccount(){
    const dialogRef = this.dialog.open(DeleteAccountDialog, {
      width: '400px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
    const  DeleteAccountDTO = {
      email: this.authService.getEmail(),
      password: result.password
    };
    this.userService.deleteAccount(DeleteAccountDTO).subscribe({
      next: (response) => {
       sessionStorage.clear();
       this.authService.logout();
        this.router.navigate(['/deleted-account']);
      },
      error: (err) => {
        // Affiche l'erreur renvoyée par le catch(Exception e) du Java
        this.snackBar.open('Erreur : ' + err.error, 'Fermer', { duration: 5000 });
      }
    });
  }
});
}
  openChangePassword() {
    const dialogRef = this.dialog.open(ChangePasswordDialog, {
      width: '400px',
    });
  
    dialogRef.afterClosed().subscribe(result => {
      // result contient { oldPassword, newPassword } si l'utilisateur a cliqué sur Enregistrer
      if (result) {
        // On ajoute l'email pour correspondre au DTO du Backend
        const passwordDto = {
          email: this.authService.getEmail(), // Assure-toi d'avoir cette méthode dans ton service
          oldPassword: result.oldPassword,
          newPassword: result.newPassword
        };
  
        this.authService.changePassword(passwordDto).subscribe({
          next: (response) => {
            this.snackBar.open('Mot de passe modifié avec succès !', 'Fermer', { duration: 3000 });
          },
          error: (err) => {
            // Affiche l'erreur renvoyée par le catch(Exception e) du Java
            this.snackBar.open('Erreur : ' + err.error, 'Fermer', { duration: 5000 });
          }
        });
      }
    });
  }
}
