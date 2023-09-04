import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/models/usuarios/usuario';

@Component({
  selector: 'app-admin-usuarios-list',
  templateUrl: './admin-usuarios-list.component.html',
  styleUrls: ['./admin-usuarios-list.component.css']
})
export class AdminUsuariosListComponent {

  usuarios$ = new Observable<Usuario[]>();

  constructor() {}

  
}
