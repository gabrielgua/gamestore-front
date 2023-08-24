import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription } from 'rxjs';
import { Animations } from 'src/app/animations/animations';
import { AlterarSenhaRequest } from 'src/app/models/usuarios/alterar-senha.request';
import { Usuario } from 'src/app/models/usuarios/usuario';
import { UsuarioRequest } from 'src/app/models/usuarios/usuario.request';
import { UsuarioService } from 'src/app/service/usuario/usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
  animations: [Animations]
})
export class PerfilComponent implements OnInit, OnDestroy {
  usuario$ = new Observable<Usuario>();
  
  menus = [
    {id: 'edit-user',     name: 'Conta',            icon: 'person', show: true},
    {id: 'edit-password', name: 'Atualizar senha',  icon: 'key',    show: false},
    {id: 'more-info',     name: 'Mais informações', icon: 'info',   show: false},
  ];

  senhaSub = new Subscription();

 

  constructor(private usuarioService: UsuarioService, private toastr: ToastrService) {}

  
  ngOnInit(): void {
    this.usuario$ = this.usuarioService.getUsuario();
  }
  
  ngOnDestroy(): void {
    this.senhaSub.unsubscribe();
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

  editSenha(request: AlterarSenhaRequest): void {
    this.senhaSub = this.usuarioService.editPassword(request)
      .subscribe({
        next: () => this.toastr.success('Senha alterada com sucesso.'),
        error: (err) => this.toastr.error(err.error.detail)
      });
  }
}
