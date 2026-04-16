import { Component, inject } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { BookApi } from '../../services/book-api';

@Component({
  selector: 'app-add-book-dialog',
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './add-book-dialog.html',
  styleUrl: './add-book-dialog.css',
})
export class AddBookDialog {
  private readonly bookService = inject(BookApi);
  BookForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    firstName: new FormControl('', [Validators.required]),
    isbn: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required]),
    frontCoverImg: new FormControl('/images/cover.jpg'),
    copyNumber: new FormControl('', [Validators.required]),
  });

  constructor(private dialogRef: MatDialogRef<AddBookDialog>) {}

  onCancel() {
    this.dialogRef.close();
  }

  onSave() {
    console.log('Livre :', this.BookForm.value);
    this.bookService.saveABook(this.BookForm.value).subscribe({
      next: (res) => {
        console.log('Book saved:', res);
        this.dialogRef.close();
      },
      error: (err) => console.error(err),
    });
  }
}
