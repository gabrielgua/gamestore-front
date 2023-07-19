import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, debounceTime, delay, distinctUntilChanged, map, mergeMap, switchMap, tap } from 'rxjs';
import { JogoResumo } from 'src/app/models/jogos/jogo.resumo';
import { PageableModel } from 'src/app/models/pageables/pageable.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JogosHeaderSearchListService {
  
  private DEFAULT_SIZE: number = 3;
  constructor(private http: HttpClient) { }

  public search(term: string) {       
    return this.http.get<PageableModel<JogoResumo>>(`${environment.API_URL}/jogos?nome=${term}&size=${this.DEFAULT_SIZE}`);
  }


  
}
