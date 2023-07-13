import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, debounceTime, delay, distinctUntilChanged, map, mergeMap, switchMap, tap } from 'rxjs';
import { JogoResumo } from 'src/app/models/jogo.resumo';
import { PageableModel } from 'src/app/models/pageable.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JogosHeaderSearchListService {

  constructor(private http: HttpClient) { }

  jogos$ = new Observable<PageableModel<JogoResumo>>;
  term = new BehaviorSubject<string>('');
  private DEFAULT_SIZE: number = 3;


  public init(term: string) {
    return this.http.get<PageableModel<JogoResumo>>(`${environment.API_URL}/jogos?nome=${term}&size=${this.DEFAULT_SIZE}`)
  }


  public getJogos() {
    return this.jogos$
  }

  public search(term: string) {
    this.term.next(term.trim());
    this.jogos$ = this.term
      .pipe(
        debounceTime(500), 
        mergeMap(term => this.init(term)));
  }
}
