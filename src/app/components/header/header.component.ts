import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Animations } from '../../animations/animations';
import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Jogo } from '../../models/jogos/jogo';
import { JogoResumo } from '../../models/jogos/jogo.resumo';
import { JogoBuscarService } from '../../service/jogos/jogo-buscar.service';
import { JogosListService } from '../../service/jogos/jogos-list.service';
import { PageableModel } from '../../models/pageables/pageable.model';
import { JogoFilter } from '../../models/jogos/jogo.filter';
import { JogoPageableRequest } from '../../models/jogos/jogo.pageable';
import { JogosHeaderSearchListService } from '../../service/jogos/jogos-header-search-list.service';
import { AuthService } from 'src/app/service/auth/auth.service';
import { Usuario } from 'src/app/models/usuarios/usuario';
import { UsuarioService } from 'src/app/service/usuario/usuario.service';
import { Subscription, debounceTime, delay, distinctUntilChanged, filter, map, merge, mergeMap, of, switchMap } from 'rxjs';
import { TipoUsuario } from 'src/app/models/usuarios/tipo.usuario';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: [Animations]
})
export class HeaderComponent implements AfterViewInit {

  @ViewChild('header') header!: ElementRef;
  usuario = new Usuario();

  constructor(
    private changeDetector: ChangeDetectorRef, 
    private router: Router, 
    private jogoService: JogosHeaderSearchListService,
    private usuarioService: UsuarioService, 
    private authService: AuthService,
    private formBuilder: FormBuilder) {}
 
  size: number = 4;
  jogos: JogoResumo[] = [];

  form = this.formBuilder.group({
    search: new FormControl(null)
  })

  breakToMobileWidth = 800;
  mobile: boolean = false;
  showMobileMenu: boolean = false;
  showUsuarioMenu: boolean = false;

  ngAfterViewInit(): void {
    this.resetDropDown();
    this.resetSearch();
    this.manageScreenSize(this.header.nativeElement.offsetWidth);
    this.getUsuario();
    this.handleSearch();
    this.changeDetector.detectChanges();
  }

  get search() {
    return this.form.get('search');
  }

  private handleSearch(): void {
    this.search?.valueChanges.pipe(
      debounceTime(500),
      filter(term => !!term),
      switchMap(term => { 
        this.resetDropDown();
        return this.jogoService.init(term!)
      })
    ).subscribe(() => this.getJogos())
  }

  public checkSearch(): void {
    if (!this.search?.value) {
      this.resetDropDown();
    }
  }

  private getUsuario(): void {
    
    this.usuarioService.init();
    this.usuarioService.getUsuario().subscribe(usuario => {
      if (this.isLoggedIn()) {
        this.usuario = usuario;
      }
    });
  }

  isAdmin(): boolean {
    return this.usuario?.tipo === TipoUsuario.ADMIN;
  }

  manageScreenSize(width: number): void {
    const isMobile = width <= this.breakToMobileWidth;
    this.mobile = isMobile;   
    this.showMobileMenu = this.showMobileMenu && !isMobile ? false : this.showMobileMenu;
  }


  @HostListener('document: click', ['$event'])
  handleDocumentClick(event: any) {
    let ids = ['search-dropdown', 'profile-avatar', 'profile-btn']

     if(!ids.includes(event.target?.id)) {
        this.resetDropDown();
        this.showUsuarioMenu = false;
     }    
  }

  public isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  } 


  private getJogos(): void {
    this.jogoService.getJogos().subscribe((jogos: any) => {      
      this.jogos = jogos.content;      
    })
  }

  resetDropDown(): void {
    this.jogos = [];
  }
  
  resetSearch(): void {
    this.search?.reset();
  }

  handleSubmitSearch(): void {
    this.showMobileMenu = false;

    if (this.search?.value) {
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
    this.router.navigate(['sing-in']);
    this.resetUsuario();
  }

  private resetUsuario(): void {
    this.usuario = new Usuario();
  }
}
