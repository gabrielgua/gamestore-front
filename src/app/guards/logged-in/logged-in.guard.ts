import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {

      if (this.authService.isLoggedIn()) {
      this.router.navigate(['home']);
      return false;
    }

    return true;
  }

    
  
}
