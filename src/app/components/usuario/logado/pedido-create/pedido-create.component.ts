import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Jogo } from 'src/app/models/jogos/jogo';
import { Carrinho, CarrinhoService } from 'src/app/service/carrinho/carrinho.service';

@Component({
  selector: 'app-pedido-create',
  templateUrl: './pedido-create.component.html',
  styleUrls: ['./pedido-create.component.css']
})
export class PedidoCreateComponent implements OnInit {

  carrinho$ = new Observable<Carrinho>();
  constructor(private carrinhoService: CarrinhoService) {}

  ngOnInit(): void {
    this.carrinho$ = this.carrinhoService.getCarrinho();
  }
}
