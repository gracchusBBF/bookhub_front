import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth";

export const isRoleAllowed = (allowedRoles: string[]) => {

    return () => {

    const authService = inject(AuthService);
    const router = inject(Router);
    const userRole = authService.getUserRole();

    if (!allowedRoles.includes(userRole)) {
        console.log(authService.getUserRole())
        router.navigateByUrl('')
        return false;
    }

    console.log(authService.getUserRole())
    return true;
    }   
    
}