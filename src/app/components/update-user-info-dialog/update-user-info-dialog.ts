import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { UserDataDTO } from '../../services/user';

@Component({
  selector: 'app-update-user-info-dialog',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    MatDialogModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule
  ],
  templateUrl: './update-user-info-dialog.html',
  styleUrl: './update-user-info-dialog.css',
})
export class UpdateUserInfoDialog {
  // On crée une copie locale pour ne pas modifier le dashboard en direct avant validation
  updatedUser: UserDataDTO;

  constructor(
    public dialogRef: MatDialogRef<UpdateUserInfoDialog>,
    @Inject(MAT_DIALOG_DATA) public data: UserDataDTO
  ) {
    this.updatedUser = { ...data }; // Copie superficielle (shallow copy)
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.dialogRef.close(this.updatedUser);
  }
}