import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Usuario } from 'src/app/models/usuarios/usuario';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private usuario$ = new BehaviorSubject<Usuario>(new Usuario());

  usuarioId: number = 0;

  
  constructor(private authService: AuthService, private http: HttpClient) { }

  public getUsuario(): Observable<Usuario> {
    return this.usuario$.asObservable();
  }
  
  
  public init(): void { 
    
    if (this.authService.isLoggedIn()) {
      this.authService.getUsuarioId().subscribe((usuarioId: number) => {
        this.usuarioId = usuarioId;
      })
      
      this.http.get<Usuario>(`${environment.API_URL}/usuarios/${this.usuarioId}`)  
        .subscribe(usuario => this.usuario$.next(usuario))
    } else if (this.authService.isRefreshTokenValid()) {
      
      this.authService.authenticateViaRefreshToken();

      this.authService.getUsuarioId().subscribe((usuarioId: number) => {
        this.usuarioId = usuarioId;
      })
    }
  }

  private resetUsuarioState(): void {
    this.usuario$.next(new Usuario());
  }
}

