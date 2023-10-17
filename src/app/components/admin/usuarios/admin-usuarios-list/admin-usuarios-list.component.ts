import { Component, HostListener, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Animations } from 'src/app/animations/animations';
import { TipoUsuario } from 'src/app/models/usuarios/tipo.usuario';
import { Usuario } from 'src/app/models/usuarios/usuario';
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

  constructor(private service: UsuarioListService) {}


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
}
