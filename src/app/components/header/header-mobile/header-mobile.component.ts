import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Animations } from 'src/app/animations/animations';
import { Usuario } from 'src/app/models/usuarios/usuario';
import { AuthService } from 'src/app/service/auth/auth.service';
import { UsuarioService } from 'src/app/service/usuario/usuario.service';

@Component({
  selector: 'app-header-mobile',
  templateUrl: './header-mobile.component.html',
  styleUrls: ['./header-mobile.component.css'],
  animations: [Animations]
})
export class HeaderMobileComponent implements OnInit {

  @Output() close = new EventEmitter<boolean>;

  usuario$ = new Observable<Usuario>;

  constructor(private usuarioService: UsuarioService, private authService: AuthService, private router: Router) {}
  
  ngOnInit(): void {
    this.getUsuario();
  }

  handleSearch(): void {

  }

  getUsuario() {
    this.usuario$ = this.usuarioService.getUsuario();
  }

  isAdmin(): boolean {
    return this.usuarioService.isAdmin();
  }

  isLogado(): boolean {
    return this.authService.isLoggedIn();
  }

  logout(): void {
    this.authService.logout();
  }

  closeMenu(): void {
    this.close.emit();
  }
}
