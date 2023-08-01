import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription, filter, map, tap } from 'rxjs';
import { Animations } from 'src/app/animations/animations';
import { FormaPagamento } from 'src/app/models/formas-pagamento/forma.pagamento';
import { Jogo } from 'src/app/models/jogos/jogo';
import { JogoId } from 'src/app/models/jogos/jogo.id';
import { Pedido } from 'src/app/models/pedidos/pedido';
import { PedidoCreate } from 'src/app/models/pedidos/pedido.create';
import { Carrinho, CarrinhoService } from 'src/app/service/carrinho/carrinho.service';
import { FormasPagamentoListService } from 'src/app/service/formas-pagamento/formas-pagamento-list.service';
import { JogosUsuarioLogadoService } from 'src/app/service/jogos/jogos-usuario-logado.service';
import { PedidoService } from 'src/app/service/pedidos/pedido.service';

@Component({
  selector: 'app-pedido-create',
  templateUrl: './pedido-create.component.html',
  styleUrls: ['./pedido-create.component.css'],
  animations: [Animations]
})
export class PedidoCreateComponent implements OnInit, OnDestroy {

  formasPagamento$ = new Observable<FormaPagamento[]>();
  carrinho$ = new Observable<Carrinho>();
  total$ = new Observable<number>;
  isLoadingCreate: boolean = false;
  pedidoSub = new Subscription();

  form = this.formBuilder.group({
    formaPagamentoOptions: [null, [Validators.required]]
  })

  constructor(
    private carrinhoService: CarrinhoService, 
    private pedidoService: PedidoService,
    private formBuilder: FormBuilder, 
    private toastr: ToastrService,
    private router: Router,
    private formaPagamentoService: FormasPagamentoListService) {}
  
  ngOnInit(): void {
    this.carrinho$ = this.carrinhoService.getCarrinho();
    this.calcularValorTotal();
    this.getFormasPagamento();
  }

  ngOnDestroy(): void {
    this.pedidoSub.unsubscribe();
  }

  get formaPagamento() {
    return this.form.controls['formaPagamentoOptions'];
  }

  handleRemove(jogoId: number): void {
    this.carrinhoService.removeJogo(jogoId);
  }

  handleSubmit(): void {    
    if (!this.formaPagamento.value) {
      return 
    }

    this.carrinhoService.addFormaPagamento(this.formaPagamento.value);
    this.fazerPedido(this.carrinhoService.transformarIntoPedidoCreate());
  }

  private getFormasPagamento(): void {
    this.formasPagamento$ = this.formaPagamentoService.getFormasPagamento();
  }

  private calcularValorTotal(): void {
    this.total$ = this.carrinho$.pipe(
      filter(carrinho => carrinho.items.length != 0),
      map(carrinho => carrinho.items
        .map(items => items.preco)
          .reduce((total, preco) => total + preco))
    );
  }

  private fazerPedido(pedidoCreate: PedidoCreate): void {
    this.isLoadingCreate = true;
    this.pedidoSub = this.pedidoService.createPedido(pedidoCreate).subscribe({
      next: pedido => this.handleCreatePedidoSuccess(pedido),
      error: err => this.handleCreatePedidoError(err),
    });
  }

  private handleCreatePedidoSuccess(pedido: Pedido) {
    this.isLoadingCreate = false;
    this.router.navigate(['pedidos'])
      .then(() => {
        this.toastr.success('Pedido criado com sucesso.');
        this.carrinhoService.clearCarrinho();
      })
  }

  private handleCreatePedidoError(err: any) {
    this.isLoadingCreate = false
    this.toastr.error(err.error.detail);
  }

  isSelected(id: number): boolean {
    return this.formaPagamento.value === id;
  }
}
