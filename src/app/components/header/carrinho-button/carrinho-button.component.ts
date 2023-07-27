import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { CarrinhoService } from 'src/app/service/carrinho/carrinho.service';

@Component({
  selector: 'app-carrinho-button',
  templateUrl: './carrinho-button.component.html',
  styleUrls: ['./carrinho-button.component.css']
})
export class CarrinhoButtonComponent implements OnInit {

  count$ = new Observable<number>();

  constructor(private carrinhoService: CarrinhoService) {}


  ngOnInit(): void {
    this.count$ = this.carrinhoService.getCarrinho().pipe(map(carrinho => carrinho.items.length));
  }
}
