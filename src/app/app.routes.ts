import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Connexion } from './pages/connexion/connexion';
import { DashboardAdmin } from './pages/dashboard-admin/dashboard-admin';
import { DashboardUser } from './pages/dashboard-user/dashboard-user';
import { DashboardLibrarian } from './pages/dashboard-librarian/dashboard-librarian';
import {DeleteAccountFallback} from './pages/delete-account-fallback/delete-account-fallback'
import { BookManagement } from './pages/book-management/book-management';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'connexion',
    component: Connexion,
  },
  {
    path: 'user',
    component: DashboardUser,
  },
  {
    path: 'librarian',
    component: DashboardLibrarian
  },
  {
    path: 'librarian/books',
    component: BookManagement,
  },
  {
    path: 'admin',
    component: DashboardAdmin,
  },
  {
    path: 'deleted-account',
    component: DeleteAccountFallback,
  },
  {
    path: '**', redirectTo: "", pathMatch: "full"
  }
];
