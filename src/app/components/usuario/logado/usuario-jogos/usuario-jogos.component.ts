import { Component, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Animations } from 'src/app/animations/animations';
import { Compra } from 'src/app/models/compras/compra';
import { ComprasUsuarioService } from 'src/app/service/jogos/jogos-usuario-logado.service';
import { ModalService } from 'src/app/service/modal/modal.service';

@Component({
  selector: 'app-usuario-jogos',
  templateUrl: './usuario-jogos.component.html',
  styleUrls: ['./usuario-jogos.component.css'],
  animations: [Animations]
})
export class UsuarioJogosComponent implements OnInit {

  compras$ = new Observable<Compra[]>();
  compra$ = new BehaviorSubject<Compra>({} as Compra);
  showKey: boolean = false;

  
  constructor(private service: ComprasUsuarioService, private modalService: ModalService, private viewContainerRef: ViewContainerRef) {}

  ngOnInit(): void {
    this.service.fetchCompras();
    this.compras$ = this.service.getCompras();
  }

  showInfo(compra: Compra): void {
    this.showKey = false;
    if (compra.id === this.compra$.getValue().id) {
      this.closeInfo();
      return;
    }
    this.compra$.next(compra);    
  }

  closeInfo(): void {
    this.compra$.next({} as Compra);
  }
}
