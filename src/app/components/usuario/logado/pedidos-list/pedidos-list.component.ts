import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription, catchError, map, switchMap, tap } from 'rxjs';
import { Animations } from 'src/app/animations/animations';
import { Pedido } from 'src/app/models/pedidos/pedido';
import { StatusPedido } from 'src/app/models/pedidos/status.pedido';
import { PedidoService } from 'src/app/service/pedidos/pedido.service';

@Component({
  selector: 'app-pedidos-list',
  templateUrl: './pedidos-list.component.html',
  styleUrls: ['./pedidos-list.component.css'],
  animations: [Animations]
})
export class PedidosListComponent implements OnInit, OnDestroy {


  constructor(private pedidoService: PedidoService, private toastr: ToastrService) {}
  
  pedidos: Pedido[] = [];
  isLoading$ = new Observable<boolean>;
  pedidosSub = new Subscription();
  error: boolean = false;
 
  ngOnInit(): void {
    this.pedidoService.resetPedidos();
    this.pedidoService.fetchAllPedidos();
    this.getPedidos();
  }

  ngOnDestroy(): void {
    this.pedidosSub.unsubscribe();    
  }

  private getPedidos() {
    this.pedidosSub = this.pedidoService.getPedidos()
      .subscribe(pedidos => this.pedidos = pedidos);
  }

  public getIsLoading(): Observable<boolean> {
    return this.pedidoService.isLoadingPedidos;
  }

  public getIsError(): Observable<boolean> {
    return this.pedidoService.error;
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
