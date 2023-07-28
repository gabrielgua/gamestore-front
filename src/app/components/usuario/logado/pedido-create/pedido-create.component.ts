import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable, map } from 'rxjs';
import { FormaPagamento } from 'src/app/models/formas-pagamento/forma.pagamento';
import { Jogo } from 'src/app/models/jogos/jogo';
import { Carrinho, CarrinhoService } from 'src/app/service/carrinho/carrinho.service';
import { FormasPagamentoListService } from 'src/app/service/formas-pagamento/formas-pagamento-list.service';

@Component({
  selector: 'app-pedido-create',
  templateUrl: './pedido-create.component.html',
  styleUrls: ['./pedido-create.component.css']
})
export class PedidoCreateComponent implements OnInit {

  formasPagamento$ = new Observable<FormaPagamento[]>();
  carrinho$ = new Observable<Carrinho>();
  total$ = new Observable<number>;

  form = this.formBuilder.group({
    formaPagamentoOptions: [null, [Validators.required]]
  })

  constructor(
    private carrinhoService: CarrinhoService, 
    private formBuilder: FormBuilder, 
    private formaPagamentoService: FormasPagamentoListService) {}

  ngOnInit(): void {
    this.carrinho$ = this.carrinhoService.getCarrinho();
    this.calcularValorTotal();
    this.getFormasPagamento();
  }

  private getFormasPagamento(): void {
    this.formasPagamento$ = this.formaPagamentoService.getFormasPagamento();
  }


  handleRemove(jogoId: number): void {
    this.carrinhoService.removeJogo(jogoId);
  }

  calcularValorTotal(): void {
    this.total$ = this.carrinho$.pipe(
      map(carrinho => carrinho.items
        .map(items => items.preco)
          .reduce((total, preco) => total + preco))
    );
  }

  handleSubmit(): void {    
    console.log(this.form.value);
  }

  isSelected(id: number): boolean {
    return this.form.controls['formaPagamentoOptions'].value === id;
  }
}
