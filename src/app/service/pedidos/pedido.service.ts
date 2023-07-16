import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { Pedido } from 'src/app/models/pedidos/pedido';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PedidoService implements OnDestroy {

  private pedidos$ = new BehaviorSubject<Pedido[]>({} as Pedido[]);
  private isLoadingPedidos$ = new BehaviorSubject<boolean>(false);

  isLoadingPedidos = this.isLoadingPedidos$.asObservable();
  pedidosSub = new Subscription();


  constructor(private http: HttpClient) { 
  }
  
  ngOnDestroy(): void {
    this.pedidosSub.unsubscribe();
  }
  
  fetchUsuarioLogadoPedidos() {
    this.pedidos$.next([]);
    this.isLoadingPedidos$.next(true);
    this.pedidosSub = this.http.get<Pedido[]>(`${environment.API_URL}/usuarios/meus-pedidos`)
      .subscribe(pedidos => {
        this.pedidos$.next(pedidos);
        this.isLoadingPedidos$.next(false);
      });
  }

  fetchAllPedidos() {
    this.pedidos$.next([]);
    this.isLoadingPedidos$.next(true);
    this.pedidosSub = this.http.get<Pedido[]>(`${environment.API_URL}/pedidos`)
      .subscribe(pedidos => {
        this.pedidos$.next(pedidos);
        this.isLoadingPedidos$.next(false);
      });
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
