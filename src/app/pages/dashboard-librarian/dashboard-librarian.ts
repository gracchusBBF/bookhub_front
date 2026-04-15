import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { DashboardLibrarianService } from '../../services/dashboard-librarian-service';
import { AuthService } from '../../services/auth';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dashboard-librarian',
  imports: [MatCardModule, MatButtonModule, MatTableModule, DatePipe],
  templateUrl: './dashboard-librarian.html',
  styleUrl: './dashboard-librarian.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardLibrarian implements OnInit {
  librarianStats = inject(DashboardLibrarianService);
  auth = inject(AuthService);
  displayedColumns: string[] = ['userName', 'deadline', 'bookTitle'];
  overdueLoans = signal<any>([]);

  ngOnInit() {
    this.librarianStats.getOverdueLoans().subscribe({
      next: (data) => {
        console.log('Overdue loans :');
        console.log(data);
        this.overdueLoans.set(data);
      },
      error: (err) => console.error(err),
    });
  }
}
