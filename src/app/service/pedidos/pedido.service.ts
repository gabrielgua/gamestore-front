import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { Pedido } from 'src/app/models/pedidos/pedido';
import { PedidoCreate } from 'src/app/models/pedidos/pedido.create';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PedidoService  {

  constructor(private http: HttpClient) { }
  
  
  fetchUsuarioLogadoPedidos(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${environment.API_URL}/usuarios/meus-pedidos`)
      .pipe(tap(pedidos => pedidos.sort((a, b) => b.id - a.id)));
  }

  fetchAllPedidos() {
    return this.http.get<Pedido[]>(`${environment.API_URL}/pedidos`);
  }

  cancelarPedido(pedido: Pedido) {
    return this.http.put<void>(`${environment.API_URL}/pedidos/${pedido.codigo}/cancelar`, {});
  }

  confirmarPedido(pedido: Pedido) {
    return this.http.put<void>(`${environment.API_URL}/pedidos/${pedido.codigo}/confirmar`, {})
  }

  reembolsarPedido(pedido: Pedido) {
    return this.http.put<void>(`${environment.API_URL}/pedidos/${pedido.codigo}/reembolsar`, {})
  }

  createPedido(pedido: PedidoCreate): Observable<Pedido> {
    return this.http.post<Pedido>(`${environment.API_URL}/pedidos`, pedido);
  }

  
}
