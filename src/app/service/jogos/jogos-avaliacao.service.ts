import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Jogo } from 'src/app/models/jogos/jogo';
import { JogoPageableRequest } from 'src/app/models/jogos/jogo.pageable';
import { PageableModel } from 'src/app/models/pageables/pageable.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JogosAvaliacaoService {

  constructor(private http: HttpClient) {}

  public jogosPageable$ = new BehaviorSubject<PageableModel<Jogo>>(new PageableModel());
  

  public init(pageable: JogoPageableRequest): void {
    this.fetchJogosAvaliados(pageable);
  }

  private fetchJogosAvaliados(pageable: JogoPageableRequest): void {
    this.http.get<PageableModel<Jogo>>(`${environment.API_URL}/jogos?size=${pageable.size}&sort=${pageable.sort}&page=${pageable.page}`)
    .subscribe((pageable) => this.jogosPageable$.next(pageable));
  }

  getJogosAvaliados(): Observable<PageableModel<Jogo>> {
    return this.jogosPageable$.asObservable();
  } 


}
