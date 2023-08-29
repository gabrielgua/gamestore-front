import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, startWith } from 'rxjs';
import { JogoResumo } from 'src/app/models/jogos/jogo.resumo';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DesejosService {

  private desejos$ = new BehaviorSubject<JogoResumo[]>([]);
  private usuarioId = 0;

  constructor(private http: HttpClient, private authService: AuthService) { }

  public getDesejos(): Observable<JogoResumo[]> {
    return this.desejos$.asObservable();
  }

  public fetchDesejos(): void {
    this.http.get<JogoResumo[]>(`${environment.API_URL}/usuarios/meus-desejos`)
      .subscribe(desejos => this.desejos$.next(desejos));
  }

  public remover(jogoId: number): void {
    this.getUsuarioId();

    this.http.delete<void>(`${environment.API_URL}/usuarios/${this.usuarioId}/desejos/${jogoId}`)
      .subscribe(() => this.fetchDesejos());
  }

  public adicionar(jogoId: number): void {
    this.getUsuarioId();

    this.http.put<void>(`${environment.API_URL}/usuarios/${this.usuarioId}/desejos/${jogoId}`, null)
      .subscribe(() => this.fetchDesejos());
  }

  private getUsuarioId(): void {
    this.authService.getUsuarioId().subscribe(usuarioId => this.usuarioId = usuarioId);
  }
}
