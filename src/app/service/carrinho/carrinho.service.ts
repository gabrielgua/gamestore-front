import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FormaPagamento } from 'src/app/models/formas-pagamento/forma.pagamento';
import { FormaPagamentoId } from 'src/app/models/formas-pagamento/forma.pagamento.id';
import { JogoId } from 'src/app/models/jogos/jogo.id';
import { JogoResumo } from 'src/app/models/jogos/jogo.resumo';
import { PedidoCreate } from 'src/app/models/pedidos/pedido.create';

export interface Carrinho {
  formaPagamentoId?: FormaPagamentoId,
  items: JogoResumo[]
}

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {

  defaultCarrinho: Carrinho = {
    items: [],
    formaPagamentoId: undefined
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
    if (this.isPresent(jogo.id)) {
      return;
    }
    
    this.carrinho$.next({ ...this.carrinho$.value, items: [...this.carrinho$.value.items, jogo] });    
    this.saveCarrinho()
  }

  removeJogo(jogoId: number): void {
    this.carrinho$.next({
      ...this.carrinho$.value, items: [...this.carrinho$.getValue().items.filter(jogo => jogo.id !== jogoId)]
    });

    if (!this.carrinho$.value.items.length) {
      this.clearCarrinho();
    }

    this.saveCarrinho()
  }

  addFormaPagamento(formaPagamentoId: number): void {
    this.carrinho$.next({
      ...this.carrinho$.value, formaPagamentoId: {id: formaPagamentoId}
    });
    
    this.saveCarrinho()
  }

  clearCarrinho(): void {
    this.carrinho$.next(this.defaultCarrinho);
    localStorage.removeItem('carrinho');
  }

  transformarIntoPedidoCreate(): PedidoCreate {
    return { 
      formaPagamento: {id: this.carrinho$.getValue().formaPagamentoId!.id}, 
      jogos: this.getJogosIdObject()
    }
  }

  public isPresent(jogoId: number): boolean {
    return this.carrinho$.getValue().items
      .map(item => item.id)
      .includes(jogoId);
  }

  private getJogosIdObject(): JogoId[] {
    return this.carrinho$.getValue().items
      .map(item => this.newJogoIdObject(item.id));
  }

  private newJogoIdObject(id: number): JogoId {
    return {id: id};
  }

  
}
