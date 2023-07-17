import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, map, switchMap, tap } from 'rxjs';
import { Pedido } from 'src/app/models/pedidos/pedido';
import { StatusPedido } from 'src/app/models/pedidos/status.pedido';
import { PedidoService } from 'src/app/service/pedidos/pedido.service';

@Component({
  selector: 'app-pedidos-list',
  templateUrl: './pedidos-list.component.html',
  styleUrls: ['./pedidos-list.component.css']
})
export class PedidosListComponent implements OnInit, OnDestroy {


  constructor(private pedidoService: PedidoService) {}
  
  pedidos: Pedido[] = [];
  isLoading$ = new Observable<boolean>;
  pedidosSub = new Subscription();
 
  ngOnInit(): void {
    this.pedidoService.fetchUsuarioLogadoPedidos();
    this.getPedidos();
    this.getIsLoading();
  }

  ngOnDestroy(): void {
    this.pedidosSub.unsubscribe();
  }

  private getPedidos() {
    this.pedidosSub = this.pedidoService.getPedidos()
      .subscribe(pedidos => this.pedidos = pedidos);
  }

  private getIsLoading(): void {
    this.isLoading$ = this.pedidoService.isLoadingPedidos;
  }

 
  public isPositive(status: StatusPedido): boolean {
    return status === StatusPedido.CONFIRMADO || status === StatusPedido.CRIADO;
  }

  public hasDatasExtras(pedido: Pedido): boolean {
    return !!pedido.dataCancelamento || !!pedido.dataConfirmacao || !!pedido.dataReembolso;
  }

  public isCriado(status: StatusPedido): boolean {
    return status === StatusPedido.CRIADO;
  }

  public isConfirmado(status: StatusPedido): boolean {
    return status === StatusPedido.CONFIRMADO;
  }

  public isCanceladoOuReembolsado(status: StatusPedido): boolean {
    return status === StatusPedido.CANCELADO || status === StatusPedido.REEMBOLSADO;
  }

  public confirmarPedido(pedido: Pedido): void {
    this.pedidoService.confirmarPedido(pedido);
  }

  public cancelarPedido(pedido: Pedido): void {
    this.pedidoService.cancelarPedido(pedido);
  }

  public reembolsarPedido(pedido: Pedido): void {
    this.pedidoService.reembolsarPedido(pedido);
  }
 

}
