import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Animations } from 'src/app/animations/animations';
import { Usuario } from 'src/app/models/usuarios/usuario';
import { UsuarioService } from 'src/app/service/usuario/usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
  animations: [Animations]
})
export class PerfilComponent implements OnInit {
  usuario$ = new Observable<Usuario>();
  

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.usuario$ = this.usuarioService.getUsuario();
  }

  
 
}
