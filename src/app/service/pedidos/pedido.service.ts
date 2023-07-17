import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, firstValueFrom, tap } from 'rxjs';
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


  constructor(private http: HttpClient) { }
  
  ngOnDestroy(): void {
    this.pedidosSub.unsubscribe();
  }
  
  fetchUsuarioLogadoPedidos(): Promise<Pedido[]> {
    this.pedidos$.next([]);
    this.isLoadingPedidos$.next(true);
    return firstValueFrom(this.http.get<Pedido[]>(`${environment.API_URL}/usuarios/meus-pedidos`)
      .pipe(tap(pedidos => {
        this.pedidos$.next(pedidos);
        this.isLoadingPedidos$.next(false);
      })));
  }

  fetchAllPedidos(): Promise<Pedido[]> {
    this.pedidos$.next([]);
    this.isLoadingPedidos$.next(true);
    return firstValueFrom(this.http.get<Pedido[]>(`${environment.API_URL}/pedidos`)
      .pipe(tap(pedidos => {
        this.pedidos$.next(pedidos);
        this.isLoadingPedidos$.next(false);
      })));
  }

  public getPedidos() {
    return this.pedidos$.asObservable();
  }

  cancelarPedido(pedido: Pedido): void {
    pedido.isLoadingActions = true;
    this.http.put<void>(`${environment.API_URL}/pedidos/${pedido.codigo}/cancelar`, {})
      .subscribe(() => {
        this.fetchUsuarioLogadoPedidos();
        pedido.isLoadingActions = false;
      });
  }

  confirmarPedido(pedido: Pedido): void {
    pedido.isLoadingActions = true;
    this.http.put<void>(`${environment.API_URL}/pedidos/${pedido.codigo}/confirmar`, {})
      .subscribe(() => {
        this.fetchUsuarioLogadoPedidos();
        pedido.isLoadingActions = false;
      });
  }

  reembolsarPedido(pedido: Pedido): void {
    pedido.isLoadingActions = true;
    this.http.put<void>(`${environment.API_URL}/pedidos/${pedido.codigo}/reembolsar`, {})
      .subscribe(() => {
        this.fetchUsuarioLogadoPedidos();
        pedido.isLoadingActions = false;
      });
  }
}
