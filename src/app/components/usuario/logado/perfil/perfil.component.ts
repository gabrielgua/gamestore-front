import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Animations } from 'src/app/animations/animations';
import { Usuario } from 'src/app/models/usuarios/usuario';
import { UsuarioRequest } from 'src/app/models/usuarios/usuario.request';
import { UsuarioService } from 'src/app/service/usuario/usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
  animations: [Animations]
})
export class PerfilComponent implements OnInit {
  usuario$ = new Observable<Usuario>();
  
  menus = [
    {id: 'edit-user',     name: 'Conta',            icon: 'person', show: true},
    {id: 'edit-password', name: 'Atualizar senha',  icon: 'key',    show: false},
    {id: 'more-info',     name: 'Mais informações', icon: 'info',   show: false},
  ];

 

  constructor(private usuarioService: UsuarioService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.usuario$ = this.usuarioService.getUsuario();
  }

  showMenu(id: string): void {
    if (!id.length) {
      return;
    }

    this.menus.forEach(menu => {
      if (menu.id === id) {
        menu.show = true;
        return;
      }

      menu.show = false;
    });    
  }

  isMenuOpened(id: string): boolean {
    return !!this.menus.find(menu => menu.id === id)?.show;
  }

  editUsuario(request: UsuarioRequest): void {
    this.usuarioService.editSelf(request);
  }
}
