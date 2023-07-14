import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/service/auth/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    if (this.authService.isLoggedIn()) {
      
      
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.authService.token}`
        }
      })

    } else if (this.authService.isRefreshTokenValid()) {
      console.log('Access token expirado, gerando novo com Refresh Token...');
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.authService.refreshToken}`
        }
      })
    }

    request = request.clone({
      setHeaders: {
        'ngrok-skip-browser-warning': 'true'
      }
    })

    return next.handle(request);
  }
}

