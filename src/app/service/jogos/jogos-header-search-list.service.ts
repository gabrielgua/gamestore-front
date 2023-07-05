import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { JogoResumo } from 'src/app/models/jogo.resumo';
import { PageableModel } from 'src/app/models/pageable.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JogosHeaderSearchListService {

  constructor(private http: HttpClient) { }

  jogos$: BehaviorSubject<PageableModel<JogoResumo>> = new BehaviorSubject(new PageableModel());

  public init(size: number, term: string): void {
    this.http.get<PageableModel<JogoResumo>>(`${environment.API_URL}/jogos?nome=${term}&size=${size}`)
      .subscribe((jogos) => this.jogos$.next(jogos));

  }

  public getJogos(): Observable<PageableModel<JogoResumo>> {
    return this.jogos$.asObservable();
  }
}
