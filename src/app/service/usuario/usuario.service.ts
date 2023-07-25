import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Usuario } from 'src/app/models/usuarios/usuario';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, concatMap, map, startWith, switchMap, tap } from 'rxjs';
import { TipoUsuario } from 'src/app/models/usuarios/tipo.usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private usuario$ = new BehaviorSubject<Usuario>(new Usuario());

  constructor(private authService: AuthService, private http: HttpClient) {
    this.init();
  }

  public getUsuario(): Observable<Usuario> {    
    return this.usuario$.asObservable();
  }
  

  public init(): void { 
    if (!this.authService.isLoggedIn() && !this.authService.isRefreshTokenValid()) {
      return;
    } 
    
    if (this.authService.isRefreshTokenValid() && !this.authService.isLoggedIn()) {      
      this.authService.authenticateViaRefreshToken();      
    }

    this.http.get<Usuario>(`${environment.API_URL}/usuarios/meus-dados`)
      .pipe(startWith(new Usuario()))
      .subscribe(usuario => this.usuario$.next(usuario));
      
  }

  public isAdmin() {
    return this.authService.temPermissao(TipoUsuario.ADMIN);
  }

 

 
}

