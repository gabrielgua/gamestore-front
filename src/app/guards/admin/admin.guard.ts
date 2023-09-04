import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard  {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(): boolean {
    
    if (this.authService.isLoggedIn() && !this.authService.temPermissao('ADMIN')) {
      this.router.navigate(['error/access-denied']);
      return false;
    }

    return true;
  }
  
}
