import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pedido } from 'src/app/models/pedidos/pedido';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PedidoService  {


  constructor(private http: HttpClient) { }
  
  
  fetchUsuarioLogadoPedidos(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${environment.API_URL}/usuarios/meus-pedidos`);
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

  
}
