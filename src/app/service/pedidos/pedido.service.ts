import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Pedido } from 'src/app/models/pedidos/pedido';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  private pedidos$ = new BehaviorSubject<Pedido[]>({} as Pedido[]);

  constructor(private http: HttpClient) { }

  fetchUsuarioLogadoPedidos() {
    this.http.get<Pedido[]>(`${environment.API_URL}/usuarios/meus-pedidos`)
      .subscribe(pedidos => this.pedidos$.next(pedidos));
  }

  fetchAllPedidos() {
    this.http.get<Pedido[]>(`${environment.API_URL}/pedidos`)
      .subscribe(pedidos => this.pedidos$.next(pedidos));
  }


  public getPedidos() {
    return this.pedidos$.asObservable();
  }

  cancelarPedido(codigo: string): void {
    this.http.put<void>(`${environment.API_URL}/pedidos/${codigo}/cancelar`, {})
      .subscribe(() => this.fetchUsuarioLogadoPedidos());
  }

  confirmarPedido(codigo: string): void {
    this.http.put<void>(`${environment.API_URL}/pedidos/${codigo}/confirmar`, {})
      .subscribe(() => this.fetchUsuarioLogadoPedidos());
  }

  reembolsarPedido(codigo: string): void {
    this.http.put<void>(`${environment.API_URL}/pedidos/${codigo}/reembolsar`, {})
      .subscribe(() => this.fetchUsuarioLogadoPedidos());
  }
}
