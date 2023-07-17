import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/service/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/sing-in']);
      return false;
    }

    // guard to check if is loggedIn and is admin
    // not needed in this service will implement on another one later

    // if (this.authService.isLoggedIn() && !this.authService.temPermissao('ADMIN')) {
    //   this.router.navigate(['error/access-denied']);
    //   return false;
    // }

    // this.router.navigate(['pedidos']);
    return true;
  }
  
}
