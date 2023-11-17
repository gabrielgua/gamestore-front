import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, startWith } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { TipoUsuario } from 'src/app/models/usuarios/tipo.usuario';
import { Usuario } from 'src/app/models/usuarios/usuario';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
import { UsuarioSenhaRequest } from 'src/app/models/usuarios/usuario.senha.request';
import { UsuarioRequest } from 'src/app/models/usuarios/usuario.request';
import { AlterarSenhaRequest } from 'src/app/models/usuarios/alterar-senha.request';
import { DesejosService } from '../usuario-logado/desejos/desejos.service';
import { ComprasUsuarioService } from '../jogos/jogos-usuario-logado.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private usuario$ = new BehaviorSubject<Usuario>(new Usuario());

  constructor(private authService: AuthService, private http: HttpClient, private desejosService: DesejosService, private compraService: ComprasUsuarioService) {
    this.init();
  }

  public getUsuario(): Observable<Usuario> {    
    return this.usuario$.asObservable();
  }


  public setUsuario(usuario: Usuario): void {
    this.usuario$.next(usuario);
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
      .subscribe(usuario => {
        this.usuario$.next(usuario);

        this.fetchDesejos();
        this.fetchCompras();
      });

      
  }

  private fetchDesejos(): void {
    this.desejosService.fetchDesejos();
  }

  private fetchCompras(): void {
    this.compraService.fetchCompras();
  }

  public isAdmin(): boolean {
    return this.authService.temPermissao(TipoUsuario.ADMIN);
  }

  public isUsuarioLogado(usuarioId: number): boolean {
    return this.usuario$.getValue().id === usuarioId;
  }

  public changeAvatar(avatarUrl: string): void {
    this.http.post<Usuario>(`${environment.API_URL}/usuarios/trocar-avatar`, avatarUrl)
      .pipe(startWith(new Usuario()))
      .subscribe(usuario => this.usuario$.next(usuario));
  }

  public editSelf(usuarioRequest: UsuarioRequest): Observable<Usuario> {
    return this.http.put<Usuario>(`${environment.API_URL}/usuarios/${this.usuario$.getValue().id}`, usuarioRequest);
  }

  public editPassword(senhaRequest: AlterarSenhaRequest): Observable<void> {
    return this.http.put<void>(`${environment.API_URL}/usuarios/${this.usuario$.getValue().id}/senha`, senhaRequest);
  }

}

