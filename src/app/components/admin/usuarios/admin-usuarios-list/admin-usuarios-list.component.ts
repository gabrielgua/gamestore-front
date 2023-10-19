import { Component, HostListener, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs';
import { Animations } from 'src/app/animations/animations';
import { TipoUsuario } from 'src/app/models/usuarios/tipo.usuario';
import { Usuario } from 'src/app/models/usuarios/usuario';
import { ModalService } from 'src/app/service/modal/modal.service';
import { UsuarioService } from 'src/app/service/usuario/usuario.service';
import { UsuarioListService } from 'src/app/service/usuarios/usuario-list.service';

@Component({
  selector: 'app-admin-usuarios-list',
  templateUrl: './admin-usuarios-list.component.html',
  styleUrls: ['./admin-usuarios-list.component.css'],
  animations: [Animations]
})
export class AdminUsuariosListComponent implements OnInit {

  

  usuarios$ = new Observable<Usuario[]>();
  usuarioFilter = 0;
  searchTerm = '';

  constructor(
    private service: UsuarioListService, 
    private modalService: ModalService,
    private viewContainerRef: ViewContainerRef) {}


  ngOnInit(): void {
    this.service.fetchUsuarios();
    this.usuarios$ = this.service.getUsuarios();
  }

  @HostListener('document: click', ['$event'])
  private handleDocumentClick(event: any): void {
    if(event.target.id != 'btn-detalhes') {
      this.closeActions();
    }
  }

  openActions(usuarioId: number): void {
    if (this.usuarioFilter === usuarioId) {
      this.usuarioFilter = 0;
      return 
    }

    this.usuarioFilter = usuarioId
  }

  closeActions(): void {
    this.usuarioFilter = 0;
  }

  showFilter(usuarioId: number): boolean {
    return this.usuarioFilter === usuarioId;
  }

  isAdmin(tipo: TipoUsuario): boolean {
    return tipo === TipoUsuario.ADMIN;
  }

  openModal(title: string, template: TemplateRef<any>): void {
    this.modalService.open(template, this.viewContainerRef, {title: title, actions: true});
  }

  msgTornarAdmin(username: string): string {
    return 'Deseja tornar o usuário "' + username + '" admin?';
  }

  msgRemoverAdmin(username: string): string {
    return 'Deseja remover as permissões de administrador para o usuário "' + username + '"?';
  }

  msgRemoverUsuario(username: string): string {
    return 'Isso removerá o usuário "' + username +'" para sempre, deseja continuar?';
  }
}
