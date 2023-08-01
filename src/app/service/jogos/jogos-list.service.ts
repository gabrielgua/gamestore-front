import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Jogo } from 'src/app/models/jogos/jogo';
import { JogoFilter } from 'src/app/models/jogos/jogo.filter';
import { JogoPageableRequest } from 'src/app/models/jogos/jogo.pageable';
import { JogoResumo } from 'src/app/models/jogos/jogo.resumo';
import { PageableModel } from 'src/app/models/pageables/pageable.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JogosListService {

  pageableJogos$ = new BehaviorSubject<PageableModel<JogoResumo>>({} as PageableModel<JogoResumo>);
  constructor(private http: HttpClient) { }
  
  public init(pageable: JogoPageableRequest, filter: JogoFilter): void {
    let params = this.getParamsFromFilter(pageable, filter);
    this.http.get<PageableModel<JogoResumo>>(`${environment.API_URL}/jogos?${params.join('&')}`)
      .subscribe((pageable) => this.pageableJogos$.next(pageable));
  }

  public getPageableJogos(): Observable<PageableModel<JogoResumo>> {
    return this.pageableJogos$.asObservable();
  }

  
  private getParamsFromFilter(pageable: JogoPageableRequest, filter: JogoFilter): string[] {
    let filterMap = new Map<string, string>();

    filterMap.set('page=', pageable.page?.toString() ?? '');
    filterMap.set('size=', pageable.size?.toString() ?? '');
    filterMap.set('sort=', pageable.sort ?? '');
    filterMap.set('nome=', filter.nome ?? '');
    filterMap.set('modosIds=', filter.modosIds?.toString() ?? '');
    filterMap.set('categoriasIds=', filter.categoriasIds?.toString() ?? '');
    filterMap.set('plataformasIds=', filter.plataformasIds?.toString() ?? '');
    filterMap.set('gratuito=', filter.gratuito?.toString() ?? '')

    let params: string[] = [];
    
    filterMap.forEach((value, name) => {
      if (value.length) {
        params.push(name + value);
      }
    });

    return params;
  }
}
