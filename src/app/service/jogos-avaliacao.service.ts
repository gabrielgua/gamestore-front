import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Jogo } from '../models/jogo';
import { environment } from 'src/environments/environment';
import { JogoPageable } from '../models/jogo.pageable';

@Injectable({
  providedIn: 'root'
})
export class JogosAvaliacaoService implements OnInit {

  constructor(private http: HttpClient) {
    this.init();
  }

  public jogos$ = new BehaviorSubject<Jogo[]>([]);
  private pageable = {
    size: '4',
    sort: 'nota,desc',
  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  public init(): void {
    this.fetchJogosAvaliados(this.pageable);
  }

  private fetchJogosAvaliados(pageable: JogoPageable): void {
    this.http.get<Jogo[]>(`${environment.API_URL}/jogos?size=${pageable.size}&sort=${pageable.sort}`)
    .subscribe((jogos) => this.jogos$.next(jogos));
  }

  getJogosAvaliados(): Observable<Jogo[]> {
    return this.jogos$.asObservable();
  } 
}
