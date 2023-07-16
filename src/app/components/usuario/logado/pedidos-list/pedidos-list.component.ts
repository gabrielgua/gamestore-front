import { Component, OnInit } from '@angular/core';
import { map, tap } from 'rxjs';
import { Pedido } from 'src/app/models/pedidos/pedido';
import { StatusPedido } from 'src/app/models/pedidos/status.pedido';
import { PedidoService } from 'src/app/service/pedidos/pedido.service';

@Component({
  selector: 'app-pedidos-list',
  templateUrl: './pedidos-list.component.html',
  styleUrls: ['./pedidos-list.component.css']
})
export class PedidosListComponent implements OnInit {


  constructor(private pedidoService: PedidoService) {}
 

  pedidos: Pedido[] = [];


  ngOnInit(): void {
    this.pedidoService.fetchUsuarioLogadoPedidos();
    this.getPedidos();
  }

  getPedidos() {
    this.pedidoService.getPedidos()
      .subscribe(pedidos => {
        if (pedidos.length) {
          this.pedidos = pedidos;
        }
      });
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

  public confirmarPedido(codigo: string): void {
    this.pedidoService.confirmarPedido(codigo);
  }

  public cancelarPedido(codigo: string): void {
    this.pedidoService.cancelarPedido(codigo);
  }

  public reembolsarPedido(codigo: string): void {
    this.pedidoService.reembolsarPedido(codigo);
  }
 

}
