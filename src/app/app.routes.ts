import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Connexion } from './pages/connexion/connexion';
import { DashboardAdmin } from './pages/dashboard-admin/dashboard-admin';
import { DashboardUser } from './pages/dashboard-user/dashboard-user';
import { DashboardLibrarian } from './pages/dashboard-librarian/dashboard-librarian';
import {DeleteAccountFallback} from './pages/delete-account-fallback/delete-account-fallback'
import { AuthGuard } from './guards/AuthGuard';
import { isRoleAllowed } from './guards/isRoleAllowed';

export const routes: Routes = [
    {
        path: '', component: Home, canActivate: [AuthGuard]
    },
    {
        path: 'connexion', component: Connexion
    },
    {
        path: 'user', component: DashboardUser, canActivate: [AuthGuard],
    },
    {
        path: 'librarian', component: DashboardLibrarian, canActivate: [AuthGuard, isRoleAllowed(["ROLE_ADMIN", "ROLE_LIBRARIAN"])]
    },
    {
        path:  'admin', component: DashboardAdmin, canActivate: [AuthGuard, isRoleAllowed(["ROLE_ADMIN"])]
    },
    {
        path:  'deleted-account', component: DeleteAccountFallback, canActivate: [AuthGuard]
    },
    {
        path: '**', redirectTo: ''
    }
];
