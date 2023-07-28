import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FormaPagamento } from 'src/app/models/formas-pagamento/forma.pagamento';
import { JogoResumo } from 'src/app/models/jogos/jogo.resumo';

export interface Carrinho {
  formaPagamento?: FormaPagamento,
  items: JogoResumo[]
}

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {

  defaultCarrinho: Carrinho = {
    items: [],
    formaPagamento: undefined
  }

  private carrinho$ = new BehaviorSubject<Carrinho>(this.defaultCarrinho);

  constructor() { 
    const currentCarrinho = JSON.parse(localStorage.getItem('carrinho')!);
    if (currentCarrinho) {      
      this.carrinho$ = new BehaviorSubject<Carrinho>(currentCarrinho);
    }
  }

  public getCarrinho(): Observable<Carrinho> {
    return this.carrinho$.asObservable();
  }

  private saveCarrinho(): void {
    localStorage.setItem('carrinho', JSON.stringify(this.carrinho$.getValue()));
  }

  addJogo(jogo: JogoResumo): void {
    this.carrinho$.next({ ...this.carrinho$.value, items: [...this.carrinho$.value.items, jogo] });    
    this.saveCarrinho()
  }

  removeJogo(jogoId: number): void {
    this.carrinho$.next({
      ...this.carrinho$.value, items: [...this.carrinho$.getValue().items.filter(jogo => jogo.id !== jogoId)]
    });
    this.saveCarrinho()
  }

  addFormaPagamento(formaPagamento: FormaPagamento): void {
    this.carrinho$.next({
      ...this.carrinho$.value, formaPagamento: formaPagamento
    });
    this.saveCarrinho()
  }

  clearCarrinho(): void {
    this.carrinho$.next(this.defaultCarrinho);
  }

  
}
