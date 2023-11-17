import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Usuario } from 'src/app/models/usuarios/usuario';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioListService {

  private usuarios$ = new BehaviorSubject<Usuario[]>([]);

  constructor(private http: HttpClient) { }


  public getUsuarios(): Observable<Usuario[]> {
    return this.usuarios$.asObservable();
  }

  fetchUsuarios(): void {
    this.http.get<Usuario[]>(`${environment.API_URL}/usuarios`)
      .subscribe(usuarios => this.usuarios$.next(usuarios));
  }


  tornarAdmin(usuarioId: number): void {
    this.http.put(`${environment.API_URL}/usuarios/${usuarioId}/admin`, {})
      .subscribe(() => this.fetchUsuarios());
  }

  revogarAdmin(usuarioId: number): void {
    this.http.delete(`${environment.API_URL}/usuarios/${usuarioId}/admin`, {})
      .subscribe(() => this.fetchUsuarios());
  }
} 
