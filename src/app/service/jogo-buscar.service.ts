import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Jogo } from '../models/jogo';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JogoBuscarService {

  public jogo$ = new BehaviorSubject<Jogo>(new Jogo());

  constructor(private http: HttpClient) { }

  public fetchJogoData(uriNome: string): void {
    this.http.get<Jogo>(`${environment.API_URL}/jogos?nome=${uriNome}`)
    .subscribe((jogo) => {
      this.jogo$.next(jogo);
    });
  }


  public getJogo(): Observable<Jogo> {
    return this.jogo$.asObservable();
  }
}
