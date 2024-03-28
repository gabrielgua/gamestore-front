import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable, firstValueFrom, tap } from 'rxjs';
import { AuthRequest } from 'src/app/models/auth/auth.request';
import { CheckEmailRequest } from 'src/app/models/usuarios/check-email.request';
import { CheckUsernameRequest } from 'src/app/models/usuarios/check-username.request';
import { UsuarioSenhaRequest } from 'src/app/models/usuarios/usuario.senha.request';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  
  private token_payload: any;
  private usuarioId$ = new BehaviorSubject<number>(0);
  private logout$ = new BehaviorSubject<Boolean>(false);



  constructor(
    private http: HttpClient, 
    private jwtHelper: JwtHelperService,
    private router: Router
    
    ) { 
      if (this.isLoggedIn()) {
        this.armazenarAccessToken(this.token!);
      } 
    }



  public get token() {
    return localStorage.getItem('token');
  }

  public get refreshToken() {
    return localStorage.getItem('refreshToken');
  }

  public getUsuarioId() {
    return this.usuarioId$.asObservable();
  }

  public getLogout() {
    return this.logout$.asObservable();
  }

 
  public isLoggedIn(): boolean {
    return this.token != null && !this.jwtHelper.isTokenExpired(this.token);
  }

  public isRefreshTokenValid(): boolean {
    return this.refreshToken != null && !this.jwtHelper.isTokenExpired(this.refreshToken);
  }

  public checkUsername(username: string): Observable<boolean> {
    const request: CheckUsernameRequest = {
      username: username
    }    

    if (this.isLoggedIn()) {
      request.usuarioId = this.usuarioId$.getValue();
    }
    
    return this.http.post<boolean>(`${environment.API_URL}/usuarios/check-username`, request);
  }

  public checkEmail(email: string): Observable<boolean> {
    const request: CheckEmailRequest = {
      email: email
    }

    if (this.isLoggedIn()) {
      request.usuarioId = this.usuarioId$.getValue();
    }
    
    return this.http.post<boolean>(`${environment.API_URL}/usuarios/check-email`, request);
  }

  public authenticateViaRefreshToken() {
    firstValueFrom(this.http.post<any>(`${environment.API_URL}/auth/refresh-token`, {}).pipe(
      tap(response => {
        this.armazenarAccessToken(response['access_token']);
        this.armazenarRefreshToken(response['refresh_token']);
      })
    ));
  }

  public authenticate(request: AuthRequest): Promise<any> {
    this.limparLocalStorage();
    return firstValueFrom(this.http.post<any>(`${environment.API_URL}/auth/authenticate`, request).pipe(
      tap(response => {
        this.armazenarAccessToken(response['access_token']);
        this.armazenarRefreshToken(response['refresh_token']);
      })
    ))
  }

  public register(usuario: UsuarioSenhaRequest): Promise<any> {
    return firstValueFrom(this.http.post<any>(`${environment.API_URL}/auth/register`, usuario).pipe(
      tap(response => {
        this.armazenarAccessToken(response['access_token']);
        this.armazenarRefreshToken(response['refresh_token']);        
      })
    ));
  }

  public temPermissao(permissao: string): boolean {
    return this.token_payload && this.token_payload.authorities.includes(permissao);
  }

  public temQualquerPermissao(permissoes: string[]): boolean {
    for (const permissao of permissoes) {
      if (this.temPermissao(permissao)) {
        return true;
      }
    }

    return false;
  }

  public armazenarAccessToken(token: string) {
    this.token_payload = this.jwtHelper.decodeToken(token);    
    this.usuarioId$.next(this.token_payload.userId);
    localStorage.setItem('token', token);
  }

  public armazenarRefreshToken(token: string) {
    localStorage.setItem('refreshToken', token);
  }

  public logout(): void {

    this.logout$.next(true);
    this.resetJwtPayload();
    this.limparLocalStorage();
    this.router.navigate(['']);
    window.location.reload();
  }

  private limparLocalStorage(): void {
    localStorage.clear();
  }

  private resetJwtPayload(): void {
    this.token_payload = null;
  }


}
