import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Jogo } from 'src/app/models/jogo';
import { JogoFilter } from 'src/app/models/jogo.filter';
import { JogoPageableRequest } from 'src/app/models/jogo.pageable';
import { PageableModel } from 'src/app/models/pageable.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JogosListService {

  pageableJogos$ = new BehaviorSubject<PageableModel<Jogo>>(new PageableModel());
  constructor(private http: HttpClient) { }
  
  public init(pageable: JogoPageableRequest, filter: JogoFilter): void {
    this.http.get<PageableModel<Jogo>>(`${environment.API_URL}/jogos?page=${pageable.page}&size=${pageable.size}&sort=${pageable.sort}&nome=${filter.nome}&modosIds=${filter.modosIds}&categoriasIds=${filter.categoriasIds}&plataformasIds=${filter.plataformasIds}`)
      .subscribe((pageable) => this.pageableJogos$.next(pageable));
  }

  public getPageableJogos(): Observable<PageableModel<Jogo>> {
    return this.pageableJogos$.asObservable();
  }
}
