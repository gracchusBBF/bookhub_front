import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatOption, MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-change-status-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatSelectModule, MatFormFieldModule, FormsModule, MatOption],
  templateUrl: './dialog.html',
  styleUrl: './dialog.css'
})
export class ChangeStatusDialogComponent {

  selectedRole: { id: number, roleName: string } | null = null;

  compareRoles(r1: any, r2: any): boolean {
    return r1 && r2 && r1.id === r2.id;
  }

  roles = [
    { id: 1, roleName: 'ADMIN' },
    { id: 2, roleName: 'LIBRAIRIAN' },
    { id: 3, roleName: 'USER' },
  ];

  constructor(
    public dialogRef: MatDialogRef<ChangeStatusDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: User }
  ) {
    this.selectedRole = data.user.userRole ?? null;
  }

  onCancel(): void {
    this.dialogRef.close(null);
  }

  onConfirm(): void {
    this.dialogRef.close(this.selectedRole); // retourne le nouveau statut
  }
}