import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LoanService, LoanDTO } from '../../services/loan';
import { UserService, DeleteAccountDTO, UserDataDTO } from '../../services/user';
import { UpdateUserInfoDialog } from '../../components/update-user-info-dialog/update-user-info-dialog';
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
  allLoans: LoanDTO[] = [];
  empruntsSource: LoanDTO[] = []
  user: UserDataDTO | null = null;
  reservationsSource: Reservation[] = [
    { titre: 'Dune', dateRetour: 'En attente', position: '2/5' },
    { titre: '', dateRetour: '', position: '' }
  ];

  ngOnInit(): void {
    const email = this.authService.getEmail();
    
    if (email) {
      // 1. Récupération des emprunts
      this.loanService.getLoansByUserEmail(email).subscribe({
        next: (data) => {
          this.allLoans = data; 
          this.empruntsSource = this.allLoans.filter(loan => !loan.returnDate);
          this.cdr.detectChanges();
        },
        error: (err) => console.error("Erreur prêts:", err)
      });
  
      // 2. Récupération des infos profil
      this.userService.getUser(email).subscribe({
        next: (userData: UserDataDTO) => {
          this.user = userData;
          this.cdr.detectChanges();
        },
        error: (err) => console.error("Erreur profil:", err)
      });
    }
  }
filterLoans(status: string) {
  if (status === 'en-cours') {
    this.empruntsSource = this.allLoans.filter(loan => !loan.returnDate);
  } else {
    this.empruntsSource = this.allLoans.filter(loan => !!loan.returnDate);
  }
  this.cdr.detectChanges();
}
isOverdue(loan: LoanDTO): boolean {
  // 1. Si returnDate existe (n'est pas null ou vide), le livre est rendu.
  // On exclut donc ce prêt des retards.
  if (loan.returnDate) {
    return false;
  }

  // 2. Si on n'a pas de deadline, on ne peut pas dire s'il y a un retard.
  if (!loan.deadline) {
    return false;
  }

  // 3. Comparaison : si la date du jour est après la deadline
  const today = new Date();
  const deadlineDate = new Date(loan.deadline);

  return deadlineDate < today;
}
  onLogout() {
    // Logique de déconnexion si nécessaire ici aussi
  }
  updateUserInfos() {
    const dialogRef = this.dialog.open(UpdateUserInfoDialog, {
      width: '450px',
      data: this.user // On passe les données actuelles
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // result contient les données modifiées de la modale
        this.userService.updateUser(result.email, result).subscribe({
          next: (updated) => {
            this.user = updated; // Mise à jour de la vue
            this.snackBar.open('Profil mis à jour avec succès !', 'Fermer', { duration: 3000 });
            this.cdr.detectChanges();
          },
          error: (err) => {
            this.snackBar.open('Erreur lors de la mise à jour', 'Fermer', { duration: 5000 });
          }
        });
      }
    });
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
