import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { subscribe } from 'diagnostics_channel';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, Subscription, catchError, firstValueFrom, tap } from 'rxjs';
import { Pedido } from 'src/app/models/pedidos/pedido';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PedidoService implements OnDestroy {

  private pedidos$ = new BehaviorSubject<Pedido[]>({} as Pedido[]);
  private isLoadingPedidos$ = new BehaviorSubject<boolean>(false);
  private error$ = new BehaviorSubject<boolean>(false);

  isLoadingPedidos = this.isLoadingPedidos$.asObservable();
  error = this.error$.asObservable();
  pedidosSub = new Subscription();


  constructor(private http: HttpClient, private toastr: ToastrService) { }
  
  ngOnDestroy(): void {
    this.pedidosSub.unsubscribe();
  }

  public getPedidos() {
    return this.pedidos$.asObservable();
  }

  public resetPedidos() {
    this.pedidos$.next([]);
  }

  private loadingNoError() {
    this.isLoadingPedidos$.next(true);
    this.error$.next(false);
  }

  public setPedidos(pedidos: Pedido[]) {
    this.pedidos$.next(pedidos);
  }
  
  fetchUsuarioLogadoPedidos() {
    this.loadingNoError();
    this.resetPedidos();

    this.http.get<Pedido[]>(`${environment.API_URL}/usuarios/meus-pedidos`)
      .subscribe({
        next: pedidos => {
          this.pedidos$.next(pedidos);
          this.isLoadingPedidos$.next(false); 
        },
        error: error => {
          console.log(error);
          this.isLoadingPedidos$.next(false); 
          this.error$.next(true);
        }
      });
  }

  fetchAllPedidos() {
    this.loadingNoError();
    this.resetPedidos();

    this.http.get<Pedido[]>(`${environment.API_URL}/pedidos`)
      .subscribe({
        next: pedidos => {
          this.pedidos$.next(pedidos);
          this.isLoadingPedidos$.next(false); 
        },
        error: error => {
          console.log(error);
          this.isLoadingPedidos$.next(false); 
          this.error$.next(true);
        }
      });
  }

  

  cancelarPedido(pedido: Pedido): void {
    pedido.isLoadingActions = true;
    this.http.put<void>(`${environment.API_URL}/pedidos/${pedido.codigo}/cancelar`, {})
      .subscribe({
        next: () => {
          this.fetchUsuarioLogadoPedidos();
          pedido.isLoadingActions = false;
        },
        error: (error) => {
          pedido.isLoadingActions = false;
          this.handleActionError('Erro ao cancelar pedido.', error.error.title);
        }
      });
  }

  confirmarPedido(pedido: Pedido): void {
    pedido.isLoadingActions = true;
    this.http.put<void>(`${environment.API_URL}/pedidos/${pedido.codigo}/confirmar`, {})
    .subscribe({
      next: () => {
        this.fetchUsuarioLogadoPedidos();
        pedido.isLoadingActions = false;
      },
      error: (error) => {
        pedido.isLoadingActions = false;
        this.handleActionError('Erro ao confirmar pedido.', error.error.title);
      }
    });
  }

  reembolsarPedido(pedido: Pedido): void {
    pedido.isLoadingActions = true;
    this.http.put<void>(`${environment.API_URL}/pedidos/${pedido.codigo}/reembolsar`, {})
    .subscribe({
      next: () => {
        this.fetchUsuarioLogadoPedidos();
        pedido.isLoadingActions = false;
      },
      error: (error) => {
        pedido.isLoadingActions = false;
        this.handleActionError('Erro ao reembolsar pedido.', error.error.title);
      }
    });
  }

  private handleActionError(message: string, title: string): void {
    this.toastr.error(message, title);
  }
}
