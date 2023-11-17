import { Component, HostListener, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
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

  
  @ViewChild('modalTemplate', { static: false })
  modalTemplate!: TemplateRef<any>;
  
  usuarios$ = new Observable<Usuario[]>();
  usuarioFilter = 0;
  searchTerm = '';


  constructor(
    private service: UsuarioListService, 
    private usuarioLogadoService: UsuarioService,
    private modalService: ModalService,
    private viewContainerRef: ViewContainerRef,
    private toastr: ToastrService) {}

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

  isUsuarioLogado(usuarioId: number): boolean {
    return this.usuarioLogadoService.isUsuarioLogado(usuarioId);
  }

  openModal(title: string): Observable<string> {
    return this.modalService.open(this.modalTemplate, this.viewContainerRef, {title: title, actions: true});
  }

  tornarAdmin(usuario: Usuario): void {
    this.openModal(this.msgTornarAdmin(usuario.username))
      .subscribe(res => {
        if (res === 'close') {
          return;
        }

        this.service.tornarAdmin(usuario.id);
        this.toastr.success(`Permissões de admin concedidas ao usuário '${usuario.username}'.`, 'Sucesso');        
      });
  }

  revogarAdmin(usuario: Usuario): void {
    this.openModal(this.msgRemoverAdmin(usuario.username))
    .subscribe(res => {
      if (res === 'close') {
        return;
      }

      this.service.revogarAdmin(usuario.id);
      this.toastr.success(`Permissões de admin revogadas ao usuário '${usuario.username}'.`, 'Sucesso');        
    });
  }

  removerUsuario(usuario: Usuario): void {
    this.openModal(this.msgRemoverUsuario(usuario.username))
      .subscribe(res => console.log(res));
  }


  private msgTornarAdmin(username: string): string {
    return 'Deseja tornar o usuário "' + username + '" admin?';
  }

  private msgRemoverAdmin(username: string): string {
    return 'Deseja remover as permissões de administrador para o usuário "' + username + '"?';
  }

  private msgRemoverUsuario(username: string): string {
    return 'Isso removerá o usuário "' + username +'" para sempre, deseja continuar?';
  }
}
