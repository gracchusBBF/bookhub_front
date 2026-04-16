import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { DashboardLibrarianService } from '../../services/dashboard-librarian-service';
import { AuthService } from '../../services/auth';
import { DatePipe } from '@angular/common';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-dashboard-librarian',
  imports: [MatCardModule, MatButtonModule, MatTableModule, DatePipe],
  templateUrl: './dashboard-librarian.html',
  styleUrl: './dashboard-librarian.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardLibrarian implements OnInit {
  librarianService = inject(DashboardLibrarianService);
  auth = inject(AuthService);
  loans_displayedColumns: string[] = ['startDate', 'deadline', 'bookTitle', 'actions'];
  overdues_displayedColumns: string[] = ['deadline', 'bookTitle'];
  nbTotalLoans: number = 0;
  nbActiveLoans: number = 0;
  activeLoans = signal<any>([]);
  overdueLoans = signal<any>([]);

  ngOnInit() {
    this.librarianService.getActiveLoansList().subscribe({
      next: (data) => {
        console.log('getLoansList: ');
        console.log(data);
        this.activeLoans.set(data);
      },
      error: (err) => console.error(err),
    });

    this.librarianService.getOverdueLoans().subscribe({
      next: (data) => {
        this.overdueLoans.set(data);
      },
      error: (err) => console.error(err),
    });

    this.librarianService.getNbTotalLoans().subscribe({
      next: (data) => {
        this.nbTotalLoans = data;
      },
      error: (err) => console.error(err),
    });

    this.librarianService.getNbActiveLoans().subscribe({
      next: (data) => {
        this.nbActiveLoans = data;
      },
      error: (err) => console.error(err),
    });
  }

  onReturnBook(id: string) {
    console.log('Return book with id:', id);
    this.librarianService
      .returnABook(id)
      .pipe(switchMap(() => this.librarianService.getActiveLoansList()))
      .subscribe({
        next: (loans) => {
          console.log('Updated loans:', loans);
          this.activeLoans.set(loans);
        },
        error: (err) => console.error(err),
      });
  }
}
