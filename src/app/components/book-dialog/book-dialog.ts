import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
import { BookInterface } from '../../models/book-interface';
import { MatIconModule } from '@angular/material/icon';
import {CommentarySection} from '../commentary-section/commentary-section'

@Component({
  selector: 'app-book-dialog',
  standalone: true,
  imports: [MatDialogModule, MatCardModule, MatIconModule, CommentarySection],
  templateUrl: './book-dialog.html',
})
export class BookDialog {
  constructor(
    // Injection de la référence pour pouvoir fermer la modale
    public dialogRef: MatDialogRef<BookDialog>,
    // Récupération des données du livre
    @Inject(MAT_DIALOG_DATA) public data: { book: BookInterface }
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }
  openAddComment(): void{
    console.log("hello from comments")
  }
}