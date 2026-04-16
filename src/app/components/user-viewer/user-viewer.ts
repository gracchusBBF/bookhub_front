import {AfterViewInit, Component, inject, signal, ViewChild, ChangeDetectionStrategy} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatButton } from '@angular/material/button';
import {UserService} from '../../services/user.service';
import {User} from '../../models/user.model';
import { MatDialog } from '@angular/material/dialog';
import { ChangeStatusDialogComponent } from '../dialog/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-viewer',
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, MatCardModule, MatChipsModule, MatProgressBarModule, MatButton, MatDialogModule],
  templateUrl: './user-viewer.html',
  styleUrl: './user-viewer.css',
})
export class UserViewer implements AfterViewInit {

  private dialog = inject(MatDialog);
  private userService = inject(UserService);
  
  allUsers: User[] = [];

  displayedColumns: string[] = ['ID', 'firstName', 'lastName', 'email', 'phoneNumber', 'role', 'actions'];
  dataSource = new MatTableDataSource<User>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() { }

  get countAdmin() { 
    return this.allUsers.filter(u => u.userRole?.roleName === 'ADMIN').length; 
  }
  get countUser() { 
    return this.allUsers.filter(u => u.userRole?.roleName === 'USER').length; 
  }
  get countLibrarian() { 
    return this.allUsers.filter(u => u.userRole?.roleName === 'LIBRARIAN').length; 
  }

  openChangeRoleDialog(user: User): void {
    const dialogRef = this.dialog.open(ChangeStatusDialogComponent, {
      width: '400px',
      data: { user }
    });

    dialogRef.afterClosed().subscribe((newRole: { id: number, roleName: string } | null) => {
      if (!newRole) return;
    
      this.userService.updateRole(user.id, newRole.id).subscribe({
        next: () => {
          this.dataSource.data = this.dataSource.data.map(u =>
            u.id === user.id ? { ...u, userRole: newRole } : u
          );
        },
        error: (err) => console.error('Erreur :', err.error)
      });
    });
  }

  

  ngOnInit() {
    this.userService.getUsers().subscribe(users => {
      console.log(users);
      this.dataSource.data = users;
      this.allUsers = users;
    });

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteUser(user: User) {

    this.userService.deleteUser(user.id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter(u => u.id !== user.id);
    });
    alert("user suprrimé")
  }

}

// nombre total d'utilisateur
// créer une nouvelle permission
// l'ajouter à un role


// modifier le role d'un utilisateur 
// supprimer un utilisateur
// ajouter un utilisateur ?