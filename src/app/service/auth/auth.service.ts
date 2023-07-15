import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable, firstValueFrom, tap } from 'rxjs';
import { AuthRequest } from 'src/app/models/auth.request';
import { UsuarioRequest } from 'src/app/models/usuarioRequest';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  
  private token_payload: any;
  private usuarioId$ = new BehaviorSubject<number>(0);


  constructor(
    private http: HttpClient, 
    private jwtHelper: JwtHelperService

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

 
  public isLoggedIn(): boolean {
    return this.token != null && !this.jwtHelper.isTokenExpired(this.token);
  }

  public isRefreshTokenValid(): boolean {
    return this.refreshToken != null && !this.jwtHelper.isTokenExpired(this.refreshToken);
  }

  public checkUsername(username: string): Observable<boolean> {
    const request = { username: username }    
    return this.http.post<boolean>(`${environment.API_URL}/usuarios/check-username`, request);
  }

  public checkEmail(email: string): Observable<boolean> {
    const request = { email: email }
    return this.http.post<boolean>(`${environment.API_URL}/usuarios/check-email`, request);
  }

  public authenticateViaRefreshToken() {
    this.http.post<any>(`${environment.API_URL}/auth/refresh-token`, {}).pipe(
      tap(response => {
        this.armazenarAccessToken(response['access_token']);
        this.armazenarRefreshToken(response['refresh_token']);
      })
    );
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

  public register(usuario: UsuarioRequest): Promise<any> {
    return firstValueFrom(this.http.post<any>(`${environment.API_URL}/auth/register`, usuario).pipe(
      tap(response => {
        this.armazenarAccessToken(response['access_token']);
        this.armazenarRefreshToken(response['refresh_token']);        
      })
    ));
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
    this.resetJwtPayload();
    this.limparLocalStorage();
  }

  private limparLocalStorage(): void {
    localStorage.clear();
  }

  private resetJwtPayload(): void {
    this.token_payload = null;
  }


}
