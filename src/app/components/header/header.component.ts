import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Fade } from '../../animations/animations';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Jogo } from '../../models/jogo';
import { JogoResumo } from '../../models/jogo.resumo';
import { JogoBuscarService } from '../../service/jogos/jogo-buscar.service';
import { JogosListService } from '../../service/jogos/jogos-list.service';
import { PageableModel } from '../../models/pageable.model';
import { JogoFilter } from '../../models/jogo.filter';
import { JogoPageableRequest } from '../../models/jogo.pageable';
import { JogosHeaderSearchListService } from '../../service/jogos/jogos-header-search-list.service';
import { AuthService } from 'src/app/service/auth/auth.service';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/service/usuario/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: [Fade]
})
export class HeaderComponent implements AfterViewInit {

  @ViewChild('header') header!: ElementRef;
  usuario = new Usuario();

  constructor(
    private changeDetector: ChangeDetectorRef, 
    private router: Router, 
    private jogoService: JogosHeaderSearchListService,
    private usuarioService: UsuarioService, 
    private authService: AuthService) {}

  search = new FormControl('');

  size: number = 4;
  jogos: JogoResumo[] = [];
  

  breakToMobileWidth = 800;
  mobile: boolean = false;
  showMobileMenu: boolean = false;
  showUsuarioMenu: boolean = false;

  ngAfterViewInit(): void {
    this.resetDropDown();
    this.resetSearch();
    this.manageScreenSize(this.header.nativeElement.offsetWidth);
    this.changeDetector.detectChanges();
    this.getUsuario();
  }

  private getUsuario(): void {
    
    this.usuarioService.init();
    this.usuarioService.getUsuario().subscribe(usuario => {
      if (usuario.id != 0) {
        this.usuario = usuario;
        console.log(this.usuario);
      }
    });
  }

  manageScreenSize(width: number): void {
    const isMobile = width <= this.breakToMobileWidth;
    this.mobile = isMobile;   
    this.showMobileMenu = this.showMobileMenu && !isMobile ? false : this.showMobileMenu;
  }

  handleChangeSearch(): void {
    this.resetDropDown();
    if (this.search.value && this.search.value.length > 4) {
      this.jogoService.init(this.size, this.search.value);
      this.getJogos();
    }
  }

  @HostListener('document: click', ['$event'])
  handleDocumentClick(event: any) {
    let ids = ['search-dropdown', 'profile-avatar', 'profile-btn']

     if(!ids.includes(event.target?.id)) {
        this.resetDropDown();
        this.showUsuarioMenu = false;
     }    
  }


  private getJogos(): void {
    this.jogoService.getJogos().subscribe((jogos) => {
      this.jogos = jogos.content;      
    })
  }

  resetDropDown(): void {
    this.jogos = [];
  }
  
  resetSearch(): void {
    this.search = new FormControl('');
  }

  handleSubmitSearch(): void {
    this.showMobileMenu = false;

    if (this.search.value) {
      localStorage.setItem('search', this.search.value);
      this.resetSearch();
      this.router.navigateByUrl('/', {skipLocationChange: true})
      .then(() => {
        this.router.navigate(['/jogos']);
      });
    } 

  }

  handleProfileClick(): void {
    this.showUsuarioMenu = !this.showUsuarioMenu;
  }

  handleLogoutClick(): void {
    this.authService.logout();
    this.resetUsuario();
  }

  private resetUsuario(): void {
    this.usuario = new Usuario();
  }
}
