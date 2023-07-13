import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { JogoResumo } from 'src/app/models/jogo.resumo';

@Injectable({
  providedIn: 'root'
})
export class JogosDestaque {

  private jogos$ = new BehaviorSubject<JogoResumo[]>([]);

  constructor(private http: HttpClient) {
    this.init();
  }
  
  public init(): void {
    this.http
      .get<JogoResumo[]>(`${environment.API_URL}/jogos/destaques`)
      .subscribe((jogos) => this.jogos$.next(jogos));
  }

  getJogosDestaque(): Observable<JogoResumo[]> {
    return this.jogos$.asObservable();
  }
  

}
