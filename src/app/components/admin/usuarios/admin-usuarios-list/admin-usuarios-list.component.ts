import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/models/usuarios/usuario';
import { UsuarioListService } from 'src/app/service/usuarios/usuario-list.service';

@Component({
  selector: 'app-admin-usuarios-list',
  templateUrl: './admin-usuarios-list.component.html',
  styleUrls: ['./admin-usuarios-list.component.css']
})
export class AdminUsuariosListComponent implements OnInit {

  usuarios$ = new Observable<Usuario[]>();

  constructor(private service: UsuarioListService) {}


  ngOnInit(): void {
    this.service.fetchUsuarios();
    this.usuarios$ = this.service.getUsuarios();
  }
}
