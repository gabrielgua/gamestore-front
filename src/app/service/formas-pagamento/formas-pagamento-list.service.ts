import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { FormaPagamento } from 'src/app/models/formas-pagamento/forma.pagamento';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FormasPagamentoListService {

  private formasPagamento$ = new BehaviorSubject<FormaPagamento[]>([]);

  constructor(private http: HttpClient) { 
    this.init();
  }

  public getFormasPagamento(): Observable<FormaPagamento[]> {
    return this.formasPagamento$.asObservable();
  }

  init(): void {
    this.http.get<FormaPagamento[]>(`${environment.API_URL}/formas-pagamento`)
      .subscribe(formasPagamento => this.formasPagamento$.next(formasPagamento));
  }
}
