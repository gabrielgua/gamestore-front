import { Injectable } from '@angular/core';
import { Jogo } from '../models/jogo';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JogosDestaque {

  private jogos$ = new BehaviorSubject<Jogo[]>([]);

  constructor(private http: HttpClient) {
    this.init();
  }
  
  public init(): void {
    this.http
      .get<Jogo[]>(`${environment.API_URL}/jogos/destaques`)
      .subscribe((jogos) => this.jogos$.next(jogos));
  }

  getJogosDestaque(): Observable<Jogo[]> {
    return this.jogos$;
  }
  

}
