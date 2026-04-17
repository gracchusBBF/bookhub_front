import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth";

export const isRoleAllowed = (allowedRoles: string[]) => {

    return () => {

    const authService = inject(AuthService);
    const router = inject(Router);
    const userRole = authService.getUserRole();

    if (!allowedRoles.includes(userRole)) {
        router.navigateByUrl('')
        return false;
    }
    return true;
    }   
    
}