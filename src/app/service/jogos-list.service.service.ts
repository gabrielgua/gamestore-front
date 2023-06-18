import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PageableModel } from '../models/pageable.model';
import { Jogo } from '../models/jogo';
import { JogoPageableRequest } from '../models/jogo.pageable';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JogosListService {

  pageableJogos$ = new BehaviorSubject<PageableModel<Jogo>>(new PageableModel());
  constructor(private http: HttpClient) { }
  
  public init(pageable: JogoPageableRequest): void {
    this.http.get<PageableModel<Jogo>>(`${environment.API_URL}/jogos?page=${pageable.page}&size=${pageable.size}&sort=${pageable.sort}`)
      .subscribe((pageable) => this.pageableJogos$.next(pageable));
  }

  public getPageableJogos(): Observable<PageableModel<Jogo>> {
    return this.pageableJogos$.asObservable();
  }
}
