import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscriber, Subscription, catchError, ignoreElements, map, of, tap } from 'rxjs';
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
  
  pedidos$ = new Observable<Pedido[]>;
  pedidosError$ = new Observable<any>;

  actionSub = new Subscription();

  constructor(private pedidoService: PedidoService, private toastr: ToastrService) {}
  

  ngOnInit(): void {
    this.getPedidos();    
  }

  ngOnDestroy(): void {
    this.actionSub.unsubscribe();
  }
  
  private getPedidos(): void {
    this.pedidos$ = this.pedidoService.fetchUsuarioLogadoPedidos();
    this.pedidosError$ = this.pedidos$.pipe(
      ignoreElements(),
      catchError((err) => of(err))
    );
  }

  public confirmarPedido(pedido: Pedido): void {
    this.startPedidoLoading(pedido);
    this.actionSub = this.pedidoService.confirmarPedido(pedido)
      .subscribe({
        next: () => this.handleActionSuccess(pedido, 'confirmado'),
        error: (err) => this.handleActionError(pedido, 'confirmado', err.error.title),
      })
  }

  public cancelarPedido(pedido: Pedido): void {
    this.startPedidoLoading(pedido);
    this.actionSub = this.pedidoService.cancelarPedido(pedido)
      .subscribe({
        next: () => this.handleActionSuccess(pedido, 'cancelado'),
        error: (err) => this.handleActionError(pedido, 'cancelado', err.error.title),
      })
  }

  public reembolsarPedido(pedido: Pedido): void {
    this.startPedidoLoading(pedido);
    this.actionSub = this.pedidoService.reembolsarPedido(pedido)
      .subscribe({
        next: () => this.handleActionSuccess(pedido, 'reembolsado'),
        error: (err) => this.handleActionError(pedido, 'reembolsado', err.error.title),
      })
  }
 

  private handleActionSuccess(pedido: Pedido, action: string) {
    this.getPedidos();
    this.stopPedidoLoading(pedido);
    this.toastrSuccess(`Pedido ${action} com sucesso.`);
  }

  private handleActionError(pedido: Pedido, action: string, title: string) {
    this.getPedidos();
    this.stopPedidoLoading(pedido);
    this.toastrError(`Pedido não pode ser ${action}.`, title);
  }
  
  private startPedidoLoading(pedido: Pedido) {
    pedido.isLoadingActions = true;
  }

  private stopPedidoLoading(pedido: Pedido) {
    pedido.isLoadingActions = false;
  }

  private toastrError(message: string, title: string): void {
    this.toastr.error(message, title);
  }

  private toastrSuccess(message: string, title?: string): void {
    this.toastr.success(message, title);
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

}
