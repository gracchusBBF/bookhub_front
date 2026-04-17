import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-change-password-dialog',
  standalone: true,
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './change-password-dialog.html',
  styleUrl: './change-password-dialog.css',

})
export class ChangePasswordDialog {
  passwordForm = new FormGroup({
    oldPassword: new FormControl('', [Validators.required]),
    newPassword: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  constructor(private dialogRef: MatDialogRef<ChangePasswordDialog>) {}

  onCancel() {
    this.dialogRef.close();
  }

  onSave() {
    if (this.passwordForm.valid) {
      
      this.dialogRef.close(this.passwordForm.value);
    }
  }
}