import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, startWith } from 'rxjs';
import { Compra } from 'src/app/models/compras/compra';
import { JogoResumo } from 'src/app/models/jogos/jogo.resumo';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ComprasUsuarioService {

  private compras$ = new BehaviorSubject<Compra[]>([]);

  constructor(private http: HttpClient) {
    this.fetchCompras();
  }

  fetchCompras(): void {
    this.http.get<Compra[]>(`${environment.API_URL}/usuarios/minhas-compras`)
      .pipe(startWith([]))
      .subscribe(compras => this.compras$.next(compras));
  }

  public getCompras(): Observable<Compra[]> {
    return this.compras$.asObservable();
  }

  public isPresent(jogoId: number): boolean {
    return this.compras$.getValue()
      .map(compra => compra.jogo.id)
      .includes(jogoId);
  }

  public refreshCompras(): void {
    this.fetchCompras();
  }

}
