import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth";

export const AuthGuard = () => {

    const authService = inject(AuthService);
    const router = inject(Router);

    if (!authService.authStatus.getValue()) {
        router.navigateByUrl('/connexion')
        console.log(authService.authStatus.getValue())
        return false;
    }

    console.log(authService.authStatus.getValue())
    return true;
    
}