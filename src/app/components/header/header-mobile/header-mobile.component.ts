import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
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
  form = this.formBuilder.group({
    search: new FormControl('')
	});

  constructor(
    private usuarioService: UsuarioService, 
    private authService: AuthService, 
    private router: Router,
    private formBuilder: FormBuilder) {}
  
  ngOnInit(): void {
    this.getUsuario();
  }

  get search() {
    return this.form.get('search');
  }

  handleContainerClick(event: any): void {
    const closeIds = ['btn-action', 'app-logo', 'btn-carrinho'];    
    if (!closeIds.includes(event.target.id)) {
      return;
    }
    
    this.closeMenu();
  }

  handleSearch(): void {
    if (this.search?.value) {
      localStorage.setItem('search', this.search?.value);
      this.router.navigateByUrl('/', {skipLocationChange: true})
        .then(() => {
          this.router.navigate(['jogos']);
          this.closeMenu();
        })
    } 

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
    this.router.navigate(['sing-in'])
    this.authService.logout();
  }

  closeMenu(): void {
    this.close.emit();
  }
}
