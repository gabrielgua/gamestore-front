import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Animations } from 'src/app/animations/animations';
import { Usuario } from 'src/app/models/usuarios/usuario';
import { AuthService } from 'src/app/service/auth/auth.service';
import { UsuarioService } from 'src/app/service/usuario/usuario.service';

@Component({
  selector: 'app-usuario-avatar',
  templateUrl: './usuario-avatar.component.html',
  styleUrls: ['./usuario-avatar.component.css'],
  animations: [Animations]
})
export class UsuarioAvatarComponent implements OnInit{

  usuario$ = new Observable<Usuario>;
  showMenu: boolean = false;

  constructor(private usuarioService: UsuarioService, private authService: AuthService, private router: Router) {}
  
  @HostListener('document: click', ['$event'])
		handleDocumentClick(event: any) {
		let ids = ['profile-avatar', 'profile-btn']

			if(!ids.includes(event.target?.id)) {
				this.showMenu = false;
			}    
	}

  ngOnInit(): void {
    this.usuarioService.init();
    this.usuario$ = this.usuarioService.getUsuario();    
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  handleLogoutClick(): void {
		this.authService.logout();
		this.router.navigate(['sing-in']);
	}

  isAdmin(): boolean {
    return this.usuarioService.isAdmin();
  }

}
