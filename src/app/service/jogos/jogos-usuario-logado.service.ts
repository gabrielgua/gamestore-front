import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { JogoResumo } from 'src/app/models/jogos/jogo.resumo';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JogosUsuarioLogadoService {

  private jogos$ = new BehaviorSubject<JogoResumo[]>([]);

  constructor(private http: HttpClient) {
    this.fetchJogos();
  }

  private fetchJogos(): void {
    this.http.get<JogoResumo[]>(`${environment.API_URL}/usuarios/meus-jogos`)
      .subscribe(jogos => this.jogos$.next(jogos));
  }

  public getJogos(): Observable<JogoResumo[]> {
    return this.jogos$.asObservable();
  }

  public isPresent(jogoId: number): boolean {
    return this.jogos$.getValue()
      .map(jogo => jogo.id)
      .includes(jogoId);
  }

  public refreshJogos(): void {
    this.fetchJogos();
  }

}
