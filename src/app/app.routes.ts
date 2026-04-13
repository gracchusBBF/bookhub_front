import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Connexion } from './pages/connexion/connexion';
import { DashboardAdmin } from './pages/dashboard-admin/dashboard-admin';
import { DashboardUser } from './pages/dashboard-user/dashboard-user';
import { DashboardLibrarian } from './pages/dashboard-librarian/dashboard-librarian';

export const routes: Routes = [
    {
        path: '', component: Home
    },
    {
        path: 'connexion', component: Connexion
    },
    {
        path: 'user', component: DashboardUser
    },
    {
        path: 'librarian', component: DashboardLibrarian
    },
    {
        path:  'admin', component: DashboardAdmin
    }
];
