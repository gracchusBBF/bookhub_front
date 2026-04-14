import { ChangeDetectionStrategy, Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';

const ELEMENT_DATA = [
  {
    loan_id: '1',
    userName: 'Jean Paul',
    deadline: '20260602',
    book: 'Rowling: Harry Potter',
  },
  {
    loan_id: '2',
    userName: 'Jean Paul2',
    deadline: '20260604',
    book: 'Jean-Paul Paul Jean: La vie à la bibliothèque',
  },
  {
    loan_id: '3',
    userName: 'Jean Paul3',
    deadline: '20260601',
    book: 'Paul-Jean Jean Paul: Le livre de ma vie',
  },
];

@Component({
  selector: 'app-dashboard-librarian',
  imports: [MatCardModule, MatButtonModule, MatTableModule],
  templateUrl: './dashboard-librarian.html',
  styleUrl: './dashboard-librarian.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardLibrarian {
  displayedColumns: string[] = ['userName', 'deadline', 'book'];
  dataSource = ELEMENT_DATA;
}
